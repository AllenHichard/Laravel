function eventoAJAX() {



    $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });

    $.ajax({
        type: 'GET',
        url: '/carregarUltimaCotacao',
        success: function(data) {
            this.data = data;
            MatrizGeral = converteJsonMatriz(data);
            //MatrizHoje = converteJsonMatriz(data);

            document.getElementById('nomeTituloAnterior').textContent = "Editar tabela do dia " + MatrizGeral[0][0];
            for (var i = 0; i < MatrizGeral[0].length; i++) {
                indexsOntem.push(i);
                //indexsHoje.push(i);
            }
            criarlinhas(MatrizGeral, "tabelaAnterior", 0);

            construirTabela(MatrizGeral, "tabelaXLS");

            /*criarlinhas(MatrizHoje, "tabelaAtual", 1);

            var tabela = document.getElementById("tabelaAtual");
            for (var i = 0; i < indexsHoje.length; i++) {
                document.getElementsByClassName("dinamico" + 1)[indexsHoje[i]].style.display = "none";
            }
            for (var i = 0; i < indexsHoje.length; i++) {
                console.log(document.getElementsByClassName("dinamico" + 1)[indexsHoje[i]].style.display);
            }*/
        },
        error: function(error) {
            alert("erro AJAX");
        }
    });

    $(document).ready(function() {
        $("#btnExport").click(function(e) {
            var a = document.createElement('a');
            //getting data from our div that contains the HTML table
            var data_type = 'data:application/vnd.ms-excel';
            var table_div = document.getElementById('tabelaXLS');
            var table_html = table_div.outerHTML;
            a.href = data_type + ', ' + escape(table_html);
            //setting the file name
            a.download = "Cotação-"+MatrizGeral[0][0]+".xls";
            //triggering the function
            a.click();
            //just in case, prevent default behaviour
            e.preventDefault();
        });
    });

    $.ajax({
        type: 'GET',
        url: '/carregarOp',
        success: function(data) {
            //console.log(data.pracas);
            //console.log(data.produtos);
            for (var j = 0; j < 2; j++) {
                for (var i = 0; i < data.produtos.length; i++) {
                    var select = document.getElementById("campoProduto" + j);
                    var option = document.createElement("option");
                    option.value = data.produtos[i].nome;
                    option.text = data.produtos[i].nome;
                    select.appendChild(option);
                }
                for (var i = 0; i < data.pracas.length; i++) {
                    var select = document.getElementById("campoPraca" + j);
                    var option = document.createElement("option");
                    option.value = data.pracas[i].praca;
                    option.text = data.pracas[i].praca;
                    select.appendChild(option);
                }
            }
        }
    });


    $(".classe0").change(function(e) {
        //console.log(document.getElementById("v").placeholder);
        var campo = $(this)[0].id;
        var valor = $(this).val();
        if (campo == "campoProduto0") {
            produto0 = valor;
        } else if (campo == "campoPraca0") {
            cidade0 = valor;
        }
        //limparTabela("tabelaAnterior", 0);
        exibirTodos("tabelaAnterior", 0, indexsOntem);
        filtrarMatriz(MatrizGeral, cidade0, produto0, "tabelaAnterior", 0);

        //criarlinhas(MatrizFiltroAnterior, "tabelaAnterior", 0, indexsOntem);

    });

    $(".classe1").change(function(e) {
        //console.log(document.getElementById("v").placeholder);
        var campo = $(this)[0].id;
        var valor = $(this).val();
        console.log("Entrou no atual");
        if (campo == "campoProduto1") {
            produto1 = valor;
        } else if (campo == "campoPraca1") {
            cidade1 = valor;
        }

        //exibirTodos("tabelaAtual", 1, indexsHoje);
        //exibirTodos("tabelaAtual", 0, indexsOntem);
        filtrarMatrizHoje(cidade1, produto1, 1);
        filtrarMatrizHoje(cidade1, produto1, 2);

        //console.log(ProSel) ;
    });

    var tamanhoDelementos = 0;
    var count = 0;

    $("#todos0").change(function(e) {
        tamanhoDelementos = document.getElementsByClassName("checkBox0").length;
        var select = document.getElementById("todos0").checked;
        if (select) {
            for (var i = 0; i < tamanhoDelementos; i++) {
                if (document.getElementById("0-" + i).disabled != true) {
                    document.getElementById("0-" + i).checked = true;
                    count++;
                }
            }
        } else {
            for (var i = 0; i < tamanhoDelementos; i++) {
                document.getElementById("0-" + i).checked = false;
            }
        }
    });

    $("#todos1").change(function(e) {
        var tabela = document.getElementById("tabelaAtual");
        var listElem = document.getElementsByClassName("checkBox1");
        var listElemAdd = document.getElementsByClassName("checkBox2");
        var select = document.getElementById("todos1").checked;

        if (select) {
            for (var i = 0; i < listElem.length; i++) {
                if (!listElem[i].disabled) {
                    listElem[i].checked = true;
                }
            }

            for (var i = 0; i < listElemAdd.length; i++) {
                if (listElemAdd[i].disabled != true) {
                    listElemAdd[i].checked = true;

                }
            }
        } else {
            for (var i = 0; i < listElem.length; i++) {
                listElem[i].checked = false;
            }
            for (var i = 0; i < listElemAdd.length; i++) {
                listElemAdd[i].checked = false;
            }

        }



    });

    $("#mover").click(function(e) {
        //tamanhoDelementos = document.getElementsByClassName("checkBox0").length;
        //console.log(tamanhoDelementos);
        console.log("Movendo");
        var valores;
        for (var i = 0; i < indexsOntem.length; i++) {
            valores = [];
            if (document.getElementById("0-" + i).checked) {
                for (var w = 0; w < 6; w++) {
                    valores.push(MatrizGeral[w][i]);
                }
                moverlinha(valores, i)
                document.getElementById("0-" + i).checked = false;
                document.getElementById("0-" + i).disabled = true;
            }
        }

        //criarlinha(valores)

        //console.log("Moveu")
        //console.log(indexsHoje);
        //criarlinhas(MatrizHoje, "tabelaAtual", 1);


        /*for (var i = 0; i < MatrizGeral[0].length; i++) {
            if (document.getElementById("0-" + i).checked) {
                document.getElementById("0-" + i).checked = false;
                document.getElementById("0-" + i).disabled = true;
                document.getElementsByClassName("dinamico" + 1)[indexsHoje[i]].style.display = "";
            }
        }
        document.getElementById("todos0").checked = false;*/

    });



    $("#editar").click(function(e) {
        console.log("Editar");
        MatrizGeralCopia = atualizarValoresMatrizAnterior();
        console.log(MatrizGeral);
        console.log(MatrizGeralCopia);
        $.ajax({
            type: 'POST',
            url: '/atualizarDiaAnterior',
            data: {
                MatrizGeralCopia: MatrizGeralCopia,
                MatrizGeral: MatrizGeral,
            },
            success: function(data) {
                alert(data.salvo);
                //criarlinhas(MatrizGeral,"tabelaAtual", 1);
            },
            error: function(error) {
                alert("erro AJAX");
            }
        });
    });


    $("#remover").click(function(e) {
        console.log("Remover");

        var tabela = document.getElementById("tabelaAtual");
        var listElemAdd = document.getElementsByClassName("checkBox1");
        var reload = document.getElementsByClassName("checkBox0");
        var listaRemove = [];
        var element;
        var index;
        for (var i = 0; i < listElemAdd.length; i++) {
            if (listElemAdd[i].checked) {
                element = document.getElementsByClassName("dinamico" + 1)[i];
                index = document.getElementsByClassName("checkBox1")[i].id.split("-")[1];
                listaRemove.push(element);
                reload[index].checked = false;
                reload[index].disabled = false;
                //document.getElementsByClassName("dinamico" + 1)[indexsHoje[i]].style.display = "none";
                //document.getElementById("1-" + i).checked = false;
                //document.getElementById("0-" + i).disabled = false;
            }
        }

        for (var i = 0; i < listaRemove.length; i++) {
            tabela.removeChild(listaRemove[i]);
        }

        // cuidado quando se inserir foda de ordem, o ideal seria o dia de hoje ser uma cópia escondida de ontem
        // daí quando ele selecionar, só ser habilitado a visualização do outro lado. Asism sempre o 0-n será igual a 1-n
        /*for (var i = 0; i < indexsOntem.length; i++) {
            if (document.getElementById("1-" + i).checked) {
                document.getElementsByClassName("dinamico" + 1)[indexsHoje[i]].style.display = "none";
                document.getElementById("1-" + i).checked = false;
                document.getElementById("0-" + i).disabled = false;
                //document.getElementsByClassName("dinamico" + 1)[indexsHoje[i]].style.display = "";
            }
        }
        */

        var tabela = document.getElementById("tabelaAtual");
        //console.log("Analisar");
        //console.log(document.getElementsByClassName("dinamico" + 2)[0]); // pega o primeiro elemento no caso a div dinamic 2 tenho que exluir ele
        //console.log(document.getElementsByClassName("dinamico" + 2)[0].getElementsByClassName("checkBox2")); // pega o html colection
        //console.log(document.getElementsByClassName("dinamico" + 2)[0].getElementsByClassName("checkBox2")[0]); // pega o checkbox
        //console.log(document.getElementsByClassName("checkBox2")[0]); // pega o checkbox

        var listElemAdd = document.getElementsByClassName("checkBox2");
        var listaRemove = [];
        for (var i = 0; i < listElemAdd.length; i++) {
            if (listElemAdd[i].checked) {
                listaRemove.push(document.getElementsByClassName("dinamico" + 2)[i]);
            }
        }

        for (var i = 0; i < listaRemove.length; i++) {
            tabela.removeChild(listaRemove[i]);
        }

        document.getElementById("todos1").checked = false;
    });



    $("#salvar").click(function(e) {
        console.log("Salvar");
        var nomeTabela = "tabelaAtual"
        idDinamic = 1;
        var hoje = [
            [],
            [],
            [],
            [],
            [],
            []
        ];
        for (var idDinamic = 1; idDinamic < 3; idDinamic++) {
            var tabela = document.getElementById(nomeTabela);
            var listElem1 = document.getElementsByClassName("checkBox" + idDinamic);
            var element;
            var linha;

            for (var i = 0; i < listElem1.length; i++) {
                element = document.getElementsByClassName("dinamico" + idDinamic)[i];
                linha = valueData + "|";
                var j;
                hoje[0].push(valueData);
                for (j = 1; j < element.getElementsByClassName("cell").length - 1; j++) {
                    linha += element.getElementsByClassName("cell")[j].textContent + " | ";
                    hoje[j].push(element.getElementsByClassName("cell")[j].textContent);
                }
                //console.log(element.getElementsByClassName("cell")[j].getElementsByTagName("input")[0]);
                if (element.getElementsByClassName("cell")[j].getElementsByTagName("input")[0].value == "") {
                    linha += element.getElementsByClassName("cell")[j].getElementsByTagName("input")[0].placeholder + " | ";
                    hoje[j].push(element.getElementsByClassName("cell")[j].getElementsByTagName("input")[0].placeholder);
                } else {
                    linha += element.getElementsByClassName("cell")[j].getElementsByTagName("input")[0].value + " | ";
                    hoje[j].push(element.getElementsByClassName("cell")[j].getElementsByTagName("input")[0].value);
                }
                console.log(linha);
                console.log(hoje);

            }
        }

        $.ajax({
            type: 'POST',
            url: '/cadastrarNovoDia',
            data: {
                hoje: hoje,
            },
            success: function(data) {
                alert(data.salvo);
                //criarlinhas(MatrizGeral,"tabelaAtual", 1);
            },
            error: function(error) {
                alert("erro AJAX");
            }
        });

    });

    $("#deletar").click(function(e) {
        $.ajax({
            type: 'GET',
            url: '/excluirDiaAtual',
            data: {
                dat: valueData,
            },
            success: function(data) {
                alert(data.salvo);
                //criarlinhas(MatrizGeral,"tabelaAtual", 1);
            },
            error: function(error) {
                alert("erro AJAX");
            }
        });
    });
    var mensagem = "Testando";
    $("#email").click(function (e) {
        $.ajax({
            type: 'GET',
            url: '/mail',
            data: {
                mensagem: mensagem,
            },
            success: function(data) {
                alert(data.sucesso);
                //criarlinhas(MatrizGeral,"tabelaAtual", 1);
            },
            error: function(error) {
                alert("erro AJAX");
            }
        });
    })
}



function atualizarValoresMatrizAnterior() {
    console.log("Analisando os elementos da matriz do dia anterior");
    var aux = [
        [],
        [],
        [],
        [],
        [],
        []
    ];
    for (var j = 0; j < aux.length; j++) {
        aux[j] = MatrizGeral[j].slice();
    }
    for (var i = 0; i < aux[0].length; i++) {
        if (document.getElementById("preco-0-" + i).value == "") {
            aux[5][i] = document.getElementById("preco-0-" + i).placeholder;
            //console.log(document.getElementById("preco-0-" + i).value);
        } else {
            aux[5][i] = document.getElementById("preco-0-" + i).value;
        }
    }
    //console.log(aux);
    return aux;
}


