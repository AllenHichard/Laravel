@extends('layouts.header')
@section('header')
<link href="{{ asset('css/dailyPage.css') }}" rel="stylesheet">
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
@stop
@section('content')

<form action="" class="form">
    <h4> Escolha o intervalo</h4>
    <input type="radio" name="gender" value="male" onclick="charts('dayOne')"> 30 Dias
    <input type="radio" name="gender" value="female" onclick="charts('dayTwo')"> 2 Meses
    <input type="radio" name="gender" value="other" onclick="charts('monthOne')"> 6 Meses
    <input type="radio" name="gender" value="other" onclick="charts('monthTwo')"> 1 ano
</form>

<div id="chart"> </div>
  <ul class="pager">
    <li class="previous"><button >Previous</button></li>
    <li class="next"><button >Next</button></li>
  </ul>
<div class="row">
  <div class="column" id="table1">
</div>
  <div class="column" id="table2">
  </div>
  <div class="column" id="table3">
  </div>
</div>






<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.3/js/bootstrap-select.min.js" charset="utf-8"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="{{ URL::asset('js/daily.js') }}"></script>
<script>

</script>
@stop
