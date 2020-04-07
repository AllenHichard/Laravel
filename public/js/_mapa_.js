function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function(sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; });
        keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function(key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function(key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: parameterize timeline colors, overall length, and length between points (css styles)
L.Control.TimeLineSlider = L.Control.extend({
    options: {
        position: 'bottomright',
        timelineItems: ["Today", "Tomorrow", "The Next Day"],
        changeMap: function changeMap(_ref) {
            var label = _ref.label,
                value = _ref.value,
                map = _ref.map;
            console.log("You are not using the value or label from the timeline to change the map.");
        },
        extraChangeMapParams: {},
        initializeChange: true,
        thumbHeight: "4.5px",
        labelWidth: "80px",
        betweenLabelAndRangeSpace: "20px",
        labelFontSize: "14px",
        activeColor: "#37adbf",
        inactiveColor: "#8e8e8e",
        backgroundOpacity: 0.75,
        backgroundColor: "#ffffff",
        topBgPadding: "10px",
        bottomBgPadding: "0px",
        rightBgPadding: "30px",
        leftBgPadding: "30px"
    },
    initialize: function initialize(options) {
        if (typeof options.changeMap != "function") {
            options.changeMap = function(_ref2) {
                var label = _ref2.label,
                    value = _ref2.value,
                    map = _ref2.map;
                console.log("You are not using the value or label from the timeline to change the map.");
            };
        }

        if (parseFloat(options.thumbHeight) <= 2) {
            console.log("The nodes on the timeline will not appear properly if its radius is less than 2px.");
        }

        L.setOptions(this, options);
    },
    onAdd: function onAdd(map) {
        this.map = map;
        this.sheet = document.createElement('style');
        document.body.appendChild(this.sheet);
        this.container = L.DomUtil.create('div', 'control_container');
        /* Prevent click events propagation to map */

        L.DomEvent.disableClickPropagation(this.container);
        /* Prevent right click event propagation to map */

        L.DomEvent.on(this.container, 'control_container', function(ev) {
            L.DomEvent.stopPropagation(ev);
        });
        /* Prevent scroll events propagation to map when cursor on the div */

        L.DomEvent.disableScrollPropagation(this.container);
        /* Create html elements for input and labels */

        this.slider = L.DomUtil.create('div', 'range', this.container);
        this.slider.innerHTML = "<input id=\"rangeinputslide\" type=\"range\" min=\"1\" max=\"".concat(this.options.timelineItems.length, "\" steps=\"1\" value=\"1\"></input>");
        this.rangeLabels = L.DomUtil.create('ul', 'range-labels', this.container);
        this.rangeLabels.innerHTML = this.options.timelineItems.map(function(item) {
            return "<li>" + item + "</li>";
        }).join('');
        this.rangeInput = L.DomUtil.get(this.slider).children[0];
        this.rangeLabelArray = Array.from(this.rangeLabels.getElementsByTagName('li'));
        this.sliderLength = this.rangeLabelArray.length;
        this.thumbSize = parseFloat(this.options.thumbHeight) * 2; // double the thumb size when its active

        this.activeThumbSize = this.thumbSize * 2; // make the width of the range div holding the input the number of intervals * the label width and add the thumb size on either end of the range

        this.rangeWidthCSS = parseFloat(this.options.labelWidth) * (this.options.timelineItems.length - 1) + this.thumbSize * 2; // move labels over to the left so they line up; move half the width of the label and adjust for thumb radius

        this.rlLabelMargin = parseFloat(this.options.labelWidth) / 2 - parseFloat(this.options.thumbHeight) / 2; // 2.5 because that is half the height of the range input

        this.topLabelMargin = parseFloat(this.options.betweenLabelAndRangeSpace) - parseFloat(this.options.thumbHeight) - 2.5;
        this.backgroundRGBA = this.hexToRGBA(this.options.backgroundColor, this.options.backgroundOpacity);
        this.coverBackgroundRGBA = this.hexToRGBA(this.options.backgroundColor, 0);
        that = this;
        this.sheet.textContent = this.setupStartStyles();
        /* When input gets changed change styles on slider and trigger user's changeMap function */

        L.DomEvent.on(this.rangeInput, "input", function() {
            curValue = this.value;
            that.sheet.textContent += that.getTrackStyle(this, that.sliderLength);
            var curLabel = that.rangeLabelArray[curValue - 1].innerHTML; // Change map according to either current label or value chosen

            mapParams = {
                value: curValue,
                label: curLabel,
                map: map
            };
            allChangeMapParameters = _objectSpread({}, mapParams, {}, that.options.extraChangeMapParams);
            that.options.changeMap(allChangeMapParameters);
        }); // Add click event to each label so it triggers input change for corresponding value

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.rangeLabelArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                li = _step.value;
                L.DomEvent.on(li, "click", function(e) {
                    var targetli = e.target;
                    var index = that.rangeLabelArray.indexOf(targetli);
                    that.rangeInput.value = index + 1;
                    var inputEvent = new Event('input');
                    that.rangeInput.dispatchEvent(inputEvent);
                });
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        ; // Initialize input change at start

        if (this.options.initializeChange) {
            var inputEvent = new Event('input');
            this.rangeInput.dispatchEvent(inputEvent);
        }

        return this.container;
    },
    onRemove: function onRemove() {
        // remove control html element
        L.DomUtil.remove(this.container);
    },
    hexToRGBA: function hexToRGBA(hex, opacity) {
        // from https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
        var c;

        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');

            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }

            c = '0x' + c.join('');
            return 'rgba(' + [c >> 16 & 255, c >> 8 & 255, c & 255].join(',') + ',' + opacity + ')';
        }

        throw new Error('Bad Hex');
    },
    setupStartStyles: function setupStartStyles() {
        style = "\n            .control_container {\n                background-color: ".concat(that.backgroundRGBA, ";\n                padding: ").concat(that.options.topBgPadding, " ").concat(that.options.rightBgPadding, " ").concat(that.options.bottomBgPadding, " ").concat(that.options.leftBgPadding, ";\n            }\n\n            .range {\n                position: relative;\n                left: -").concat(that.thumbSize, "px;\n                height: 5px;\n                width: ").concat(that.rangeWidthCSS, "px;\n            }\n\n            .range input {\n                width: 100%;\n                position: absolute;\n                height: 0;\n                -webkit-appearance: none;\n            }\n\n            /* -1 because the height is 2 (half the height) */\n            .range input::-webkit-slider-thumb {\n                background: ").concat(that.options.activeColor, ";\n                margin: -").concat(that.thumbSize - 1, "px 0 0;\n                width: ").concat(that.activeThumbSize, "px;\n                height: ").concat(that.activeThumbSize, "px;\n                -webkit-appearance: none;\n                border-radius: 50%;\n                cursor: pointer;\n                border: 0 !important;\n            }\n            .range input::-moz-range-thumb {\n                background: ").concat(that.options.activeColor, ";\n                margin: -").concat(that.thumbSize - 1, "px 0 0;\n                width: ").concat(that.activeThumbSize, "px;\n                height: ").concat(that.activeThumbSize, "px;\n                border-radius: 50%;\n                cursor: pointer;\n                border: 0 !important;\n            }\n            .range input::-ms-thumb {\n                background: ").concat(that.options.activeColor, ";\n                margin: -").concat(that.thumbSize - 1, "px 0 0;\n                width: ").concat(that.activeThumbSize, "px;\n                height: ").concat(that.activeThumbSize, "px;\n                border-radius: 50%;\n                cursor: pointer;\n                border: 0 !important;\n            }\n\n\n            .range input::-webkit-slider-runnable-track {\n                background: ").concat(that.options.backgroundColor, ";\n                width: 100%;\n                height: 2px;\n                cursor: pointer;\n            }\n            .range input::-moz-range-track {\n                background: ").concat(that.options.backgroundColor, ";\n                width: 100%;\n                height: 2px;\n                cursor: pointer;\n            }\n            .range input::-ms-track {\n                background: ").concat(that.options.backgroundColor, ";\n                width: 100%;\n                height: 2px;\n                cursor: pointer;\n                background: transparent;\n                border-color: transparent;\n                color: transparent;\n            }\n\n            .range input:focus {\n                background: none;\n                outline: none;\n            }\n\n            . range input[type=range]::-moz-focus-outer {\n                border: 0;\n            }\n\n            .range-labels {\n                margin: ").concat(that.topLabelMargin, "px -").concat(that.rlLabelMargin, "px 0;\n                padding: 0;\n                list-style: none;\n            }\n\n            .range-labels li {\n                color: ").concat(that.options.inactiveColor, ";\n                width: ").concat(that.options.labelWidth, ";\n                font-size: ").concat(that.options.labelFontSize, ";\n                position: relative;\n                float: left;\n                text-align: center;\n                cursor: pointer;\n            }\n            .range-labels li::before {\n                background: ").concat(that.options.inactiveColor, ";\n                width: ").concat(that.thumbSize, "px;\n                height: ").concat(that.thumbSize, "px;\n                position: absolute;\n                top: -").concat(that.options.betweenLabelAndRangeSpace, ";\n                right: 0;\n                left: 0;\n                content: \"\";\n                margin: 0 auto;\n                border-radius: 50%;\n            }\n            .range-labels .active {\n                color: ").concat(that.options.activeColor, ";\n            }\n            .range-labels .selected::before {\n                background: ").concat(that.options.activeColor, ";\n            }\n            .range-labels .active.selected::before {\n                display: none;\n            }\n            ");
        return style;
    },
    getTrackStyle: function getTrackStyle(el, sliderLength) {
        prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
        var curVal = el.value,
            labelIndex = curVal - 1,
            val = labelIndex * (100 / (sliderLength - 1)),
            coverVal = parseFloat(that.thumbSize) / that.rangeWidthCSS * 100;
        style = ''; // Remove active and selected classes from all labels

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = that.rangeLabelArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                li = _step2.value;
                L.DomUtil.removeClass(li, 'active');
                L.DomUtil.removeClass(li, 'selected');
            } // Find label that should be active and give it appropriate classes

        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var curLabel = that.rangeLabelArray[labelIndex];
        L.DomUtil.addClass(curLabel, 'active');
        L.DomUtil.addClass(curLabel, 'selected'); // For labels before active label, add selected class

        for (i = 0; i < curVal; i++) {
            L.DomUtil.addClass(that.rangeLabelArray[i], 'selected');
        } // Change background gradient


        for (var i = 0; i < prefs.length; i++) {
            style += ".range {background: linear-gradient(to right, ".concat(that.coverBackgroundRGBA, " 0%, ").concat(that.coverBackgroundRGBA, " ").concat(coverVal, "%, ").concat(that.options.activeColor, " ").concat(coverVal, "%, ").concat(that.options.activeColor, " ").concat(val, "%,  ").concat(that.coverBackgroundRGBA, " 0%, ").concat(that.coverBackgroundRGBA, " 100%)}");
            style += '.range input::-' + prefs[i] + "{background: linear-gradient(to right, ".concat(that.coverBackgroundRGBA, " 0%, ").concat(that.coverBackgroundRGBA, " ").concat(coverVal, "%, ").concat(that.options.activeColor, " 0%, ").concat(that.options.activeColor, " ").concat(val, "%, ").concat(that.options.inactiveColor, " ").concat(val, "%, ").concat(that.options.inactiveColor, " ").concat(100 - coverVal, "%, ").concat(that.coverBackgroundRGBA, " ").concat(100 - coverVal, "%, ").concat(that.coverBackgroundRGBA, " 100%)}");
        }

        return style;
    }
});

