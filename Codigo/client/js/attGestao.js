window.onload = async function getGestao() {
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const dadosBrutos = await fetch(
            `http://localhost:8000/filterIdGestao/${id}`, { headers }
        );
        const gestao = await dadosBrutos.json();

        document.getElementById("idGestao").value = gestao.id;

        document.getElementById("idCliente").value = gestao.idCliente;
        document.getElementById("idReserva").value = gestao.idReserva;

        document.getElementById("custos").value = gestao.custos;
        document.getElementById("descricao").value = gestao.descricao;
    } catch (error) {
        console.log(error);
    }
};

async function putGestao(e) {
    const token = sessionStorage.getItem("token"); //PEGA O TOKEM DO LOCAL STORAGE E JOGA NO HEADERS PARA VERIFICACAO
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };
    e.preventDefault();
    const gestaoid = document.getElementById("idGestao").value;
    try {
        const body = {};

        if (e.target.idCliente.value) {
            body.idCliente = e.target.idCliente.value;
        }
        if (e.target.idReserva.value) {
            body.idReserva = e.target.idReserva.value;
        }
        if (e.target.custos.value) {
            body.custos = e.target.custos.value;
        }
        if (e.target.descricao.value) {
            body.descricao = e.target.descricao.value;
        }

        const response = await fetch(
            `http://localhost:8000/gestaoPut/${gestaoid}`, {
                method: "PUT",
                headers,
                body: JSON.stringify(body),
            }
        );
        const dados = await response.json();
        console.log(dados);
        window.alert = "Gestão atualizada com sucesso";
        window.location.href = "../html/crudGestao.html";
    } catch (erro) {
        console.log(erro);
    }
}