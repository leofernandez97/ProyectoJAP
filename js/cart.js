let cart = [];
let cantArticulos;
//formato pesos
var options = { style: 'currency', currency: 'USD' };
var numberFormat = new Intl.NumberFormat('en-US', options);

function showArticlesCart(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let carrito = array[i];

        sessionStorage.setItem("currency"+i, carrito.currency);

        htmlContentToAppend += `
            <tr>
                <td class="block-img a-center">
                    <img style=" max-width:100px; max-height:100px;" src="`+carrito.src+`">
                </td>
                <td >
                    <h2 class="h5 a-center">`+carrito.name+`</h2>
                </td>
                <td class="cart-qty a-center">
                    <input type="number" class="h4 pl-2 ml-2 inputCant" value="`+carrito.count+`" onchange="calcNewSubTotal(this.value, `+carrito.unitCost+`,`+i+`)" name="Cantidad`+i+`" min="0">
                </td>
                <td class="cart-price a-center">
                    <span> `+carrito.currency +` `+ carrito.unitCost+`  </span>
                </td>
                <td class="cart-price a-center">
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
    let moneda = sessionStorage.getItem("currency"+i); //tomo el valor de la moneda en el <p id="moneda'i'" linea 26
    document.getElementById("subTotal"+i).innerHTML =  calcPrecioTotal(moneda, unitCost, newCant); //utilizo la funcion para calcular precio optimizando code
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