@extends('layouts.mapa')

@section('card')
    @include('components.filtroMapas', [
      'page' => 'terrID',
      'typeSelectLink' => ['/TerrIDPec','/TerrIDAgri','/TerrIDSilv']
    ])
@stop

@section('specificScript')
<script>
  var currentYear = 0;
  var dir = '{{ asset('assets/') }}'; 
  var produtos = @json($tipoProdutos);
  var nomevar = @json($variaveis);
  var geojson = <?php echo($geoJSON); ?>;
  var control = @json($control);
  var unidadeTerritorial = 'terrID';
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  let destroy = false;
  let first = false;
  var terr;
</script>
<script type="text/javascript" src="{{ URL::asset('js/terrID.js') }}"></script>
@endsection
