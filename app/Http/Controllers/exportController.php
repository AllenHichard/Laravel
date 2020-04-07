<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
use DB;


class exportController extends Controller
{

        public function viewExport(){
        $secrom = DB::table('co_ncm')->select('co_ncm_secrom', 'no_sec_por')->distinct()->orderBy('no_sec_por')->get();
        $geoJSON = Storage::disk('public')->get('paises_json.json');
        $control = 'export';
        return view('mainPages.export', compact('geoJSON', 'secrom', 'control'));
    }

    public function viewImport(){
        $secrom = DB::table('co_ncm')->select('co_ncm_secrom', 'no_sec_por')->distinct()->orderBy('no_sec_por')->get();
        $geoJSON = Storage::disk('public')->get('paises_json.json');
        $control = 'import';
        return view('mainPages.export', compact('geoJSON', 'secrom', 'control'));
    }

    public function exportsImportsByCountry(Request $request){
        $idVar = $request->input('idVar');
        $year = $request->input('year');
        $secrom = $request->input('secrom');
        $sh2 = $request->input('sh2');
        $sh4 = $request->input('sh4');
        $sh6 = $request->input('sh6');
        $products = $request->input('products');
        $exports = DB::table('relexportationpais')
        ->join('paises', DB::raw('CAST(relexportationpais.co_pais AS DECIMAL(12,2))'), '=', 'paises.cod_p')
        ->join('co_ncm', 'relexportationpais.co_ncm','=', 'co_ncm.co_ncm')
        ->where('co_ncm_secrom', $secrom)->where('exportation', 1);
        if($sh2 > '0' && $sh6 > '0' && $sh4 > '0' && $products > '0'){
            $exports = $exports->where('co_ncm', $products);
        } else if($sh2 > '0' && $sh6 > '0' && $sh4 > '0'){
            $exports = $exports->where('co_sh6', $sh6);
        } else  if( $sh2 > '0' && $sh4 > '0'){
            $exports = $exports->where('co_sh4', $sh4);
        } else  if( $sh2 > '0' ){
            $exports = $exports->where('co_sh2', $sh2);
        }
        if($year > '0'){
            $exports = $exports->where('co_ano', $year);
        }
        $exports = $exports->select('name','cod_p','iso3',DB::raw('SUM(CAST('.$idVar.' AS DECIMAL(12,2))) AS valor'))
        ->groupBy('name','cod_p', 'iso3')
        ->orderBy('valor', 'asc')->get();

        $imports = DB::table('relexportationpais')
        ->join('paises', DB::raw('CAST(relexportationpais.co_pais AS DECIMAL(12,2))'), '=', 'paises.cod_p')
        ->join('co_ncm', 'relexportationpais.co_ncm','=', 'co_ncm.co_ncm')
        ->where('co_ncm_secrom', $secrom)->where('exportation', 0);
        if($sh2 > '0' && $sh6 > '0' && $sh4 > '0' && $products > '0'){
            $imports = $imports->where('co_ncm', $products);
        } else if($sh2 > '0' && $sh6 > '0' && $sh4 > '0'){
            $imports = $imports->where('co_sh6', $sh6);
        } else  if( $sh2 > '0' && $sh4 > '0'){
            $imports = $imports->where('co_sh4', $sh4);
        } else  if( $sh2 > '0' ){
            $imports = $imports->where('co_sh2', $sh2);
        }
        if($year > '0'){
            $imports = $imports->where('co_ano', $year);
        }
        $imports = $imports->select('name','cod_p','iso3',DB::raw('SUM(CAST('.$idVar.' AS DECIMAL(12,2))) AS valor'))
        ->groupBy('name','cod_p', 'iso3')
        ->orderBy('valor', 'asc')->get();
        return response()->json(array( 'exports' => $exports, 'imports' => $imports),  200);
    }



    public function chartExport(Request $request){
        $secrom = $request->input('secrom');
        $idVar = $request->input('idVar');
        $sh2 = $request->input('sh2');
        $sh4 = $request->input('sh4');
        $sh6 = $request->input('sh6');
        $products = $request->input('products');
        $country = $request->input('country');
        $chartDataExport = DB::table('relexportationpais')->where('co_ncm_secrom', $secrom)
        ->select('co_ano', DB::raw('SUM(CAST('.$idVar.' AS DECIMAL(12,2))) AS valor'))
        ->join('co_ncm', 'relexportationpais.co_ncm','=', 'co_ncm.co_ncm')
        ->groupBy('co_ano')->orderBy('co_ano');
        if($sh2 > '0' && $sh6 > '0' && $sh4 > '0' && $products > '0'){
            $chartDataExport = $chartDataExport->where('co_ncm', $products);
        } else if($sh2 > '0' && $sh6 > '0' && $sh4 > '0'){
            $chartDataExport = $chartDataExport->where('co_sh6', $sh6);
        } else  if( $sh2 > '0' && $sh4 > '0'){
            $chartDataExport = $chartDataExport->where('co_sh4', $sh4);
        } else  if( $sh2 > '0' ){
            $chartDataExport = $chartDataExport->where('co_sh2', $sh2);
        }
        if($country != '0'){
            $chartDataExport = $chartDataExport
            ->join('paises', DB::raw('CAST(relexportationpais.co_pais AS DECIMAL(12,2))'), '=', 'paises.cod_p')
            ->where('iso3', $country);
        }
        $chartDataExport = $chartDataExport->where('exportation', 1)->get();

         $chartDataImport = DB::table('relexportationpais')->where('co_ncm_secrom', $secrom)
        ->select('co_ano', DB::raw('SUM(CAST('.$idVar.' AS DECIMAL(12,2))) AS valor'))
        ->join('co_ncm', 'relexportationpais.co_ncm','=', 'co_ncm.co_ncm')->groupBy('co_ano')->orderBy('co_ano');
        if($sh2 > '0' && $sh6 > '0' && $sh4 > '0' && $products > '0'){
            $chartDataImport = $chartDataImport->where('co_ncm', $products);
        } else if($sh2 > '0' && $sh6 > '0' && $sh4 > '0'){
            $chartDataImport = $chartDataImport->where('co_sh6', $sh6);
        } else  if( $sh2 > '0' && $sh4 > '0'){
            $chartDataImport = $chartDataImport->where('co_sh4', $sh4);
        } else  if( $sh2 > '0' ){
            $chartDataImport = $chartDataImport->where('co_sh2', $sh2);
        }
        if($country != '0'){
            $chartDataImport = $chartDataImport
            ->join('paises', DB::raw('CAST(relexportationpais.co_pais AS DECIMAL(12,2))'), '=', 'paises.cod_p')
            ->where('iso3', $country);
        }
        $chartDataImport = $chartDataImport ->where('exportation', 0)->get() ;
        return response()->json(array( 'chartDataExport' => $chartDataExport, 'chartDataImport' => $chartDataImport),  200);
    }

