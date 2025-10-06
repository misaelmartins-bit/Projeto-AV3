  const nomeCliente = localStorage.getItem("nomeCliente");


  const p = document.querySelector(".text p");

  if (nomeCliente) {
    p.textContent = `Seja bem-vindo ao nosso site OdontoVitta senhor(a) ${nomeCliente}.`;
  } else {
    p.textContent = "Seja bem-vindo ao nosso site OdontoVitta!";
  }