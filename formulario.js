let boton = document.getElementById("btnRegistrar");

boton.addEventListener("click", evento => {
    evento.preventDefault(); // Evitar el comportamiento por defecto del formulario
    registrarCita();
});

let registrarCita = async () => {

    let campos = {};

    campos.email = document.getElementById("email").value;
    campos.firstName = document.getElementById("firstName").value;
    campos.lastName = document.getElementById("lastName").value;
    campos.petName = document.getElementById("petName").value;
    campos.service = document.getElementById("service").value;
    campos.favoriteHobby = document.getElementById("favoriteHobby").value;

    const peticion = await fetch("http://localhost:8080/peluditos/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(campos)
    });

    if (peticion.ok) {
        alert("Registrado correctamente");
        limpiarCampos(); // Limpia los campos del formulario
    } else {
        alert("Ocurrió un error al registrar la cita. Por favor, inténtalo de nuevo.");
    }
};

function limpiarCampos() {
    document.getElementById("email").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("petName").value = "";
    document.getElementById("service").value = "";
    document.getElementById("favoriteHobby").value = "";
}



