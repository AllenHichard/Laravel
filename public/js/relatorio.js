function vazio(divBotoesIndividual, inputTipo, inp, arr, vet) {


}

function habilitarBotaoOperador() {
    var existeProduto = false;
    var existeVariavel = false
    if (tipoSelecionado == null) {
        document.getElementById("submit").disabled = true;
    } else if (producaoSelecionadas.length == 0) {
        document.getElementById("submit").disabled = true;
    } else if (Produtos.length == 0) {
        document.getElementById("submit").disabled = true;
    } else if (Variaveis.length == 0) {
        document.getElementById("submit").disabled = true;
    } else {
        document.getElementById("submit").disabled = false;
    }
    for (var i = 0; i < Produtos.length; i++) {
        if (Produtos[i].length > 0) {
            existeProduto = true;
        }
    }
    for (var i = 0; i < Variaveis.length; i++) {
        if (Variaveis[i].length > 0) {
            existeVariavel = true;
        }
    }
    if (!(existeProduto && existeVariavel)) {
        document.getElementById("submit").disabled = true;
    }
}


function habilitarBotao() {
    var existeProduto = false;
    var existeVariavel = false
    if (tipoSelecionado == null) {
        document.getElementById("submit").disabled = true;
    } else if (nomesSelecionados.length == 0) {
        document.getElementById("submit").disabled = true;
    } else if (producaoSelecionadas.length == 0) {
        document.getElementById("submit").disabled = true;
    } else if (Produtos.length == 0) {
        document.getElementById("submit").disabled = true;
    } else if (Variaveis.length == 0) {
        document.getElementById("submit").disabled = true;
    } else {
        document.getElementById("submit").disabled = false;
    }
    for (var i = 0; i < Produtos.length; i++) {
        if (Produtos[i].length > 0) {
            existeProduto = true;
        }
    }
    for (var i = 0; i < Variaveis.length; i++) {
        if (Variaveis[i].length > 0) {
            existeVariavel = true;
        }
    }
    if (!(existeProduto && existeVariavel)) {
        document.getElementById("submit").disabled = true;
    }
}


function autocomplete(divBotoesIndividual, inputTipo, inp, arr, vet) {

    //console.log(arr);

    // condição quando perde o foco
    inp.addEventListener('blur', function(e) {
        //console.log("Perdeu Foco");
        focus = false;

    });


    // condição quando ganha foco
    var currentFocus;
    inp.addEventListener('focus', function(e) {
        //console.log("ganhou foco");

        var a, b, i, val = this.value;
        focus = true;
        closeAllLists();

        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items " + inputTipo);
        if (arr.length > 11) {
            a.setAttribute("style", "overflow:scroll;height:400px;width:100%;overflow:auto"); //
        }
        ////console.log(arr);
        ////console.log(arr.length);
        for (i = 0; i < arr.length; i++) {

            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' id = 'campo'  value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                var index = arr.indexOf(inp.value);
                arr.splice(index, 1);
                gerarBotao(divBotoesIndividual, inputTipo, inp.value, arr, vet);
                inp.value = "";
                closeAllLists();
                habilitarBotao();

            });
            a.appendChild(b);
        }
        //console.log(a);
        //console.log(this.parentNode)
        this.parentNode.appendChild(a);
        //console.log(this.parentNode)

    });



    inp.addEventListener("input", function(e) {
        //console.log("ok 2");
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { // condição quando está vazio ao apagar
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items " + inputTipo);
            if (arr.length > 11) {
                a.setAttribute("style", "overflow:scroll;height:400px;width:100%;overflow:auto"); //
            }
            for (i = 0; i < arr.length; i++) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' id = 'campo'  value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    var index = arr.indexOf(inp.value);
                    arr.splice(index, 1);
                    gerarBotao(divBotoesIndividual, inputTipo, inp.value, arr, vet);
                    inp.value = "";
                    closeAllLists();
                    habilitarBotao();

                });
                a.appendChild(b);
            }
            this.parentNode.appendChild(a);
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items " + inputTipo);

        this.parentNode.appendChild(a);
        //console.log(this.parentNode);
        ////console.log(arr);
        ////console.log(arr.length);
        tam = 0;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                tam++;
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' id = 'campo'  value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    var index = arr.indexOf(inp.value);
                    arr.splice(index, 1);
                    gerarBotao(divBotoesIndividual, inputTipo, inp.value, arr, vet);
                    inp.value = "";
                    closeAllLists();
                    habilitarBotao();

                });
                a.appendChild(b);
            }
        }
        if (tam > 11) {
            a.setAttribute("style", "overflow:scroll;height:400px;width:100%;overflow:auto"); //
        }

    });


    inp.addEventListener("keydown", function(e) {
        //console.log("ok 2");
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();

            }
        }
    });


    function addActive(x) {
        //console.log("ok 2");
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        //console.log("ok 2");
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        //console.log("Limpar");
        var x = document.getElementsByClassName("autocomplete-items");

        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                //console.log("aaaa");
                x[i].parentNode.removeChild(x[i]);

            }
        }
    }
    document.addEventListener("click", function(e) {
        if (!focus) closeAllLists(e.target);
    });
}



