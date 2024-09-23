// login.js
async function login(e) {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: e.target.email.value,
                senha: e.target.senha.value,
            }),
        });
        const dados = await response.json();
        console.log(dados);
        sessionStorage.setItem("token", dados.token); //SALVA O TOKEN NO LOCAL STORAGE
        sessionStorage.setItem("user", JSON.stringify(dados.user)); // SALVA O USUÁRIO NO LOCAL STORAGE

        if (dados.token) {
            window.location.href = "../client/html/crudCliente.html";
        } else {
            alert("Credenciais inválidas");
        }
    } catch (erro) {
        console.log(erro);
    }
}