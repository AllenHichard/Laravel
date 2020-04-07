<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Dompdf\Dompdf;
use Dompdf\Autoloader;
use function GuzzleHttp\Psr7\copy_to_string;

class RelatorioController extends Controller
{
    private $pdf;

    public function relatorio()
    {

        $nomes = $this->buscarNomesPeloTipo('municipio');
        $produtos = $this->buscarProdutos();
        $variaveis = $this->buscarVariaveis();
        $datas = $this->buscarData();
        list($subdivisoes, $municipios, $nomeProdutos, $valorProdutos, $dat, $valores) = $this->preenchimentoTabelaRelatorio('Feira de Santana', '2000');
        return view('mainPages.relatorios_antigo', compact( 'nomes', 'produtos', 'variaveis', 'datas', 'subdivisoes', 'municipios', 'nomeProdutos', 'valorProdutos', 'dat', 'valores'));
    }

    public function ajaxRequest()
    {
        return view('mainPages.ajaxRequest');
    }

    public function ajaxRequestPost(Request $request)
    {
        $input = $request->all();
        return response()->json(['success'=>$input]);
    }

    public function buscarNomesPeloTipo()
    {
        $nomes = DB::table('municipio')
            ->select('nome')
            ->orderBy('nome')
            ->get();
        return $nomes;
    }

    public function buscarProdutos()
    {
        $produtos = DB::table('pecuaria')
            ->select('nome_produto')
            ->orderBy('nome_produto')
            ->get();
        return $produtos;
    }

    public function buscarVariaveis()
    {
        $variaveis = DB::table('valor_pecuaria')
            ->select('nome')
            ->orderBy('nome')
            ->get();
        return $variaveis;
    }

    public function buscarData()
    {
        $datas = DB::table('producao_pecuaria')
            ->select('data')
            ->groupBy('data')
            ->orderby('data')
            ->get();
        return $datas;
    }



    public function preenchimentoTabelaRelatorio($municipios, $datas)
    {
        /*if ($_POST['tipo'] == true) {
            echo "executando bloco if";
        } else {
            echo "executando bloco else";
        }*/


        $subdivisoes = DB::table('municipio')
            ->join('subdivisao', 'subdivisao.id', '=', 'municipio.fk_subdivisao_id')
            ->where('municipio.nome', $municipios)
            ->select('subdivisao.nome')
            ->get();
        $nomeProdutos = DB::table('pecuaria')
            ->where('id', 1)
            ->select('nome_produto')
            ->get();
        $valorProdutos = DB::table('valor_pecuaria')
            ->where('id', 1)
            ->select('nome')
            ->get();

        $codigoMunicipio = DB::table('municipio')
            ->where('nome', $municipios)
            ->select('codigo')
            ->get();

        $valores = DB::table('producao_pecuaria')
                ->where('fk_municipio_codigo', $codigoMunicipio[0]->codigo)
                ->where('fk_id_pecuaria', 1)
                ->where('fk_valor_pecuaria', 1)

                ->select('valor')
                ->get();

         return array($subdivisoes, json_encode(array('nome'=>$municipios)), $nomeProdutos, $valorProdutos, json_encode(array('data'=>$datas)), $valores) ;
    }




    // utilizado para mostrar o nome da cidade
    public function comboTipo()
    {
        $tipo = $_POST['tipoSelecionado'];
        $nome = DB::table($tipo)
        ->select('nome')
        ->get();
        return response()->json(['success'=>$nome]);
    }


    public function comboNome()
    {
        $nome = $_GET['nome'];

        $codigoMunicipio = DB::table('municipio')
            ->where('nome', $nome )
            ->select('codigo')
            ->get();

        $arrayBusca = array('agricola', 'pecuaria', 'silvicultura');
        $arrayResposta;
        $j = 0;
        for($i = 0; $i < 3; $i++){
            $cond = DB::table("producao_".$arrayBusca[$i])
            ->where("fk_municipio_codigo", $codigoMunicipio[0]->codigo)
            ->exists();
            if($cond){
                $arrayResposta[$j++] = $arrayBusca[$i];
            }
        }
        return response()->json(['success'=>$arrayResposta]);
    }


