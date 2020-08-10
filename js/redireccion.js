let logueado = sessionStorage.getItem("estaLogueado");
function exist(){
  if (typeof(logueado) == "object") {
    logueado = false; 
    sessionStorage.setItem("estaLogueado", logueado);
  }
}

function redireccion(){
  if (logueado == "false") {
    window.location.replace("./login.html");
  }else if (logueado != "true"){
    alert('Debe iniciar sesión')
    window.location.replace("./login.html");
    
  }
}


exist();
redireccion();