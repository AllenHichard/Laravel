$(document).ready(function() {
    firstLoad = true;
    chart(0, function() {
        slider.rangeLabelArray[slider.rangeLabelArray.length - 1].click();
    });
    autocomplete(document.getElementById("myInput"), featureNames);
});

var features = new Array();
var featureNames = new Array();
var prodsh2;
var prodsh4;
var prodsh6
var finalProd;

function produtoM(x, y) {
    var ret = [];
    for (var i = 0; i < x.length; i++)
        ret.push(x[i] * y[i]);
    return ret;
}

function quadrados(x) {
    var ret = [];
    for (var i = 0; i < x.length; i++)
        ret.push(x[i] * x[i]);
    return ret;
}

function somatorio(x) {
    var ret = 0;
    for (var i = 0; i < x.length; i++)
        ret += x[i];
    return ret;
}

function media(x) {
    return somatorio(x) / x.length;
}

function regressao(results) {
    x = [];
    y = [];
    for (i = 0; i < results.length; i++) {
        x.push(parseFloat(results[i].co_ano));
        y.push(parseFloat(results[i].valor));
    }
    result = [];
    var m = somatorio(produtoM(x, y)) - somatorio(x) * somatorio(y) / x.length;
    m /= somatorio(quadrados(x)) - somatorio(x) * somatorio(x) / x.length;
    var b = media(y) - m * media(x);
    for (var i = 0; i < x.length; i++) {
        result.push(m * x[i] + b);
    }
    return result;
}


function pausePlay() {
    if (!play) {
        play = true;
        document.getElementById("timeline").innerHTML;
    } else if (play) {
        document.getElementById("timeline").innerHTML;
        play = false;
    }
}

function autoplay() {
    if (play) {
        if (parseInt(slider.value) < parseInt(slider.max)) {
            slider.value = parseInt(slider.value) + 1;
            colormap(slider.value);
            ranking(slider.value);
            output.innerHTML = slider.value;
        }
    }
}

function update() {
    firstLoad = false;
    ranking(currentYear);
    colormap(currentYear);
    showChartExport(0);
}

function slide() {
    play = false;
    output.innerHTML = slider.value;
    colormap(slider.value);
    ranking(slider.value);
}

