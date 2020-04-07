$(document).ready(function() {
    firstLoad = true;
    autocomplete(document.getElementById("myInput"), featureNames);
});

var features = new Array();
var featureNames = new Array();
var muni = 0;

// calculo do mínimo quadradro


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
        x.push(parseFloat(results[i].data));
        y.push(parseFloat(results[i].somavalor));
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

function update() {
    firstLoad = false;
    showChart2(0);
    ranking(currentYear);
    colormap(currentYear);
    muni = 0;
}

function colormap(ano) {
    produto = document.getElementById("nomeProduto").value;
    variable = document.getElementById("nomeVariavel").value;
    if (firstLoad) {
        produto = 1;
        variable = 1;
    }
    var nomeProd, nomeVar;
    produtos.forEach(element => {
        if (element.id == produto) {
            nomeProd = element.nome_produto;
        }
    });
    nomevar.forEach(element => {
        if (element.id == variable) {
            nomeVar = element.nome;
        }
    });

    function chunkArray(myArray, chunk_size) {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];

        for (index = 0; index < arrayLength; index += chunk_size) {
            myChunk = myArray.slice(index, index + chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk[myChunk.length - 1].somavalor);
        }

        return tempArray;
    }
    $.ajax({
        type: "GET",
        url: "/getMap",
        data: {
            idProd: produto,
            idVar: variable,
            control: control,
            year: ano
        },
        success: function(data) {
            var total = data.total;
            var splitValue;
            if (total.length >= 8) {
                splitValue = 8;
                let interval = (total[total.length - 1].somavalor - total[0].somavalor) / 8;
                intervals = [];
                for (i = 0; i < 9; i++) {
                    intervals[i] = (interval * i) + parseFloat(total[0].somavalor);
                }
            } else if (total.length > 1 && total.length < 8) {
                let interval = (total[total.length - 1].somavalor - total[0].somavalor) / total.length;
                interval = Math.round(interval);
                intervals = [];
                intervals[0] = total[0].somavalor;
                for (i = 1; i < total.length; i++) {
                    intervals[i] = interval * i
                }
                // splitValue = total.length;
            } else if (total.length == 1) {
                interval = total[0];
                intervals = [];
                intervals[0] = 1;
                intervals[1] = interval.somavalor;
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

            function getColor(d) {
                let ngg = intervals.map(e => parseFloat(e));
                ngg.push(Number.POSITIVE_INFINITY);
                for (let i = 0; i < ngg.length - 1; i++) {
                    if (d >= ngg[i] && d <= ngg[i + 1]) return colors[i];
                }
            }
            if (first) {
                myLayer.clearLayers();
            }

            var div = document.getElementById("legend");

            div.innerHTML = "<p>" + nomeProd + " / " + currentYear + " <br> " + nomeVar + "</p>"
            var grades = intervals;
            var labels = [];
            // loop through our density intervals and generate a label with a colored square for each interval
            if (total.length > 1) {
                div.innerHTML +=
                    '<i style="background:grey"></i> Sem produção registrada <br>';
                for (var i = 0; i < grades.length - 1; i++) {
                    div.innerHTML +=
                        '<i style="background:' +
                        getColor(grades[i]) +
                        '"></i> ' +
                        Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(grades[i]) +
                        (Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(grades[i + 1]) ?
                            " &ndash; " +
                            Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(grades[i + 1]) +
                            "<br>" :
                            "10");
                }
            }

            function style(feature) {
                var id, vector;
                id = feature.properties.id;
                vector = total;
                if (findValueInArray(id, vector) > 0) {
                    return {
                        fillColor: getColor(findValueInArray(id, vector)),
                        weight: 2,
                        opacity: 1,
                        color: "white",
                        dashArray: "3",
                        fillOpacity: 0.7
                    };
                }
                return {
                    fillColor: "grey",
                    weight: 2,
                    opacity: 1,
                    color: "white",
                    dashArray: "3",
                    fillOpacity: 1
                };
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



            function onEachFeature(feature, layer) {
                id = feature.properties.id;
                vector = total;
                if (findValueInArray(id, vector) > 0) {
                    if (features.length < total.length) {
                        features.push(layer);
                        featureNames.push(feature.properties.nomeUnidade)
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


            function zoomToFeature(e) {
                if (e.type == "click") {
                    map.fitBounds(e.target.getBounds());
                    var layer = e.target;
                    id = layer.feature.properties.id;
                    muni = id;
                    vector = total;
                    let value;
                    if (findValueInArray(id, vector) > 0) {
                        value = findValueInArray(id, vector);
                    } else {
                        value = 0;
                    }

                    showChart2(
                        layer.feature.properties.id,
                        layer.feature.properties.nomeUnidade,
                        nomeProd + " / " + nomeVar
                    );
                    L.popup()
                        .setLatLng(e.latlng)
                        .setContent(
                            "Município: " +
                            layer.feature.properties.nomeUnidade +
                            "</b><br />" +
                            "Produção: " +
                            Intl.NumberFormat('pt-BR').format(
                                value
                            )
                        )
                        .openOn(map);
                }


            }
            var info = L.control();


            info.onAdd = function(map) {
                this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
                return this._div;
            };

            // method that we will use to update the control based on feature properties passed
            info.update = function(props) {
                id = props.id;
                vector = total;
                document.getElementById("info").innerHTML =
                    (props ?
                        "<b>" +
                        props.nomeUnidade +
                        "</b><br />" +
                        props.nm_ti +
                        "</b><br />" +
                        Intl.NumberFormat('pt-BR').format(
                            findValueInArray(id, vector)
                        ) +
                        "</b><br />" +
                        nomeProd +
                        " / " +
                        nomeVar :
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
            console.error(error);
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
    $.ajax({
        type: "GET",
        url: "/getMap",
        data: {
            idProd: produto,
            idVar: variable,
            control: control,
            year: ano
        },
        success: function(data) {
            map.fitBounds(e.getBounds());
            var layer = e;
            id = layer.feature.properties.id;
            vector = data.total;
            showChart2(
                layer.feature.properties.id,
                layer.feature.properties.nomeUnidade
            );
        }
    });

}


function chart(municipio, nameMun, nameVar, cb) {

    var anos = new Array();
    var valores = new Array();
    var nameVar = document.getElementById("nomeVariavel").options[document.getElementById("nomeVariavel").selectedIndex].text;
    var nameProd = document.getElementById("nomeProduto").options[document.getElementById("nomeProduto").selectedIndex].text;
    if (firstLoad) {
        produto = 1;
        variable = 1;
        if (control == 'agricola') {
            nameProd = 'Abacate';
            nameVar = 'Área plantada ou destinada à colheita (Hectares)';
        } else if (control == 'pecuaria') {
            nameProd = 'Leite (Mil Litros)';
            nameVar = 'Produção de origem animal';
        } else if (control == 'silvicultura') {
            nameProd = 'Açaí (fruto) (Toneladas)';
            nameVar = 'Quantidade produzida na extração vegetal';
        }

    }
    $.ajax({
        type: "GET",
        url: "/getChartMuni",
        data: {
            idProd: produto,
            idVar: variable,
            control: control,
            municipio: municipio
        },
        success: function(data) {
            results = data.results;
            data.results.forEach(element => {
                anos.push(element.data);
                valores.push(element.somavalor);
            });
            if (typeof slider != 'undefined') slider.updateControl(anos);
            lastYear = anos[anos.length - 1];
            firstYear = anos[0];
            document.getElementById("myRange").max = lastYear;
            document.getElementById("myRange").min = firstYear;
            document.getElementById("demo").innerHTML = firstYear;
            var dataCol = ['Ano', 'Valor', 'Tendência'];
            var dataArray = [dataCol];
            var linearVetor = regressao(results);
            var v = [];
            var d = [];
            for (i = 0; i < results.length; i++) {
                aux = [];
                aux.push((results[i].data));
                aux.push(parseFloat(results[i].somavalor));
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
                        // ticks: calcularEixoX(d),
                        title: 'Anos',
                        format: ' ',
                        gridlines: {
                            color: 'none'
                        },
                        slantedText: true,
                        slantedTextAngle: 45
                    },
                    vAxis: {
                        // ticks: calcularEixoY(v),
                        title: nameProd + ' / \n' + nameVar,
                    },
                    trendlines: {
                        0: {
                            pointSize: 0,
                            color: "red",
                            visibleInLegend: true,
                            labelInLegend: 'Tendência',
                        }
                    },
                };

                var chart = new google.visualization.LineChart(document.getElementById('chart'));

                chart.draw(data, options);
            }
            cb();
        },
        error: function(error) {
            console.error(error);
            alert("Erro no Ajax !");
        }
    });
}

function ranking(ano) {
    document.getElementById("rank").innerHTML = "";
    produto = document.getElementById("nomeProduto").value;
    variable = document.getElementById("nomeVariavel").value;
    var nameProd = document.getElementById("nomeProduto").options[document.getElementById("nomeProduto").selectedIndex].text;
    if (firstLoad) {
        produto = 1;
        variable = 1;
        if (control == 'agricola') {
            nameProd = 'Abacate';
        } else if (control == 'pecuaria') {
            nameProd = 'Leite (Mil Litros)';
        } else if (control == 'silvicultura') {
            nameProd = 'Açaí (fruto) (Toneladas)';
        }
    }
    $.ajax({
        type: "GET",
        url: "/getRank",
        data: {
            idProd: produto,
            idVar: variable,
            control: control,
            year: ano
        },
        success: function(data) {
            var condicaoPorc = document.getElementById("nomeProduto").value;
            var corpo_tabela = document.getElementById("rank");
            var linha = document.createElement("tr");
            var rankTitle = document.getElementById('rankingheader').innerHTML = "<b>Ranking - " + nameProd + ' / ' + currentYear + '</b>';
            var numero_posicao = document.createElement("th");
            var nome_municipio = document.createElement("th");
            var producao_total = document.createElement("th");
            var producao_valor = document.createElement("th");
            numero_posicao.innerHTML = '<th style="width: 10px">#</th>';
            nome_municipio.innerHTML = "<th>Município</th>";
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
            var ranking = data.ranking;
            var total = 0;
            data.ranking.forEach(element => {
                total = total + parseFloat(element.somavalor);
            })
            var ranking = data.ranking;
            var condicaoPorc = document.getElementById("nomeProduto").value;
            var tam = data.ranking.length;
            var corpo_tabela = document.getElementById("rank");
            for (var i = 0; i < tam; i++) {
                var porc = (ranking[i].somavalor / total) * 100;

                var linha = document.createElement("tr");
                var numero_posicao = document.createElement("td");
                var nome_municipio = document.createElement("td");
                var producao_total = document.createElement("td");
                var producao_valor = document.createElement("td");
                var div1 = document.createElement("div");
                div1.className = "progress progress-xs";
                var div2 = document.createElement("div");
                div2.className = "progress-bar progress-bar-red";
                div2.style = "width: " + porc + "%; text-align: center;";
                div2.innerHTML = "<b>" + porc.toFixed(2) + "% </b>";
                div1.appendChild(div2);
                producao_total.appendChild(div1);
                producao_valor.innerHTML =
                    '<span class="badge bg-red">' +
                    Intl.NumberFormat('pt-BR').format(ranking[i].somavalor) +
                    "</span>";
                var texto_posicao = document.createTextNode(i + 1);
                var texto_municipio = document.createTextNode(ranking[i].nome);
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
            console.error(error);
            alert("Erro no Ajax !");
        }
    });
}

function findValueInArray(ID, arr) {
    for (var i = 0; i < arr.length; i++) {
        var id;
        id = arr[i].id;
        if (id == ID) {
            return arr[i].somavalor;
        }
    }
    return 0;
}


var open = true;

function showChart2(municipio, name) {
    muni = municipio;
    if (muni > 0) {
        chart(muni, name, "", function() {
            slider.rangeLabelArray[slider.rangeLabelArray.length - 1].click();
        });
        open = true;
    } else {
        chart(0, 0, 0, function() {
            slider.rangeLabelArray[slider.rangeLabelArray.length - 1].click();
        });

    }
    if (open) {
        document.getElementById("chart").style.display = "block";
        open = false;
    } else {
        document.getElementById("chart").style.display = "none";
        open = true;
    }
}


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