L.control.timelineSlider = function(options) {
    return new L.Control.TimeLineSlider(options);
};
/***********************************************************************
 * @file mapaAjax.js
 * Contém as funções que realizam requisições ajax da página de mapa
 * Adicionado na página mapa.blade.php
 ***********************************************************************/
//Variáveis globais


var token = document.querySelector('meta[name=_token]').content;
var ajax_url = window.location.href + '/';
/************************************************************************
 * @function getInfo
 * @param {integer} produto - id do produto
 * @param {integer} variavel - id da variável
 * @param {string} controle - Nome do tipo de produção 'Pecuaria', 'Agricola' ou 'Silvicultura'
 * @param {integer} ano - Ano para ser gerado o Ranking
 * @param {string} unidadeTerr - Nome da unidade territorial 'municipio' ou 'terrID'
 * Atualiza as informações da tabela de ranking, gráfico e slider
 *************************************************************************/

function getInfo(produto, variavel, controle, ano, unidadeTerr) {
    jQuery.ajax({
        type: 'POST',
        url: ajax_url + 'getInfo',
        data: {
            _token: token,
            idProd: produto,
            idVar: variavel,
            control: controle,
            year: ano,
            unidadeTerr: unidadeTerr
        },
        success: function success(data) {
            var years = [],
                values = [];
            data.chartResults.forEach(function(r) {
                years.push(r.data);
                values.push(r.somavalor);
            });
            /*
             * Update chart info
             */

            var dataArray = [
                ['Ano', 'Valor']
            ];
            data.chartResults.forEach(function(r) {
                dataArray.push([parseInt(r.data), parseFloat(r.somavalor)]);
            }); //default size is 1/3 of the screen

            var size = {
                width: window.screen.width / 3,
                height: window.screen.height / 3
            }; //set max size

            size.width = size.width > 900 ? 900 : size.width;
            size.height = size.height > 420 ? 420 : size.height;

            var options = _objectSpread({}, chartDefaultoptions, {}, size, {
                title: data.nomeProduto,
                vAxis: {
                    title: data.nomeProduto + ' / \n' + data.nomeVariavel
                }
            });

            google.charts.load('current', {
                'packages': ['corechart']
            });
            google.charts.setOnLoadCallback(function() {
                var dataTable = new google.visualization.arrayToDataTable(dataArray);
                var chart = new google.visualization.LineChart(document.getElementById('chart'));
                chart.draw(dataTable, options);
            });
            /*
             * Update slider
             */

            slider.updateControl(years);
            /*
             * Update ranking info
             */

            document.getElementById('rankingheader').innerHTML = "\n                <b>Ranking - ".concat(data.nomeProduto, " / ").concat(ano, "</b>\n            ");
            var tabela = document.getElementById("rank");
            tabela.innerHTML = "\n                <th>#</th>\n                <th>".concat(unidadeTerr, "</th>\n                <th>Produ\xE7\xE3o</th>\n                <th>Valor</th>\n            ");
            data.ranking.forEach(function(und) {
                var porcentagem = und.somavalor / data.total * 100;
                tabela.innerHTML = "".concat(tabela.innerHTML, "\n                    <tr>\n                        <td>1</td>\n                        <td>").concat(und.nome, "</td>\n                        <td>\n                            <div class=\"progress\">\n                                <div class=\"progress-bar\" style=\"width: ").concat(porcentagem, "px;\">\n                                <b> ").concat(porcentagem.toFixed(2), "% </b>\n                                </div>\n                            </div>\n                        </td>\n                        <td> <span class=\"\">").concat(und.somavalor, "</span>\n                        </td>\n                    </tr>\n                ");
            });
        },
        error: function error(_error2) {
            console.error(_error2);
            alert("Erro no Ajax !");
        }
    });
}
/************************************************************************
 * @function changeUnidadeTerritorial
 * @param {string} undTerr - Indica para qual unidade territorial vai ser alterada
 * as opções são 'municipio' e 'terrID'
 * Obtem o geoJSON com as unidades Territoriais e modifica o mapa
 * é colocado inicialmente um produto específico para gerar um mapa já colorido
 *************************************************************************/


