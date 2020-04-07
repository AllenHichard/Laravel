@extends('layouts.header') @section('header')

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script>
<link href="{{ asset('css/general.css') }}" rel="stylesheet"> @stop @section('content')
<div id="map"></div>
<img id="img" src="{{ URL::to('/assets/uefs.png') }}">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.3/js/bootstrap-select.min.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.js" charset="utf-8"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/exif-js/2.3.0/exif.min.js"></script>

<script>
    var center = [-15, -44];
    var map = L.map('map').setView([-13, -41.8953], 7);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(map);
    var imageUrl = ['{{ URL::to('/assets/algodao.png ') }}', '{{ URL::to('/assets/paçoca.png ') }}', '{{ URL::to('/assets/montanha.png ') }}']
    var imageBounds = [center, [-13, -41.8953]];
    img = document.getElementById("img");
    var image = L.imageOverlay(imageUrl[1], imageBounds, {
        interactive: true,
        opacity: 0.5
    }).addTo(map);
    var image1 = L.imageOverlay(imageUrl[2], [
        [-13, -44],
        [-11, -46]
    ], {
        interactive: true,
        opacity: 0.5
    }).addTo(map);
    var image2 = L.imageOverlay(imageUrl[0], [
        [-13, -39],
        [-11, -41]
    ], {
        interactive: true,
        opacity: 0.5
    }).addTo(map);
    image.on({
        mouseover: function(e) {
            e.target.setStyle({
                weight: 5,
                color: "#666",
                opacity: 1
            });
        },
        mouseout: function(e) {
            e.target.setStyle({
                color: "#666",
                opacity: 0.5
            });
        }
    });
    image2.on({
        mouseover: function(e) {
            e.target.setStyle({
                weight: 5,
                color: "#666",
                opacity: 1
            });
        },
        mouseout: function(e) {
            e.target.setStyle({
                color: "#666",
                opacity: 0.5
            });
        }
    });
    image1.on({
        mouseover: function(e) {
            e.target.setStyle({
                weight: 5,
                color: "#666",
                opacity: 1
            });
        },
        mouseout: function(e) {
            e.target.setStyle({
                color: "#666",
                opacity: 0.5
            });
        }
    });
    console.log(image);
</script>



@endsection