function gerarBotao(divBotoesIndividual, inputTipo, tipo, arr, vet) {
    vet.push(tipo);
    var divb = document.getElementById(divBotoesIndividual);
    var divIndividualBotoes = document.createElement('div');
    divIndividualBotoes.id = tipo;
    divIndividualBotoes.className = "clickBotao" + inputTipo;
    divIndividualBotoes.style = "margin-right:5px;";
    var botao = document.createElement('button');
    //botao.id = tipo;
    botao.className = tipo + " input-group-text";
    botao.style = "color: #fff;background-color: #17a2b8; border-color: #17a2b8;";
    botao.type = "button";
    var texto_botao = document.createTextNode(tipo);
    botao.appendChild(texto_botao);
    divIndividualBotoes.appendChild(botao);
    divb.appendChild(divIndividualBotoes);
    document.getElementById(tipo).addEventListener("click", function() {
        var list = document.getElementById(divBotoesIndividual);
        list.removeChild(divIndividualBotoes);
        arr.push(divIndividualBotoes.id);
        arr.sort();
        var index = vet.indexOf(tipo);
        indexRemoveProdVar = index;
        vet.splice(index, 1);
        habilitarBotao();
        //autocomplete(divBotoesIndividual, inputTipo, document.getElementById(inputTipo), arr, vet);
    });
}

function criarInputDinamico(referenciaPosicao, id_divBotao_E_Input, class_delete_div_botao_input, nomeTipoSelecionado, identificador) { // tipoInput é = Produto ou Variável
    ////console.log("criando input");
    //divReferencia = posicao na tela do compomente
    var divReferencia = document.getElementById(referenciaPosicao);
    var divBotao_E_Input = document.createElement('div');
    divBotao_E_Input.id = id_divBotao_E_Input;
    divBotao_E_Input.className = class_delete_div_botao_input;

    var divInternaBotao = document.createElement('div');
    divInternaBotao.id = "div" + nomeTipoSelecionado + identificador + "Botoes";
    divInternaBotao.className = "input-group-prepend";

    var divInternaInput = document.createElement('div');
    divInternaInput.className = "autocomplete";
    divInternaInput.style = "width:300px;";

    var entradaInput = document.createElement('input');
    entradaInput.id = "input" + nomeTipoSelecionado + identificador;
    entradaInput.type = "text";
    //entradaInput.name = idNameInput;
    entradaInput.placeholder = nomeTipoSelecionado;
    divInternaInput.appendChild(entradaInput);
    divBotao_E_Input.appendChild(divInternaBotao);
    divBotao_E_Input.appendChild(divInternaInput);
    divReferencia.appendChild(divBotao_E_Input);
    ////console.log(divMaior);

}


