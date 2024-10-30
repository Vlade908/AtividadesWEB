function sortearNumeros() {
    const startNumber = parseInt(document.getElementById("startNumber").value);
    const endNumber = parseInt(document.getElementById("endNumber").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const resultDiv = document.getElementById("result");

    if (isNaN(startNumber) || isNaN(endNumber) || isNaN(quantity)) {
        resultDiv.innerHTML = "Por favor, insira todos os valores.";
        return;
    }

    if (startNumber >= endNumber) {
        resultDiv.innerHTML = "O número inicial deve ser menor que o final.";
        return;
    }

    if (quantity > (endNumber - startNumber + 1)) {
        resultDiv.innerHTML = "Quantidade maior do que o intervalo disponível.";
        return;
    }

    const numbers = new Set();
    while (numbers.size < quantity) {
        const num = Math.floor(Math.random() * (endNumber - startNumber + 1)) + startNumber;
        numbers.add(num);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    resultDiv.innerHTML = "Números Sorteados: " + sortedNumbers.join(", ");
}
