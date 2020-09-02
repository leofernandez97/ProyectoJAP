$('.btn-success').click(function( event ) {

    let arrayComment = document.getElementsByClassName("formComment")//Guardo todos los tags con .formComment
    
    dateComment = arrayComment[1].value; //tomo los valores de cada tag
    textComment = arrayComment[2].value;
    userComment = arrayComment[0].value;
    
    //con jquery los agrego DESPUES de el tag con id comentarios-prod
    $('#comentarios-prod').append(
    '<div class="card mb-2"><div class="d-block"><div class="card-header align-user w-100"><div class="col font-italic m-0 pl-0">'+userComment+'</div><div class="col text-right"> Calificación: '+ratingStars(auxStars)+'</div></div><div class="card-body "><blockquote class="blockquote mb-0"><p>'+textComment+'</p><div class="blockquote-footer text-right m-0">'+dateComment+'</div></blockquote></div></div>')
    //limpio textarea
    document.getElementById('textComment').value = "";  
  });


  //ESTRELLAS
  $(document).ready(function () {
  
    function setRating(rating) {
      $('#rating-input').val(rating);
      // llena todas las estrellas asignando la clase '.selected'
      $('.rating-star').removeClass('fa-star-o').addClass('selected');
      // vaciar todas las estrellas a la derecha del mouse
      $('.rating-star#rating-' + rating + ' ~ .rating-star').removeClass('selected').addClass('fa-star-o');
    }
    
    $('.rating-star')
    .on('mouseover', function(e) {
      var rating = $(e.target).data('rating');
      // llena todas las estrellas
      $('.rating-star').removeClass('fa-star-o').addClass('fa-star');
      // vaciar todas las estrellas a la derecha del mouse
      $('.rating-star#rating-' + rating + ' ~ .rating-star').removeClass('fa-star').addClass('fa-star-o');
    })
    .on('mouseleave', function (e) {
      // vacia todas las estrellas menos las .selected
      $('.rating-star').removeClass('fa-star').addClass('fa-star-o');
    })
    .on('click', function(e) {
      var rating = $(e.target).data('rating');
      setRating(rating);
    })
  });