function changeUnidadeTerritorial(undTerr, layerGroup) {
    jQuery.ajax({
        type: 'POST',
        url: ajax_url + 'getUnidadeTerritorial',
        data: {
            _token: token,
            undTerr: undTerr
        },
        success: function success(data) {
            layerGroup.clearLayers();
            layerGroup.addData(data.geojson);
        },
        error: function error(_error) {
            console.error(_error);
            alert("Erro no Ajax !");
        }
    });
}
/************************************************************************
 * @function showFeature
 * @param {Object} inp - Elemento input passado através do this
 * Retorna as variáveis selecionáveis a partir do produto selecionado
 *************************************************************************/


function showFeature(e) {
    jQuery.ajax({
        type: 'POST',
        url: ajax_url + 'getFeature',
        data: {
            _token: token,
            idProd: produto,
            idVar: variable,
            control: control
        },
        success: function success(data) {
            map.fitBounds(e.getBounds());
            showChart2(e.feature.properties.id, e.feature.properties.nomeUnidade);
        },
        error: function error(_error) {
            console.error(_error);
            alert("Erro no Ajax !");
        }
    });
}
/************************************************************************
 * @function getVariables
 * @param {HTML element} inp - Elemento input passado através do this
 * Retorna as variáveis selecionáveis a partir do produto selecionado
 *************************************************************************/


