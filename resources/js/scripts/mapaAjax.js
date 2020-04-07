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
        success: function(data) {
            let years = [],
                values = [];
            data.chartResults.forEach((r) => {
                years.push(r.data);
                values.push(r.somavalor);
            });
            /*
             * Update chart info
             */
            let dataArray = [
                ['Ano', 'Valor']
            ];
            data.chartResults.forEach((r) => {
                dataArray.push([parseInt(r.data), parseFloat(r.somavalor)]);
            });
            //default size is 1/3 of the screen
            let size = {
                    width: window.screen.width / 3,
                    height: window.screen.height / 3,
                }
                //set max size
            size.width = size.width > 900 ? 900 : size.width;
            size.height = size.height > 420 ? 420 : size.height;
            var options = {
                ...chartDefaultoptions,
                ...size,
                title: data.nomeProduto,
                vAxis: {
                    title: data.nomeProduto + ' / \n' + data.nomeVariavel,
                },
            };
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(() => {
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
            document.getElementById('rankingheader').innerHTML = `
                <b>Ranking - ${data.nomeProduto} / ${ano}</b>
            `;
            let tabela = document.getElementById("rank");

            tabela.innerHTML = `
                <th>#</th>
                <th>${unidadeTerr}</th>
                <th>Produção</th>
                <th>Valor</th>
            `;
            data.ranking.forEach(und => {
                let porcentagem = (und.somavalor / data.total) * 100;
                tabela.innerHTML = `${tabela.innerHTML}
                    <tr>
                        <td>1</td>
                        <td>${und.nome}</td>
                        <td>
                            <div class="progress">
                                <div class="progress-bar" style="width: ${porcentagem}px;">
                                <b> ${porcentagem.toFixed(2)}% </b>
                                </div>
                            </div>
                        </td>
                        <td> <span class="">${und.somavalor}</span>
                        </td>
                    </tr>
                `;
            });
        },
        error: function(error) {
            console.error(error);
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
        success: data => {
            layerGroup.clearLayers();
            layerGroup.addData(data.geojson);
        },
        error: _error => {
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
            control: control,
        },
        success: data => {
            map.fitBounds(e.getBounds());
            showChart2(
                e.feature.properties.id,
                e.feature.properties.nomeUnidade
            );
        },
        error: (_error) => {
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
                        inpVariable.innerHTML = `
                            <option value="${element.id}"> ${element.nome} </option>
                        `;
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
    chartArea: { width: '100%', height: '100%', left: '20%', top: "20%", right: '22%', bottom: "20%" },
    legend: { position: 'right' },
    series: {
        0: {
            color: 'black',
            pointSize: 5,
            lineWidth: 3
        },
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
            labelInLegend: 'Tendência',
        }
    },
};

/************************************************************************
 * @event ready
 * Funções a serem ativadas após o termino da inicialização da página
 * Inicialização do mapa em uma variável
 *************************************************************************/
jQuery(document).ready(() => {
    changeUnidadeTerritorial('terrID', unidTerrLayerGroup); //init
    getInfo(1, 1, 'pecuaria', 2018, 'terrID');
});