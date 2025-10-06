const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('exampleFormControlInput1').value.trim();
    const email = document.getElementById('exampleFormControlInput2').value.trim();
    const mensagem = document.getElementById('exampleFormControlTextarea1').value.trim();

    if (!name || !email || !mensagem){
        alert ('Preencha todos os campos!');
        return;
    }

    const emailValido = /\S+@\S+\.\S+/.test(email);
    if(!emailValido){
        alert ('Digite um email Válido')
        return;
    }

    alert (`Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`)
})