function getVariables(inp) {
    inpVariable = document.getElementById("nomeVariavel");
    jQuery.ajax({
        type: 'POST',
        url: ajax_url + 'getVariables',
        data: {
            _token: token,
            product: inp.value,
            control: control
        },
        success: function success(data) {
            data.variables.forEach(function(element) {
                data.relation.forEach(function(item) {
                    if (element.id == item.fk_id_variavel) {
                        inpVariable.innerHTML = "\n                            <option value=\"".concat(element.id, "\"> ").concat(element.nome, " </option>\n                        ");
                    }
                });
            });
            update();
        },
        error: function error(_error) {
            console.error(_error);
            alert("Erro no Ajax !");
        }
    });
}

var chartDefaultoptions = {
    chartArea: {
        width: '100%',
        height: '100%',
        left: '20%',
        top: "20%",
        right: '22%',
        bottom: "20%"
    },
    legend: {
        position: 'right'
    },
    series: {
        0: {
            color: 'black',
            pointSize: 5,
            lineWidth: 3
        }
    },
    hAxis: {
        title: 'Anos',
        format: ' ',
        gridlines: {
            color: 'none'
        },
        slantedText: true,
        slantedTextAngle: 45
    },
    trendlines: {
        0: {
            pointSize: 0,
            color: "red",
            visibleInLegend: true,
            labelInLegend: 'Tendência'
        }
    }
};
/************************************************************************
 * @event ready
 * Funções a serem ativadas após o termino da inicialização da página
 * Inicialização do mapa em uma variável
 *************************************************************************/

