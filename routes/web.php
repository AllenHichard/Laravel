<?php
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\RelatorioController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/*
|--------------------------------------------------------------------------
| ROTAS PARA A PÁGINA INICIAL
|--------------------------------------------------------------------------
*/
// Rota para obter a página inicial
Route::view('/', 'mainPages.home');
// Rota para enviar o contato
Route::post('/sendContact', 'homeController@sendContact');


/*
|--------------------------------------------------------------------------
| ROTAS PARA A PÁGINA DE MAPAS
|--------------------------------------------------------------------------
*/
Route::prefix('mapa')->group(function () {
    //Rotas e ajax para estado
    Route::prefix('estado')->group(function(){
        Route::get('/', 'mapasController@getTemplateEstado');
        Route::post('getVariables','mapasController@getVariables');
        Route::post('getFeature','mapasController@getFeature');
        Route::post('getUnidadeTerritorial','mapasController@getUnidadeTerritorial');
        Route::post('getMapData','EstadoController@colorMap');
        Route::post('/getInfo', 'mapasController@getInfo');
    });
    //Rotas e ajax para exterior
    Route::prefix('exterior')->group(function(){
        Route::get('/', 'mapasController@getTemplateMundo');
    });
});

/*
|--------------------------------------------------------------------------
| ROTAS PARA A PÁGINA DE RELATÓRIOS
|--------------------------------------------------------------------------
*/
Route::prefix('relatorios')->group(function () {
    Route::view('/', 'mainPages.relatorios');
});





/*
| ------------ROTAS ANTIGAS----------------------
| TODAS AS ROTAS ABAIXO DEVEM SER REVISADAS
*/
//Estado
Route::get('/pecuariaEstado', 'EstadoController@viewPecuaria');
Route::get('/silvicultEstado', 'EstadoController@viewSilvicultura');
Route::get('/agricultEstado', 'EstadoController@viewAgricultura');
//Território
Route::get('/TerrIDSilv', 'EstadoController@viewSilviculturaTerr');
Route::get('/TerrIDPec', 'EstadoController@viewPecuariaTerr');
Route::get('/TerrIDAgri', 'EstadoController@viewAgriculturaTerr');
//Comércio Exterior
Route::get('/export', 'exportController@viewExport');
Route::get('/import', 'exportController@viewImport');
Route::get('/productInfo', 'DailyPriceController@viewPoducts');
Route::get('/productInfo', 'DailyPriceController@viewPoducts');


Route::get('/getChartPecuaria', 'EstadoController@charts');
Route::get('/getRank', 'EstadoController@ranking');
Route::get('/getRankProd', 'EstadoController@rankingProd');
Route::get('/getMap', 'EstadoController@colorMap');
Route::get('/getMapTerr', 'EstadoController@colorMapTerr');
Route::get('/getRankTerr', 'EstadoController@rankingTerr');
Route::get('/getVar', 'EstadoController@verify');
Route::get('/getSH2', 'exportController@getSH2');
Route::get('/getSH4', 'exportController@getSH4');
Route::get('/getSH6', 'exportController@getSH6');
Route::get('/getProduct', 'exportController@getProducts');
Route::get('/getExports', 'exportController@exportsImportsByCountry');
Route::get('/getChartMuni', 'EstadoController@chartsMuni');
Route::get('/gallery', function(){
    return view('mainPages.gallery');
});

Route::get('/balance', 'exportController@viewImport');
Route::get('/getChartExp', 'exportController@chartExport');
Route::get('/getRankExp', 'exportController@ranking');
Route::get('/daily', 'DailyPriceController@view');
Route::get('/dailyReq', 'DailyPriceController@allProducts');
Route::get('/table', 'DailyPriceController@tableData');




Route::get('/relatorios_antigo', 'RelatorioController@relatorio');


Route::get('/ajaxRequest', 'RelatorioController@ajaxRequest');
Route::post('/ajaxRequest', 'RelatorioController@ajaxRequestPost');


Route::get('/getPDF', 'RelatorioController@gerarPDF');

Route::post('/comboTipo', 'RelatorioController@comboTipo');
Route::get('/comboNome', 'RelatorioController@comboNome');
Route::get('/comboProducao', 'RelatorioController@comboProducao');
Route::get('/comboProduto', 'RelatorioController@comboProduto');
Route::get('/carregarTabelaAno', 'RelatorioController@carregarTabelaAno');
Route::get('/comboData', 'RelatorioController@comboData');

Route::get('/allen', function() {
    return view('mainPages.allen');
});

Route::get('/t', function (){
    return view('mainPages.teste');
});

Route::post('/requestBotao', 'RelatorioController@getRequestBotao');


Route::get('/relatorio', function() {
    return view('mainPages.relatorios');
});

Route::get('/get2018', 'RelatorioController@get2018');


Route::get('/cadastro', 'CadastroController@cadastro');
Route::get('/carregarOp', 'CadastroController@carregarOp');
Route::get('/carregarTipo', 'CadastroController@carregarTipo');

Route::get('/cadastroCotacao', function() {
    return view('mainPages.cadastroCotacao');
});

Route::get('/cotacaoDiaria', function() {
    return view('mainPages.cotacaoDiaria');
});

Route::get('/carregarUltimaCotacao', 'CadastroController@carregarUltimaCotacao');
Route::post('/atualizarDiaAnterior', 'CadastroController@atualizarDiaAnterior');
Route::post('/cadastrarNovoDia', 'CadastroController@cadastrarNovoDia');

Route::get('/excluirDiaAtual', 'CadastroController@excluirDiaAtual');


Route::get('/cadastrar', function() {
    return view('mainPages.cadastrar');
});

Route::get('/mail', 'CadastroController@enviarEmail');

Route::get('/geoLocalizacao', 'CadastroController@geoLocalizacao');
Route::get('/localizacao', function() {
    return view('mainPages.localizacao');
});


Route::get('/localizacao2', function() {
    return view('mainPages.localizacao2');
});


Route::get('/explica', function() {
    return view('mainPages.explica');
});

Route::get('/getLatLong', 'CadastroController@getLatLong');
