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
            if (currentYear >= slider.options.timelineItems[slider.options.timelineItems.length - 1])
                currentYear = parseInt(slider.options.timelineItems[0]);
            currentYear += 1;
            ranking(currentYear);
            colormap(currentYear);
        }, 1500);
        e.innerHTML = `
            <span> <i class="fas fa-pause"></i> <b>Pause</b></span>
        `;
    } else {
        clearInterval(playTimer);
        scale.remove();
        slider.addTo(map);
        scale.addTo(map);
        slider.rangeLabelArray.forEach((l) => {
            if (l.innerText == currentYear) l.click();
        });
        e.classList.add('pausado');
        e.innerHTML = `
            <span> <i class="fas fa-play"></i> <b>Play</b></span>
        `;
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
var map = (function() {
    let _minZoom, _center, _zoom, _link, _linkName;
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
    let _map = L.map('map').setView(_center, _zoom);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        minZoom: _minZoom,
        attribution: `
            Powered by - <a href="/">Geodatin</a>, <a href="http://www.uefs.br">UEFS</a> and <a href="http://ppgm.uefs.br/">PPGM</a> |
            Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
            <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
            Imagery © <a href="https://www.mapbox.com/">Mapbox</a> | Fonte - <a href="${_link}"> ${_linkName} </a>
        `,
        id: 'mapbox.light'
    }).addTo(_map);
    return _map;
})();

// Variável contendo o grupo de camadas com o desenho das unidade territoriais
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
    div.innerHTML = `
        <img src="${url}/assets/north-arrow.png">
    `;
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
    div.innerHTML = `
        <button class="showFilter" onclick="openMenu()">
            <i class="fas fa-bars"></i>
        </button>
        <form autocomplete="off">
            <div id="Search" class="autocomplete" style="width:300px;">
                <input id="myInput" type="text" name="myCountry" placeholder="Buscar...">
            </div>
        </form>
    `;
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
    changeMap(event) {
        if (event.type != 'click') {
            if (typeof firstLoad !== 'undefined') {
                if (sliderFirtsLoad) {
                    let selectedYear = this.lastYear;
                    play = false;
                    currentYear = selectedYear;
                    output.innerHTML = this.lastYear;
                    colormap(this.lastYear);
                    ranking(this.lastYear);
                    sliderFirtsLoad = false;
                } else {
                    let selectedYear = parseInt(event.label);
                    play = false;
                    currentYear = selectedYear;
                    output.innerHTML = event.value;
                    colormap(selectedYear);
                    ranking(selectedYear);
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
let home = L.control({
    position: 'topleft'
});
home.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'menu-home');
    div.innerHTML = `
        <button class="showFilter" onclick="window.location.href = '/'">
            <i class="fas fa-home"></i>
        </button>
   `;
    return div;
}
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
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener('input', function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
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
                    showFeature(
                        features.find(f => f.feature.properties.nomeUnidade == inp.value)
                    );
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
    document.addEventListener('click', function(e) {
        closeAllLists(e.target);
    });
};