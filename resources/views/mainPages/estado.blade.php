@extends('layouts.mapa')

@section('card')
  @include('components.filtroMapas', [
    'page' => 'estado',
    'typeSelectLink' => ['/pecuariaEstado','/agricultEstado','/silvicultEstado']
  ])
@stop

@section('specificScript')
<script>
  //Variáveis Globais
  var currentYear = 0;
  var dir = '{{ asset('assets/') }}';
  var produtos = @json($tipoProdutos);
  var nomevar = @json($variaveis);
  var geojson = <?php echo($geoJSON); ?>;
  var control = @json($control);
  var unidadeTerritorial = 'municipio';
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  let destroy = false;
  let first = false;
  var terr;
</script>
<script type="text/javascript" src="{{ URL::asset('js/estado.js') }}"></script>
@stop