function colormap(year) {
    var nameProd;
    var nameVar;
    secrom = document.getElementById("secrom").value;
    sh2 = document.getElementById("sh2").value;
    sh4 = document.getElementById("sh4").value;
    sh6 = document.getElementById("sh6").value;
    product = document.getElementById("nameProducts").value;
    variable = document.getElementById("nomeVariavel").value;
    if (product > 0 && sh6 > 0 && sh4 > 0 && sh2 > 0) {
        nameProd = document.getElementById("nameProducts").options[document.getElementById("nameProducts").selectedIndex].text;
    } else if (sh6 > 0 && sh4 > 0 && sh2 > 0) {
        nameProd = document.getElementById("sh6").options[document.getElementById("sh6").selectedIndex].text;
    } else if (sh4 > 0 && sh2 > 0) {
        nameProd = document.getElementById("sh4").options[document.getElementById("sh4").selectedIndex].text;
    } else if (sh2 > 0) {
        nameProd = document.getElementById("sh2").options[document.getElementById("sh2").selectedIndex].text;
    } else if (secrom > 0) {
        nameProd = document.getElementById("secrom").options[document.getElementById("secrom").selectedIndex].text;
    }

    if (firstLoad) {
        nameVar = 'Quilograma';
        nameProd = 'Animais vivos e produtos do Reino Animal';
        secrom = 'I';
        variable = 'kg_liquido';
    }
    if (variable == 'kg_liquido') {
        nameVar = 'Quilograma';
    } else {
        nameVar = 'Valor';
    }
    $.ajax({
        type: "GET",
        url: "/getExports",
        data: "_token = <?php echo csrf_token() ?>",
        data: {
            secrom: secrom,
            sh2: sh2,
            sh4: sh4,
            sh6: sh6,
            product: product,
            idVar: variable,
            year: year
        },
        success: function(data) {
            console.log(data);
            var expImp = data.exports;
            if (control == 'export') {
                expImp = data.exports;
            } else if (control == 'import') {
                expImp = data.imports;
            } else if (control == 'balance') {

            }

            var intervals;

            if (expImp.length >= 8) {
                splitValue = 8;
                let interval = (expImp[expImp.length - 1].valor - expImp[0].valor) / 8;
                intervals = [];
                for (i = 0; i < 9; i++) {
                    intervals[i] = (interval * i) + parseFloat(expImp[0].valor);
                }
            } else if (expImp.length > 1 && expImp.length < 8) {
                let interval = (expImp[expImp.length - 1].valor - expImp[0].valor) / expImp.length;
                interval = Math.round(interval);
                intervals = [];
                intervals[0] = expImp[0].valor;
                for (i = 1; i < expImp.length; i++) {
                    intervals[i] = interval * i
                }
                // splitValue = expImp.length;
            } else if (expImp.length == 1) {
                interval = expImp[0];
                intervals = [];
                intervals[0] = 1;
                intervals[1] = interval.valor;
            }
            var colors = [
                "#FFEDA0",
                "#FED976",
                "#FEB24C",
                "#FD8D3C",
                "#FC4E2A",
                "#E31A1C",
                "#BD0026",
                "#800026"
            ];

            var div = document.getElementById("legend");

            div.innerHTML = "<p>" + nameVar + " / " + currentYear + " <br> " + nameProd + "</p>"
            var labels = [];
            // loop through our density intervals and generate a label with a colored square for each interval
            if (expImp.length > 1) {
                div.innerHTML +=
                    '<i style="background:grey"></i> Sem produção registrada <br>';
                for (var i = 0; i < intervals.length - 1; i++) {
                    div.innerHTML +=
                        '<i style="background:' +
                        getColor(intervals[i]) +
                        '"></i> ' +
                        Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(intervals[i]) +
                        (Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(intervals[i + 1]) ?
                            " &ndash; " +
                            Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(intervals[i + 1]) +
                            "<br>" :
                            "+");
                }
            }
            var info = L.control();
            info.onAdd = function(map) {
                this._div = L.DomUtil.create("div", "info toBlur"); // create a div with a class "info"
                return this._div;
            };

            function getColor(d) {
                let ngg = intervals.map(e => parseFloat(e));
                ngg.push(Number.POSITIVE_INFINITY);
                for (let i = 0; i < ngg.length - 1; i++) {
                    if (d >= ngg[i] && d <= ngg[i + 1]) return colors[i];
                }
            }


            function style(feature) {
                if (findValueInArray(feature.properties.ISO3, expImp) > 0) {
                    return {
                        fillColor: getColor(findValueInArray(feature.properties.ISO3, expImp)),
                        weight: 2,
                        opacity: 1,
                        color: "white",
                        dashArray: "3",
                        fillOpacity: 0.7
                    };
                } else {
                    return {
                        fillColor: "grey",
                        weight: 2,
                        opacity: 1,
                        color: "white",
                        dashArray: "3",
                        fillOpacity: 1
                    };
                }


            }

            function resetNoDataHighlight(e) {
                var layer = e.target;
                info.update(layer.feature.properties);
                layer.setStyle({
                    fillColor: "grey",
                    weight: 2,
                    opacity: 1,
                    color: "white",
                    dashArray: "3",
                    fillOpacity: 1
                });
            }

            function highlightFeature(e) {
                var layer = e.target;
                info.update(layer.feature.properties);
                layer.setStyle({
                    weight: 5,
                    color: "#666",
                    fillOpacity: 1
                });

                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                }
            }

            function resetHighlight(e) {
                var layer = e.target;
                info.update(layer.feature.properties);
                layer.setStyle({
                    weight: 2,
                    opacity: 1,
                    color: "white",
                    dashArray: "3",
                    fillOpacity: 0.7
                });
            }

            function zoomToFeature(e) {
                map.fitBounds(e.target.getBounds());
                var layer = e.target;
                id = layer.feature.properties.ISO3;
                vector = expImp;
                showChartExport(
                    layer.feature.properties.ISO3,
                    layer.feature.properties.NAME
                );
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(
                        "País: " +
                        layer.feature.properties.NAME +
                        "</b><br />" +
                        "Produção: " +
                        Intl.NumberFormat('pt-BR').format(
                            findValueInArray(id, vector)
                        )
                    )
                    .openOn(map);
                layer.setStyle({
                    weight: 5,
                    color: "#666",
                    dashArray: "",
                    fillOpacity: 1
                });
            }

            function onEachFeature(feature, layer) {
                if (findValueInArray(feature.properties.ISO3, expImp) > 0) {
                    if (features.length < expImp.length) {
                        features.push(layer);
                        featureNames.push(feature.properties.NAME)
                    }
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: resetHighlight,
                        click: zoomToFeature
                    });
                } else {
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: resetNoDataHighlight,
                        click: zoomToFeature
                    });
                }
            }
            if (first) {
                myLayer.clearLayers();
            }


            info.update = function(props) {

                document.getElementById("info").innerHTML =
                    (props ?
                        "<i>" +
                        props.NAME +
                        "</i><br />" +
                        Intl.NumberFormat('pt-BR').format(
                            findValueInArray(props.ISO3, expImp)
                        ) +
                        "</b><br />" +
                        nameProd +
                        " / " +
                        nameVar :
                        "Passe o mouse em um estado");
            };
            info.addTo(map);
            myLayer = L.geoJSON(geojson, {
                onEachFeature: onEachFeature,
                style: style
            }).addTo(map);
            first = true;
        },
        error: function(error) {
            console.log(error);
            alert("Erro no Ajax !");
        }
    });
}

