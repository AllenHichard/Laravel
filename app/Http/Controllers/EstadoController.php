<?php

namespace App\Http\Controllers;

use Storage;
use DB;
use Illuminate\Http\Request;
use Route;

class EstadoController extends Controller
{

    public function viewPecuariaTerr(Request $request)
    {
        $geoJSON = Storage::disk('public')->get('terr_id_ba.json');
        $tipoProdutos = DB::table('pecuaria')->select('*')->get();
        $variaveis = DB::table('valor_pecuaria')->select('*')->get();
        $municipios = DB::table('municipio')->get();
        $control = "pecuaria";
        return view('mainPages.terrID', compact('geoJSON', 'tipoProdutos', 'variaveis',  'control'));
    }
    public function viewAgriculturaTerr(Request $request)
    {
        $geoJSON = Storage::disk('public')->get('terr_id_ba.json');
        $tipoProdutos = DB::table('agricola')->select('*')->get();
        $variaveis = DB::table('valor_agricola')->select('*')->get();
        $control = "agricola";
        return view('mainPages.terrID', compact('geoJSON', 'tipoProdutos', 'variaveis',  'control'));
    }
    public function viewSilviculturaTerr(Request $request)
    {
        $geoJSON = Storage::disk('public')->get('terr_id_ba.json');
        $tipoProdutos = DB::table('silvicultura')->select('*')->get();
        $variaveis = DB::table('valor_silvicultura')->select('*')->get();
        $control = "silvicultura";
        return view('mainPages.terrID', compact('geoJSON', 'tipoProdutos', 'variaveis',  'control'));
    }

    public function viewPecuaria(Request $request)
    {
        $geoJSON = $this->geoJSON();
        $tipoProdutos = DB::table('pecuaria')->select('*')->get();
        $variaveis = DB::table('valor_pecuaria')->select('*')->get();
        $control = "pecuaria";
        return view('mainPages.estado', compact('geoJSON', 'tipoProdutos', 'variaveis',  'control'));
    }

    public function viewSilvicultura(Request $request)
    {
        $geoJSON = $this->geoJSON();
        $tipoProdutos = DB::table('silvicultura')->select('*')->get();
        $variaveis = DB::table('valor_silvicultura')->select('*')->get();
        $control = "silvicultura";
        return view('mainPages.estado', compact('geoJSON', 'tipoProdutos', 'variaveis',  'control'));
    }

    public function viewAgricultura(Request $request)
    {
        $geoJSON = $this->geoJSON();
        $tipoProdutos = DB::table('agricola')->select('*')->get();
        $variaveis = DB::table('valor_agricola')->select('*')->get();
        $control = "agricola";
        return view('mainPages.estado', compact('geoJSON', 'tipoProdutos', 'variaveis',  'control'));
    }

    public function charts(Request $request)
    {
        $id = $request->input('idProd');
        $valor = $_GET['idVar'];
        $control = $_GET['control'];
        $cd_ti = $request->input('cd_ti');
        $results = DB::table('producao_' . $control)
            ->where('fk_valor_' . $control, $valor)
            ->where('fk_id_' . $control, $id);
        if ($cd_ti > 0) {
            $results = $results->join('REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI', 'producao_' . $control . '.fk_municipio_codigo', '=', 'REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI.codigo')
            ->where('cd_ti', $cd_ti);
        }
        $results = $results->select('data', DB::raw('SUM(valor) AS somaValor'))
            ->groupBy('data')
            ->orderBy('data')
            ->get();
        return response()->json(array('results' => $results), 200);
    }

    public function chartsMuni(Request $request)
    {
        $id = $request->input('idProd');
        $valor = $_GET['idVar'];
        $control = $_GET['control'];
        $municipio= $request->input('municipio');
        $results = DB::table('producao_' . $control)
            ->where('fk_valor_' . $control, $valor)
            ->where('fk_id_' . $control, $id);
        if ($municipio> 0) {
            $results = $results->join('REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI', 'producao_' . $control . '.fk_municipio_codigo', '=', 'REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI.codigo')
            ->where('id', $municipio);
        }
        $results = $results->select('data', DB::raw('SUM(valor) AS somaValor'))
            ->groupBy('data')
            ->orderBy('data')
            ->get();
        return response()->json(array('results' => $results), 200);
    }

    public function colorMap(Request $request)
    {
        $ano = $request->input('year');
        $id = $request->input('idProd');
        $valor = $request->input('idVar');
        $control = $request->input('control');
        $total = $this->getSumMuni($id, $valor, $ano, $control);
        return response()->json(array('total' => $total),  200);
    }

    public function colorMapTerr()
    {
        $ano = $_GET['year'];
        $id = $_GET['idProd'];
        $valor = $_GET['idVar'];
        $control = $_GET['control'];
        $totalTer = $this->getSumTerr($id, $valor, $ano, $control);
        return response()->json(array( 'totalTer' => $totalTer),  200);
    }