function apagarInputDinamico(referenciaPosicao, class_delete_div_botao_input, produto, variavel) {
    var divDinamica = document.getElementById(referenciaPosicao);
    var elementos = document.getElementsByClassName(class_delete_div_botao_input);
    while (elementos.length > 0) {
        ////console.log(elementos.length);
        divDinamica.removeChild(document.getElementsByClassName(class_delete_div_botao_input)[0]);
        elementos = document.getElementsByClassName(class_delete_div_botao_input);
    }

    // removendo

    for (var i = 0; i < 3; i++) {

        while (Produtos[i].length > 0) {
            Produtos[i].pop();
        }

        while (Variaveis[i].length > 0) {
            Variaveis[i].pop();
        }
    }


}

function apagarInputDinamicoPeloBotao(referenciaPosicao, idInputDinamico, idBotao) {
    var divDinamica = document.getElementById(referenciaPosicao);
    var elemento = document.getElementById(idInputDinamico);
    //document.getElementById("corpo" + idBotao).innerHTML = "";
    //console.log(divDinamica)
    //console.log(elemento)
    divDinamica.removeChild(elemento);
    habilitarBotao();

}

function preenchimento(divBotoesIndividual, inputTipo, data, vet) {
    var vetor_nomes = data.success;
    //console.log(vetor_nomes)
    autocomplete(divBotoesIndividual, inputTipo, document.getElementById(inputTipo), Object.keys(vetor_nomes).map(function(x) {
        return vetor_nomes[x].nome;
    }), vet);
}

//div" + idNameInput + tipoInput + "Botoes

function preenchimentoProduto(divBotoesIndividual, inputTipo, data, vet, i) {
    var vetor_nomes = data.success;
    console.log(vetor_nomes)
    autocomplete(divBotoesIndividual, inputTipo, document.getElementById(inputTipo), Object.keys(vetor_nomes).map(function(x) {
        return vetor_nomes[x].nome_produto;
    }), vet);
}

function preenchimentoVariavel(divBotoesIndividual, inputTipo, data, vet) {
    var vetor_nomes = data.success2;
    autocomplete(divBotoesIndividual, inputTipo, document.getElementById(inputTipo), Object.keys(vetor_nomes).map(function(x) {
        return vetor_nomes[x].nome;
    }), vet);
}