    // utilizado para mostrar os produtos
    public function comboProducao()
    {
        $producao = $_GET['producaoClicada'];
        $arrayResposta = DB::table($producao)->select('nome_produto')->get();
        $arrayResposta2 = DB::table("valor_".$producao)->select('nome')->get();
        return response()->json(['success'=>$arrayResposta, "success2"=>$arrayResposta2]);
        //return response()->json(['success'=>$producao]); // é para ser produto
    }

    public function comboProduto()
    {
        $producao = $_GET['producao'];
        $nome = $_GET['nome'];
        $produto = $_GET['produto'];

        $codigoMunicipio = DB::table('municipio')
            ->where('nome',  $nome)
            ->select('codigo')
            ->get();

        $idProduto = DB::table($producao)
            ->where('nome_produto', $produto)
            ->select('id')
            ->get();

        $variavel = DB::table("producao_".$producao)
        ->join('valor_'.$producao, 'valor_'.$producao.".id", '=', 'producao_'.$producao.'.fk_valor_'.$producao)
        ->where("fk_municipio_codigo", $codigoMunicipio[0]->codigo)
        ->where("fk_id_".$producao, $idProduto[0]->id)
        ->select('valor_'.$producao.".nome")
        ->groupBy('valor_'.$producao.".nome")
        ->get();
        //return response()->json(['success'=>$produto, 'variavel'=>$variavel]);
        return response()->json(['success'=>$variavel]);
    }




    public function carregarTabelaAno()
    {
        $tipo = $_GET['tipo'];
        $nome = $_GET['nome'];
        $producao = $_GET['producao'];
        $produto = $_GET['produto'];
        $variavel = $_GET['variavel'];

        $subdivisoes = DB::table('municipio')
            ->join('subdivisao', 'subdivisao.id', '=', 'municipio.fk_subdivisao_id')
            ->where('municipio.nome', $nome)
            ->select('subdivisao.nome')
            ->get();

        $codigoMunicipio = DB::table('municipio')
            ->where('nome', $nome)
            ->select('codigo')
            ->get();


        $idProduto = DB::table($producao)
            ->where('nome_produto', $produto)
            ->select('id')
            ->get();

        $idValor = DB::table("valor_".$producao)
            ->where('nome', $variavel)
            ->select('id')
            ->get();

        $resultado = DB::table('producao_'.$producao)
            ->where('fk_municipio_codigo', $codigoMunicipio[0]->codigo)
            ->where('fk_id_'.$producao,   $idProduto[0]->id )
            ->where('fk_valor_'.$producao, $idValor[0]->id)
            ->select('data','valor')
            ->get();

        return response()->json(['subdivisao'=> $subdivisoes,
            'municipio'=> $nome, 'produto'=>$produto, 'variavel'=>$variavel, 'resultado'=>$resultado]);
        }


    public function get2018(){
        $resultado = DB::table('producao_pecuaria')
            ->where('fk_municipio_codigo', 2900108)
            ->where('fk_id_pecuaria',1)
            ->where('fk_valor_pecuaria', 1)
            ->where('data', 2018)
            ->select('valor')
            ->get();
        return response()->json(['resultado'=>$resultado]);
    }




    public function comboData()
    {
        $tipo = $_GET['tipo'];
        $nome = $_GET['nome'];
        $producao = $_GET['producao'];
        $produto = $_GET['produto'];
        $variavel = $_GET['variavel'];
        $data = $_GET['dat'];

        $subdivisoes = DB::table('municipio')
            ->join('subdivisao', 'subdivisao.id', '=', 'municipio.fk_subdivisao_id')
            ->where('municipio.nome', $nome)
            ->select('subdivisao.nome')
            ->get();

        $codigoMunicipio = DB::table('municipio')
            ->where('nome',  $nome)
            ->select('codigo')
            ->get();


        $idProduto = DB::table($producao)
            ->where('nome_produto', $produto)
            ->select('id')
            ->get();

        $idValor = DB::table("valor_".$producao)
            ->where('nome', $variavel)
            ->select('id')
            ->get();

        $resultado = DB::table('producao_'.$producao)
            ->where('fk_municipio_codigo', $codigoMunicipio[0]->codigo)
            ->where('fk_id_'.$producao,   $idProduto[0]->id )
            ->where('fk_valor_'.$producao, $idValor[0]->id)
            ->where('data', $data)
            ->select('data','valor')
            ->get();

            return response()->json(['subdivisao'=> $subdivisoes,
            'municipio'=> $nome, 'produto'=>$produto, 'variavel'=>$variavel, 'resultado'=>$resultado]);
    }

