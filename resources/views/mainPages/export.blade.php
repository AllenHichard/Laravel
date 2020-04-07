@extends('layouts.mapa')

@section('card')
  @include('components.filtroMapas', [
    'page' => 'exterior',
    'typeSelectLink' => ['/export','/import']
  ])
@stop

@section('specificScript')
<hr>
<div id="PriceChart" class="toBlur"> </div>
<script>
    var currentYear = 0;
    var products = @json($secrom);
    console.log(products);
    var control = @json($control);
    var unidadeTerritorial = 'exterior';
    var geojson = <?php echo($geoJSON); ?>;
    let first = false;
    var Layer_503 = new Array();
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
</script>
<script type="text/javascript" src="{{ URL::asset('js/exports.js') }}"></script>
@endsection
