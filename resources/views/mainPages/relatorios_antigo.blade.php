@extends('layouts.header')
@section('header')

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin="" />
<script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
    integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
    crossorigin=""></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.debug.js"
    integrity="sha384-THVO/sM0mFD9h7dfSndI6TS0PgAGavwKvB5hAxRRvc0o9cPLohB0wb/PTA7LdUHs" crossorigin="anonymous">
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link href="{{ asset('css/relatorio.css') }}" rel="stylesheet">
<link href="{{ asset('css/relatorioFiltro.css') }}" rel="stylesheet">
<link href="{{ asset('css/general.css') }}" rel="stylesheet">
<link href="{{ asset('css/relatorioSlideTable.css') }}" rel="stylesheet">
<script type="text/javascript" src="{{ URL::asset('js/relatorio.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/relatorioGraficos.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('js/relatorioOperadores.js') }}"></script>
<meta name="csrf-token" content="{{ csrf_token() }}" /> <!-- faltava essa linha -->

@stop
@section('content')



<script>
    var focus = false;
        var cidades = [];
        var vet = [];
        var tiposSelecionados = [];
        var tipoSelecionado;
        var nomesSelecionados = [];
        var producaoSelecionadas = [];
        var indexRemoveProdVar = -1;
        var Produtos = [];
        var Variaveis = [];
        var Naruto = false;    // true cidade false produto
        var datasSelecionadas = [];
        var testeCorrelacao = "cidades";
        var operadores = false;
        var valor = -1;
        var operacao = ">";



</script>
<script type="text/javascript">
    $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
</script>


