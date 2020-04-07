@extends('layouts.header')
@section('header')

    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="{{ asset('css/cadastro.css') }}" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="{{ URL::asset('js/cadastroTable.js') }}"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}"/> <!-- faltava essa linha -->


@stop
@section('content')




<script>

    var MatrizGeral;
    $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
    $.ajax({
        type: 'GET',
        url: '/carregarUltimaCotacao',
        success: function(data) {
            this.data = data;
            MatrizGeral = converteJsonMatriz(data);
            //fnExcelReport();

            //ExportToExcel(MatrizGeral[0][0], "tabela")
        },
        error: function(error) {
            alert("erro AJAX");
        }
    });

    function fnExcelReport(){


    }

    $(document).ready(function() {

        //var divXLS = document.createElement('div');
        //var tableXLS = document.createElement('table');
        //divXLS.id = "dvData";
        //tableXLS.id = "tabelaXLS";
        //tableXLS.setAttribute('border', '1');
        //divXLS.appendChild(tableXLS);
        //construirTabela(MatrizGeral, "tabelaXLS");


    });







    function ExportToExcel(data, mytblId){
       var htmltable= document.getElementById(mytblId);
       var html = htmltable.outerHTML;
       window.title = "Cotação-"+data+".xls";
       window.open('data:application/vnd.ms-excel,' + escape(html)) ;
    }

</script>

@endsection
