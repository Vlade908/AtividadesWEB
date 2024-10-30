
var fs = require('fs');


function adicionarPessoa(event) {
    event.preventDefault();

    let pessoas = []; // Inicializa o array de pessoas

    const nome = document.querySelector("#inp_nome").value;
    const Peso = parseFloat(document.querySelector("#inp_peso").value); 
    const Altura = parseFloat(document.querySelector("#inp_altura").value);
    const GC = document.querySelector("#inp_porc_gordura").value;

    if (!nome || !Altura || !Peso) {
        alert("Preencha todos os campos.");
        return;
    }

    const imc = (Peso / (Altura * Altura)).toFixed(2);
    const pessoa = { nome, Peso, Altura, GC, IMC: imc };

    pessoas.push(pessoa);
    salvarJSON(pessoas);

    document.getElementById("form").reset();
    atualizarTabela();
}

function salvarJSON(novasPessoas) {
   

    // Lê o arquivo JSON existente
    fs.readFile('dados.json', 'utf8', (erro, data) => {
        let pessoasExistentes = [];

        if (!erro) {
            // Se o arquivo não estiver vazio, analisa o JSON
            if (data) {
                pessoasExistentes = JSON.parse(data);
            }
        } else {
            console.error('Erro ao ler o arquivo:', erro);
        }

        // Adiciona as novas pessoas ao array existente
        pessoasExistentes.push(...novasPessoas);

        // Converte o array atualizado de volta para JSON
        const dadosJson = JSON.stringify(pessoasExistentes, null, 2);

        // Salva o array atualizado no arquivo
        fs.writeFile('dados.json', dadosJson, (erro) => {
            if (erro) {
                console.error('Erro ao salvar o arquivo:', erro);
            } else {
                console.log('Arquivo salvo com sucesso!');
            }
        });
    });
}



function atualizarTabela(event){
    const tabelaBody = document.getElementById("tabelaPessoas").getElementsByTagName("tbody")[0];
    tabelaBody.innerHTML ="";

    pessoas.forEach((pessoa) =>{
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${pessoa.nome}</td>
            <td>${pessoa.Peso} </td>
            <td>${pessoa.Altura}</td>
            <td>${pessoa.GC} </td>
            <td>${pessoa.IMC}</td>
        `;

        tabelaBody.appendChild(linha);
    });

    console.log(JSON.stringify(pessoas));
     
}


function loadXMLDoc(event) {
    event.preventDefault();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
    xmlhttp.open("GET", "../XML/lista_pacientes.xml", true);
    xmlhttp.send();
}

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var tabelaBody = document.getElementById("tabelaPessoas").getElementsByTagName("tbody")[0];
    tabelaBody.innerHTML = ""; 
    
    var x = xmlDoc.getElementsByTagName("PACIENTE");
    for (var i = 0; i < x.length; i++) {
        const nome = x[i].getElementsByTagName("NOME")[0].childNodes[0].nodeValue;
        const peso = x[i].getElementsByTagName("PESO")[0].childNodes[0].nodeValue;
        const altura = x[i].getElementsByTagName("ALTURA")[0].childNodes[0].nodeValue;
        const gc = x[i].getElementsByTagName("GC")[0].childNodes[0].nodeValue;
        const imc = x[i].getElementsByTagName("IMC")[0].childNodes[0].nodeValue;

        
        var linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${nome}</td>
            <td>${peso}</td>
            <td>${altura}</td>
            <td>${gc}</td>
            <td>${imc}</td>
        `;
        tabelaBody.appendChild(linha);
    }
}