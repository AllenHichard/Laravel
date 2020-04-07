<?php

namespace App\Http\Controllers;

use Storage;
use DB;
use Illuminate\Http\Request;
use Route;

class mapasController extends Controller{

    /** *************************************************************
     * @method getTemplateEstado retorna a página para Visualização do Estado
     * Pode obter a visualização em Territórios identidade ou municípios
     * @param Request request contem as opções da requisição (Nenhuma é utilizada)
     * @return string contendo a Visualização
     ************************************************************ **/
    public function getTemplateEstado(Request $request){
        $geoJSON = Storage::disk('local')->get('geoJson/bahia/municipios.json');
        $tipoProdutos = DB::table('pecuaria')->select('*')->get();
        $variaveis = DB::table('valor_pecuaria')->select('*')->get();
        $control = 'pecuaria';
        return view('mainPages.estado', compact('geoJSON', 'tipoProdutos', 'variaveis',  'control'));
    }

    /** *************************************************************
     * @method getInfo retorna as informações a serem mostradas no mapa como o
     * ranking, anos de dados disponíveis e suas produções totais em cada ano
     * @param Request request contem as opções da requisição (Cinco inputs são
     * obrigatórios: idProd: com o inteiro ID referente ao produto,
     * idVar: com o  ID referente a variavel, control: contendo
     * string indicando se é 'pecuaria', 'silvicultura' ou 'agricola', year:
     * contendo o ano do ranking e unidadeTerr contendo string selecionando a
     * unidade territorial).
     * @return Json com a lista de municipio e seus valores
     ************************************************************ **/
    public function getInfo(Request $request){
        $valor = $request->input('idVar');
        $id = $request->input('idProd');
        $ano = $request->input('year');
        $control = $request->input('control');
        $unidadeTerr = $request->input('unidadeTerr');


        switch ($unidadeTerr) {
            case 'terrID':
                $selector = 'subdivisao';
                break;
            case 'municipio':
                $selector = 'municipio';
                break;
            default:
                break;
        }
        $produto = DB::table($control)->select('nome_produto')->where('id',$id)->first();
        // $variavel = DB::table($control)->select('nome_produto')->where('id',$id)->first();
        $variavel = 'belele';

        $ranking = DB::table('producao_' . $control)
            ->join('municipio', 'producao_' . $control . '.fk_municipio_codigo', '=', 'municipio.codigo')
            ->join('REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI', 'producao_' . $control . '.fk_municipio_codigo', '=', 'REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI.codigo')
            ->join('subdivisao', 'municipio'.'.fk_subdivisao_id', '=', 'subdivisao.id')
            ->where('fk_valor_' . $control, $valor) // 1 - 4 caso particular 3 e 4
            ->where('fk_id_' . $control, $id)
            ->where('data', $ano)
            ->select($selector.'.nome', DB::raw('SUM(valor) AS somavalor') )
            ->groupBy( $selector.'.nome' )
            ->orderby('somavalor', 'desc')
            ->get();
        $total = 0;
        foreach ($ranking as $key => $value) {
            $total += $value->somavalor;
        }

        $results = DB::table('producao_' . $control)
            ->where('fk_valor_' . $control, $valor)
            ->where('fk_id_' . $control, $id)
            ->select('data', DB::raw('SUM(valor) AS somavalor'))
            ->groupBy('data')
            ->orderBy('data')
            ->get();

        return response()->json(array('ranking' => $ranking,
            'nomeProduto' => $produto->nome_produto,
            'nomeVariavel' => $variavel,
            'total' => $total,
            'chartResults' => $results
        ),  200);
    }

    /** *************************************************************
     * @method getUnidadeTerritorial retorna o JSON com as unidades territoriais
     * @param Request request contem as opções da requisição (Um input é
     * obrigatórios: 'undTerr' contendo a string contendo a unidade)
     * @return json geoJSON completo
     ************************************************************ **/
    public function getUnidadeTerritorial(Request $request){
        $undTerr = $request->input('undTerr');
        $dir = 'geoJson/bahia/';
        switch ($undTerr) {
            case 'municipio':
                $file = 'municipios.json';
                break;
            case 'terrID':
                $file = 'territoriosIdentidade.json';
                break;
            default:
                return response()->json(array('success' => false),  200);
                break;
        }
        $geoJSON = Storage::disk('local')->get($dir.$file);
        return response()->json(array('success' => true, 'geojson' => json_decode($geoJSON, true)),  200);
    }

    /** *************************************************************
     * @method getVariables retorna as variáveis referentes ao produto selecionado
     * @param Request request contem as opções da requisição (Dois inputs são
     * obrigatórios: 'product' contendo o id do produto e 'control' contendo
     * string indicando se é 'pecuaria', 'silvicultura' ou 'agricola')
     * @return json {
     * {Array} relation: Contém as relações
     * {Array} variables: Contém as variáveis
     * }
     ************************************************************ **/
    public function getVariables(Request $request){
        $product = $request->input('product');
        $control = $request->input('control');
        $variables = DB::table('valor_' .$control)->select('*')->get();
        $relation = DB::table('relacao_' . $control)->where('fk_id_produto', $product)
        ->select('fk_id_variavel', 'fk_id_produto')->distinct()
        ->get();
        return response()->json(array('relation' => $relation, 'variables' => $variables),  200);
    }

    /** *************************************************************
     * @method getFeature Obtem as informações da "feature" (território) selecionado
     * @param Request request contem as opções da requisição (Três inputs são
     * obrigatórios: 'control' contendo string indicando se é 'pecuaria',
     * 'silvicultura' ou 'agricola', 'idProd'
     * e 'idVar' contendo as ids do produto e variável respectivamente)
     * @return json {
     * {int} relation: Contém o Valor total de produção
     * }
     ************************************************************ **/
    public function getFeature(Request $request){
        $id = $request->input('idProd');
        $valor = $request->input('idVar');
        $control = $request->input('control');
        $total = DB::table('producao_' . $control)
            ->join('REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI', 'producao_' . $control . '.fk_municipio_codigo', '=', 'REG_MUN_A_100K_2017_11_23_GCS_SIR_SEI.codigo')
            ->where('fk_valor_' . $control, $valor)
            ->where('fk_id_' . $control, $id)
            ->select('id', DB::raw('SUM(valor) AS somavalor'))
            ->groupBy('id')
            ->orderBy('somavalor', 'asc')
            ->get();
        return response()->json(array('total' => $total),  200);
    }

    /** *************************************************************
     * @method getTemplateMundo retorna a página para Visualização do Mundo
     * Pode obter a visuação para importações ou exportações do estado
     * @param Request request contem as opções da requisição
     * @return string contendo a Visualização
     ************************************************************ **/
    public function getTemplateMundo(Request $request){
        $geoJSON = Storage::disk('public')->get('paises_json.json');
        $secrom = DB::table('co_ncm')->select('co_ncm_secrom', 'no_sec_por')->distinct()->orderBy('no_sec_por')->get();
        $control = 'export';
        return view('mainPages.export', compact('geoJSON', 'secrom', 'control'));
    }

}