jQuery(document).ready(function() {
    changeUnidadeTerritorial('terrID', unidTerrLayerGroup); //init

    getInfo(1, 1, 'pecuaria', 2018, 'terrID');
});
/***********************************************************************
 * @file mapa.js
 * Funções e operações gerais da página mapa.blade.php
 * Utiliza leaflet com plugin leaflet-timeline-slider
 ***********************************************************************/
//Variáveis globais

var url = ''.concat(window.location.protocol, '//').concat(window.location.host);
/************************************************************************
 * @function showChart
 * Abre e fecha janela do Gráfico
 *************************************************************************/

function showChart() {
    divChart = document.getElementById('chart');

    if (divChart.style.display != 'block') {
        divChart.style.display = 'block';
    } else {
        divChart.style.display = 'none';
    }
}
/************************************************************************
 * @function showRanking
 * Abre e fecha janela de ranking
 *************************************************************************/


function showRanking() {
    divRanking = document.getElementById('ranking');

    if (divRanking.style.display != 'block') {
        divRanking.style.display = 'block';
    } else {
        divRanking.style.display = 'none';
    }
}
/************************************************************************
 * @function pausePlay
 * @param {HTML Element} e - Elemento botão passado através da propriedade this
 * Pausa ou inicia a passagem automatica de anos
 * Utiliza as variáveis globais playTimer, scale e slider
 *************************************************************************/

var playTimer;

function pausePlay(e) {
    if (e.classList.contains('pausado')) {
        e.classList.remove('pausado');
        slider.remove();
        playTimer = setInterval(function() {
            if (currentYear >= slider.options.timelineItems[slider.options.timelineItems.length - 1]) currentYear = parseInt(slider.options.timelineItems[0]);
            currentYear += 1;
            ranking(currentYear);
            colormap(currentYear);
        }, 1500);
        e.innerHTML = "\n            <span> <i class=\"fas fa-pause\"></i> <b>Pause</b></span>\n        ";
    } else {
        clearInterval(playTimer);
        scale.remove();
        slider.addTo(map);
        scale.addTo(map);
        slider.rangeLabelArray.forEach(function(l) {
            if (l.innerText == currentYear) l.click();
        });
        e.classList.add('pausado');
        e.innerHTML = "\n            <span> <i class=\"fas fa-play\"></i> <b>Play</b></span>\n        ";
    }
}
/*************************************************************************
 * Coloca Links como ativos a depender da página presente
 *************************************************************************/
// control = ['pecuaria','silvicultura','agricola']


document.getElementById(control).classList.add('active'); // unidadeTerritorial = ['municipio','terrID','exterior']

document.getElementById(unidadeTerritorial).classList.add('active');
/*************************************************************************
 * LEAFLET CREATE MAP
 *************************************************************************/

var map = function() {
    var _minZoom, _center, _zoom, _link, _linkName;

    if (unidadeTerritorial == 'exterior') {
        _minZoom = 2.5;
        _center = [0, 0];
        _zoom = 2.5;
        _link = 'https://www.ibge.gov.br/';
        _linkName = 'IBGE';
    } else {
        _minZoom = 7;
        _center = [-13.55, -41.8953];
        _zoom = 7;
        _link = 'http://www.mdic.gov.br/';
        _linkName = 'MDIC';
    }

    var _map = L.map('map').setView(_center, _zoom);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        minZoom: _minZoom,
        attribution: "\n            Powered by - <a href=\"/\">Geodatin</a>, <a href=\"http://www.uefs.br\">UEFS</a> and <a href=\"http://ppgm.uefs.br/\">PPGM</a> |\n            Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors,\n            <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>,\n            Imagery \xA9 <a href=\"https://www.mapbox.com/\">Mapbox</a> | Fonte - <a href=\"".concat(_link, "\"> ").concat(_linkName, " </a>\n        "),
        id: 'mapbox.light'
    }).addTo(_map);
    return _map;
}(); // Variável contendo o grupo de camadas com o desenho das unidade territoriais


var unidTerrLayerGroup = L.geoJSON('', {
    style: style
}).addTo(map);
/*************************************************************************
 * @function closeMenu
 * Fecha a aba de Menu
 * Usado no botão .showFilter
 *************************************************************************/

