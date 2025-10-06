const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const dataNascimento = document.getElementById('dataNasc').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!nome || !cpf || !dataNascimento || !email){
        alert ("Preencha todos os campos!");
        return;
    }

    const emailValido = /\S+@\S+\.\S+/.test(email);
    if (!emailValido){
        alert ("Digite um email válido");
        return;
    }

    try {
        const resp =   await fetch("http://localhost:3000/clientes", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({nome, cpf, dataNascimento, email}),
        }); 
        if (resp.ok) {
            alert ("Cadastro realizado com sucesso!");
            window.location.href = "login.html";
        }else {
            const error = await resp.json();
            alert("Erro ao cadastrar: " + error.error);
        }
    } catch (err) {
        console.error(err);
        alert("Erro de conexão com servidor!");
    }
});