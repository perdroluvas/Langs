let decision = confirm("Você quer um quarto?");

if (decision === false) {
  alert("Cancelado");
} else {
  let escolhaQuarto = prompt("Que tipo de quarto você quer? Temos Standard, Deluxe e Suite", "");

  // Verifica se a escolha é válida
  if (escolhaQuarto === "Standard" || escolhaQuarto === "Deluxe" || escolhaQuarto === "Suite") {
    let quantidadeNoites = prompt("Qual o número de noites que você quer?", "");

    if (quantidadeNoites > 0) {
      alert(`Reserva realizada! Quarto: ${escolhaQuarto}, Número de noites: ${quantidadeNoites}`);
    } else {
      alert("Número de noites inválido. Reinicie o processo.");
    }
  } else {
    alert("Tipo de quarto inválido. Reinicie o processo.");
  }
}

