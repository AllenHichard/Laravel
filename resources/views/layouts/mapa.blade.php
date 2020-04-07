@extends('layouts.header')
@section('header')

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script>

<link href="{{ asset('css/mapa.css') }}" rel="stylesheet">

@stop

@section('content')

<div id="card">
    <div class="title-card">
        <a href="/"> <i class="fa fa-fw fa-seedling"></i> PORTAL DO AGRONEGÓCIO </a><button class="close" onclick="closeMenu()"> <i class="fas fa-times"></i></button>
    </div>
    <hr>
    @yield('card')
</div>


<div id="map" class="toBlur"></div>

<!-- Button actions -->
<div id="act-btn" class="toBlur">
    <button class="showFiltercompass2" onclick="showChart()">
        <span> <i class="fas fa-chart-line"></i> <b>Gráfico</b></span>
    </button>
    <button class="showFilter3" onclick="showRanking()">
        <span> <i class="fas fa-crown"></i> <b>Ranking</b></span>
    </button>
    <button class="showFilter4 pausado" onclick="pausePlay(this)" id="timeline">
        <span> <i class="fas fa-play"></i> <b>Play</b></span>
    </button>
</div>

<div id="info">
</div>

<div id="legend" class="toBlur">
    <div></div>
</div>

<div id="ranking" class="toBlur">
    <div class="cardRank">
        <div id="rankingheader" style="text-align:center" class="box-header">
            <b class="box-title">Ranking</b>
        </div>
        <div class="scrollbox">
            <!-- /.box-header -->
            <div class="box-body no-padding">
                <table class="table table-striped">
                    <tbody id="rank">
                    </tbody>
                </table>
            </div>
            <!-- /.box-body -->
        </div>
    </div>
</div>
<hr>

<div id="chart" class="toBlur"></div>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>

@yield('specificScript')

<script type="text/javascript" src="{{ asset('js/_mapa_.js') }}"></script>

@endsection
