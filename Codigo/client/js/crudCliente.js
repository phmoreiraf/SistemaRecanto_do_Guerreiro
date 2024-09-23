window.addEventListener("load", displayWorkshops());

async function addCliente(e) {
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8000/cliente", {
            method: "POST",
            headers,
            body: JSON.stringify({
                nome: e.target.nome.value,
                telefone: e.target.telefone.value,
                email: e.target.email.value,
                logradouro: e.target.querySelector("#logradouro").value,
                complemento: e.target.complemento.value,
                bairro: e.target.bairro.value,
            }),
        });
        const dados = await response.json();
        console.log(dados);
        // Exibir o modal de sucesso
        const modalSucesso = document.getElementById("modalSucesso");
        modalSucesso.style.display = "block";
        // Redirecionar após 2 segundos (opcional)
        setTimeout(() => {
            window.location.href = "../html/crudCliente.html";
        }, 2000);
    } catch (erro) {
        console.log(erro);
    }
}


function fecharModalSucesso() {
    const modalSucesso = document.getElementById("modalSucesso");
    modalSucesso.style.display = "none";
}

function redirecionarParaCrudCliente() {
    window.location.href = "../html/crudCliente.html";
}



async function displayWorkshops() {
    const table = document.getElementById("displayClientes");
    table.innerHTML = "";
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };
    let dadoBruto = await fetch("http://localhost:8000/cliente", { headers });
    let workshops = await dadoBruto.json();

    if (workshops.length === 0) {
        return false;
    }
    workshops.forEach(async(workshop) => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${workshop.nome}</td>
            <td>${workshop.telefone}</td>
            <td>${workshop.email}</td>
            <td>${workshop.bairro}</td>
            <td>${workshop.bairro}</td>
            <td>
    <div class="btn-container">
        <a class="btn btn-editar" href="../html/attCliente.html?id=${workshop.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square icon-margin" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
            </a>
        <button class="btn btn-excluir" onclick="deletecliente(${workshop.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill icon-margin" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
            </svg>
        </button>
    </div>
</td>

            </td>
            <div id="modalConfirmacao" class="modal">
            <div class="modal-content">
                <span class="close" onclick="fecharModal()">&times;</span>
                <p>Você realmente deseja excluir este cliente?</p>
                <button id="btnConfirmarExclusao">Confirmar</button>
                <button id="btnCancelarExclusao">Cancelar</button>
            </div>
        </div>
        

        `;
    });
    return true;
}

function fecharModal() {
    const modal = document.getElementById("modalConfirmacao");
    modal.style.display = "none";
}


async function deletecliente(index) {
    // Abrir modal de confirmação
    const modal = document.getElementById("modalConfirmacao");
    modal.style.display = "block";

    // Quando o usuário clica no botão de confirmar
    const btnConfirmar = document.getElementById("btnConfirmarExclusao");
    btnConfirmar.onclick = async() => {
        const token = sessionStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: token,
        };
        const response = await fetch(`http://localhost:8000/cliente/${index}`, {
            method: "DELETE",
            headers,
        });
        modal.style.display = "none"; // Fechar modal
        displayWorkshops(); // Atualizar a lista de clientes após a exclusão
    };

    // Quando o usuário clica no botão de cancelar
    const btnCancelar = document.getElementById("btnCancelarExclusao");
    btnCancelar.onclick = () => {
        modal.style.display = "none"; // Fechar modal
    };

    // Fechar o modal se o usuário clicar no botão "x"
    const spanClose = document.getElementsByClassName("close")[0];
    spanClose.onclick = () => {
        const modal = document.getElementById("modalConfirmacao");
        modal.style.display = "none";
    };

    // Fechar o modal se o usuário clicar fora dele
    window.onclick = (event) => {
        const modal = document.getElementById("modalConfirmacao");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

async function visualizarClientes() {
    try {
        const token = sessionStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: token,
        }

        const response = await fetch("http://localhost:8000/cliente", { headers, });
        if (!response.ok) {
            throw new Error("Erro ao obter clientes");
        }
        displayWorkshops();
        document.getElementById('tabelaClientes').style.display = 'block';
    } catch (error) {
        console.log("erro ao visualizar clientes", error);
    }
}

async function alternarLista() {
    try {
        const botaoVisualizar = document.getElementById('btn_visualizar');
        const tabelaClientes = document.getElementById('tabelaClientes');
        const mensagemSemItens = document.getElementById('mensagemSemItens');

        if (tabelaClientes.style.display === 'none') {
            const temClientes = await displayWorkshops();
            if (temClientes) {
                tabelaClientes.style.display = 'table';
                mensagemSemItens.style.display = 'none';
                botaoVisualizar.textContent = 'Minimizar Lista';
            } else {
                tabelaClientes.style.display = 'none';
                mensagemSemItens.style.display = 'flex';
                botaoVisualizar.textContent = 'Minimizar Lista';
            }
        } else {
            tabelaClientes.style.display = 'none';
            mensagemSemItens.style.display = 'none';
            botaoVisualizar.textContent = 'Visualizar Clientes';
        }
    } catch (error) {
        console.error("Erro ao alternar lista de clientes:", error);
    }
}