function zoomToFeatureOnSearch(e) {
    if (firstLoad) {
        ano = 0;
    } else {
        ano = parseInt(slider.value);
    }

    map.fitBounds(e.getBounds());
    var layer = e;
    id = layer.feature.properties.id;
    showChartExport(
        layer.feature.properties.ISO3,
        layer.feature.properties.NAME
    );



}


function chart(country, cb) {
    var nameProd;
    var nameVar;
    var years = new Array();
    var values = new Array();
    secrom = document.getElementById("secrom").value;
    sh2 = document.getElementById("sh2").value;
    sh4 = document.getElementById("sh4").value;
    sh6 = document.getElementById("sh6").value;
    product = document.getElementById("nameProducts").value;
    variable = document.getElementById("nomeVariavel").value;
    nameVar = document.getElementById("nomeVariavel").options[document.getElementById("nomeVariavel").selectedIndex].text;
    if (product > 0 && sh6 > 0 && sh4 > 0 && sh2 > 0) {
        nameProd = document.getElementById("nameProducts").options[document.getElementById("nameProducts").selectedIndex].text;
    } else if (sh6 > 0 && sh4 > 0 && sh2 > 0) {
        nameProd = document.getElementById("sh6").options[document.getElementById("sh6").selectedIndex].text;
    } else if (sh4 > 0 && sh2 > 0) {
        nameProd = document.getElementById("sh4").options[document.getElementById("sh4").selectedIndex].text;
    } else if (sh2 > 0) {
        nameProd = document.getElementById("sh2").options[document.getElementById("sh2").selectedIndex].text;
    } else if (secrom > 0) {
        nameProd = document.getElementById("secrom").options[document.getElementById("secrom").selectedIndex].text;
    }

    if (firstLoad) {
        secrom = 'I';
        variable = 'kg_liquido';
        nameProd = 'Animais vivos e produtos do Reino Animal';
        nameVar = 'Quilograma';
    }
    $.ajax({
        type: "GET",
        url: "/getChartExp",
        data: "_token = <?php echo csrf_token() ?>",
        data: {
            secrom: secrom,
            sh2: sh2,
            sh4: sh4,
            sh6: sh6,
            product: product,
            idVar: variable,
            country: country
        },
        success: function(data) {
            var chartData;
            if (control == 'export') {
                chartData = data.chartDataExport;
            } else if (control == 'import') {
                chartData = data.chartDataImport;
            } else if (control == 'balance') {

            }
            if (chartData.length > 0) {
                var price = [];
                var kg = [];
                chartData.forEach(element => {
                    years.push(element.co_ano);
                    values.push(element.valor);
                });
                if (typeof slider != 'undefined') slider.updateControl(years);
                lastYear = years[years.length - 1];
                firstYear = years[0];
                document.getElementById("myRange").max = lastYear;
                document.getElementById("myRange").min = firstYear;
                document.getElementById("demo").innerHTML = firstYear;
                var dataCol = ['Ano', 'Valor', 'Tendência'];
                var dataArray = [dataCol];
                var linearVetor = regressao(chartData);
                var valores = [];
                var datas = [];
                for (i = 0; i < chartData.length; i++) {
                    aux = [];
                    aux.push((chartData[i].co_ano));
                    aux.push(parseInt(chartData[i].valor));
                    // valores.push(parseFloat(chartData[i].valor));
                    // datas.push(parseFloat(chartData[i].co_ano));
                    if (variable == 'kg_liquido') {
                        kg.push(chartData[i].valor)
                    } else {
                        price.push(chartData[i].valor)
                    }
                    aux.push(linearVetor[i] < 0 ? 0 : linearVetor[i]);
                    dataArray.push(aux);
                }
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);
                //https://cursos.alura.com.br/forum/topico-adicionar-ou-retirar-uma-grid-nos-graficos-14085
                function drawChart() {
                    var data = new google.visualization.arrayToDataTable(dataArray);
                    //default size is 1/3 of the screen
                    let size = {
                            width: window.screen.width / 3,
                            height: window.screen.height / 3,
                        }
                        //set max size
                    size.width = size.width > 900 ? 900 : size.width;
                    size.height = size.height > 420 ? 420 : size.height;

                    let vAxis = (nameVar == 'Quilograma' ? 'Quilograma [Kg]' : 'Valor [U$]');

                    var options = {
                        chartArea: { width: '100%', height: '100%', left: '20%', top: "20%", right: '22%', bottom: "20%" },
                        ...size,
                        title: nameProd,
                        legend: { position: 'right' },
                        //bar: { groupWidth: "100%" },

                        //legend: { position: 'bottom', maxLines: 3 },
                        pointSize: 3,
                        series: {
                            0: {
                              color: 'black',
                              pointSize: 5,
                              lineWidth: 3
                            },
                            1: {
                              color: 'red',
                              pointSize: 0,
                              lineWidth: 2
                            },
                        },
                        hAxis: {
                            // ticks: calcularEixoX(datas),
                            title: 'Anos',
                            format: ' ',
                            gridlines: {
                                color: 'none'
                            },
                            //direction:-1,
                            slantedText: true,
                            slantedTextAngle: 45

                        },
                        vAxis: {
                            // ticks: calcularEixoY(valores),
                            title: vAxis,

                        },
                        titleTextStyle: {
                            fontName: 'Poppins',
                            fontSize: 16,
                            bold: true,
                            //italic: true,
                            // The color of the text.
                            //color: '#871b47',
                            // The color of the text outline.
                            //auraColor: '#d799ae',
                            // The transparency of the text.
                            //opacity: 0.8
                        }
                    };

                    var chart = new google.visualization.LineChart(document.getElementById('chart'));

                    chart.draw(data, options);
                    if (variable == 'kg_liquido') {
                        variable = 'vl_fob';
                    } else if (variable == 'vl_fob') {
                        variable = 'kg_liquido';
                    }
                    $.ajax({
                        type: "GET",
                        url: "/getChartExp",
                        data: "_token = <?php echo csrf_token() ?>",
                        data: {
                            secrom: secrom,
                            sh2: sh2,
                            sh4: sh4,
                            sh6: sh6,
                            product: product,
                            idVar: variable,
                            country: country
                        },
                        success: function(data) {
                            var chartPriceData;
                            if (control == 'export') {
                                chartPriceData = data.chartDataExport;
                            } else if (control == 'import') {
                                chartPriceData = data.chartDataImport;
                            } else if (control == 'balance') {

                            }
                            for (i = 0; i < chartData.length; i++) {
                                if (variable == 'kg_liquido') {
                                    kg.push(chartPriceData[i].valor)
                                } else if (variable == 'vl_fob') {
                                    price.push(chartPriceData[i].valor)
                                }
                            }
                            var dataCol = ['Ano', 'Valor', 'Tendência'];
                            var dataArray = [dataCol];
                            let relacao = [];
                            for (let pos = 0; pos < price.length; pos++) {
                                relacao.push({
                                    co_ano: parseInt(chartPriceData[pos].co_ano),
                                    valor: parseFloat(price[pos]) / parseFloat(kg[pos]),
                                });
                            }
                            var linearVetor = regressao(relacao);
                            valores2 = [];
                            datas2 = [];
                            for (i = 0; i < chartPriceData.length; i++) {
                                aux = [];
                                valores2.push(parseFloat(price[i] / kg[i]));
                                datas2.push(parseFloat(chartPriceData[i].co_ano));
                                aux.push((chartPriceData[i].co_ano));
                                aux.push(parseFloat(price[i] / kg[i]));
                                aux.push(linearVetor[i] < 0 ? 0 : linearVetor[i]);
                                dataArray.push(aux);
                            }
                            google.charts.load('current', { 'packages': ['corechart'] });
                            google.charts.setOnLoadCallback(drawChart);

                            function drawChart() {
                                var data = new google.visualization.arrayToDataTable(dataArray);
                                //default size is 1/3 of the screen
                                let size = {
                                        width: window.screen.width / 3,
                                        height: window.screen.height / 3,
                                    }
                                    //set max size
                                size.width = size.width > 900 ? 900 : size.width;
                                size.height = size.height > 420 ? 420 : size.height;

                                var options = {
                                    chartArea: { width: '100%', height: '100%', left: '20%', top: "20%", right: '22%', bottom: "20%" },
                                    ...size,

                                    title: nameProd,
                                    legend: { position: 'right' },
                                    pointSize: 3,
                                    series: {
                                        0: {
                                          color: 'black',
                                          pointSize: 5,
                                          lineWidth: 3
                                        },
                                        1: {
                                          color: 'red',
                                          pointSize: 0,
                                          lineWidth: 2
                                        },
                                    },
                                    hAxis: {
                                        // ticks: calcularEixoX(datas2),
                                        title: 'Anos',
                                        format: ' ',
                                        gridlines: {
                                            color: 'none'
                                        },
                                        slantedText: true,
                                        slantedTextAngle: 45
                                    },
                                    vAxis: {

                                        // ticks: calcularEixoY(valores2),
                                        title: 'Preço [U$] / Peso [Kg]',

                                    },
                                    titleTextStyle: {
                                        fontName: 'Poppins',
                                        fontSize: 16,
                                        bold: true,
                                        //italic: true,
                                        // The color of the text.
                                        //color: '#871b47',
                                        // The color of the text outline.
                                        //auraColor: '#d799ae',
                                        // The transparency of the text.
                                        //opacity: 0.8
                                    },

                                };

                                var chart = new google.visualization.LineChart(document.getElementById('PriceChart'));

                                chart.draw(data, options);
                            }
                            cb();
                        },
                        error: function(error) {
                            console.log(error);
                            alert("Erro no Ajax !");
                        }
                    });
                }
            } else {
                alert("Combinação inválida");
            }

        },
        error: function(error) {
            console.log(error);
            alert("Erro no Ajax !");
        }
    });
}