    public function getRequestOperador(){
        $tipoSelecionado = $_POST['tipoSelecionado'];
    }

    public function getRequestBotao(){
        // var datasSelecionadas = [];
        $operadores = $_POST['operadores'];
        $valor = $_POST['valor'];
        $operacao = $_POST['operacao'];
        $tipoSelecionado = $_POST['tipoSelecionado'];
        $nomesSelecionados = $_POST['nomesSelecionados'];
        $producaoSelecionadas = $_POST['producaoSelecionadas'];
        $Produtos = $_POST['Produtos'];
        $Variaveis = $_POST['Variaveis'];
        if($tipoSelecionado == "municipio"){
            return $this->pesquisarPorMunicipio($nomesSelecionados,  $producaoSelecionadas, $Produtos, $Variaveis,  $operacao,  $valor, $operadores);
        } else {
            return $this->pesquisarPorSubdivisao($nomesSelecionados,  $producaoSelecionadas, $Produtos, $Variaveis, $operacao,  $valor, $operadores);
        }
    }

    public function pesquisarPorMunicipio($nomesSelecionados,  $producaoSelecionadas, $Produtos, $Variaveis, $operacao,  $valor, $operadores){
        $arrayCodigoMunicio = $this->codigoMunicipioSelecionado($nomesSelecionados,$operadores);
        $arrayIdProdutos = $this->idProdutoSelecionado($producaoSelecionadas, $Produtos);
        $arrayIdVariaveis = $this->idValorSelecionado($producaoSelecionadas, $Variaveis);
        $resultados = $this->relatorioGeralMunicipio($producaoSelecionadas, $arrayCodigoMunicio, $arrayIdProdutos, $arrayIdVariaveis, $operacao,  $valor);
        return response()->json(['codigoMunicipio'=>$arrayCodigoMunicio, "idProduto"=>$arrayIdProdutos, "idVariavel"=>$arrayIdVariaveis, "resultados"=>$resultados , "a"=>sizeof($producaoSelecionadas) , "b"=>$operadores]);
    }

    public function pesquisarPorSubdivisao($nomesSelecionados,  $producaoSelecionadas, $Produtos, $Variaveis, $operacao,  $valor, $operadores){
        $arrayCodigoMunicio = $this->codigoSubdivisaoSelecionado($nomesSelecionados, $operacao,  $valor, $operadores);
        $arrayIdProdutos = $this->idProdutoSelecionado($producaoSelecionadas, $Produtos);
        $arrayIdVariaveis = $this->idValorSelecionado($producaoSelecionadas, $Variaveis);
        $resultados = $this->relatorioGeralSubdivisao($producaoSelecionadas, $arrayCodigoMunicio, $arrayIdProdutos, $arrayIdVariaveis, $operacao,  $valor, $operadores);
        $resultadoAgrupado = $this->relatorioAgrupadoPorSubdivisao($producaoSelecionadas, $arrayCodigoMunicio, $arrayIdProdutos, $arrayIdVariaveis, $operacao,  $valor, $operadores);
        return response()->json(['codigoMunicipio'=>$arrayCodigoMunicio, "idProduto"=>$arrayIdProdutos, "idVariavel"=>$arrayIdVariaveis, "resultados"=>$resultados , "a"=>sizeof($producaoSelecionadas) , "agrupado"=>$resultadoAgrupado]);
    }

    public function codigoSubdivisaoSelecionado($nomes, $operacao,  $valor, $operadores){
        //$codigoMunicipio = DB::select('select * from municipio where nome IN(?,?)', $nomes); $codigoMunicipio = DB::select('select * from municipio where nome IN(\'Feira de Santana\',\'Salvador\')');
        $arrayCodigoMunicio = [];
        if($operadores == "true"){
            $codigoMunicipio = DB::table('subdivisao')
                ->join('municipio', 'municipio.fk_subdivisao_id', '=', 'subdivisao.id')
                ->whereIn('subdivisao.nome',  $nomes)
                ->select('codigo')
                ->get();
            for($i = 0; $i < sizeof($codigoMunicipio); $i++){
                $arrayCodigoMunicio[$i] = $codigoMunicipio[$i]->codigo;
            }
        }else{
            $codigoMunicipio = DB::table('subdivisao')
                ->join('municipio', 'municipio.fk_subdivisao_id', '=', 'subdivisao.id')
                ->whereIn('subdivisao.nome',  $nomes)
                ->select('codigo')
                ->get();
            for($i = 0; $i < sizeof($codigoMunicipio); $i++){
                $arrayCodigoMunicio[$i] = $codigoMunicipio[$i]->codigo;
            }
        }
        return $arrayCodigoMunicio;
    }


