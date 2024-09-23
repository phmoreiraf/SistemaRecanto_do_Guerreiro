window.addEventListener("load", () => {
    populateClienteSelect();
    displayWorkshops();
});

async function addReserva(e) {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };

    // Se a data não existir, prossiga com a criação da reserva
    const createReservaResponse = await fetch("http://localhost:8000/reserva", {
        method: "POST",
        headers,
        body: JSON.stringify({
            titulo: e.target.titulo.value,
            descricao: e.target.descricao.value,
            data: e.target.data.value,
            hora: e.target.hora.value,
            idCliente: e.target.idCliente.value,
            adicionais: e.target.adicionais.value,
            status: e.target.status.value,
        }),
    });

    // Obtenha os dados da reserva criada
    const dados = await createReservaResponse.json();
    console.log(dados);
    // window.alert("Reserva Cadastrada Com Sucesso!");
    // window.location.href = "../html/crudReserva.html";
    // Exibir o modal de sucesso
    const modalSucesso = document.getElementById("modalSucesso");
    modalSucesso.style.display = "block";
    // Redirecionar após 2 segundos (opcional)
    setTimeout(() => {
        window.location.href = "../html/crudReserva.html";
    }, 2000);

}


function fecharModalSucesso() {
    const modalSucesso = document.getElementById("modalSucesso");
    modalSucesso.style.display = "none";
}

function redirecionarParaCrudCliente() {
    window.location.href = "../html/crudCliente.html";
}


async function displayWorkshops() {
    const table = document.getElementById("displayReservas");
    table.innerHTML = "";
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };

    try {
        const response = await fetch("http://localhost:8000/reserva", { headers });
        const workshops = await response.json();

        if (workshops.length === 0) {
            return false;
        }

        for (const workshop of workshops) {
            // Obter detalhes do cliente
            console.log('Fetching client with ID:', workshop.idCliente);
            const clienteResponse = await fetch(
                `http://localhost:8000/filterIdCliente/${workshop.idCliente}`, { headers }
            );
            console.log('Client response:', clienteResponse);

            if (!clienteResponse.ok) {
                console.error('Error fetching client:', clienteResponse.statusText);
                continue;
            }

            let cliente = await clienteResponse.json();

            // Se cliente for null ou não tiver a propriedade 'nome', substitua por um objeto com nome 'N/A'
            if (!cliente || !cliente.nome) {
                console.error('Client is null or does not have a name');
                cliente = { nome: 'N/A' };
            }

            // Extrair dia, mês e ano da data
            const data = new Date(workshop.data);
            const dia = String(data.getUTCDate()).padStart(2, "0");
            const mes = String(data.getUTCMonth() + 1).padStart(2, "0"); // Mês começa do zero
            const ano = data.getUTCFullYear();

            // Formatando a data manualmente para "dd/mm/aaaa"
            const dataFormatada = `${dia}/${mes}/${ano}`;

            const newRow = table.insertRow();
            newRow.innerHTML = `
            <td>${workshop.titulo}</td>
        <td>${workshop.descricao}</td>
        <td>${dataFormatada}</td> <!-- Utiliza a data formatada -->
        <td>${workshop.hora}</td>
        <td>${cliente.nome}</td> 
        <td>${workshop.adicionais}</td>
        <td>${workshop.status}</td>
        <td class = "td-especial">
        <a class="btn btn-editar" href="../html/attReserva.html?id=${workshop.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square icon-margin" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg>
      </a>
      
          <br>
          
          <br>
          <button class="btn btn-excluir icon-margin-delete" onclick="deletereserva(${workshop.id})">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
  </svg>
</button>
        </td>
        <div id="modalConfirmacao" class="modal">
        <div class="modal-content">
            <span class="close" onclick="fecharModal()">&times;</span>
            <p>Você realmente deseja excluir essa Reserva?</p>
            <button id="btnConfirmarExclusao">Confirmar</button>
            <button id="btnCancelarExclusao">Cancelar</button>
        </div>
    </div>`;
        };
        return true;
    } catch (error) {
        console.error("Error fetching workshops:", error);
    }
}

function fecharModal() {
    const modal = document.getElementById("modalConfirmacao");
    modal.style.display = "none";
}

// Função para buscar Clientes cadastrados e preencher a lista suspensa;
async function populateClienteSelect() {
    const token = sessionStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: token,
    };

    try {
        const response = await fetch("http://localhost:8000/cliente", { headers });
        const clientes = await response.json();
        const clienteSelect = document.getElementById("idCliente");

        // Preencha a seleção com opções;
        clientes.forEach((cliente) => {
            const option = document.createElement("option");
            option.value = cliente.id; // Armazene o valor do ID;
            option.textContent = cliente.nome; // Exibir o valor do nome;
            clienteSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching Clientes:", error);
    }
}

async function deletereserva(index) {
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
        const response = await fetch(`http://localhost:8000/reserva/${index}`, {
            method: "DELETE",
            headers,
        });
        modal.style.display = "none"; // Fechar modal
        displayWorkshops();
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
    event.preventDefault();
}

// Verificar se a data selecionada é um sábado ou domingo
function checkWeekend(input) {
    const selectedDate = new Date(input.value);
    const day = selectedDate.getDay();
    if (day === 5 || day === 6) {
        input.setCustomValidity("");
    } else {
        input.setCustomValidity(
            "Por favor, selecione uma data de sábado ou domingo."
        );
    }
}

async function visualizarReservas() {
    try {
        const token = sessionStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: token,
        }

        const response = await fetch("http://localhost:8000/reserva", { headers, });
        if (!response.ok) {
            throw new Error("Erro ao obter Reservas");
        }
        displayWorkshops();
        document.getElementById('tabelaReservas').style.display = 'block';
    } catch (error) {
        console.log("erro ao visualizar Reservas", error);
    }
}

//async function alternarLista() {
//    try {
//        const botaoVisualizar = document.getElementById('btn_Visualizar');
//        const tabelaReservas = document.getElementById('tabelaReservas');
//
//        if (tabelaReservas.style.display === 'none') {
//            await visualizarReservas();
//            tabelaReservas.style.display = 'table';
//            botaoVisualizar.textContent = 'Minimizar Lista';
//        } else {
//            tabelaReservas.style.display = 'none';
//            botaoVisualizar.textContent = 'Visualizar Reservas';
//        }
//    } catch (error) {
//        console.error("Erro ao alternar lista de Reservas:", error);
//    }
//}

async function alternarLista() {
    try {
        const botaoVisualizar = document.getElementById('btn_visualizar');
        const tabelaReservas = document.getElementById('tabelaReservas');
        const mensagemSemItens = document.getElementById('mensagemSemItens');

        if (tabelaReservas.style.display === 'none') {
            const temGestao = await displayWorkshops();
            if (temGestao) {
                tabelaReservas.style.display = 'table';
                mensagemSemItens.style.display = 'none';
                botaoVisualizar.textContent = 'Minimizar Lista';
            } else {
                tabelaReservas.style.display = 'none';
                mensagemSemItens.style.display = 'flex';
                botaoVisualizar.textContent = 'Minimizar Lista';
            }
        } else {
            tabelaReservas.style.display = 'none';
            mensagemSemItens.style.display = 'none';
            botaoVisualizar.textContent = 'Visualizar Clientes';
        }

    } catch (error) {
        console.error("Erro ao alternar lista de gestões:", error);
    }
}