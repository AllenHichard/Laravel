@extends('layouts.header')
@section('header')

    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link href="{{ asset('css/cadastro.css') }}" rel="stylesheet">
    <link href="{{ asset('css/localizacao.css') }}" rel="stylesheet">
    <script type="text/javascript" src="{{ URL::asset('js/localizacao.js') }}"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}"/> <!-- faltava essa linha -->
    <link href='https://leaflet.github.io/Leaflet.toolbar/node_modules/leaflet/dist/leaflet.css' rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2/leaflet.js">
    </script>
    <script src="https://cdn.jsdelivr.net/leaflet.markercluster/1.0.0-beta.2.0/leaflet.markercluster-src.js">
    </script>
    <script src="https://cdn.jsdelivr.net/leaflet.markercluster/1.0.0-beta.2.0/leaflet.markercluster.js">
    </script>
    


@stop
@section('content')

    <!--<div style="margin-top: 60px">Country: <span id="country"></span>
    <div>State: <span id="state"></span>
    <div>City: <span id="city"></span>
    <div>Latitude: <span id="latitude"></span>
    <div>Longitude: <span id="longitude"></span>
    <div>IP: <span id="ip"></span>-->
    <div style="margin-top: 60px" id="map"></div>
    
    <script>
        var lat = [];
        var long = [];
        //salvarLocalizacaoAtual();
        pegarDadosUsuario();
    </script>

   
    
    

@endsection
