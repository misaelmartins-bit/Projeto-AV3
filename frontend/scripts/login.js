const form = document.getElementById('form');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const dataNascimento = document.getElementById('dataNasc').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !cpf || !dataNascimento || !email) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const queryParams = new URLSearchParams({
      nome,
      cpf,
      dataNascimento,
      email
    });

    const resp = await fetch(`http://localhost:3000/clientes/login?${queryParams.toString()}`);

    const data = await resp.json();

    if (resp.ok) {
      localStorage.setItem("nomeCliente", nome);

      alert("Login realizado com sucesso!");
      window.location.href = "pós-acesso.html";
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar com o servidor!");
  }
});
