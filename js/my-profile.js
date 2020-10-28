datos = [];

function guardarDatos(){
    primerNombre = document.getElementById('inputFirstName');
    segundoNombre = document.getElementById('inputSecondName');
    primerApellido = document.getElementById('inputFirstSurename');
    segundoApellido = document.getElementById('inputSecondSurename');
    inputEmail = document.getElementById('inputEmail');
    inputTelefono = document.getElementById('inputTel');
    
    let nuevosDatos = {
        firstName: primerNombre.value,
        secondName: segundoNombre.value,
        firstSurename: primerApellido.value,
        secondSurename: segundoApellido.value,
        email: inputEmail.value,
        telefono: inputTelefono.value
        
    };
    localStorage.setItem("datosUsu",JSON.stringify(nuevosDatos))
}

function devolverDatos(){
    
    if(localStorage.getItem("datosUsu") !== null){
        datosGuardados = JSON.parse(localStorage.getItem("datosUsu"));
        document.getElementById('inputFirstName').value = datosGuardados.firstName;
        document.getElementById('inputSecondName').value = datosGuardados.secondName;
        document.getElementById('inputFirstSurename').value = datosGuardados.firstSurename;
        document.getElementById('inputSecondSurename').value = datosGuardados.secondSurename;
        document.getElementById('inputEmail').value = datosGuardados.email;
        document.getElementById('inputTel').value = datosGuardados.telefono;
    }
}

function borrarDatos(){
    localStorage.removeItem("datosUsu");
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    devolverDatos()
});