function closeMenu() {
    var menu = document.getElementById('card').style.left = '-370px';
    document.querySelectorAll('.toBlur').forEach(function(e) {
        return e.style.filter = 'blur(0px)';
    });
}
/*************************************************************************
 * @function openMenu
 * Abre a aba de Menu
 * Usado no botão X dentro do menu
 *************************************************************************/


function openMenu() {
    document.getElementById('card').style.left = '0px';
    document.querySelectorAll('.toBlur').forEach(function(e) {
        return e.style.filter = 'blur(5px)';
    });
}
/************************************************************************
 * @function dragElement
 * @param {HTML Element} elmnt - Elemento para adicionar arrastabilidade
 * Adiciona a opção de arrastar elemento na tela
 *
 *************************************************************************/
//Make the DIV element draggagle:


function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    if (document.getElementById(elmnt.id + 'header')) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault(); // get the mouse cursor position at startup:

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement; // call a function whenever the cursor moves:

        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault(); // calculate the new cursor position:

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY; // set the element's new position:

        elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
/*************************************************************************
 * ADICIONANDO ARRASTABILIDADE AOS ELEMENTOS
 *************************************************************************/


dragElement(document.querySelector('#chart'));
dragElement(document.querySelector('#ranking'));

if (document.querySelector('#PriceChart')) {
    dragElement(document.querySelector('#PriceChart'));
}
/*************************************************************************
 * LEAFLET REMOVE - Zoom control (Apenas para reorganização)
 *************************************************************************/


map.removeControl(map.zoomControl);
/*************************************************************************
 * LEAFLET ADD - Rosa dos ventos
 *************************************************************************/

var north = L.control({
    position: 'topright'
});

north.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'compass');
    div.innerHTML = "\n        <img src=\"".concat(url, "/assets/north-arrow.png\">\n    ");
    return div;
};

north.addTo(map);
/*************************************************************************
 * LEAFLET ADD - Menu / Search
 *************************************************************************/

var search = L.control({
    position: 'topleft'
});

search.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'menu-search');
    div.innerHTML = "\n        <button class=\"showFilter\" onclick=\"openMenu()\">\n            <i class=\"fas fa-bars\"></i>\n        </button>\n        <form autocomplete=\"off\">\n            <div id=\"Search\" class=\"autocomplete\" style=\"width:300px;\">\n                <input id=\"myInput\" type=\"text\" name=\"myCountry\" placeholder=\"Buscar...\">\n            </div>\n        </form>\n    ";
    return div;
};

search.addTo(map);
/*************************************************************************
 * LEAFLET ADD - Zoom control
 *************************************************************************/

new L.Control.Zoom({
    position: 'topleft'
}).addTo(map);
/*************************************************************************
 * LEAFLET PLUGIN ADD - Slider
 *************************************************************************/

var sliderFirtsLoad = true;
var slider = L.control.timelineSlider({
    position: 'bottomleft',
    activeColor: 'black',
    thumbHeight: '2px',
    betweenLabelAndRangeSpace: '15px',
    labelFontSize: '12px',
    bottomBgPadding: '10px',
    labelWidth: '22px',
    initializeChange: false,
    changeMap: function changeMap(event) {
        if (event.type != 'click') {
            if (typeof firstLoad !== 'undefined') {
                if (sliderFirtsLoad) {
                    var selectedYear = this.lastYear;
                    play = false;
                    currentYear = selectedYear;
                    output.innerHTML = this.lastYear;
                    colormap(this.lastYear);
                    ranking(this.lastYear);
                    sliderFirtsLoad = false;
                } else {
                    var _selectedYear = parseInt(event.label);

                    play = false;
                    currentYear = _selectedYear;
                    output.innerHTML = event.value;
                    colormap(_selectedYear);
                    ranking(_selectedYear);
                }
            }
        }
    }
}).addTo(map);
/*************************************************************************
 * LEAFLET ADD - Escala
 *************************************************************************/

var scale = L.control.scale({
    position: 'bottomleft'
}).addTo(map);
/*************************************************************************
 * SLIDER CONTROL CUSTOM METHOD
 * @function updateControl - Update slider control changing its timelineItems
 * @param {Array} timelineItems - Modifica as opções de anos para filtrar
 *************************************************************************/

slider.updateControl = function(timelineItems) {
    scale.remove(); //Remove escala para reorganizar

    this.remove();
    this.options.firstYear = parseInt(timelineItems[0]);
    this.options.lastYear = parseInt(timelineItems[timelineItems.length - 1]);
    this.options.timelineItems = timelineItems;
    this.addTo(map);
    scale.addTo(map);
};
/*************************************************************************
 * LEAFLET ADD - Homepage Link
 *************************************************************************/


