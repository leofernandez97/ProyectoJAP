let cart = [];
let cantArticulos;
//formato pesos
var options = { style: 'currency', currency: 'USD' };
var numberFormat = new Intl.NumberFormat('en-US', options);

function showArticlesCart(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let carrito = array[i];

        htmlContentToAppend += `
        
            <div class="card mb-3 w-100" ">
                <div class="row no-gutters w-100">
                    <div class="col-md-4 centrado" >
                    <img src="`+carrito.src+`" class="card-img centrado" alt="" style="max-height: 200px; width: auto;">
                    </div>
                    <div class="col-md-8 f-align-center">
                        <div class="card-body">
                            <div class="row centrado align-center pl-2">
                                <div class="row align-center no-gutters">
                                    <h5>Nombre: </h5>
                                    <p class="h4 pl-2">`+carrito.name+`</p>
                                </div>
                                <hr class="m-1">
                                <div class="row">
                                    <div class="col d-flex align-center">
                                        <h5>Costo por unidad: </h5>
                                        <p class="h4 pl-2" id="moneda`+i+`"> `+carrito.currency+` </p>
                                        <p class="h4 pl-2 unitCost "> `+carrito.unitCost+` </p>
                                    </div>
                                    <div class="col d-flex align-center">
                                        <h5>Cantidad: </h5>
                                        <input type="number" class="h4 pl-2 ml-2 inputCant" value="`+carrito.count+`" onchange="calcNewSubTotal(this.value, `+carrito.unitCost+`,`+i+`)" name="Cantidad`+i+`" min="0"> 
                                    </div>
                                </div>
                                <div class="bg-red pt-2 d-flex align-center">
                                    <h6>Subtotal: </h6>
                                    <p class="h6 pl-2 " id="subTotal`+i+`"> `+calcPrecioTotal(carrito.currency, carrito.unitCost, carrito.count)+`  </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <tr>
                <td class="block-img">
                    <img style=" max-width:100px; max-height:100px;" src="`+carrito.src+`">
                </td>
                <td >
                    <h2 class="product-name">`+carrito.name+`</h2>
                </td>
                <td class="cart-qty">
                    <input type="number" class="h4 pl-2 ml-2 inputCant" value="`+carrito.count+`" onchange="calcNewSubTotal(this.value, `+carrito.unitCost+`,`+i+`)" name="Cantidad`+i+`" min="0">
                </td>
                <td class="cart-price">
                    <span> `+carrito.currency+carrito.unitCost+`  </span>
                </td>
                <td class="cart-price">
                    <span id="subTotal`+i+`">  `+calcPrecioTotal(carrito.currency, carrito.unitCost, carrito.count)+` </span>
                </td>
            </tr>
        `

        document.getElementById("cart-articles").innerHTML = htmlContentToAppend;
    }
}

function calcPrecioTotal(moneda, costoUnitario, unidad){
    //comparo el tipo de moneda y le hago el calculo correspondiente
    //dolar $40
    if(moneda == "UYU"){
        let total = costoUnitario * unidad;
        //formato pesos
        total = numberFormat.format(total);
        return total;
    }else if(moneda == "USD"){
        costoUnitarioPesos = costoUnitario * 40;
        let total = costoUnitarioPesos * unidad;
        //formato pesos
        total = numberFormat.format(total);
        return total;
        
    }
}

function calcNewSubTotal(newCant, unitCost, i){ //tomo nueva cantidad, precio de unidad del JSON y el i para utilizar ese input e insertarlo en ese subtotal
    let moneda = document.getElementById("moneda"+i) //tomo el valor de la moneda en el <p id="moneda'i'" linea 26
    document.getElementById("subTotal"+i).innerHTML =  calcPrecioTotal(moneda.innerText, unitCost, newCant); //utilizo la funcion para calcular precio optimizando code
    //con .innerText tomo el texto que se muestra en el html xq no me tomaba el parametro carrito.currency (lo tomaba como variable)
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