<div class="divPrincipalRelatorio" >
    <div id="form-relatorio" class="container-fluid" style="margin-left: 100px">
        <div style="max-height: 317px; min-width: 960px">
            <div class="DivA">
                <fieldset class="dimensoesFieldsetRadioECheck">
                    <legend>Tipo</legend>
                    <label for="municipio">
                        <input type="radio" value="accessible" name="quality1" class="radioB" id="municipio">
                        <span>Município</span>
                    </label>

                    <label for="subdivisao">
                        <input type="radio" value="pretty" name="quality1" class="radioB" id="subdivisao">
                        <span>Território Identidade</span>
                    </label>

                </fieldset>
            </div>

            <div class="DivLateral">
                <fieldset class="dimensoesFieldsetRadioECheck">
                    <legend>Produção</legend>
                    <label for="agricola">
                        <input type="checkbox" value="accessible" name="quality2" class="checkB" id="agricola">
                        <span>Agrícola</span>
                    </label>

                    <label for="pecuaria">
                        <input type="checkbox" value="pretty" name="quality2" class="checkB" id="pecuaria">
                        <span>Pecuaria</span>
                    </label>

                    <label for="silvicultura">
                        <input type="checkbox" value="pretty" name="quality2" class="checkB" id="silvicultura">
                        <span>Silvicultura</span>
                    </label>
                </fieldset>
            </div>

            <div class="DivA">
                <fieldset class="dimensoesFieldsetRadioECheck">
                    <legend>Plotar por</legend>
                    <label for="cidades">
                        <input type="radio" value="accessible" name="quality3" class="correlacaoR" id="cidades" checked>
                        <span>Cidades</span>
                    </label>

                    <label for="produtos">
                        <input type="radio" value="pretty" name="quality3" class="correlacaoR" id="produtos">
                        <span>Produtos</span>
                    </label>
                </fieldset>
            </div>
        </div>


        <script>
            $(document).on('click', ".correlacaoR", function () {
                    //var referenciaPosicao = "auto-produto";
                    testeCorrelacao = $(this)[0].id;
                    console.log(testeCorrelacao);
                });
        </script>


        <div class="dimensaoDivFieldsetInput">
            <fieldset class="dimensoesFieldsetInput">
                <legend>Filtro multiSeleção</legend>
                <div>
                    <form id="forms">

                        <!--<div class="input-group mb-3" style="background-color: #f1f1f1">
                                <div id="divTipoBotoes" class="input-group-prepend">
                                </div>
                                <div class="autocomplete" style="width:450px;">
                                    <input id="inputTipo" type="text" name="tipo" placeholder="tipo">
                                </div>
                            </div>-->

                        <div class="input-group mb-3 estiloDivInputGroup">
                            <div id="divNomeBotoes" class="input-group-prepend">
                                <!--<button class="btn btn-outline-secondary" type="button" id="button-addon1">Botão</button>-->
                            </div>
                            <div class="autocomplete dimensaoAutoComplete" >
                                <input id="inputNome" type="text" name="inputNome" placeholder="cidade">
                            </div>
                        </div>

                        <!--<div class="input-group mb-3" style="background-color: #f1f1f1">
                                <div id="divProducaoBotoes" class="input-group-prepend">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon1">Botão</button>
                                </div>
                                <div class="autocomplete" style="width:450px;">
                                    <input id="inputProducao" type="text" name="inputProducao" placeholder="Produção">
                                </div>
                            </div>-->

                        <div id="auto-produto" class="input-group mb-3 estiloDivInputGroup">
                        </div>

                        <div id="auto-variavel" class="input-group mb-3 estiloDivInputGroup">
                        </div>

                        <div class="input-group mb-3 estiloDivInputGroup">
                            <div id="divDataBotoes" class="input-group-prepend">

                            </div>
                            <div class="autocomplete dimensaoAutoComplete" >
                                <input id="inputData" type="text" name="inputData" placeholder="Data">
                            </div>
                        </div>
                    </form>
                    <div class="centralizar">
                        <button id="submit" class="btn btn-outline-secondary estiloPesquisar" disabled
                            type="button" id="button-addon1">
                            Pesquisar
                        </button>
                    </div>

                    <div class="ondisplay">

                        <section >
                            <!-- .slideThree -->
                            <div class="slideThree">
                                <input type="checkbox" value="None" id="slideThree" name="check" />
                                <label for="slideThree"></label>
                            </div>
                            <!-- end .slideThree -->
                        </section>

                    </div>

                    <div id="operadores"></div>

                    <div id="divOperadoresInput" class="input-group mb-3 estiloDivInputGroup"></div>

                </div>
            </fieldset>
        </div>
    </div>

    <script>
        $(document).on('click', "#slideThree", function () {
                    //var referenciaPosicao = "auto-produto";
                    operadores = !operadores;
                    console.log(operadores);
                    criarOperadores(operadores, "operadores", "divOperadoresInput");
                    habilitarBotaoOperador();
                });

    </script>

    <script>
        $(document).on('click', ".radioOperador", function () {
                //var referenciaPosicao = "auto-produto";
                console.log($(this)[0].id);
                operacao = $(this)[0].id;
            });
    </script>




    <script>
        //var tipos = ["municipio", "subdivisao"];
            //autocomplete("divTipoBotoes", "inputTipo", document.getElementById("inputTipo"), tipos, tiposSelecionados);
            //var producao = ["pecuaria", "agricola", "silvicultura"];
            //autocomplete("divProducaoBotoes", "inputProducao", document.getElementById("inputProducao"), producao, producaoSelecionadas);
            var datas = [];
            for (var i = 1974; i < 2020; i++) {
                datas.push(i + "");
            }
            autocomplete("divDataBotoes", "inputData", document.getElementById("inputData"), datas, datasSelecionadas);
    </script>


    <script>
        ajaxOtm();

            function ajaxOtm(inputTipo) {
                $(document).on('click', ".radioB", function () {
                    //var referenciaPosicao = "auto-produto";
                    tipoSelecionado = $(this)[0].id;
                    console.log(tipoSelecionado);
                    $.ajax({
                        type: 'POST',
                        url: '/comboTipo',
                        data: {tipoSelecionado: tipoSelecionado},
                        success: function (data) {
                            console.log("Conectado com sucesso")
                            cidades = Object.keys(data.success).map(function(x) {return data.success[x].nome;});
                            preenchimento("divNomeBotoes", "inputNome", data, nomesSelecionados);
                        }, error: function (error) {
                            alert("erro AJAX");
                        }
                    });
                });

                /*$(document).on('click', ".inputTipo", function () {
                    tipoSelecionado = $(this)[0].getElementsByTagName("div")[0].getElementsByTagName("input")[0].value;
                    $.ajax({
                        type: 'GET',
                        url: '/comboTipo',
                        data: {tipoSelecionado: tipoSelecionado},
                        success: function (data) {
                            console.log("Conectado com sucesso")
                            preenchimento("divNomeBotoes", "inputNome", data, nomesSelecionados);
                        }, error: function (error) {
                            alert("erro AJAX");
                        }
                    });
                });*/

                $(document).on('click', ".aaa", function () {
                    //var referenciaPosicao = "auto-produto";
                    var producaoClicada = $(this)[0].id;
                    var index = producaoSelecionadas.indexOf(producaoClicada);
                    $.ajax({
                        type: 'GET',
                        url: '/comboProducao',
                        data: {producaoClicada: producaoClicada},
                        success: function (data) {
                            console.log("sucess");
                        }
                    });


                    /*if(index == -1){
                        producaoSelecionadas.push(aa);
                    } else {
                        producaoSelecionadas.splice(index, 1);
                    }*/
                    console.log(producaoClicada)
                });


                $(document).on('click', ".checkB", function () {
                    var producaoClicada = $(this)[0].id;
                    var index = producaoSelecionadas.indexOf(producaoClicada);
                    var cod = false;
                    if (index == -1) {
                        producaoSelecionadas.push(producaoClicada);
                        cod = true;
                    } else {
                        producaoSelecionadas.splice(index, 1);

                        var referenciaPosicao = "auto-produto";
                        var nomeBotaoClicado = "Div_Dinamico_Producao" + $(this)[0].id;
                        //console.log(nomeBotaoClicado);
                        apagarInputDinamicoPeloBotao(referenciaPosicao, nomeBotaoClicado, $(this)[0].id);
                        apagarInputDinamicoPeloBotao("auto-variavel", nomeBotaoClicado, $(this)[0].id);


                        while (Produtos[index].length > 0) {
                            Produtos[index].pop();
                        }
                        Produtos.splice(index, 1);
                        //Produtos.push([]);

                        //função para descolamento de referencias vetoriaos ao excluir producao
                        /*for(var temp = indexRemoveProdVar; temp < 2; temp++ ){
                            Produtos[temp] = Produtos[temp+1];
                        }
                        Produtos[2] = Produtos[indexRemoveProdVar];
                        */

                        while (Variaveis[index].length > 0) {
                            Variaveis[index].pop();
                        }
                        Variaveis.splice(index, 1);
                        //Variaveis.push([]);

                    }

                    $.ajax({

                        type: 'GET',
                        url: '/comboProducao',
                        data: {producaoClicada: producaoClicada},
                        success: function (data) {
                            //console.log("Conectado com sucesso");
                            //console.log(data.success);
                            if (cod) {
                                var referenciaPosicao = "auto-produto";
                                var class_delete_div_botao_input = "inputDinamicoProducao";
                                var identificador = "produto";
                                //apagarInputDinamico(referenciaPosicao, class_delete_div_botao_input);

                                var id_divBotao_E_Input = "Div_Dinamico_Producao" + producaoClicada;
                                var podeCriar = true;
                                //Se alterar a quantidade de elementos dentro da div de entrada o passo do  j tem que aumentar
                                for (var j = 0; j < document.getElementById(referenciaPosicao).getElementsByTagName("div").length; j = j + 3) { // pula duas casas porque a div de principal de entrada possui outras duas divs, a de input e de botoes
                                    console.log(document.getElementById(referenciaPosicao).getElementsByTagName("div")[j].id);
                                    if (document.getElementById(referenciaPosicao).getElementsByTagName("div")[j].id == id_divBotao_E_Input) {
                                        podeCriar = false;
                                    }
                                }
                                if (podeCriar) {
                                    criarInputDinamico(referenciaPosicao, id_divBotao_E_Input, class_delete_div_botao_input, producaoClicada, identificador);
                                    var divBotao = "div" + producaoClicada + identificador + "Botoes";
                                    var divInput = "input" + producaoClicada + identificador;
                                    //console.log(data);

                                    //console.log(Produtos);
                                    Produtos.push([]);
                                    //console.log(divBotao);
                                    //console.log(divInput);
                                    //console.log(data);
                                    //console.log(Produtos[producaoSelecionadas.length - 1]);

                                    preenchimentoProduto(divBotao, divInput, data, Produtos[producaoSelecionadas.length - 1]);

                                }


                                var referenciaPosicao = "auto-variavel";
                                var class_delete_div_botao_input = "inputDinamicoVariavel";
                                var identificador = "variavel";
                                //apagarInputDinamico(referenciaPosicao, class_delete_div_botao_input);

                                var id_divBotao_E_Input = "Div_Dinamico_Producao" + producaoClicada;
                                var podeCriar = true;
                                //Se alterar a quantidade de elementos dentro da div de entrada o passo do  j tem que aumentar
                                for (var j = 0; j < document.getElementById(referenciaPosicao).getElementsByTagName("div").length; j = j + 3) { // pula duas casas porque a div de principal de entrada possui outras duas divs, a de input e de botoes
                                    if (document.getElementById(referenciaPosicao).getElementsByTagName("div")[j].id == id_divBotao_E_Input) {
                                        podeCriar = false;
                                    }
                                }
                                if (podeCriar) {
                                    criarInputDinamico(referenciaPosicao, id_divBotao_E_Input, class_delete_div_botao_input, producaoClicada, identificador);
                                    var divBotao = "div" + producaoClicada + identificador + "Botoes";
                                    var divInput = "input" + producaoClicada + identificador;
                                    //console.log(data);
                                    //preenchimentoVariavel(divBotao, divInput, data, Variaveis[i], i);
                                    Variaveis.push([]);
                                    preenchimentoVariavel(divBotao, divInput, data, Variaveis[producaoSelecionadas.length - 1]);


                                }
                            }


                            //preenchimento( "divNomeBotoes", "inputNome" , data, nomesSelecionados);
                        }, error: function (error) {
                            alert("erro AJAX");
                        }
                    });
                });
                $(document).on('click', ".clickBotaoinputProducao", function () {
                    var referenciaPosicao = "auto-produto";
                    nomeBotaoClicado = "Div_Dinamico_Producao" + $(this)[0].id;
                    //console.log(nomeBotaoClicado);
                    apagarInputDinamicoPeloBotao(referenciaPosicao, nomeBotaoClicado, $(this)[0].id);
                    apagarInputDinamicoPeloBotao("auto-variavel", nomeBotaoClicado, $(this)[0].id);


                    while (Produtos[indexRemoveProdVar].length > 0) {
                        Produtos[indexRemoveProdVar].pop();
                    }
                    Produtos.splice(indexRemoveProdVar, 1);
                    //Produtos.push([]);

                    //função para descolamento de referencias vetoriaos ao excluir producao
                    /*for(var temp = indexRemoveProdVar; temp < 2; temp++ ){
                        Produtos[temp] = Produtos[temp+1];
                    }
                    Produtos[2] = Produtos[indexRemoveProdVar];
                    */


                    while (Variaveis[indexRemoveProdVar].length > 0) {
                        Variaveis[indexRemoveProdVar].pop();
                    }
                    Variaveis.splice(indexRemoveProdVar, 1);
                    //Variaveis.push([]);
                });

            }
    </script>


    <script type="text/javascript">
        var tipo;


            $("#submit").click(function (e) {

                if(operadores){
                    valor = document.getElementById("inputValorOperador").value;
                    if(valor==""){
                        valor = -1;
                    }
                }
                e.preventDefault();


                //apagarInputDinamico();
                //console.log(Produtos);
                //console.log(Variaveis);

                console.log("Atualllllllllllll");
                console.log(operadores);
                console.log(valor);
                console.log(operacao);
                console.log(tipoSelecionado);
                console.log(nomesSelecionados);
                console.log(producaoSelecionadas);
                console.log(Produtos);
                console.log(Variaveis);
                console.log(datasSelecionadas);
                $.ajax({
                    type: 'POST',
                    url: '/requestBotao',
                    //nomesSelecionados = ["Feira de Santana", "Salvador"];
                    //var tiposSelecionados = [];
                    //var nomesSelecionados = [];
                    //var producaoSelecionadas = [];
                    //var produto = [];
                    //var variavel = [];
                    // var datasSelecionadas = [];
                    data: {
                        operadores: operadores,
                        valor: valor,
                        operacao: operacao,
                        tipoSelecionado: tipoSelecionado,
                        nomesSelecionados: nomesSelecionados,
                        producaoSelecionadas: producaoSelecionadas,
                        Produtos: Produtos,
                        Variaveis: Variaveis
                    },
                    success: function (data) {
                        console.log("Conectado com sucesso");
                        console.log(data.codigoMunicipio);
                        console.log(data.idProduto);
                        console.log(data.idVariavel);
                        console.log(data.resultados);
                        console.log("Agrupado")
                        if (tipoSelecionado != "municipio") {
                            console.log(data.agrupado);
                        }
                        console.log("Teste");
                        console.log(data.a);
                        console.log(data.b);

                        criarTabelas(data, testeCorrelacao); // ou 1

                        //preenchimento( "divNomeBotoes", "inputNome" , data, nomesSelecionados);
                    }, error: function (error) {
                        alert("erro AJAX");
                    }
                });

            });
    </script>


    <script>
        //var objDiv = document.getElementById("scroll");
            //objDiv.scrollTop = objDiv.scrollHeight;
    </script>




    <div id="form_relatorio" class="container-fluid" style="background-color: #fafafa;min-width: 1200px">

        <div style="background-color: #fafafa;">
            <h1 style="color: black; font-size: 30px; text-align: center">
                Relatório da Produção Agropecuária por Diferentes Níveis Territoriais</h1>
        </div>

        <div id="tabela" class="table-responsive" style="overflow-x: hidden">
            <div id="scroll" style="background-color: #8ab98b; border-radius: 8px 8px 8px 8px">
                <table id="tabe" class="table" style="color: black; margin-top: 20px">
                    <caption style="color: black">Lista de produções de pecuaria</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Subdivisao</th>
                            <th scope="col">Municipio</th>
                            <th scope="col">Nome-Produto</th>
                            <th scope="col">Característica - Valor Produto</th>
                            <th scope="col">Data</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>

                    <tbody id="corpopecuaria" style="">
                    </tbody>
                </table>
                <div class="form-relatorio2">
                    <button class="btn estiloBotaoDownload" role="button">
                        Gerar CSV
                    </button>

                </div>

            </div>

            <div id="AreaGrafico_pecuaria" style="margin-bottom: 50px" class="row"></div>

            <div id="scroll" style="background-color: #00ca6d; border-radius: 8px 8px 8px 8px">
                <table id="tabe" class="table" style="color: black; margin-top: 20px">
                    <caption style="color: black">Lista de produções agrícolas</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Subdivisao</th>
                            <th scope="col">Municipio</th>
                            <th scope="col">Nome-Produto</th>
                            <th scope="col">Característica - Valor Produto</th>
                            <th scope="col">Data</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>

                    <tbody id="corpoagricola" style="">
                    </tbody>
                </table>
                <div class="form-relatorio2">
                    <button class="btn estiloBotaoDownload" role="button">
                        Gerar CSV
                    </button>

                </div>
            </div>
            <div id="AreaGrafico_agricola" class="row" style="margin-bottom: 50px"></div>
            <!-- comentario -->
            <div id="scroll" style=" background-color: #00cab6; border-radius: 8px 8px 8px 8px">
                <table id="tabe" class="table" style="color: black; margin-top: 20px">
                    <caption style="color: black">Lista de produções de silvicultura</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Subdivisao</th>
                            <th scope="col">Municipio</th>
                            <th scope="col">Nome-Produto</th>
                            <th scope="col">Característica - Valor Produto</th>
                            <th scope="col">Data</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>

                    <tbody id="corposilvicultura" style="">
                    </tbody>
                </table>
                <div class="form-relatorio2">
                    <button class="btn estiloBotaoDownload" role="button">
                        Gerar CSV
                    </button>

                </div>

            </div>
            <div id="AreaGrafico_silvicultura" class="row" style="margin-bottom: 50px"></div>
            <!-- comentario -->
        </div>


        <button class="btn estiloBotaoDownload" onclick="CriaPDF()" role="button">
            Download
        </button>




    @endsection
