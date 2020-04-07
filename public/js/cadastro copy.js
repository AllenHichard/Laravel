function criarlinhas(data) {
    var tabela = document.getElementById("tabelaCadastro");
    var colunas = ["Data", "Produto", "Praça", "Tipo", "Unidade", "Valor", "Adicionar"];
    var matriz = converteJsonMatriz(data);
    for (var i = 0; i < data.data.length; i++) {
        var linha = document.createElement("div");
        linha.className = "row dinamico";
        for (var j = 0; j < 5; j++) {
            var celula = document.createElement("div");
            celula.className = "cell";
            celula.title = colunas[j];
            celula.textContent = matriz[j][i];
            linha.appendChild(celula);
        }
        var input = document.createElement("input");
        var celula = document.createElement("div");
        celula.className = "cell";
        celula.title = colunas[j];
        celula.textContent = matriz[5][i];
        celula.appendChild(input);
        linha.appendChild(celula);

    }

}

//estiloInputValor

function criarlinhaBotao() {
    var tabela = document.getElementById("tabelaCadastro");
    var colunas = ["Data", "Produto", "Praça", "Tipo", "Unidade", "Valor"]
    var linha = document.createElement("div");
    linha.className = "row ";
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