function ranking(year) {
    var nameProd;
    var nameVar;
    secrom = document.getElementById("secrom").value;
    sh2 = document.getElementById("sh2").value;
    sh4 = document.getElementById("sh4").value;
    sh6 = document.getElementById("sh6").value;
    product = document.getElementById("nameProducts").value;
    variable = document.getElementById("nomeVariavel").value;
    nameVar = document.getElementById("nomeVariavel").options[document.getElementById("nomeVariavel").selectedIndex].text;
    if (product > 0 && sh6 > 0 && sh4 > 0 && sh2 > 0) {
        nameProd = document.getElementById("nameProducts").options[document.getElementById("nameProducts").selectedIndex].text;
    } else if (sh6 > 0 && sh4 > 0 && sh2 > 0) {
        nameProd = document.getElementById("sh6").options[document.getElementById("sh6").selectedIndex].text;
    } else if (sh4 > 0 && sh2 > 0) {
        nameProd = document.getElementById("sh4").options[document.getElementById("sh4").selectedIndex].text;
    } else if (sh2 > 0) {
        nameProd = document.getElementById("sh2").options[document.getElementById("sh2").selectedIndex].text;
    } else if (secrom > 0) {
        nameProd = document.getElementById("secrom").options[document.getElementById("secrom").selectedIndex].text;
    }
    document.getElementById("rank").innerHTML = "";
    secrom = document.getElementById("secrom").value;
    sh2 = document.getElementById("sh2").value;
    sh4 = document.getElementById("sh4").value;
    sh6 = document.getElementById("sh6").value;
    product = document.getElementById("nameProducts").value;
    variable = document.getElementById("nomeVariavel").value;
    if (firstLoad) {
        nameVar = 'Quilograma';
        nameProd = 'Animais vivos e produtos do Reino Animal';
        secrom = 'I';
        variable = 'kg_liquido';
    }
    $.ajax({
        type: "GET",
        url: "/getRankExp",
        data: "_token = <?php echo csrf_token() ?>",
        data: {
            secrom: secrom,
            sh2: sh2,
            sh4: sh4,
            sh6: sh6,
            product: product,
            idVar: variable,
            year: year
        },
        success: function(data) {
            var ranking;
            if (control == 'export') {
                ranking = data.rankingExports;
            } else if (control == 'import') {
                ranking = data.rankingImports;
            } else if (control == 'balance') {

            }
            var rankTitle = document.getElementById('rankingheader').innerHTML = "<b>Ranking - " + nameProd + ' / ' + currentYear + '</b>';
            var condicaoPorc = document.getElementById("nameProducts").value;
            var corpo_tabela = document.querySelector("tbody");
            var linha = document.createElement("tr");
            var numero_posicao = document.createElement("th");
            var nome_municipio = document.createElement("th");
            var producao_total = document.createElement("th");
            var producao_valor = document.createElement("th");
            numero_posicao.innerHTML = '<th style="width: 10px">#</th>';
            nome_municipio.innerHTML = "<th>País</th>";
            producao_total.innerHTML =
                '<th class="progress progress-xs">Produção</th>';
            producao_valor.innerHTML = '<th style="width: 10px">Valor</th>';
            linha.appendChild(numero_posicao);
            linha.appendChild(nome_municipio);
            linha.appendChild(producao_total);
            linha.appendChild(producao_valor);
            if (condicaoPorc == 3 || condicaoPorc == 4) {
                var producao_porc = document.createElement("th");
                producao_porc.innerHTML =
                    '<th style="width: 10px">Porcentagem</th>';
                linha.appendChild(producao_porc);
            }
            corpo_tabela.appendChild(linha);
            var total = 0;
            ranking.forEach(element => {
                total = total + parseFloat(element.valor);
            })
            var condicaoPorc = document.getElementById("nameProducts").value;
            var tam = ranking.length;
            var corpo_tabela = document.querySelector("tbody");
            for (var i = 0; i < tam; i++) {
                var porc = (ranking[i].valor / total) * 100;
                var linha = document.createElement("tr");
                var numero_posicao = document.createElement("td");
                var nome_municipio = document.createElement("td");
                var producao_total = document.createElement("td");
                var producao_valor = document.createElement("td");
                var div1 = document.createElement("div");
                div1.className = "progress progress-xs";
                var div2 = document.createElement("div");
                div2.className = "progress-bar progress-bar-red";
                div2.style = "width: " + porc + "%";
                div1.appendChild(div2);
                producao_total.appendChild(div1);
                div2.style = "width: " + porc + "%; text-align: center;";
                div2.innerHTML = "<b>" + porc.toFixed(2) + "% </b>";
                producao_valor.innerHTML =
                    '<span class="badge bg-red">' +
                    Intl.NumberFormat('pt-BR').format(ranking[i].valor) +
                    "</span>";
                var texto_posicao = document.createTextNode(i + 1);
                var texto_municipio = document.createTextNode(ranking[i].name);
                var texto_producao = document.createTextNode("");
                numero_posicao.appendChild(texto_posicao);
                nome_municipio.appendChild(texto_municipio);
                producao_total.appendChild(texto_producao);
                linha.appendChild(numero_posicao);
                linha.appendChild(nome_municipio);
                linha.appendChild(producao_total);
                linha.appendChild(producao_valor);
                if (condicaoPorc == 3 || condicaoPorc == 4) {
                    var producao_porc = document.createElement("td");
                    producao_porc.innerHTML =
                        '<span class="badge bg-red">' + porc + "%" + "</span>";
                    linha.appendChild(producao_porc);
                }
                corpo_tabela.appendChild(linha);
            }
            return ranking;
        },
        error: function(error) {
            console.log(error);
            alert("Erro no Ajax !");
        }
    });
}

