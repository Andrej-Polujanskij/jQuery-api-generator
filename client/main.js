jQuery(document).ready(function($) {
  var imageBefore = [];

  //Check if good image url
  function IsValidImageUrl(url) {
    $("<img>", {
      src: url,
      error: function() { getNewImage(); },
      load: function() {
        $('.app-img').attr('src', url)
        $('.app-img').fadeIn()

        imageBefore.push(url)
          if (imageBefore.length > 2) {
            imageBefore.shift()
          }
          if (imageBefore.length >= 2) {
            $('.image-before').removeAttr('disabled')
          }
      }
    });
  }

  //On click get image from api
  $('.btn-primary').click(function() {
    var number = Math.floor((Math.random() * 255) + 1);
    $('.spinner-border').fadeIn();
    $('.app-img').css({'display': 'none'})
    $.ajax({
      type: 'POST',
      url: '/api/' + number,
      processData: false,
      contentType: false,
      success: function(data) {
        IsValidImageUrl(data.image);
        $('.spinner-border').css({'display': 'none'})
      }
    });
  })

//Get image if bad url
  function getNewImage() {
    var number = Math.floor((Math.random() * 255) + 1);
   $('.spinner-border').fadeIn();
    $('.app-img').css({'display': 'none'})
    $.ajax({
      type: 'POST',
      url: '/api/' + number,
      processData: false,
      contentType: false,
      success: function(data) {
        IsValidImageUrl(data.image);
        $('.spinner-border').css({'display': 'none'})
      }
    });
  }

  //Show image before
  $('.image-before').click(function() {
    imageBefore.pop()
    $('.app-img').attr('src', imageBefore[0])
    $('.image-before').attr('disabled', 'true')
  })

})