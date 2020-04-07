function criarlinhas(matriz, ref, idref) {
    corLinha = 0;
    var tabela = document.getElementById(ref);
    var colunas = ["Data", "Produto", "Praça", "Tipo", "Unidade", "Valor", "Adicionar"];


    for (var i = 0; i < matriz[0].length; i++) {

        var linha = document.createElement("div");
        linha.className = "row dinamico" + idref;


        var celula = document.createElement("div");
        celula.className = "cell titulo";

        var input = document.createElement("input");
        input.type = "checkbox";
        input.name = "checkBox" + idref;
        input.id = idref + "-" + i;
        input.className = "estiloColunaCheck checkBox" + idref;

        input.addEventListener('change', function(e) {
            console.log($(this)[0].id);
        });



        celula.appendChild(input);
        linha.appendChild(celula);


        for (var j = 1; j < 5; j++) {
            var celula = document.createElement("div");
            celula.className = "cell";
            celula.title = colunas[j];
            celula.textContent = matriz[j][i];
            celula.setAttribute("data-title", colunas[j]);
            linha.appendChild(celula);
        }

        var celula = document.createElement("div");
        celula.className = "cell";
        celula.title = "Preço";
        celula.setAttribute("data-title", "Preço");
        var input = document.createElement("input");
        input.id = "preco-" + idref + "-" + i;

        if (corLinha % 2 == 0) {
            linha.style = "background-color: #f6f6f6; color: #666666";
            input.style = "background-color: #f6f6f6; color: #666666";
            corLinha++;
        } else {
            linha.style = "background-color: #e9e9e9; color: #666666";
            input.style = "background-color: #e9e9e9; color: #666666";
            corLinha--;
        }
        input.placeholder = matriz[5][i];
        //celula.value = matriz[5][i];
        input.placeholder.style = "color: #666666";
        input.className = "estiloInputValor";
        input.title = colunas[5];
        celula.append(input);
        linha.appendChild(celula);
        tabela.appendChild(linha);


    }

}

function criarlinhaBotao() {
    var tabela = document.getElementById("tabelaCadastro");
    var colunas = ["Data", "Produto", "Praça", "Tipo", "Unidade", "Valor"]
    var linha = document.createElement("div");
    linha.className = "row";
    for (var i = 0; i < colunas.length; i++) {
        var celula = document.createElement("div");
        celula.className = "cell";
        celula.title = colunas[i];
        linha.appendChild(celula);
    }
    tabela.appendChild(linha);
}


function converteJsonMatriz(data) {
    var matriz = [];
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].data; }));
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].produto; }));
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].praca; }));
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].tipo; }));
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].unidade; }));
    matriz.push(Object.keys(data.data).map(function(x) { return data.data[x].preco; }));
    return matriz;
}

function limparTabela(ref, idref) {
    //console.log("tamanho da limpeza")
    //console.log(document.getElementsByClassName("dinamico" + idref).length);
    //console.log(tamanhoDelementos = document.getElementsByClassName("checkBox0").length);
    //console.log(MatrizFiltradaAnterior[0].length);
    //console.log("Fim da limpeza")
    var tabela = document.getElementById(ref);
    while (document.getElementsByClassName("dinamico" + idref).length > 0) {
        //document.getElementsByClassName("dinamico" + idref)[i].innerHTML = "";
        tabela.removeChild(document.getElementsByClassName("dinamico" + idref)[0]);
    }
    // precisa mudar para usar o removeChild e não somente limpar, pois os elementos ainda ficam no arquivo porém oculto.
}


function manipularExibicao(ref, idref, indexs) {
    var tabela = document.getElementById(ref);
    for (var i = 0; i < indexs.length; i++) {
        console.log(document.getElementsByClassName("dinamico" + idref)[indexs[i]].style.display = "none");
    }
}

function exibirTodos(ref, idref, indexs) {
    var tabela = document.getElementById(ref);
    console.log("Tabela Atual");
    console.log(tabela);
    for (var i = 0; i < indexs.length; i++) {
        console.log(document.getElementsByClassName("dinamico" + idref)[indexs[i]].style.display = "");
    }
}