function findValueInArray(abv, arr) {
    for (var i = 0; i < arr.length; i++) {
        var ABV;
        ABV = arr[i].iso3;
        if (ABV === abv) {
            return arr[i].valor;
        }
    }
    return 0;
}

function findValueInArrayByName(name, arr) {
    for (var i = 0; i < arr.length; i++) {
        var name;
        name = arr[i].no_pais;
        if (name === name) {
            return arr[i].valor;
        }
    }
    return 0;
}

var open = true;
var open2 = true;
// Para padronizar o layout
function showChart2() {
    showChartExport(0);
}

function showChartExport(pais, name) {
    if (pais != 0) {
        chart(pais, function() {
            slider.rangeLabelArray[slider.rangeLabelArray.length - 1].click();
        });
        open = true;
    } else {
        chart(0, function() {
            slider.rangeLabelArray[slider.rangeLabelArray.length - 1].click();
        });

    }
    if (open) {
        document.getElementById("chart").style.display = "block";
        document.getElementById("PriceChart").style.display = "block";
        open = false;
    } else {
        document.getElementById("chart").style.display = "none";
        document.getElementById("PriceChart").style.display = "none";
        open = true;
    }
}

function chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index + chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk[myChunk.length - 1].valor);
    }

    return tempArray;
}


