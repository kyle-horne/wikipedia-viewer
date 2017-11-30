$(document).ready(function(){

  $('.fa-close').on('click', function(){
    $('.input-group').fadeOut(function(){
      $('.wiki-results').empty();
      $('.card-text').fadeIn();
      $('#search').val('');
      $('.error-msg').hide();
    });

  });

  $('.fa-search').on('click', function(){
    $('.card-text').fadeOut(function(){
      $('.input-group').fadeIn();
      $('.input-group').removeClass('hide');
      $('.error-msg').hide();
      $('#search').focus();
    });

  });

  function searchWikipedia(){
    var title = $('#search').val();
    var cb = "&callback=?";
    $('.wiki-results div').show().fadeOut('slow')
    $('.wiki-results').empty();
    $('.error-msg').hide();
    $.ajax({
      type: "GET",
      url: "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrlimit=10&format=json&prop=pageimages|extracts&exintro&explaintext&exsentences=1&gsrsearch=" + title + cb,
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",
      success: function (data, textStatus, jqXHR) {
        var posts = data.query.pages;
        $.each(posts, function(k, v) {
          $('.wiki-results').hide().append('<a href="https://en.wikipedia.org/?curid=' + v.pageid + '" target="_blank"><div class="col"><p class="result-title">' + v.title + '</p><p class="result-extract">'+ v.extract + '</p></div></a>').fadeIn('slow');
        });
      },
      error: function (errorMessage) {
      }
    });
  }

  $('.btn').on('click', function (e) {
    if($('#search').val() === ''){
      $('.error-msg').removeClass('hide');
      $('.error-msg').show();
      $('#search').focus();
    } else {
      searchWikipedia();
    }
  });

  $('#search').on('keypress', function (e) {
    if (e.which == 13) {
      if ($('#search').val() === ''){
        $('.error-msg').removeClass('hide');
        $('.error-msg').show();
        $('#search').focus();
      } else {
        searchWikipedia();
      }
    }

  });

});