var home = L.control({
    position: 'topleft'
});

home.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'menu-home');
    div.innerHTML = "\n        <button class=\"showFilter\" onclick=\"window.location.href = '/'\">\n            <i class=\"fas fa-home\"></i>\n        </button>\n   ";
    return div;
};

home.addTo(map);
/************************************************************************
 * @function autocomplete
 * @param {HTML Element} inp - Elemento input a obter a função de autocompletar
 * @param {Array} arr - Array de strings com as opções de autocompletar
 * Coloca a funcionalidade de autocompletar em um campo do tipo input texto
 *************************************************************************/

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/

    inp.addEventListener('input', function(e) {
        var a,
            b,
            i,
            val = this.value;
        /*close any already open lists of autocompleted values*/

        closeAllLists();

        if (!val) {
            return false;
        }

        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/

        a = document.createElement('DIV');
        a.setAttribute('id', this.id + 'autocomplete-list');
        a.setAttribute('class', 'autocomplete-items');
        /*append the DIV element as a child of the autocomplete container:*/

        this.parentNode.appendChild(a);
        /*for each item in the array...*/

        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement('DIV');
                /*make the matching letters bold:*/

                b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/

                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/

                b.addEventListener('click', function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName('input')[0].value;
                    showFeature(features.find(function(f) {
                        return f.feature.properties.nomeUnidade == inp.value;
                    }));
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/

                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/

    inp.addEventListener('keydown', function(e) {
        var x = document.getElementById(this.id + 'autocomplete-list');
        if (x) x = x.getElementsByTagName('div');

        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/

            addActive(x);
        } else if (e.keyCode == 38) {
            //up

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
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/

        x[currentFocus].classList.add('autocomplete-active');
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove('autocomplete-active');
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName('autocomplete-items');

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

;
/***********************************************************************
 * @file mapaAjax.js
 * Contém as funções que realizam requisições ajax da página de mapa
 * Adicionado na página mapa.blade.php
 ***********************************************************************/
//Variáveis globais

var token = document.querySelector('meta[name=_token]').content;
var ajax_url = window.location.href + '/';
/************************************************************************
 * @function changeUnidadeTerritorial
 * @param {string} undTerr - Indica para qual unidade territorial vai ser alterada
 * as opções são 'municipio' e 'terrID'
 * Obtem o geoJSON com as unidades Territoriais e modifica o mapa
 * é colocado inicialmente um produto específico para gerar um mapa já colorido
 *************************************************************************/

function changeUnidadeTerritorial(undTerr, layerGroup) {
    jQuery.ajax({
        type: 'POST',
        url: ajax_url + 'getUnidadeTerritorial',
        data: {
            _token: token,
            undTerr: undTerr
        },
        success: function success(data) {
            console.log(data.geojson);
            layerGroup.clearLayers();
            layerGroup.addData(data.geojson);
        },
        error: function error(_error) {
            console.error(_error);
            alert("Erro no Ajax !");
        }
    });
}

changeUnidadeTerritorial('terrID', unidTerrLayerGroup); //init

/************************************************************************
 * @function showFeature
 * @param {Object} inp - Elemento input passado através do this
 * Retorna as variáveis selecionáveis a partir do produto selecionado
 *************************************************************************/

function showFeature(e) {
    jQuery.ajax({
        type: 'POST',
        url: ajax_url + 'getFeature',
        data: {
            _token: token,
            idProd: produto,
            idVar: variable,
            control: control
        },
        success: function success(data) {
            map.fitBounds(e.getBounds());
            showChart2(e.feature.properties.id, e.feature.properties.nomeUnidade);
        },
        error: function error(_error) {
            console.error(_error);
            alert("Erro no Ajax !");
        }
    });
}
/************************************************************************
 * @function getVariables
 * @param {HTML element} inp - Elemento input passado através do this
 * Retorna as variáveis selecionáveis a partir do produto selecionado
 *************************************************************************/


function getVariables(inp) {
    inpVariable = document.getElementById("nomeVariavel");
    jQuery.ajax({
        type: 'POST',
        url: ajax_url + 'getVariables',
        data: {
            _token: token,
            product: inp.value,
            control: control
        },
        success: function success(data) {
            data.variables.forEach(function(element) {
                data.relation.forEach(function(item) {
                    if (element.id == item.fk_id_variavel) {
                        inpVariable.innerHTML = "\n                            <option value=\"".concat(element.id, "\"> ").concat(element.nome, " </option>\n                        ");
                    }
                });
            });
            update();
        },
        error: function error(_error) {
            console.error(_error);
            alert("Erro no Ajax !");
        }
    });
}
/**
 * 
 * @param {*} e 
 */


function plotarMapa() {
    console.log(control);
    var produto = 1;
    var variable = 1;
    var ano = '2000';
    jQuery.ajax({
        type: 'POST',
        url: ajax_url + 'getMapData',
        data: {
            _token: token,
            idProd: 1,
            idVar: 1,
            control: control,
            year: ano
        },
        success: function success(data) {
            pintarMapa(data);
            changeUnidadeTerritorial('municipio', unidTerrLayerGroup);
        },
        error: function error(_error) {
            console.error(_error);
            alert("Erro no Ajax !");
        }
    });
}

var total;
var id;
var intervals;
/**
 * Pinta o mapa de acordo com as informações passadas pelo parâmetro.
 * @param {Object} data 
 */

function pintarMapa(data) {
    total = data.total;
    var splitValue; //Verifica o tamanho do array retornado pelo controller e divide ele de acordo com a necessidade

    if (total.length >= 8) {
        //Se existirem mais de 8 dados, divide os intervalos em 9
        splitValue = 8;

        var _interval = (total[total.length - 1].valor - total[0].valor) / 8;

        intervals = [];

        for (i = 0; i < 9; i++) {
            intervals[i] = _interval * i + parseFloat(total[0].valor);
        }
    } else if (total.length > 1 && total.length < 8) {
        //Se existir mais de 1 e menos de 8
        var _interval2 = (total[total.length - 1].valor - total[0].valor) / total.length;

        _interval2 = Math.round(_interval2);
        intervals = [];
        intervals[0] = total[0].valor;

        for (i = 1; i < total.length; i++) {
            intervals[i] = _interval2 * i;
        }
    } else if (total.length == 1) {
        //Se existir somente 1
        interval = total[0];
        intervals = [];
        intervals[0] = 1;
        intervals[1] = interval.valor;
    }

    var div = document.getElementById("legend");
    console.log(total);
    div.innerHTML = "<p>" + " / " + " <br> ";
    "</p>";
    var grades = intervals;
    var labels = []; // percorre os intervalos para gerar a legenda de acordo com a divisão já feita.

    if (total.length > 1) {
        div.innerHTML += '<i style="background:grey"></i> Sem produção registrada <br>';

        for (var i = 0; i < grades.length - 1; i++) {
            div.innerHTML += '<i style="background:' + getColor(grades[i]) + '"></i> ' + Intl.NumberFormat('pt-BR', {
                maximumFractionDigits: 0
            }).format(grades[i]) + (Intl.NumberFormat('pt-BR', {
                maximumFractionDigits: 0
            }).format(grades[i + 1]) ? " &ndash; " + Intl.NumberFormat('pt-BR', {
                maximumFractionDigits: 0
            }).format(grades[i + 1]) + "<br>" : "10");
        }
    }
}

var colors = [ //array de cores a serem utilizadas pelo mapa
    "#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"
];
/**
 * Método para encontrar o valor do respectivo município
 * @param {number} ID 
 * @param {Array} arr 
 */

function findValueInArray(ID, arr) {
    if (typeof arr !== 'undefined') {
        for (var i = 0; i < arr.length; i++) {
            var id;
            id = arr[i].id;

            if (id == ID) {
                return arr[i].valor;
            }
        }

        return 0;
    }
}
/**
 * Função que retorna pinta uma feature do geoJson passada como parâmetro.
 * Caso essa feature não possua dados, ela é colorida de cinza.
 * @param {geojson feature} feature 
 */


function style(feature) {
    id = feature.properties.id;

    if (findValueInArray(id, total) > 0) {
        return {
            fillColor: getColor(findValueInArray(id, total)),
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
/**
 * Função auxiliar que serve para dividir o array em partes 
 * @param {Array} myArray Array a ser dividido
 * @param {integer} chunk_size Número de divisões a serem feitas
 */


function chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index + chunk_size); // Do something if you want with the group

        tempArray.push(myChunk[myChunk.length - 1].valor);
    }

    return tempArray;
}
/**
 * Função que busca a cor apropiada para pintar a feature especificada do geoJson
 * @param {*} d número para buscar cor correspondente
 */


function getColor(d) {
    if (typeof intervals !== 'undefined') {
        var ngg = intervals.map(function(e) {
            return parseFloat(e);
        });
        ngg.push(Number.POSITIVE_INFINITY);

        for (var i = 0; i < ngg.length - 1; i++) {
            if (d >= ngg[i] && d <= ngg[i + 1]) return colors[i];
        }
    }
}