function findFeatureInArray(name, arr) {
    for (var i = 0; i < arr.length; i++) {
        var country;
        country = arr[i].feature.properties.NAME;
        if (country == name) {
            return arr[i];
        }
    }
    return 0;
}


function showRanking() {
    if (open2) {
        document.getElementById("ranking").style.display = "block";
        open2 = false;
    } else {
        document.getElementById("ranking").style.display = "none";
        open2 = true;
    }
}



function verifySH2() {
    secrom = document.getElementById("secrom").value;
    $.ajax({
        type: "GET",
        url: "/getSH2",
        data: "_token = <?php echo csrf_token() ?>",
        data: {
            secrom: secrom,
        },
        success: function(data) {
            products = data.sh2;
            data.sh2.forEach(element => {
                document.getElementById("sh2").innerHTML +=
                    '<option value="' +
                    element.co_sh2 +
                    '"> ' +
                    element.no_sh2_por +
                    " </option> ";
            })
        },
        error: function(error) {
            console.log(error);
            alert("Erro no Ajax !");
        }
    });
}

function verifySH4() {
    co_sh2 = document.getElementById("sh2").value;
    $.ajax({
        type: "GET",
        url: "/getSH4",
        data: "_token = <?php echo csrf_token() ?>",
        data: {
            co_sh2: co_sh2,
        },
        success: function(data) {
            products = data.sh4;
            data.sh4.forEach(element => {
                document.getElementById("sh4").innerHTML +=
                    '<option value="' +
                    element.co_sh4 +
                    '"> ' +
                    element.no_sh4_por +
                    " </option> ";
            })
        },
        error: function(error) {
            console.log(error);
            alert("Erro no Ajax !");
        }
    });
}

