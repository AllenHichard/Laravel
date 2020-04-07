<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;

class DailyPriceController extends Controller
{
    public function view()
    {

        return view('mainPages.dailyPrice');
    }

    public function viewPoducts(Request $request)
    {

        $product = $request->input('name');
        return view('mainPages.product', compact('product'));
    }

    public function tableData()
    {

        $products =  array();

        $names = DB::table('seagri')
            ->select('produto')->distinct()->get();

        foreach ($names as $name) {
            $product = DB::table('seagri')
                ->select('praca','produto', DB::raw('SUM(preco) AS values'))
                ->where('produto', $name->produto)
                ->groupBy('praca', 'produto')
                ->get();
            array_push($products, $product);
        }

        return response()->json(array('products' => $products),  200);
    }
 
    public function allProducts()
    {

        $results = DB::table('seagri')->where('data', '>', Carbon::now()->subDays(30))
            ->select('data', DB::raw('SUM(preco) AS values'))
            ->groupBy('data')->orderBy('data')->get();

        $results2 = DB::table('seagri')->where('data', '>', Carbon::now()->subMonth(3))
            ->select('data', DB::raw('SUM(preco) AS values'))
            ->groupBy('data')->orderBy('data')->get();

        $results3 = DB::table('seagri')->where('data', '>', Carbon::now()->subMonth(6))
            ->select('data', DB::raw('SUM(preco) AS values'))
            ->groupBy('data')->orderBy('data')->get();


        $results4 = DB::table('seagri')->where('data', '>', Carbon::now()->subYear(1))
            ->select('data', DB::raw('SUM(preco) AS values'))
            ->groupBy('data')->orderBy('data')->get();

        return response()->json(array('results' => $results, 'results2' => $results2, 'results3' => $results3, 'results4' => $results4), 200);
    }
}
