<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderShipped;
use Illuminate\Http\Request;
use DB;
use Dompdf\Dompdf;
use Dompdf\Autoloader;
use function GuzzleHttp\Psr7\copy_to_string;

class CadastroController extends Controller {

    public function cadastro(){
        $Data = $_GET['Data'];
        $Produto = $_GET['Produto'];
        $Praca = $_GET['Praca'];
        $Tipo = $_GET['Tipo'];
        $Unidade = $_GET['Unidade'];
        $Preco = $_GET['Preco'];
        DB::insert('insert into seagri_cadastro values (?, ?, ?, ?, ?, ?)', [$Data, $Produto, $Praca,  $Tipo, $Unidade, $Preco]);
        return response()->json(['success'=>"Inserido Com Sucesso"]);
    }

    public function carregarOp(){
        $produtos = DB::table('seagri_produtos')->select('nome')->groupBy('nome')->orderBy('nome')->get();
        $pracas = DB::table('seagri')->select('praca')->groupBy('praca')->orderBy('praca')->get();
        $tipos = DB::table('seagri_tipo')->select('nome')->groupBy('nome')->orderBy('nome')->get();
        $unidades = DB::table('seagri')->select('unidade')->groupBy('unidade')->orderBy('unidade')->get();
        return response()->json(['pracas'=>$pracas,'produtos'=>$produtos,'tipos'=>$tipos,'unidades'=>$unidades]);

    }

    public function carregarTipo(){
        $ProSel = $_GET['ProSel'];
        $tipos = DB::table('seagri_tipo')
        ->join('seagri_produtos', 'seagri_tipo.idproduto', '=', 'seagri_produtos.id')
        ->where('seagri_produtos.nome', $ProSel)
        ->select("seagri_tipo.nome" )
        ->get();
        return response()->json(['tipos'=>$tipos]);
    }

    public function carregarUltimaCotacao(){
        $dataUltimaCotacao = DB::table('seagri_cadastro')
            ->select("*")
            ->max("data");
        $dadosSeagri = DB::table('seagri_cadastro')
            ->where("data", $dataUltimaCotacao)
            ->orderBy("produto")
            ->get();
        return response()->json(['data'=>$dadosSeagri]);
    }

    public function atualizarDiaAnterior(){
        $nova = $_POST['MatrizGeralCopia'];
        $ante = $_POST['MatrizGeral'];

        for($i = 0; $i < sizeof($ante[0]); $i++){
            DB::table('seagri_cadastro')
                ->where('data', $ante[0][$i])
                ->where('produto',$ante[1][$i])
                ->where('praca', $ante[2][$i])
                ->where('tipo', $ante[3][$i])
                ->where('unidade', $ante[4][$i])
                ->where('preco', $ante[5][$i])
                ->update(['data' => $nova[0][$i], 'produto'=>$nova[1][$i], 'praca' => $nova[2][$i], 'tipo' => $nova[3][$i], 'unidade' => $nova[4][$i], 'preco'=> $nova[5][$i]]);
        }
        return response()->json(['salvo'=>'Alterado com sucesso ']);
    }

    public function cadastrarNovoDia(){
        $nova = $_POST['hoje'];
        for($i = 0; $i < sizeof($nova[0]); $i++){
            DB::table('seagri_cadastro')
            ->insert(['data' => $nova[0][$i], 'produto'=>$nova[1][$i], 'praca' => $nova[2][$i], 'tipo' => $nova[3][$i], 'unidade' => $nova[4][$i], 'preco'=> $nova[5][$i]]);
        }
        return response()->json(['salvo'=>'Inserido com sucesso um total de  '.sizeof($nova[0])." Produtos" ]);
    }

    public function excluirDiaAtual(){
        $data = $_GET['dat'];
        DB::table("seagri_cadastro")->where('data', '=', "".$data)->delete();
        return response()->json(['salvo'=>'Excluido com sucesso'.$data]);
    }

    public function geoLocalizacao(){
        $lat = $_GET['lat'];
        $long = $_GET['long'];
        $pais = $_GET['pais'];
        $estado = $_GET['estado'];
        $cidade = $_GET['cidade'];
        $ip = $_GET['ip'];
        DB::table("localizacao")
            ->insert(['lat' => $lat, 'long'=>$long, 'pais' => $pais, 'estado'=>$estado, 'cidade' => $cidade, 'ip'=>$ip]);
        return response()->json(['salvo'=>'Localização Salva']);
    }

    public function getLatLong(){
        $loc = DB::table('localizacao')->get();
        return response()->json(['localizacao'=>$loc]);
    }

    public function enviarEmail(){
        $mensagem = $_GET['mensagem'];
        Mail::send('mail.mail',['mensagem' => $mensagem], function($m){
            $m->from('testegeodatin@gmail.com', 'Geodatin');
            $m->subject('Nosso portal já manda email');
            //$m->attach('/home/geodatin/pgadmin.log');
            $m->to('allanpereira016@gmail.com');
        });
        return response()->json(['sucesso'=>'We did this.']);
    }



}