function verifySH6() {
    co_sh4 = document.getElementById("sh4").value;
    $.ajax({
        type: "GET",
        url: "/getSH6",
        data: "_token = <?php echo csrf_token() ?>",
        data: {
            co_sh4: co_sh4,
        },
        success: function(data) {
            var list = new Array();
            products = data.sh6;
            data.sh6.forEach(element => {
                document.getElementById("sh6").innerHTML +=
                    '<option value="' +
                    element.co_sh6 +
                    '"> ' +
                    element.no_sh6_por +
                    " </option> ";
            })
        },
        error: function(error) {
            console.log(error);
            alert("Erro no Ajax !");
        }
    });
}

function verifyproduct() {
    co_sh6 = document.getElementById("sh6").value;
    document.getElementById("nameProducts").innerHTML =
        '<option value="' + 0 + '"> --- Produto --- </option> "';
    $.ajax({
        type: "GET",
        url: "/getProduct",
        data: "_token = <?php echo csrf_token() ?>",
        data: {
            co_sh6: co_sh6,
        },
        success: function(data) {
            var list = new Array();
            products = data.products;
            data.products.forEach(element => {
                document.getElementById("nameProducts").innerHTML +=
                    '<option value="' +
                    element.co_ncm +
                    '"> ' +
                    element.no_ncm_pro +
                    " </option> ";
            })
            update()
        },
        error: function(error) {
            console.log(error);
            alert("Erro no Ajax !");
        }
    });
}

