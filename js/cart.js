let cart = [];
let currency = [];
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
                    <input type="number" class="h4 pl-2 ml-2 inputCant" value="`+carrito.count+`" onchange="calcNewSubTotal(this.value, `+carrito.unitCost+`,`+i+`); costos();" name="Cantidad`+i+`" min="0">
                </td>
                <td class="cart-price a-center">
                    <span> `+carrito.currency +` `+ carrito.unitCost+`  </span>
                </td>
                <td class="cart-price a-center">
                    <span id="simbolo`+i+`">$ </span><span class="subTotal" id="subTotal`+i+`">  `+calcPrecioTotal(carrito.currency, carrito.unitCost, carrito.count)+` </span>
                </td>
            </tr>
        `

        document.getElementById("cart-articles").innerHTML = htmlContentToAppend;
    }
}
//cuando carga la pagina por default es pesos uruguayos
let currentCurrency = "UYU";
sessionStorage.setItem("currentCurrency", currentCurrency);

function refreshCurrency(){
    //tomo los checks
    currency = document.getElementsByName("currency");
    for (let i = 0; i < currency.length; i++) {
        if (currency[i].checked == true){
            // si tiene checked true guardo esos datos
             currentCurrency = currency[i].value;
             sessionStorage.setItem("currentCurrency", currentCurrency);
             if(currentCurrency == "UYU"){
                 //agarro los subtotales
                 subtotal = document.getElementsByClassName("subTotal");
                 for (let i = 0; i < subtotal.length; i++) {
                     //tomo los valores
                    let newSubtotal = subtotal[i].innerText;
                    newSubtotal = newSubtotal *40;
                    //si es UYU es porque antes eran USD entonces multiplico *40 e inserto en subtotal de nuevo
                    document.getElementById("simbolo"+i).innerHTML = "$ ";
                    document.getElementById("subTotal"+i).innerHTML = newSubtotal;
                 }
             }else if(currentCurrency == "USD"){
                subtotal = document.getElementsByClassName("subTotal");
                for (let i = 0; i < subtotal.length; i++) {
                    let newSubtotal = subtotal[i].innerText;
                    newSubtotal = newSubtotal / 40;
                    document.getElementById("simbolo"+i).innerHTML = "U$S ";
                    document.getElementById("subTotal"+i).innerHTML = newSubtotal;
                 }
             }
        }
    }

}

function calcPrecioTotal(moneda, costoUnitario, unidad){
    //comparo el tipo de moneda y le hago el calculo correspondiente
    //dolar $40
    let total;
    if(moneda == "UYU"){
        total = costoUnitario * unidad;
        //formato pesos
        //total = numberFormat.format(total);
        return total;
    }else if(moneda == "USD"){
        costoUnitarioPesos = costoUnitario * 40;
        total = costoUnitarioPesos * unidad;
        //formato pesos
        //total = numberFormat.format(total);
        return total;
    }
    
}

function calcNewSubTotal(newCant, unitCost, i){ //tomo nueva cantidad, precio de unidad del JSON y el i para utilizar ese input e insertarlo en ese subtotal
    let moneda = sessionStorage.getItem("currency"+i); //tomo el valor de la moneda en el <p id="moneda'i'" linea 26
     //utilizo la funcion para calcular precio optimizando code
    //con .innerText tomo el texto que se muestra en el html xq no me tomaba el parametro carrito.currency (lo tomaba como variable)
    let currentCurrency = sessionStorage.getItem("currentCurrency");
    if(currentCurrency == "UYU"){
        document.getElementById("subTotal"+i).innerText =  calcPrecioTotal(moneda, unitCost, newCant);
    }else if(currentCurrency == "USD"){
        document.getElementById("subTotal"+i).innerText = (calcPrecioTotal(moneda, unitCost, newCant) / 40);
    }
}

function costos(){
    
    //Subtotales sumados
    subTotales = document.getElementsByClassName("subTotal");
    let sumaSubtotales = 0;
        for (let i = 0; i < subTotales.length; i++) {
            sumaSubtotales += parseInt(subTotales[i].innerText, 10);
        }
    document.getElementById("subtotal-costos").innerText = tipoMoneda()+sumaSubtotales;

    //calculo envio
    let porcentaje;
    costoEnvio = document.getElementsByName("envio")
    for (let i = 0; i < costoEnvio.length; i++) {
        if (costoEnvio[i].checked == true){
            porcentaje = costoEnvio[i].value;
        }
    }
    subTotalPorcentaje = (sumaSubtotales * porcentaje) / 100;
    document.getElementById("envio-costo").innerText = tipoMoneda()+ subTotalPorcentaje;

    //calculo total
    let total = sumaSubtotales + subTotalPorcentaje;
    document.getElementById("total-costo").innerText = tipoMoneda()+ total;
}

function tipoMoneda(){
    //tipo de moneda seleccionada
    currentCurrency = sessionStorage.getItem("currentCurrency");
    if(currentCurrency == "UYU"){
        return "$ ";
    }else if (currentCurrency == "USD"){
        return "U$S "
    }
}

function seleccionPago(){
    metodosPago = document.getElementsByName("metodo-pago");
    for (let i = 0; i < metodosPago.length; i++) {
        if (metodosPago[i].checked == true){
            metodoPago = metodosPago[i].value;
        }
    }
    document.getElementById("pago-seleccionado").innerText = metodoPago;
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
        costos();
        
    });
    
});