    public function ranking(Request $request) 
    {
        $secrom = $request->input('secrom');
        $idVar = $request->input('idVar');
        $sh2 = $request->input('sh2');
        $sh4 = $request->input('sh4');
        $sh6 = $request->input('sh6');
        $products = $request->input('products');
        $year = $request->input('year');

        $rankingExports = DB::table('relexportationpais')
        ->join('paises', DB::raw('CAST(relexportationpais.co_pais AS DECIMAL(12,2))'), '=', 'paises.cod_p')
        ->join('co_ncm', 'relexportationpais.co_ncm','=', 'co_ncm.co_ncm')
        ->where('co_ncm_secrom', $secrom)->where('exportation', 1);
        if($sh2 > '0' && $sh6 > '0' && $sh4 > '0' && $products > '0'){
            $rankingExports = $rankingExports->where('co_ncm', $products);
        } else if($sh2 > '0' && $sh6 > '0' && $sh4 > '0'){
            $rankingExports = $rankingExports->where('co_sh6', $sh6);
        } else  if( $sh2 > '0' && $sh4 > '0'){
            $rankingExports = $rankingExports->where('co_sh4', $sh4);
        } else  if( $sh2 > '0' ){
            $rankingExports = $rankingExports->where('co_sh2', $sh2);
        }
        if($year > 0){
            $rankingExports = $rankingExports->where('co_ano', $year);
        }
        $rankingExports = $rankingExports->select('name',DB::raw('SUM(CAST('.$idVar.' AS DECIMAL(12,2))) AS valor'))
        ->groupBy('name')->OrderBy('valor', 'desc')->get();
        
        $rankingImports = DB::table('relexportationpais')
        ->join('paises', DB::raw('CAST(relexportationpais.co_pais AS DECIMAL(12,2))'), '=', 'paises.cod_p')
        ->join('co_ncm', 'relexportationpais.co_ncm','=', 'co_ncm.co_ncm')
        ->where('co_ncm_secrom', $secrom)->where('exportation', 0);
        if($sh2 > '0' && $sh6 > '0' && $sh4 > '0' && $products > '0'){
            $rankingImports = $rankingImports->where('co_ncm', $products);
        } else if($sh2 > '0' && $sh6 > '0' && $sh4 > '0'){
            $rankingImports = $rankingImports->where('co_sh6', $sh6);
        } else  if( $sh2 > '0' && $sh4 > '0'){
            $rankingImports = $rankingImports->where('co_sh4', $sh4);
        } else  if( $sh2 > '0' ){
            $rankingImports = $rankingImports->where('co_sh2', $sh2);
        }
        if($year > 0){
            $rankingImports = $rankingImports->where('co_ano', $year);
        }
        $rankingImports = $rankingImports->select('name',DB::raw('SUM(CAST('.$idVar.' AS DECIMAL(12,2))) AS valor'))
        ->groupBy('name')->OrderBy('valor', 'desc')->get();

        return response()->json(array('rankingExports' => $rankingExports,'rankingImports' => $rankingImports),  200);
    }

    public function getSH2(Request $request){
        $secrom = $request->input('secrom');
        $sh2 = DB::table('co_ncm')->select('co_sh2', 'no_sh2_por')
        ->where('co_ncm_secrom', $secrom)
        ->distinct()->get();
        return response()->json(array('sh2' => $sh2),  200);
    }

    public function getSH4(Request $request){
        $co_sh2 = $request->input('co_sh2');
        $sh4 = DB::table('co_ncm')->select('co_sh4', 'no_sh4_por')
        ->where('co_sh2', $co_sh2)
        ->distinct()->get();
        return response()->json(array('sh4' => $sh4),  200);
    }

    public function getSH6(Request $request){
        $co_sh4 = $request->input('co_sh4');
        $sh6 = DB::table('co_ncm')->select('co_sh6', 'no_sh6_por')
        ->where('co_sh4', $co_sh4)
        ->distinct()->get();
        return response()->json(array('sh6' => $sh6),  200);
    }

    public function getProducts(Request $request){
        $co_sh6 = $request->input('co_sh6');
        $products = DB::table('co_ncm')->select('co_ncm', 'no_ncm_pro')
        ->where('co_sh6', $co_sh6)
        ->distinct()->get();
        return response()->json(array('products' => $products),  200);
    }
}
