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
            integrity="sha384-THVO/sM0mFD9h7dfSndI6TS0PgAGavwKvB5hAxRRvc0o9cPLohB0wb/PTA7LdUHs" crossorigin="anonymous">
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link href="{{ asset('css/relatorio.css') }}" rel="stylesheet">
    <link href="{{ asset('css/relatorioFiltro.css') }}" rel="stylesheet">
    <link href="{{ asset('css/general.css') }}" rel="stylesheet">
    <link href="{{ asset('css/cadastro.css') }}" rel="stylesheet">
    <link href="{{ asset('css/relatorioSlideTable.css') }}" rel="stylesheet">
    <script type="text/javascript" src="{{ URL::asset('js/relatorio.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/relatorioGraficos.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/relatorioOperadores.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/cadastro.js') }}"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}"/> <!-- faltava essa linha -->


@stop
@section('content')

    <script>
        var data = new Date();
        var dia = data.getDate();
        var mes = data.getMonth();
        var ano4 = data.getFullYear();
        var valueData = ano4 + "-" + (mes + 1) + "-" + dia;
        console.log(valueData);
    </script>

    <script type="text/javascript">
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    </script>


    <div id="form-relatorio"
         class="container-fluid estiloContainerForm">
        <div>
            <label for="input-date" class="estiloLabel">Data</label>
            <input id="input-date" type="date" value="2019-10-21">
            <span id="campoData" class="result estiloValue" ></span>
        </div>
        <div>
            <label class="estiloLabel"> Produto </label>
            <select id="campoProduto" name="produto" class="estiloSelect">
                <option value="">-- selecione --</option>
            </select>
        </div>

        <div>
            <label class="estiloLabel"> Praça </label>
            <select id="campoPraca" name="praca" id="pracas" class="estiloSelect" >
                <option value="">-- selecione --</option>
            </select>
        </div>
        <div>
            <label class="estiloLabel"> Tipo </label>
            <select id="campoTipo" name="tipo" id="tipos" class="estiloSelect">
                <option value="">-- selecione --</option>

            </select>
        </div>
        <div>
            <label class="estiloLabel"> Unidade </label>
            <select id="campoUnidade" name="unidade" id="tipos" class="estiloSelect">
                <option value="">-- selecione --</option>
            </select>
        </div>

        <div style="margin-bottom: 20px">
            <label for="campoPreco" class="estiloLabel">Valor</label>
            <input id="campoPreco" type="number" value="0.00"/>
            <span id="Preco" class="result estiloValue" ></span>
        </div>

        <div>


        </div>

        <button id="submit" type="button" class="btn btn-primary botaoAdicionar"
                type="button">Adicionar
        </button>
    </div>

    <script>
        $.ajax({
            type: 'GET',
            url: '/carregarOp',
            success: function (data) {
                console.log(data.pracas);
                console.log(data.produtos);
                document.getElementById("input-date").value = valueData;
                init();

                for (var i = 0; i < data.produtos.length; i++) {
                    var select = document.getElementById("campoProduto");
                    var option = document.createElement("option");
                    option.value = data.produtos[i].nome;
                    option.text = data.produtos[i].nome;
                    select.appendChild(option);
                }
                for (var i = 0; i < data.pracas.length; i++) {
                    var select = document.getElementById("campoPraca");
                    var option = document.createElement("option");
                    option.value = data.pracas[i].praca;
                    option.text = data.pracas[i].praca;
                    select.appendChild(option);
                }
                for (var i = 0; i < data.tipos.length; i++) {
                    /*var select = document.getElementById("campoTipo");
                    var option = document.createElement("option");
                    option.value = data.tipos[i].nome;
                    option.text = data.tipos[i].nome;
                    select.appendChild(option);*/
                }
                for (var i = 0; i < data.unidades.length; i++) {
                    var select = document.getElementById("campoUnidade");
                    var option = document.createElement("option");
                    option.value = data.unidades[i].unidade;
                    option.text = data.unidades[i].unidade;
                    select.appendChild(option);
                }
            }
        });
        $("#submit").click(function (e) {
            var Data = document.getElementById("input-date").value;
            var Produto = document.getElementById("campoProduto").value;
            var Praca = document.getElementById("campoPraca").value;
            var Tipo = document.getElementById("campoTipo").value;
            var Unidade = document.getElementById("campoUnidade").value;
            var Preco = document.getElementById("campoPreco").value;
            //console.log(Data);console.log(Produto);console.log(Praca);console.log(Tipo);console.log(Unidade);console.log(Preco);
            $.ajax({
                    type: 'GET',
                    url: '/cadastro',
                    data: {
                        Data: Data,
                        Produto: Produto,
                        Praca: Praca,
                        Tipo: Tipo,
                        Unidade: Unidade,
                        Preco: Preco,
                    },
                    success: function (data) {
                        alert(data.success);
                    }, error: function (error) {
                        alert("erro AJAX");
                    }
                });
            });



            $("#campoProduto").change(function (e) {

                document.getElementById("campoTipo").innerHTML=""
                var select = document.getElementById("campoTipo");
                var option = document.createElement("option");
                option.value = "";
                option.text = "-- selecione --";
                select.appendChild(option);

                var ProSel = $(this).val();
                    $.ajax({
                        type: 'GET',
                        url: '/carregarTipo',
                        data: {
                            ProSel: ProSel,
                        },
                        success: function (data) {
                            console.log(data.tipos);
                            for(var i = 0; i < data.tipos.length; i++){
                                var select = document.getElementById("campoTipo");
                                var option = document.createElement("option");
                                option.value = data.tipos[i].nome;
                                option.text = data.tipos[i].nome;
                                select.appendChild(option);
                             }
                        }, error: function (error) {
                            alert("erro AJAX");
                        }
                    });
                });

    </script>




    <script>
        function init() {

            var _inputs = document.getElementsByTagName('input');
            console.log(_inputs[1].value);
            for (var i = 0; i < _inputs.length; i++) {

                _inputs[i].parentNode.getElementsByClassName('result')[0].innerHTML = _inputs[i].value;

                _inputs[i].onchange = function () {
                    //console.log(this.value);
                    var result_node = this.parentNode.getElementsByClassName('result');
                    result_node[0].innerHTML = this.value;
                }
            }
        }

        window.onload = init;
    </script>

    <script>
        var x = [1,2,3,4];
        var y = [10,20,30,40];

        function produto(x, y) {
            var ret = [];
            for ( var i = 0 ; i < x.length ; i++ )
                ret.push(x[i] * y[i]);
            return ret;
        }

        function quadrados(x) {
            var ret = [];
            for ( var i = 0 ; i < x.length ; i++ )
                ret.push(x[i] * x[i]);
            return ret;
        }

        function somatorio(x) {
            var ret = 0;
            for ( var i = 0 ; i < x.length ; i++ )
                ret += x[i];
            return ret;
        }

        function media(x) { return somatorio(x) / x.length; }

        var m = somatorio(produto(x,y)) - somatorio(x) * somatorio(y) / x.length;
        m /= somatorio(quadrados(x)) - somatorio(x)*somatorio(x) / x.length;

        var b = media(y) - m * media(x);
        console.log("y = "+m+"x "+b);

        </script>

@endsection
