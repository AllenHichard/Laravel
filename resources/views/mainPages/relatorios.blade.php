@extends('layouts.header')
@section('header')
<link href="{{ asset('css/menu.css') }}" rel="stylesheet">
<link href="{{ asset('css/relatorios.css') }}" rel="stylesheet">
@stop
@section('content')
@include('components.menu')

<div id="relatorios"> </div>

<script type="text/javascript" src="{{ asset('js/_relatorios_.js') }}"></script>
@endsection
