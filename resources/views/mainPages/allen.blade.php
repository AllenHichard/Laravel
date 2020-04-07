@extends('layouts.header')
@section('header')

    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link href="{{ asset('css/cadastro.css') }}" rel="stylesheet">
    <script type="text/javascript" src="{{ URL::asset('js/cadastro.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/cadastroAjax.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/cadastroPopUp.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/cadastroTable.js') }}"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.debug.js"
            integrity="sha384-THVO/sM0mFD9h7dfSndI6TS0PgAGavwKvB5hAxRRvc0o9cPLohB0wb/PTA7LdUHs"
            crossorigin="anonymous"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}"/> <!-- faltava essa linha -->


@stop
@section('content')

    <script>
        var cidade0 = "*";
        var produto0 = "*";
        var cidade1 = "*";
        var produto1 = "*";
        var MatrizGeral = [[], [], [], [], [], []];
        var indexsOntem = [];
        //var MatrizHoje = [[], [], [], [], [], []];
        var indexsHoje = [];
        var corLinha = 0;
        var index = 0;
    </script>

    <p id="demo"></p>
    <script>

    </script>
    <div id="dvData" style="display: none">
        <table id="tabelaXLS" border="1"></table>
    </div>
    <div class="wrapper DivA">
        <h1 id="nomeTituloAnterior" style="color: whitesmoke">
            Data
        </h1>


        <div id="tabelaAnterior" class="table">


            <div class="row header">
                <div class="cell estiloColunaCheck">
                    <input type="checkbox" id="todos0" class="estiloColunaCheck" name="checkBox0">
                </div>

                <div class="cell">
                    Produto
                </div>
                <div class="cell">
                    Praça
                </div>
                <div class="cell">
                    Tipo
                </div>
                <div class="cell">
                    Unidade
                </div>
                <div class="cell">
                    Preço
                </div>
            </div>

        </div>

    </div>


    <div id="meio" class="DivLateral">
        <div class="centralizar">
            <button id="mover" class="btn btn-warning"> Copiar dados
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        <hr noshade="">
        <p style="font-family: Helvetica Neue, Helvetica, Arial;font-size: 14px; text-align: right"> Produção do dia
            atual </p>
        <hr noshade="">
        <div>
            <label class="estiloLabel"> Produto </label>
            <select id="campoProduto1" name="produto" class="estiloSelect classe1">
                <option value="*">-- selecione --</option>
            </select>
        </div>
        <div class="espacoEntreBotoes">
            <label class="estiloLabel"> Praça </label>
            <select id="campoPraca1" name="praca" id="pracas" class="estiloSelect classe1">
                <option value="*">-- selecione --</option>
            </select>
        </div>
        <div class="centralizar">
            <button data-js="open" class="btn btn-success espacoEntreBotoes"> Adicionar
                <i class="fas fa-plus"></i>
            </button>
            <div class="popup">
                <div id="form-relatorio"
                     class="container-fluid estiloContainerForm">
                    <div class="botaoFecharPopUp">
                        <button name="close" class="btn btn-danger"><i class="fas fa-times"></i></button>
                    </div>
                    <hr noshade="">
                    <h4 style="color: #fffae8">Adicionar uma nova cotação</h4>
                    <hr noshade="">
                    <div>
                        <label class="estiloLabel"> Produto </label>
                        <select id="campoProduto" name="produto" class="estiloSelect">
                            <option value="">-- selecione --</option>
                        </select>
                    </div>

                    <div>
                        <label class="estiloLabel"> Praça </label>
                        <select id="campoPraca" name="praca" id="pracas" class="estiloSelect">
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
                    </div>

                    <button id="submit" type="button" class="btn btn-primary botaoAdicionar"
                            type="button">Salvar <i style="margin-left: 5px" class="fas fa-save"></i>
                    </button>
                </div>

            </div>
        </div>
        <div class="centralizar">
            <button id="remover" class="btn btn-danger espacoEntreBotoes"> Remover
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="centralizar">
            <button id="salvar" class="btn btn-info espacoEntreBotoes"> Enviar <i class="fas fa-paper-plane"></i>
            </button>
        </div>
        <div class="centralizar espacoEntreBotoes">
            <button class="btn btn-danger" onclick="CriaPDF('dvData')" style="margin-right: 5px">PDF <i class="fas fa-file-pdf"></i></button>

            <button id="btnExport" type="submit" class="btn btn-success" value="Convert Table To XLS">
                XLS <i class="fas fa-table"></i>
            </button>
        </div>
        <div class="centralizar">
            <button id="email" class="btn btn-outline-primary espacoEntreBotoes" >Email <i class="fas fa-envelope"></i></button>
        </div>
        <div class="centralizar">
            <button id="deletar" class="btn btn-outline-danger espacoEntreBotoes"> Deletar <i class="fas fa-trash"></i>
            </button>
        </div>
        <hr noshade="">
        <div class="centralizar">
            <button class="btn btn-dropbox" onclick="mudarEstado()">
                Editar Dia Anterior <i id="setinha" class="fas fa-caret-down"></i>
            </button>
        </div>
        <div id="anteriorFiltrosEBotoes">
            <hr noshade="">
            <p style="font-family: Helvetica Neue, Helvetica, Arial;font-size: 14px;"> Produção do dia anterior </p>
            <hr noshade="">
            <div>
                <label class="estiloLabel"> Produto </label>
                <select id="campoProduto0" name="produto" class="estiloSelect classe0">
                    <option value="*">-- selecione --</option>
                </select>
            </div>


            <div class="espacoEntreBotoes">
                <label class="estiloLabel"> Praça </label>
                <select id="campoPraca0" name="praca" id="pracas" class="estiloSelect classe0">
                    <option value="*">-- selecione --</option>
                </select>
            </div>

            <div class="centralizar">
                <button id="editar" class="btn btn-primary "> Editar
                    <i id="setinha" class="fas fa-edit"></i>
                </button>
            </div>

            <hr noshade="">
        </div>

    </div>



    <script>
        document.getElementById('anteriorFiltrosEBotoes').style.display = 'none';

        function mudarEstado() {
            var display = document.getElementById('anteriorFiltrosEBotoes').style.display;
            if (display == "none") {
                document.getElementById('anteriorFiltrosEBotoes').style.display = 'block';
                document.getElementById('setinha').innerHTML = "<i class=\"fas fa-caret-up\"></i>";
            } else {
                document.getElementById('anteriorFiltrosEBotoes').style.display = 'none';
                document.getElementById('setinha').innerHTML = "<i class=\"fas fa-caret-down\"></i>";
            }
        }
    </script>

    <div class="wrapper2 DivLateral2">
        <h1 id="nomeTituloAtual" style="color: whitesmoke">
            Data
        </h1>

        <div id="tabelaAtual" class="table">
            <div class="row header">
                <div class="cell">
                    <input type="checkbox" id="todos1" class="estiloColunaCheck" name="checkBox1">
                </div>

                <div class="cell">
                    Produto
                </div>
                <div class="cell">
                    Praça
                </div>
                <div class="cell">
                    Tipo
                </div>
                <div class="cell">
                    Unidade
                </div>
                <div class="cell">
                    Preço
                </div>
            </div>
        </div>

    </div>

    <script>
        var data = new Date();
        var dia = data.getDate();
        var mes = data.getMonth();
        var ano4 = data.getFullYear();
        var valueData = ano4 + "-" + (mes + 1) + "-" + dia;
        document.getElementById('nomeTituloAtual').textContent = "Editar tabela do dia " + valueData;
        console.log(valueData + "");
        eventoAJAX();
    </script>



@endsection