function filtrarMatrizHoje(cidade, produto, idDinamic) {
    var nomeTabela = "tabelaAtual"
    var tabela = document.getElementById(nomeTabela);
    var listElem1 = document.getElementsByClassName("checkBox" + idDinamic);
    var element;


    for (var i = 0; i < listElem1.length; i++) {
        element = document.getElementsByClassName("dinamico" + idDinamic)[i].style.display = "";
        //console.log(element);
    }
    if (cidade != "*" && produto == "*") {
        console.log("cidade");
        for (var i = 0; i < listElem1.length; i++) {
            element = document.getElementsByClassName("dinamico" + idDinamic)[i];
            var nomeCidade = element.getElementsByClassName("cell")[2].textContent;
            if (nomeCidade != cidade) {
                document.getElementsByClassName("dinamico" + idDinamic)[i].style.display = "none"
            }
        }
    } else if (cidade == "*" && produto != "*") {
        console.log("produto");
        for (var i = 0; i < listElem1.length; i++) {
            element = document.getElementsByClassName("dinamico" + idDinamic)[i];
            var nomeProduto = element.getElementsByClassName("cell")[1].textContent;
            if (nomeProduto != produto) {
                document.getElementsByClassName("dinamico" + idDinamic)[i].style.display = "none"
            }
        }
    } else if (cidade != "*" && produto != "*") {
        console.log("Ambos");
        for (var i = 0; i < listElem1.length; i++) {
            element = document.getElementsByClassName("dinamico" + idDinamic)[i];
            var nomeProduto = element.getElementsByClassName("cell")[1].textContent;
            var nomeCidade = element.getElementsByClassName("cell")[2].textContent;
            if (nomeProduto != produto || nomeCidade != cidade) {
                document.getElementsByClassName("dinamico" + idDinamic)[i].style.display = "none"
            }
        }
    }

}


function filtrarMatriz(matriz, cidade, produto, tabela, idtabela) {

    if (cidade != "*" && produto == "*") {
        matrizPorCidade(matriz, cidade, produto, tabela, idtabela);
    } else if (cidade == "*" && produto != "*") {
        matrizPorProduto(matriz, cidade, produto, tabela, idtabela);
    } else if (cidade != "*" && produto != "*") {
        matrizPorProdutoECidade(matriz, cidade, produto, tabela, idtabela);
    }
}


function matrizPorCidade(matriz, cidade, produto, tabela, idtabela) {
    //matriz[2][i]
    var indexs = [];
    for (var i = 0; i < matriz[2].length; i++) {
        if (matriz[2][i] != cidade) {
            indexs.push(i);
        }
    }
    console.log("Index Cidade");
    console.log(indexs);
    manipularExibicao(tabela, idtabela, indexs);
}

function matrizPorProduto(matriz, cidade, produto, tabela, idtabela) {
    //matriz[2][i]
    var indexs = [];
    for (var i = 0; i < matriz[1].length; i++) {
        if (matriz[1][i] != produto) {
            indexs.push(i);
        }
    }
    console.log("Index Produto");
    console.log(indexs);
    manipularExibicao(tabela, idtabela, indexs);
}


function matrizPorProdutoECidade(matriz, cidade, produto, tabela, idtabela) {
    //matriz[2][i]
    var indexs = [];
    for (var i = 0; i < matriz[1].length; i++) {
        if ((matriz[1][i] != produto || matriz[2][i] != cidade)) {
            indexs.push(i);
        }
    }
    console.log("Index Ambos");
    console.log(indexs);
    manipularExibicao(tabela, idtabela, indexs);
}


function createPDF() {
    let mywindow = window.open('', '', 'height=1000,width=1000');

    mywindow.document.write(`<html><head><title>Teste</title>`);
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById("tabelaAnterior").innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();

}




function geoLocalizacao() {


    /*
        var geocoder = new google.maps.Geocoder();
        var x = document.getElementById("demo");
        getLocation();
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            codeLatLng(position.coords.latitude, position.coords.longitude);
        }

        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
                case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
                case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
                case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
            }
        }
        */

}

function CriaPDF(id) {
    var minhaTabela = document.getElementById(id).innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 20px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";
    console.log(minhaTabela);
    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=1000,width=1000');
    win.document.write('<html><head>');
    win.document.write('<title>Relatório de Preços da Seagri</title>'); // <title> CABEÇALHO DO PDF.
    win.document.write(style); // INCLUI UM ESTILO NA TAB HEAD
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(minhaTabela); // O CONTEUDO DA TABELA DENTRO DA TAG BODY
    win.document.write('</body></html>');
    win.document.close(); // FECHA A JANELA
    win.print();

    function genPDF() {
        html2canvas(document.getElementById("tabela"), {
            onrendered: function(canvas) {
                var doc = new jsPDF();
                var img = canvas.toDataURL("image/png");
                doc.addImage(img, 'JPEG', 20, 20);
                doc.save('rerew.pdf');
            }
        })
    }
    //genPDF();
}
