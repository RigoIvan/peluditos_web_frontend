class CitasManager {
    constructor() {
        this.idEditar = null;
        this.init();
    }

    async init() {
        this.listarCitas();
        this.addEventListeners();
    }

    async listarCitas() {
        try {
            const response = await fetch("http://localhost:8080/peluditos/all");
            const clientes = await response.json();
            this.renderCitas(clientes);
        } catch (error) {
            console.error("Error al obtener las citas:", error);
        }
    }

    renderCitas(clientes) {
        const contenidoTabla = clientes.map(cliente => `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.email}</td>
                <td>${cliente.firstName}</td>
                <td>${cliente.lastName}</td>
                <td>${cliente.petName}</td>
                <td>${cliente.favoriteHobby}</td>
                <td>${cliente.service}</td>
                <td>
                    <i onclick="citasManager.editarCita(${cliente.id})" class="material-icons button edit">edit</i>
                    <i onclick="citasManager.borrarCita(${cliente.id})" class="material-icons button delete">delete</i>
                </td>
            </tr>
        `).join("");

        document.querySelector("#tabla tbody").innerHTML = contenidoTabla;
    }

    async borrarCita(id) {
        try {
            await fetch(`http://localhost:8080/peluditos/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            this.listarCitas();
        } catch (error) {
            console.error("Error al borrar la cita:", error);
        }
    }

    async editarCita(id) {
        this.mostrarFormulario();
        this.idEditar = id;

        try {
            const response = await fetch(`http://localhost:8080/peluditos/${id}`);
            const cliente = await response.json();

            // Rellenar los campos del formulario con los datos del cliente
            document.getElementById("email").value = cliente.email;
            document.getElementById("firstName").value = cliente.firstName;
            document.getElementById("lastName").value = cliente.lastName;
            document.getElementById("petName").value = cliente.petName;
            document.getElementById("service").value = cliente.service;
            document.getElementById("favoriteHobby").value = cliente.favoriteHobby;
        } catch (error) {
            console.error("Error al obtener los datos del cliente:", error);
        }
    }

    async aplicarActualizacion() {
        try {
            const campos = {
                id: this.idEditar,
                email: document.getElementById("email").value,
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                petName: document.getElementById("petName").value,
                service: document.getElementById("service").value,
                favoriteHobby: document.getElementById("favoriteHobby").value
            };

            await fetch(`http://localhost:8080/peluditos/update/${this.idEditar}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(campos)
            });

            this.listarCitas();
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
        }
    }

    mostrarFormulario() {
        document.getElementById("formulario").style.visibility = "visible";
    }

    addEventListeners() {
        document.getElementById("btnModificar").addEventListener("click", () => {
            this.aplicarActualizacion();
        });
    }
}

const citasManager = new CitasManager();