    public function relatorioGeralSubdivisao($producao,  $arrayCodigoMunicio, $arrayIdProdutos, $arrayIdVariaveis, $operacao,  $valor, $operadores){
        $respostas = [];
        for($j = 0; $j < sizeof($producao); $j++){
            $respostas[$j] = DB::table('producao_'.$producao[$j])
            ->whereIn('fk_municipio_codigo', $arrayCodigoMunicio)
            ->whereIn('fk_id_'.$producao[$j],  $arrayIdProdutos[$j])
            ->whereIn('fk_valor_'.$producao[$j], $arrayIdVariaveis[$j])
            ->where("valor", $operacao, $valor)
            ->select("*")
            ->join('municipio', 'municipio.codigo', '=', 'fk_municipio_codigo')
            ->join($producao[$j], $producao[$j].'.id', '=', "fk_id_".$producao[$j])
            ->join('valor_'.$producao[$j], 'valor_'.$producao[$j].".id", '=', "fk_valor_".$producao[$j])
            ->join('subdivisao', 'municipio.fk_subdivisao_id', '=', 'subdivisao.id')
            ->select("subdivisao.nome AS subdivisao" , "municipio.nome", $producao[$j].".nome_produto", 'valor_'.$producao[$j].".nome AS variavel", "data", "valor")
            ->get();
        }
        //AS somaValor
        return $respostas;
    }

    public function relatorioAgrupadoPorSubdivisao($producao,  $arrayCodigoMunicio, $arrayIdProdutos, $arrayIdVariaveis, $operacao,  $valor, $operadores){
        $respostas = [];
        for($j = 0; $j < sizeof($producao); $j++){
            $respostas[$j] = DB::table('producao_'.$producao[$j])
            ->whereIn('fk_municipio_codigo', $arrayCodigoMunicio)
            ->whereIn('fk_id_'.$producao[$j],  $arrayIdProdutos[$j])
            ->whereIn('fk_valor_'.$producao[$j], $arrayIdVariaveis[$j])
            ->where("valor", $operacao, $valor)
            ->select("*")
            ->join('municipio', 'municipio.codigo', '=', 'fk_municipio_codigo')
            ->join($producao[$j], $producao[$j].'.id', '=', "fk_id_".$producao[$j])
            ->join('valor_'.$producao[$j], 'valor_'.$producao[$j].".id", '=', "fk_valor_".$producao[$j])
            ->join('subdivisao', 'municipio.fk_subdivisao_id', '=', 'subdivisao.id')
            ->select("subdivisao.nome", $producao[$j].".nome_produto", 'valor_'.$producao[$j].".nome AS variavel" ,"data", DB::raw('SUM(valor) AS valor'))
            ->groupBY("subdivisao.nome", $producao[$j].".nome_produto", "variavel" ,"data")
            ->get();
        }
        //AS somaValor
        return $respostas;
    }



    public function relatorioGeralMunicipio($producao,  $arrayCodigoMunicio, $arrayIdProdutos, $arrayIdVariaveis, $operacao,  $valor){
        $respostas = [];
        for($j = 0; $j < sizeof($producao); $j++){
            $respostas[$j] = DB::table('producao_'.$producao[$j])
            ->whereIn('fk_municipio_codigo', $arrayCodigoMunicio)
            ->whereIn('fk_id_'.$producao[$j],  $arrayIdProdutos[$j])
            ->whereIn('fk_valor_'.$producao[$j], $arrayIdVariaveis[$j])
            ->where("valor", $operacao, $valor)
            ->select("*")
            ->join('municipio', 'municipio.codigo', '=', 'fk_municipio_codigo')
            ->join($producao[$j], $producao[$j].'.id', '=', "fk_id_".$producao[$j])
            ->join('valor_'.$producao[$j], 'valor_'.$producao[$j].".id", '=', "fk_valor_".$producao[$j])
            ->join('subdivisao', 'municipio.fk_subdivisao_id', '=', 'subdivisao.id')
            ->select("subdivisao.nome AS subdivisao" , "municipio.nome", $producao[$j].".nome_produto", 'valor_'.$producao[$j].".nome AS variavel", "data", "valor")
            ->get();
        }
        //AS somaValor
        return $respostas;
    }
//->join('valor_'.$producao[$j], 'valor_'.$producao[$j].".id", '=', "fk_valor_".$producao[$j])
    //verifica se um produto tem determinada variável, por exemplo, vaca ordenhadas e litros não seria uma relação válida

