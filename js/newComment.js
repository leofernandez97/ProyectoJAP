$('.btn-success').click(function( event ) {

    let arrayComment = document.getElementsByClassName("formComment")//Guardo todos los tags con .formComment
    
    dateComment = arrayComment[1].value; //tomo los valores de cada tag
    textComment = arrayComment[2].value;
    userComment = arrayComment[0].value;
    
    //con jquery los agrego DESPUES de el tag con id comentarios-prod
    $('#comentarios-prod').append(
    '<div class="card mb-2"><div class="d-block"><div class="card-header align-user w-100">'+userComment+'</div></div><div class="card-body "><blockquote class="blockquote mb-0"><p>'+textComment+'</p><div class="blockquote-footer m-0">'+dateComment+'</div></blockquote></div></div>')
    //limpio textarea
    document.getElementById('textComment').value = "";  
  });