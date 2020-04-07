$(document).ready(function() {
    firstLoad = true;
    chart(0, function() {
        slider.rangeLabelArray[slider.rangeLabelArray.length - 1].click();
    });
    autocomplete(document.getElementById("myInput"), featureNames);
});


var features = new Array();
var featureNames = new Array();

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

terr = new Array();

function update() {
    firstLoad = false;
    showChart2(0, "Bahia");
    ranking(currentYear);
    colormap(currentYear);
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
        url: "/getMapTerr",
        data: "_token = <?php echo csrf_token() ?>",
        data: {
            idProd: produto,
            idVar: variable,
            control: control,
            year: ano
        },
        success: function(data) {
            var total;
            total = data.totalTer;
            var splitValue;
            var intervals = Array();

            if (total.length >= 8) {
                splitValue = 8;
                let interval = (total[total.length - 1].somavalor - total[0].somavalor) / 8;
                intervals = [];
                for (i = 0; i < 9; i++) {
                    intervals[i] = (interval * i) + parseFloat(total[0].somavalor);
                }
            } else if (total.length > 1 && total.length < 8) {
                let interval = (total[total.length - 1].somavalor - total[0].somavalor) / total.length;
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
                intervals[3] = interval.somavalor;

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
                let ngg = intervals.map(e => parseInt(e));
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
            var intervals = intervals;
            var labels = [];
            // loop through our density intervals and generate a label with a colored square for each interval
            if (total.length > 1) {
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
                            '+');
                }
            }


            function style(feature) {
                var id, vector;
                terr.push(feature);
                id = feature.properties.CD_TI;
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

            function zoomToFeature(e) {
                map.fitBounds(e.target.getBounds());
                var layer = e.target;
                id = layer.feature.properties.CD_TI;
                vector = data.totalTer;
                showChart2(
                    id,
                    layer.feature.properties.NM_TI,
                    nomeProd + " / " + nomeVar
                );
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(
                        "Município: " +
                        layer.feature.properties.NM_TI +
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
                id = feature.properties.CD_TI;
                vector = data.totalTer;
                if (findValueInArray(id, vector) > 0) {
                    if (features.length < vector.length) {
                        features.push(layer);
                        terr.push(feature);
                        featureNames.push(feature.properties.NM_TI)
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
            var info = L.control();

            info.onAdd = function(map) {
                this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
                return this._div;
            };

            // method that we will use to update the control based on feature properties passed
            info.update = function(props) {
                id = props.CD_TI;
                vector = data.totalTer;
                document.getElementById("info").classList.add('toBlur');
                document.getElementById("info").innerHTML =
                    "<h4>Produção por Teritório identidade</h4>" +
                    (props ?
                        "<b>" +
                        props.NM_TI +
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
    showChart2(
        layer.feature.properties.NM_TI,
        layer.feature.properties.CD_TI
    );



}

function findFeatureInArray(name, arr) {
    for (var i = 0; i < arr.length; i++) {
        nameCDTI = arr[i].feature.properties.NM_TI;
        if (nameCDTI == name) {
            return arr[i];
        }
    }
    return 0;
}

function chart(cd_ti, cb) {
    var anos = new Array();
    var valores = new Array();
    var produto = document.getElementById("nomeProduto").value;
    var variable = document.getElementById("nomeVariavel").value;
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
        url: "/getChartPecuaria",
        data: "_token = <?php echo csrf_token() ?>",
        data: {
            idProd: produto,
            idVar: variable,
            control: control,
            cd_ti: cd_ti
        },
        success: function(data) {
            var results = data.results
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

            results.forEach((r, i) => {
                aux = [];
                aux.push((r.data));
                aux.push(parseFloat(r.somavalor));
                aux.push(linearVetor[i] < 0 ? 0 : linearVetor[i]);
                dataArray.push(aux);
            });

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
                    format: 'none',
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
                        // ticks: calcularEixoX(d),
                        title: 'Anos',
                        format: ' ',
                        // scaleType: 'linear',
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
                    // trendlines: {
                    //     0: {
                    //         pointSize: 0,
                    //         color: "red",
                    //         visibleInLegend: true,
                    //         labelInLegend: 'Tendência',
                    //     }
                    // },
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
            }
            cb();
        },
        error: function(error) {
            console.log(error);
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
        url: "/getRankTerr",
        data: "_token = <?php echo csrf_token() ?>",
        data: {
            idProd: produto,
            idVar: variable,
            control: control,
            year: ano
        },
        success: function(data) {
            var condicaoPorc = document.getElementById("nomeProduto").value;
            var corpo_tabela = document.querySelector("tbody");
            var linha = document.createElement("tr");
            var numero_posicao = document.createElement("th");
            var nome_municipio = document.createElement("th");
            var producao_total = document.createElement("th");
            var producao_valor = document.createElement("th");
            var rankTitle = document.getElementById('rankingheader').innerHTML = "<b>Ranking - " + nameProd + ' / ' + currentYear + '</b>';
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
            var total = 0;
            data.ranking.forEach(element => {
                total = total + parseFloat(element.somavalor);
            })
            corpo_tabela.appendChild(linha);
            var ranking = data.ranking;
            var condicaoPorc = document.getElementById("nomeProduto").value;
            var tam = data.ranking.length;
            var corpo_tabela = document.querySelector("tbody");
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
                div2.style = "width: " + porc + "%";
                div2.innerHTML = "<b>" + porc.toFixed(2) + "% </b>";
                div1.appendChild(div2);
                producao_total.appendChild(div1);
                producao_valor.innerHTML =
                    '<span class="badge bg-red">' +
                    Intl.NumberFormat('pt-BR').format(ranking[i].somavalor) +
                    "</span>";
                var texto_posicao = document.createTextNode(i + 1);
                var texto_municipio = document.createTextNode(findValueInFeature(terr, ranking[i].cd_ti));
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

function findValueInArray(ID, arr) {
    for (var i = 0; i < arr.length; i++) {
        var id;
        id = arr[i].cd_ti;
        if (id == ID) {
            return arr[i].somavalor;
        }
    }
    return 0;
}

function findValueInFeature(terr, cd_ti) {
    for (var i = 0; i < terr.length; i++) {
        if (terr[i].properties.CD_TI == cd_ti) {
            return terr[i].properties.NM_TI;
        }
    }
    return 0;
}



function verify() {
    product = document.getElementById("nomeProduto").value;
    document.getElementById("nomeVariavel").innerHTML = "";
    $.ajax({
        type: "GET",
        url: "/getVar",
        data: "_token = <?php echo csrf_token() ?>",
        data: {
            product: product,
            control: control
        },
        success: function(data) {
            var list = new Array();
            data.variables.forEach(element => {
                data.relation.forEach(item => {
                    list.push(element);
                    if (element.id == item.fk_id_variavel) {
                        document.getElementById("nomeVariavel").innerHTML +=
                            '<option value="' +
                            element.id +
                            '"> ' +
                            element.nome +
                            " </option> ";
                    }
                });
            });
            update();
        },
        error: function(error) {
            console.log(error);
            alert("Erro no Ajax !");
        }
    });
}
var open = true;
var open2 = true;

function showChart() {
    if (open) {
        document.getElementById("charts").style.display = "block";
        document.getElementById("ranking").style.display = "block";
        open = false;
    } else {
        document.getElementById("charts").style.display = "none";
        document.getElementById("ranking").style.display = "none";
        open = true;
    }
}

function showChart2(ano, name) {
    if (ano > 0) {
        chart(ano, function() {
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
        open = false;
    } else {
        document.getElementById("chart").style.display = "none";
        open = true;
    }
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
}


function calcularEixoY(valores) {
    valoresY = [];
    valores.sort(function(a, b) {
        return a - b;
    })
    intervalo = 5;

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