    public function getSumMuni($id, $idval, $ano, $control)
    {
        $resultsMun = DB::table('producao_' . $control)
            ->join('REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI', 'producao_' . $control . '.fk_municipio_codigo', '=', 'REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI.codigo')
            ->where('fk_valor_' . $control, $idval)
            ->where('fk_id_' . $control, $id);
        
        if ($ano > 0) {
            $resultsMun = $resultsMun->where('data', $ano);
        }

        $resultsMun = $resultsMun->select('id', DB::raw('SUM(valor) AS valor'))
            ->groupBy('id')
            ->orderBy('valor', 'asc')
            ->get();
            
        return $resultsMun;
    }

    public function getSumTerr($id, $idval, $ano, $control){
        $resultsTerr = DB::table('producao_' . $control)
            ->join('REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI', 'producao_' . $control . '.fk_municipio_codigo', '=', 'REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI.codigo')
            ->where('fk_valor_' . $control, $idval)
            ->where('fk_id_' . $control, $id);
        if ($ano > 0) {
            $resultsTerr = $resultsTerr->where('data', $ano);
        }
        $resultsTerr = $resultsTerr->select('cd_ti', DB::raw('SUM(valor) AS valor'))
            ->groupBy('cd_ti')
            ->orderBy('valor', 'asc')
            ->get();
            return $resultsTerr;
    }
    /*
     * O método rankingTotalValor retorna as cidades em ordem decrescente de produção levando em consideração
     * seu valor total acumulado.
     */

    public function ranking()
    {
        $id = $_GET['idProd'];
        $valor = $_GET['idVar'];
        $ano = $_GET['year'];
        $control = $_GET['control'];
        $ranking = DB::table('producao_' . $control)
            ->join('municipio', 'producao_' . $control . '.fk_municipio_codigo', '=', 'municipio.codigo')
            ->join('REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI', 'producao_' . $control . '.fk_municipio_codigo', '=', 'REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI.codigo')
            ->where('fk_valor_' . $control, $valor) // 1 - 4 caso particular 3 e 4
            ->where('fk_id_' . $control, $id);
        if ($ano > 0) {
            $ranking = $ranking->where('data', $ano);
        }
        $ranking = $ranking->select( 'nome', DB::raw('SUM(valor) AS somavalor'))
            ->groupBy('nome')
            ->orderby('somavalor', 'desc')
            ->get();

        return response()->json(array('ranking' => $ranking),  200);
    }

    public function rankingProd(Request $request)
    {
        $valor = $_GET['idVar'];
        $control = $_GET['control'];
        $municipio= $request->input('municipio');
        $ranking = DB::table('producao_' . $control)
            ->join('municipio', 'producao_' . $control . '.fk_municipio_codigo', '=', 'municipio.codigo')
            ->join('REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI', 'producao_' . $control . '.fk_municipio_codigo', '=', 'REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI.codigo')
            ->join($control, 'producao_' . $control .'.fk_id_'.$control, '=', $control.'.id')
            ->where('REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI.id', $municipio);
       
        $ranking = $ranking->select( 'nome_produto', DB::raw('SUM(valor) AS somavalor'))
            ->groupBy('nome_produto')
            ->orderby('somavalor', 'desc')
            ->get();

        return response()->json(array('ranking' => $ranking),  200);
    }

    public function rankingTerr()
    {
        $id = $_GET['idProd'];
        $valor = $_GET['idVar'];
        $ano = $_GET['year'];
        $control = $_GET['control'];
        $ranking = DB::table('producao_' . $control)
            ->join('municipio', 'producao_' . $control . '.fk_municipio_codigo', '=', 'municipio.codigo')
            ->join('REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI', 'producao_' . $control . '.fk_municipio_codigo', '=', 'REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI.codigo')
            ->where('fk_valor_' . $control, $valor) // 1 - 4 caso particular 3 e 4
            ->where('fk_id_' . $control, $id);
        if ($ano > 0) {
            $ranking = $ranking->where('data', $ano);
        }
        $ranking = $ranking->select( 'cd_ti', DB::raw('SUM(valor) AS somavalor'))
            ->groupBy('cd_ti')
            ->orderby('somavalor', 'desc')
            ->get();

        return response()->json(array('ranking' => $ranking),  200);
    }

    public function geoJSON()
    {
        $content = Storage::disk('public')->get('bahia_state.json');
        return $content;
    }

    public function verify(Request $request){
        $product = $request->input('product');
        $control = $request->input('control');
        $variables = DB::table('valor_' .$control)->select('*')->get();
        $relation = DB::table('relacao_' . $control)->where('fk_id_produto', $product)
        ->select('fk_id_variavel', 'fk_id_produto')->distinct()
        ->get();
        return response()->json(array('relation' => $relation, 'variables' => $variables),  200);
    }
}
