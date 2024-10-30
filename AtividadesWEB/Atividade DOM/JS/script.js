const pessoas =[];

function adicionarPessoa(event){
    event.preventDefault();

    const nome = document.querySelector("#inp_nome").value;
    const Peso = parseFloat(document.querySelector("#inp_peso").value); 
    const Altura = parseFloat(document.querySelector("#inp_altura").value);
    const GC = document.querySelector("#inp_porc_gordura").value;

    if(!nome || !Altura || !Peso){
        alert("Preencha todos os campos.");
        return;
    }

    const imc = (Peso / (Altura * Altura)).toFixed(2);


    const pessoa ={nome, Peso, Altura, GC, IMC: imc };

    pessoas.push(pessoa);

    document.getElementById("form").reset();

    atualizarTabela();
    

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