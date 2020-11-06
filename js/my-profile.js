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
    $('.alert').show()
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


/*// Get a reference to the image element
var foto = document.getElementById("foto-lugar");

// Take action when the image has loaded
foto.addEventListener("load", function () {
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

    // Make sure canvas is as big as the picture
    imgCanvas.width = foto.width;
    imgCanvas.height = foto.height;

    // Draw image into canvas element
    imgContext.drawImage(foto, 0, 0, foto.width, foto.height);

    // Get canvas contents as a data URL
    var imgAsDataURL = imgCanvas.toDataURL("image/png");

    // Save image into localStorage
    try {
        localStorage.setItem("foto", imgAsDataURL);
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }
}, false); */
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    devolverDatos()
});