let cart = [];
let aux;


function showArticlesCart(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let carrito = array[i];

        htmlContentToAppend += `
        
            <div class="card mb-3 w-100" style="max-height: 200px;">
                <div class="row no-gutters w-100">
                    <div class="col-md-4 centrado" >
                    <img src="`+carrito.src+`" class="card-img centrado" alt="" style="max-height: 200px; width: auto;">
                    </div>
                    <div class="col-md-8 bg-card-cart f-align-center">
                        <div class="card-body">
                            <div class="row centrado align-center pl-2">
                                <div class="row align-center no-gutters">
                                    <h5>Nombre: </h5>
                                    <p class="h4 pl-2">`+carrito.name+`</p>
                                </div>
                                <div class="row align-center no-gutters">
                                    <h5>Precio unitario: </h5>
                                    <p class="h4 pl-2"> `+carrito.currency+` `+carrito.unitCost+` </p>
                                </div>
                                <div class="row align-center no-gutters">
                                    <h5>Cantidad: </h5>
                                    <p class="h4 pl-2"> `+carrito.count+` </p>
                                </div>
                                <div class="row align-center no-gutters bg-red pt-2">
                                    <h5>Total: </h5>
                                    <p class="h4 pl-2"> $`+calcPrecioTotal(carrito.currency, carrito.unitCost, carrito.count)+`  </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

        document.getElementById("cart-articles").innerHTML = htmlContentToAppend;
    }
}

function calcPrecioTotal(moneda, costoUnitario, unidad){
    if(moneda == "UYU"){
        let total = costoUnitario * unidad;
        return total;
    }else if(moneda== "USD"){
        costoUnitarioPesos = costoUnitario * 40;
        let total = costoUnitarioPesos * unidad;
        return total;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CARTS_INFO_URL).then(function (resultObj){
        if(resultObj.status === "ok")
        {
            cart = resultObj.data; 
        }
        showArticlesCart(cart.articles);
    });
    
});