var total;
var id;
var intervals;

/**
 * Pinta o mapa de acordo com as informações passadas pelo parâmetro.
 * @param {Object} data 
 */
function pintarMapa(data) {
    total = data.total;
    var splitValue;
    //Verifica o tamanho do array retornado pelo controller e divide ele de acordo com a necessidade
    if (total.length >= 8) {
        //Se existirem mais de 8 dados, divide os intervalos em 9
        splitValue = 8;
        let interval = (total[total.length - 1].valor - total[0].valor) / 8;
        intervals = [];
        for (i = 0; i < 9; i++) {
            intervals[i] = (interval * i) + parseFloat(total[0].valor);
        }
    } else if (total.length > 1 && total.length < 8) {
        //Se existir mais de 1 e menos de 8
        let interval = (total[total.length - 1].valor - total[0].valor) / total.length;
        interval = Math.round(interval);
        intervals = [];
        intervals[0] = total[0].valor;
        for (i = 1; i < total.length; i++) {
            intervals[i] = interval * i
        }
    } else if (total.length == 1) {
        //Se existir somente 1
        interval = total[0];
        intervals = [];
        intervals[0] = 1;
        intervals[1] = interval.valor;
    }
    var div = document.getElementById("legend");
    console.log(total)
    div.innerHTML = "<p>" + " / " + " <br> "
    "</p>"
    var grades = intervals;
    var labels = [];
    // percorre os intervalos para gerar a legenda de acordo com a divisão já feita.
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
}


var colors = [ //array de cores a serem utilizadas pelo mapa
    "#FFEDA0",
    "#FED976",
    "#FEB24C",
    "#FD8D3C",
    "#FC4E2A",
    "#E31A1C",
    "#BD0026",
    "#800026"
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
        myChunk = myArray.slice(index, index + chunk_size);
        // Do something if you want with the group
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
        let ngg = intervals.map(e => parseFloat(e));
        ngg.push(Number.POSITIVE_INFINITY);
        for (let i = 0; i < ngg.length - 1; i++) {
            if (d >= ngg[i] && d <= ngg[i + 1]) return colors[i];
        }
    }
}