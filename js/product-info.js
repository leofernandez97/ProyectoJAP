var product = {};
let comment = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
            <li data-thumb="` + imageSrc + `">
                <a href="` + imageSrc + `" data-fancybox="gallery">
                    <img class="img-prod-info" src="` + imageSrc + `" />
                </a>
            </li>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProducts(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let relatedProducts = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 w-100">
                <a href="product-info.html"> <img class="img-fluid img-thumbnail" src="img/car` + relatedProducts + `.jpg" alt=""></a>
            </div>
        </div>
        `

        document.getElementById("productRelatedProducts").innerHTML = htmlContentToAppend;
    }
}

function ratingStars(int){
    let stars;
    if(int === 1){
        stars ='<span class="fa fa-star starChecked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>'
    }else if (int === 2){
        stars = '<span class="fa fa-star starChecked"></span><span class="fa fa-star starChecked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>'
    }else if (int === 3){
        stars='<span class="fa fa-star starChecked"></span><span class="fa fa-star starChecked"></span><span class="fa fa-star starChecked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>'
    }else if (int === 4){
        stars='<span class="fa fa-star starChecked"></span><span class="fa fa-star starChecked"></span><span class="fa fa-star starChecked"></span><span class="fa fa-star starChecked"></span><span class="fa fa-star"></span>'
    }else{
        stars='<span class="fa fa-star starChecked"></span><span class="fa fa-star starChecked"></span><span class="fa fa-star starChecked"></span><span class="fa fa-star starChecked"></span><span class="fa fa-star starChecked"></span>'
    }
    return stars;
}

let auxStars;
function showComments(array){
        let htmlContentToAppend = "";
        
        
        
        for(let i = 0; i < array.length; i++){
            let comment = array[i];
            console.log(comment.score);
            let auxStars = comment.score;
            htmlContentToAppend += `
            <div class="card mb-2">
                <div class="d-block">
                    <div class="card-header align-user w-100">
                    <div class="col font-italic m-0 pl-0">`+comment.user+'</div><div class="col text-right"> Calificación: '+ratingStars(auxStars)+`</div>
                    </div>
                </div>
                <div class="card-body ">
                    <blockquote class="blockquote mb-0">
                    <p>`+comment.description+`</p>
                    <div class="blockquote-footer text-right m-0">`+comment.dateTime+`</div>
                    </blockquote>
                </div>
            </div>
            `
    
            document.getElementById("comentarios-prod").innerHTML = htmlContentToAppend;
        }
    }
    

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCurrencyAndCostHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCurrencyAndCostHTML.innerHTML = product.currency + ` ` + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;
            
            
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            //Muestro imagenes de los productos relacionados
            showRelatedProducts(product.relatedProducts);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if(resultObj.status === "ok")
        {
            comment = resultObj.data;

            
            showComments(comment);
        }
    
    });
    
    });