function CriaPDF() {
    var minhaTabela = document.getElementById('tabela').innerHTML;
    console.log(minhaTabela);
    var style = "<style>";
    style = style + "table {width: 100%;font: 20px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";
    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=1000,width=1000');
    win.document.write('<html><head>');
    win.document.write('<title>Relatório de Produção</title>'); // <title> CABEÇALHO DO PDF.
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


function criarTabelas(data, correlacao) {
    document.getElementById("corpo" + "pecuaria").innerHTML = "";
    document.getElementById("corpo" + "agricola").innerHTML = "";
    document.getElementById("corpo" + "silvicultura").innerHTML = "";
    document.getElementById("AreaGrafico_" + "pecuaria").innerHTML = "";
    document.getElementById("AreaGrafico_" + "agricola").innerHTML = "";
    document.getElementById("AreaGrafico_" + "silvicultura").innerHTML = "";


    for (var i = 0; i < producaoSelecionadas.length; i++) {
        if (producaoSelecionadas[i] == 'pecuaria') {
            criarTabela(data, 'pecuaria', i, correlacao);
        } else if (producaoSelecionadas[i] == 'agricola') {
            criarTabela(data, 'agricola', i, correlacao);
        } else if (producaoSelecionadas[i] == 'silvicultura') {
            criarTabela(data, 'silvicultura', i, correlacao);
        }
    }
}

function criarTabela(data, producao, index, correlacao) {

    var temp;
    if (tipoSelecionado == "municipio") {
        temp = data.resultados;
    } else {
        temp = data.agrupado;
    }


    var resultados = data.resultados;


    ////console.log(resultados[0][7].data);
    //console.log(producao);
    var id = "corpo" + producao;

    /*var f_subdivisoes = data.subdivisao;
    var f_municipios = data.municipio;
    var f_nomeProdutos = data.produto;
    var f_valorProdutos = data.variavel;
    var f_datas = data.resultado;
    var f_valores = data.resultado;*/
    var corpo_tabela = document.getElementById(id);
    //console.log(corpo_tabela);
    var linha = document.createElement("tr");
    var posicao = document.createElement("th");
    var estado = document.createElement("th");
    var subdivisao = document.createElement("th");
    var municipio = document.createElement("th");
    var nomeProduto = document.createElement("th");
    var Caracteristica = document.createElement("th");
    var data = document.createElement("th");
    var valor = document.createElement("th");

    linha.appendChild(posicao);
    linha.appendChild(municipio);
    linha.appendChild(estado);
    linha.appendChild(subdivisao);
    linha.appendChild(nomeProduto);
    linha.appendChild(Caracteristica);
    linha.appendChild(data);
    linha.appendChild(valor);

    corpo_tabela.appendChild(linha);

    for (var i = 0; i < resultados[index].length; i++) {
        var linha = document.createElement("tr");

        var posicao = document.createElement("td");
        var estado = document.createElement("td");
        var subdivisao = document.createElement("td");
        var municipio = document.createElement("td");
        var nomeProduto = document.createElement("td");
        var Caracteristica = document.createElement("td");
        var data = document.createElement("td");
        var valor = document.createElement("td");

        var texto_posicao = document.createTextNode(i + 1);
        var texto_estado = document.createTextNode("BAHIA");
        var texto_subdivisao = document.createTextNode(resultados[index][i].subdivisao);
        var texto_municipio = document.createTextNode(resultados[index][i].nome);
        var texto_producao = document.createTextNode(resultados[index][i].nome_produto);
        var texto_caracteristica = document.createTextNode(resultados[index][i].variavel);
        var texto_data = document.createTextNode(resultados[index][i].data);
        var texto_valor = document.createTextNode(resultados[index][i].valor);

        posicao.appendChild(texto_posicao);
        estado.appendChild(texto_estado);
        subdivisao.appendChild(texto_subdivisao);
        municipio.appendChild(texto_municipio);
        nomeProduto.appendChild(texto_producao);
        Caracteristica.appendChild(texto_caracteristica);
        data.appendChild(texto_data);
        valor.appendChild(texto_valor);

        linha.appendChild(posicao);
        linha.appendChild(estado);
        linha.appendChild(subdivisao);
        linha.appendChild(municipio);
        linha.appendChild(nomeProduto);
        linha.appendChild(Caracteristica);
        linha.appendChild(data);
        linha.appendChild(valor);
        corpo_tabela.appendChild(linha);
    }
    //console.log("---- Printando ----");
    //console.log(Produtos);
    //console.log(Variaveis);
    //console.log("---- # ----");
    // document.getElementById("AreaGrafico_" + producao).innerHTML = "";

    resultados = temp;
    console.log("jioijosadiojasd");
    console.log(resultados);

    if (!operadores) {
        if (correlacao == 'cidades') {
            for (var indexProduto = 0; indexProduto < Produtos[index].length; indexProduto++) {
                for (var indexVariavel = 0; indexVariavel < Variaveis[index].length; indexVariavel++) {
                    var existePar = false;
                    for (var k = 0; k < resultados[index].length; k++) {


                        if (resultados[index][k].nome_produto == Produtos[index][indexProduto] && resultados[index][k].variavel == Variaveis[index][indexVariavel]) {
                            existePar = true;
                            //console.log("entrou no if existe relação");
                            break;
                        }
                    }
                    if (existePar) {
                        criarGraficoBarras(resultados, producao, index, indexProduto, indexVariavel, Produtos[index][indexProduto], Variaveis[index][indexVariavel]);
                        criarGraficoLinhaTemporal(resultados, producao, index, indexProduto, indexVariavel, Produtos[index][indexProduto], Variaveis[index][indexVariavel]);
                    }
                }
            }
        } else {
            for (var indexCidade = 0; indexCidade < nomesSelecionados.length; indexCidade++) {
                for (var indexVariavel = 0; indexVariavel < Variaveis[index].length; indexVariavel++) {
                    criarGraficoBarrasProduto(resultados, producao, index, indexCidade, indexVariavel, nomesSelecionados[indexCidade], Variaveis[index][indexVariavel]);
                    criarGraficoLinhaTemporalProduto(resultados, producao, index, indexCidade, indexVariavel, nomesSelecionados[indexCidade], Variaveis[index][indexVariavel]);
                }
            }
        }
    }

}


function agruparDatasPorProduto(resultados, produtos, anos, index, indexCidade, indexVariavel) {
    var resultadoGraficoBarras = [];
    for (var i = 0; i < produtos.length; i++) {
        resultadoGraficoBarras.push(procurarElementoPorAnoProduto(resultados, produtos[i], nomesSelecionados[indexCidade], Variaveis[index][indexVariavel], anos, index));
    }
    return resultadoGraficoBarras;
}

function agruparDatasPorCidades(resultados, nomesSelecionados, anos, index, indexProduto, indexVariavel) {
    var resultadoGraficoBarras = [];
    for (var i = 0; i < nomesSelecionados.length; i++) {
        resultadoGraficoBarras.push(procurarElementoPorAno(resultados, nomesSelecionados[i], Produtos[index][indexProduto], Variaveis[index][indexVariavel], anos, index));
    }
    return resultadoGraficoBarras;
}



function procurarElementoPorAnoProduto(resultados, produto, cidade, variavel, anos, index) {
    var existeAno;
    var datas = [];
    var valores = [];
    var produtos = [];
    var variaveis = [];
    var resultadoGraficoBarrasAux = [];
    //console.log(index);
    //console.log(resultados);
    for (var i = 0; i < anos.length; i++) {
        existeAno = false;
        for (var j = 0; j < resultados[index].length; j++) {
            if (resultados[index][j].data == anos[i] && resultados[index][j].nome == cidade &&
                resultados[index][j].nome_produto == produto && resultados[index][j].variavel == variavel && !existeAno) {
                existeAno = true;
                datas.push(anos[i]);
                valores.push(resultados[index][j].valor);
                //break;
            }
        }
        if (!existeAno) {
            datas.push(anos[i]);
            valores.push(0);
        }
    }
    resultadoGraficoBarrasAux.push(datas);
    resultadoGraficoBarrasAux.push(valores);
    return resultadoGraficoBarrasAux;
}

function procurarElementoPorAno(resultados, cidade, produto, variavel, anos, index) {
    var existeAno;
    var datas = [];
    var valores = [];
    var produtos = [];
    var variaveis = [];
    var resultadoGraficoBarrasAux = [];
    //console.log(index);
    //console.log(resultados);
    for (var i = 0; i < anos.length; i++) {
        existeAno = false;
        for (var j = 0; j < resultados[index].length; j++) {
            if (resultados[index][j].data == anos[i] && resultados[index][j].nome == cidade &&
                resultados[index][j].nome_produto == produto && resultados[index][j].variavel == variavel && !existeAno) {
                existeAno = true;
                datas.push(anos[i]);
                valores.push(resultados[index][j].valor);
                //break;
            }
        }
        if (!existeAno) {
            datas.push(anos[i]);
            valores.push(0);
        }
    }
    resultadoGraficoBarrasAux.push(datas);
    resultadoGraficoBarrasAux.push(valores);
    return resultadoGraficoBarrasAux;
}



// Converted to SCSS. If you want to grab just the CSS, click the `View Compiled` button on the css window over there <-- . That will list out the compiled css for you to use. Grab all the css between the comments and the html between the comments and it should work like a champ anywhere you place it.
// All this jquery is just used for presentation. Not required at all for the radio buttons to work.
$(document).ready(function() {
    //   Hide the border by commenting out the variable below
    var $on = 'section';
    $($on).css({
        'background': 'none',
        'border': 'none',
        'box-shadow': 'none'
    });
});
