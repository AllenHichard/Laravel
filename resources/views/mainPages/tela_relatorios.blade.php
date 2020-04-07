@extends('layouts.header')
@section('header')

    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico"/>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
            integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
            crossorigin=""></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.debug.js"
            integrity="sha384-THVO/sM0mFD9h7dfSndI6TS0PgAGavwKvB5hAxRRvc0o9cPLohB0wb/PTA7LdUHs"
            crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link href="{{ asset('css/relatorio.css') }}" rel="stylesheet">
    <link href="{{ asset('css/general.css') }}" rel="stylesheet">
    <script type="text/javascript" src="{{ URL::asset('js/relatorio.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/relatorioGraficos.js') }}"></script>


@stop
@section('content')


    <script>
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

    </script>

    <script type="text/javascript">
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    </script>

    <div id="form-relatorio" class="container" style="top: 70px;">
        <form id="forms">
            <div class="input-group mb-3">
                <div id="divTipoBotoes" class="input-group-prepend">
                </div>
                <div class="autocomplete" style="width:300px;">
                    <input id="inputTipo" type="text" name="tipo" placeholder="tipo">
                </div>
            </div>

            <div class="input-group mb-3">
                <div id="divNomeBotoes" class="input-group-prepend">
                    <!--<button class="btn btn-outline-secondary" type="button" id="button-addon1">Botão</button>-->
                </div>
                <div class="autocomplete" style="width:300px;">
                    <input id="inputNome" type="text" name="inputNome" placeholder="cidade">
                </div>
            </div>

            <div class="input-group mb-3">
                <div id="divProducaoBotoes" class="input-group-prepend">
                    <!--<button class="btn btn-outline-secondary" type="button" id="button-addon1">Botão</button>-->
                </div>
                <div class="autocomplete" style="width:300px;">
                    <input id="inputProducao" type="text" name="inputProducao" placeholder="Produção">
                </div>
            </div>

            <div id="auto-produto" class="input-group mb-3"></div>


            <div id="auto-variavel" class="input-group mb-3"></div>


            <div class="input-group mb-3">
                <div id="divDataBotoes" class="input-group-prepend">

                </div>
                <div class="autocomplete" style="width:300px;">
                    <input id="inputData" type="text" name="inputData" placeholder="Data">
                </div>
            </div>



        </form>
    </div>

    <script>
        var tipos = ["municipio", "subdivisao"];
        autocomplete("divTipoBotoes", "inputTipo", document.getElementById("inputTipo"), tipos, tiposSelecionados);
        var producao = ["pecuaria", "agricola", "silvicultura"];
        autocomplete("divProducaoBotoes", "inputProducao", document.getElementById("inputProducao"), producao, producaoSelecionadas);
        var datas = [];
        for (var i = 1974; i < 2020; i++) {
            datas.push(i + "");
        }
        autocomplete("divDataBotoes", "inputData", document.getElementById("inputData"), datas, datasSelecionadas);
    </script>


    <script>
        ajaxOtm();

        function ajaxOtm(inputTipo) {
            $(document).on('click', ".inputTipo", function () {
                tipoSelecionado =  $(this)[0].getElementsByTagName("div")[0].getElementsByTagName("input")[0].value;
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
            });
            $(document).on('click', ".inputProducao", function () {
                var producaoClicada = $(this)[0].getElementsByTagName("div")[0].getElementsByTagName("input")[0].value;
                $.ajax({
                    type: 'GET',
                    url: '/comboProducao',
                    data: {producaoClicada: producaoClicada},
                    success: function (data) {
                        //console.log("Conectado com sucesso");
                        //console.log(data.success);
                        var referenciaPosicao = "auto-produto";
                        var class_delete_div_botao_input = "inputDinamicoProducao";
                        var identificador = "produto";
                        //apagarInputDinamico(referenciaPosicao, class_delete_div_botao_input);

                        var id_divBotao_E_Input = "Div_Dinamico_Producao" + producaoClicada;
                        var podeCriar = true;
                        //Se alterar a quantidade de elementos dentro da div de entrada o passo do  j tem que aumentar
                        for(var j = 0; j < document.getElementById(referenciaPosicao).getElementsByTagName("div").length ; j = j+3){ // pula duas casas porque a div de principal de entrada possui outras duas divs, a de input e de botoes
                            console.log(document.getElementById(referenciaPosicao).getElementsByTagName("div")[j].id);
                            if(document.getElementById(referenciaPosicao).getElementsByTagName("div")[j].id == id_divBotao_E_Input){
                                podeCriar = false;
                            }
                        }
                        if(podeCriar){
                            criarInputDinamico(referenciaPosicao, id_divBotao_E_Input, class_delete_div_botao_input, producaoClicada, identificador);
                            var divBotao = "div" + producaoClicada + identificador + "Botoes";
                            var divInput = "input" + producaoClicada + identificador;
                            //console.log(data);

                            //console.log(Produtos);
                            Produtos.push([]);
                            preenchimentoProduto(divBotao, divInput, data, Produtos[producaoSelecionadas.length-1]);

                        }


                        var referenciaPosicao = "auto-variavel";
                        var class_delete_div_botao_input = "inputDinamicoVariavel";
                        var identificador = "variavel";
                        //apagarInputDinamico(referenciaPosicao, class_delete_div_botao_input);

                        var id_divBotao_E_Input = "Div_Dinamico_Producao" + producaoClicada;
                        var podeCriar = true;
                        //Se alterar a quantidade de elementos dentro da div de entrada o passo do  j tem que aumentar
                        for(var j = 0; j < document.getElementById(referenciaPosicao).getElementsByTagName("div").length; j = j+3){ // pula duas casas porque a div de principal de entrada possui outras duas divs, a de input e de botoes
                            if(document.getElementById(referenciaPosicao).getElementsByTagName("div")[j].id == id_divBotao_E_Input){
                                podeCriar = false;
                            }
                        }
                        if(podeCriar){
                            criarInputDinamico(referenciaPosicao, id_divBotao_E_Input, class_delete_div_botao_input, producaoClicada, identificador);
                            var divBotao = "div" + producaoClicada + identificador + "Botoes";
                            var divInput = "input" + producaoClicada + identificador;
                            //console.log(data);
                            //preenchimentoVariavel(divBotao, divInput, data, Variaveis[i], i);
                            Variaveis.push([]);
                            preenchimentoVariavel(divBotao, divInput, data, Variaveis[producaoSelecionadas.length-1]);


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
                Produtos.push([]);

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
                Variaveis.push([]);


            });

        }
    </script>





    <a id="submit" class="btn btn-outline-secondary" style="background-color: #17a2b8; color: white" type="button"
       id="button-addon1">Pesquisar</a>
    <script type="text/javascript">
        var tipo;

        $("#submit").click(function (e) {



            e.preventDefault();

            //apagarInputDinamico();
            //console.log(Produtos);
            //console.log(Variaveis);

            //console.log(vet);
            console.log(tiposSelecionados);
            console.log(nomesSelecionados);
            console.log(producaoSelecionadas);
            console.log(Produtos);
            console.log(Variaveis);
            console.log(datasSelecionadas);
            $.ajax({
                type: 'GET',
                url: '/requestBotao',
                //nomesSelecionados = ["Feira de Santana", "Salvador"];
                //var tiposSelecionados = [];
                //var nomesSelecionados = [];
                //var producaoSelecionadas = [];
                //var produto = [];
                //var variavel = [];
                // var datasSelecionadas = [];
                data: {
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
                    if(tipoSelecionado != "municipio"){
                        console.log(data.agrupado);
                    }
                    console.log("Teste");
                    console.log(data.a);
                    console.log(data.b);

                    criarTabelas(data); // ou 1

                    //preenchimento( "divNomeBotoes", "inputNome" , data, nomesSelecionados);
                }, error: function (error) {
                    alert("erro AJAX");
                }
            });

        });
    </script>

    <script>


        //var countries = [""];
        //console.log("vetor")
        //console.log(vet);
        //console.log("correto");
        //console.log( document.getElementById('din').getElementsByTagName('div').values);
    </script>


    <script>
        //autocomplete(document.getElementById("myInput"), countries);
    </script>

    <!--<script type="text/javascript">
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $("#data").change(function (e) {
            e.preventDefault();
            var e = document.getElementById("data");
            var dat = e.options[e.selectedIndex].text;
            $.ajax({
                type: 'GET',
                url: '/comboData',
                data: {tipo: tipo, nome: nome, producao: producao, produto: produto, variavel: variavel, dat: dat},
                success: function (data) {
                    //alert(data.resultado);
                    //$('#tbody').empty();
                    criarTabela(data);
                }
            });
        });
    </script>
</div>-->

    <script>
        var objDiv = document.getElementById("scroll");
        objDiv.scrollTop = objDiv.scrollHeight;
    </script>
    <style>
        .switch-field {
            display: flex;
            margin-bottom: 36px;
            overflow: hidden;
        }

        .switch-field input {
            position: absolute !important;
            clip: rect(0, 0, 0, 0);
            height: 1px;
            width: 1px;
            border: 0;
            overflow: hidden;
        }

        .switch-field label {
            background-color: #e4e4e4;
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            line-height: 1;
            text-align: center;
            padding: 8px 16px;
            margin-right: -1px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
            transition: all 0.1s ease-in-out;
        }

        .switch-field label:hover {
            cursor: pointer;
        }

        .switch-field input:checked + label {
            background-color: #a5dc86;
            box-shadow: none;
        }

        .switch-field label:first-of-type {
            border-radius: 8px 0 0 8px;
        }

        .switch-field label:last-of-type {
            border-radius: 0 8px 8px 0;
        }

        /* This is just for CodePen. */

        .form {
            max-width: 600px;
            font-family: "Lucida Grande", Tahoma, Verdana, sans-serif;
            font-weight: normal;
            line-height: 1.625;
            margin: 8px auto;
            padding: 16px;
        }

        h2 {
            font-size: 18px;
            margin-bottom: 8px;
        }
    </style>

    <h2>Correlacionar por:</h2>
    <div class="switch-field">
        <input type="radio" id="radio-one" name="switch-one" value="yes" checked/>
        <label for="radio-one">Cidades</label>
        <input type="radio" id="radio-two" name="switch-one" value="no" />
        <label for="radio-two">Produtos</label>
    </div>



    <div id="form_relatorio" class="container_posicao container-fluid">
        <span style="color: black">Relatório da Produção Agropecuária por Diferentes Níveis Territoriais</span>
        <div id="tabela" class="table-responsive">
            <div id="scroll">
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
                <div id="form-relatorio2" style="margin-left: 2.4px; margin-top: 20px;">
                    <button id="download" class="btn" style="background:#27648c; color: white;" role="button">
                        Gerar CSV
                    </button>

                </div>
            </div>


            <div id = "AreaGrafico_pecuaria" class="row"></div> <!-- comentario -->


            <div id="scroll" style="margin-top: 50px">
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
                <div id="form-relatorio2" style="margin-left: 2.4px; margin-top: 20px;">
                    <button id="download" class="btn" style="background:#27648c; color: white;" role="button">
                        Gerar CSV
                    </button>

                </div>
            </div>


            <div id = "AreaGrafico_agricola" class="row"></div> <!-- comentario -->


            <div id="scroll" style="margin-top: 50px">
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
                <div id="form-relatorio2" style="margin-left: 2.4px; margin-top: 20px;">
                    <button id="download" class="btn" style="background:#27648c; color: white;" role="button">
                        Gerar CSV
                    </button>

                </div>
            </div>



            <div id = "AreaGrafico_silvicultura" class="row"></div> <!-- comentario -->

            <style>
                .containerX {
                    width: auto;
                    height: 400px;
                    background: white;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center
                }
            </style>


        </div>
    </div>

    <div id="form-relatorio2" style="margin-left: 2.4px; margin-top: 20px;">
        <button id="download" class="btn" style="background:#27648c; color: white;" onclick="CriaPDF()" role="button">
            Download
        </button>

    </div>






@endsection
