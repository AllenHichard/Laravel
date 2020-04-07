function salvarLocalizacaoAtual() {
    //https://pt.stackoverflow.com/questions/273897/obter-nome-da-cidade-usando-geolocaliza%C3%A7%C3%A3o-com-redirecionamento
    //https://pt.stackoverflow.com/questions/106003/como-identificar-qual-cidade-o-usu%C3%A1rio-esta

    $(document).ready(function() {
        routes = { "Los Angeles": "http://exemplo.com/LA", "New York": "http://exemplo.com/NY", "Other City": "http://exemplo.com/othercity", "São Paulo": "http://google.com.br/SP" };
        $.ajax({
            url: "https://geoip-db.com/jsonp",
            jsonpCallback: "callback",
            dataType: "jsonp",
            success: function(location) {
                //$('#country').html(location.country_name);
                //$('#state').html(location.state);
                //$('#city').html(location.city);
                //$('#latitude').html(location.latitude);
                //$('#longitude').html(location.longitude);
                //$('#ip').html(location.IPv4);
                if (routes[location.city]) {
                    alert('tem sua cidade no array! => link salvo no array para redirecionar: ' + routes[location.city]);
                    window.location.href = routes[location.city];
                }
                $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
                $.ajax({
                    type: 'GET',
                    url: '/geoLocalizacao',
                    data: {
                        lat: location.latitude,
                        long: location.longitude,
                        pais: location.country_name,
                        estado: location.state,
                        cidade: location.city,
                        ip: location.IPv4
                    },
                    success: function(data) {
                        exibirLocalizacoes();
                    },
                    error: function(error) {
                        alert("erro AJAX");

                    }
                });
            }
        });

    });
}

function exibirLocalizacoes() {
    var markerCluster = L.markerClusterGroup();
    var layer1 = new L.LayerGroup();

    //$(document).ready(function() {
    console.log("ok")
    $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
    $.ajax({
        type: 'GET',
        url: '/getLatLong',
        success: function(data) {
            for (var i = 0; i < data.localizacao.length; i++) {
                var exibicao = "País - " + data.localizacao[i].pais + "<br> Estado - " + data.localizacao[i].estado + "<br> Cidade - " + data.localizacao[i].cidade +
                    "<br> Latitude - " + data.localizacao[i].lat + "<br> Longitude - " + data.localizacao[i].long + "<br> IP - " + data.localizacao[i].ip;
                lat.push(data.localizacao[i].lat);
                long.push(data.localizacao[i].long);
                L.marker([data.localizacao[i].lat, data.localizacao[i].long]).bindPopup(exibicao).addTo(layer1);
            }
            markerCluster.addLayer(layer1);

            var mbAttr = 'M&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors ',
                mbUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

            streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });
            var leafletClusteringMap = L.map('map', {
                center: [-12.2736754, -38.9563458], // feira de Santana
                //center: [49.886, 8.671],
                //center: [lat[3], long[3]],
                zoom: 13,
                layers: [streets, markerCluster]
            });

            leafletClusteringMap.on('click', function(e) {
                var coord = e.latlng;
                var lat = coord.lat;
                var lng = coord.lng;
                console.log(lat + ", " + lng);
            });
        },
        error: function(error) {
            alert("erro AJAX");
        }
    });
    //});
}


function pegarDadosUsuario() {
    navigator.geolocation.getCurrentPosition(function(posicao) {
        var url = "http://nominatim.openstreetmap.org/reverse?lat=" + posicao.coords.latitude + "&lon=" + posicao.coords.longitude + "&format=json&json_callback=preencherDados";
        var script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
    });
}

function preencherDados(dados) {
    console.log(dados.address.country);
    console.log(dados.address.state);
    console.log(dados.address.city);
    console.log(dados.lat);
    console.log(dados.lon)
    $(document).ready(function() {
        $.ajax({
            type: 'GET',
            url: '/geoLocalizacao',
            data: {
                lat: dados.lat,
                long: dados.lon,
                pais: dados.address.country,
                estado: dados.address.state,
                cidade: dados.address.city,
                ip: "localhost"
            },
            success: function(data) {
                exibirLocalizacoes();
            },
            error: function(error) {
                alert("erro AJAX");

            }
        });
    });

}


function pegarDadosBrowser() {
    var lat = 0;
    var long = 0;

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    function showPosition(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lat);
        console.log(long);
        /*$(document).ready(function() {
        $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
        $.ajax({
            type: 'GET',
            url: '/geoLocalizacao',
            data: {lat: lat, long: long},
            success: function(data) {
                alert(data.salvo)
            },
            error: function(error) {
                alert("erro AJAX");
        }
        });
        */
        //});

    }
    //http://www.linhadecodigo.com.br/artigo/3653/usando-geolocalizacao-com-html5.aspx
    getLocation();
}