function showSearch() {
    if (open) {
        document.getElementById("Search").style.display = "block";
        document.getElementById("Search").style.display = "block";
        open = false;
    } else {
        document.getElementById("Search").style.display = "none";
        document.getElementById("Search").style.display = "none";
        open = true;
    }
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    zoomToFeatureOnSearch(findFeatureInArray(inp.value, features))
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
};

function calcularEixoY(valores) {
    valoresY = [];
    valores.sort(function(a, b) {
        return a - b;
    })
    intervalo = 5;
    /*var limitS = parseInt(valores[valores.length - 1]);
    var limitI = parseInt(valores[0]);
    while(parseInt((limitS - limitI) % intervalo) != 0){
        intervalo++;
    }*/
    var valor = (valores[valores.length - 1] - valores[0]) / intervalo;
    for (var i = 0; i <= intervalo; i++) {
        valoresY.push(Math.ceil(valores[0] + i * valor));
    }

    return valoresY;
}

function calcularEixoX(valores) {
    valoresX = [];
    valores.sort(function(a, b) {
        return a - b;
    })
    intervalo = 5;
    while ((valores[valores.length - 1] - valores[0]) % intervalo != 0) {
        intervalo++;
    }
    var valor = (valores[valores.length - 1] - valores[0]) / intervalo;
    for (var i = 0; i <= intervalo; i++) {
        valoresX.push(parseInt(valores[0] + i * valor));
    }
    return valoresX;
}



/*

chart.draw(data, {
                    width: 400,
                    height: 240,
                    title: 'Gastos do mês',
                    vAxis: {title: 'Valor',
                            ticks: [20000,20500,21000,21500,22000,22500,23000]
                            }
                 });

                 chart.draw(data, {
                    width: 400,
                    height: 240,
                    title: 'Gastos do mês',
                    vAxis: {title: 'Valor',
                            gridlines: {
                                        count: 8
                                       }
                            }
                 });
        }
*/