    public function codigoMunicipioSelecionado($nomes, $operadores){
        //$codigoMunicipio = DB::select('select * from municipio where nome IN(?,?)', $nomes); $codigoMunicipio = DB::select('select * from municipio where nome IN(\'Feira de Santana\',\'Salvador\')');
        $arrayCodigoMunicio = [];
        if($operadores == "true"){
            $codigoMunicipio = DB::table('municipio')
                ->whereIn('nome',  $nomes)
                ->select('codigo')
                ->get();
            for($i = 0; $i < sizeof($codigoMunicipio); $i++){
                $arrayCodigoMunicio[$i] = $codigoMunicipio[$i]->codigo;
            }
        }else{
            $codigoMunicipio = DB::table('municipio')
                ->whereIn('nome',  $nomes)
                ->select('codigo')
                ->get();
            for($i = 0; $i < sizeof($codigoMunicipio); $i++){
                $arrayCodigoMunicio[$i] = $codigoMunicipio[$i]->codigo;
            }
        }
        return $arrayCodigoMunicio;
    }

    public function idProdutoSelecionado($producao, $produtos){
        //$codigoMunicipio = DB::select('select * from municipio where nome IN(?,?)', $nomes); $codigoMunicipio = DB::select('select * from municipio where nome IN(\'Feira de Santana\',\'Salvador\')');
        $arrayIdProdutos = [];
        for($j = 0; $j < sizeof($producao); $j++){
            $idProduto = DB::table($producao[$j]) // virar um for
                ->whereIn('nome_produto', $produtos[$j])
                ->select('id')
                ->get();
            $arrayIdProduto = [];



            for($i = 0; $i < sizeof($idProduto); $i++){
                $arrayIdProduto[$i] = $idProduto[$i]->id;
            }
            $arrayIdProdutos[$j] = $arrayIdProduto;
        }
        return $arrayIdProdutos;
    }

    public function idValorSelecionado($producao, $variavel){
        //$codigoMunicipio = DB::select('select * from municipio where nome IN(?,?)', $nomes); $codigoMunicipio = DB::select('select * from municipio where nome IN(\'Feira de Santana\',\'Salvador\')');
        $arrayIdVariaveis = [];
        for($j = 0; $j < sizeof($producao); $j++){
            $idvariavel = DB::table("valor_".$producao[$j]) // virar um for
                ->whereIn('nome', $variavel[$j])
                ->select('id')
                ->get();
            $arrayIdVariavel = [];
            for($i = 0; $i < sizeof($idvariavel); $i++){
                $arrayIdVariavel[$i] = $idvariavel[$i]->id;
            }
            $arrayIdVariaveis[$j] = $arrayIdVariavel;
        }
        return $arrayIdVariaveis;
    }
}


/*
public function comboNome()
    {

        $nome = $_GET['nome'];
        $tipo = $_GET['tipo'];

        if($tipo == "municipio")
        {
            $subdivisoes = DB::table("municipio")
                ->join('subdivisao', 'subdivisao.id', '=', 'municipio.fk_subdivisao_id')
                ->where('municipio.nome', $nome)
                ->select('subdivisao.nome')
                ->get();
            return response()->json(['success'=>$subdivisoes]);
        }
        else if($tipo == "subdivisao")
        {
            $subdivisoes = DB::table("subdivisao")
                ->join('subdivisao', 'subdivisao.id', '=', 'municipio.fk_subdivisao_id')
                ->where('municipio.nome', $nome)
                ->select('subdivisao.nome')
                ->get();
            return response()->json(['success'=>$subdivisoes]);
        }
    }*/
