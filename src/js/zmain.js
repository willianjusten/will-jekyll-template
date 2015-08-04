(function( $, window, undefined ) {
  // Menu
  $("a#slide").click(function(){
    $("#sidebar,a#slide,#fade").addClass("slide");
    $("#open").hide();
    $("#search").hide();
    $("#close").show();
  });

  $("#fade").click(function(){
    $("#sidebar,a#slide,#fade").removeClass("slide");
    $("#open").show();
    $("#search").show();
    $("#close").hide();
  });

  // Search
  var bs = {
    close: $(".icon-remove-sign"),
    searchform: $(".search-form"),
    canvas: $("body"),
    dothis: $('.dosearch')
  };

  bs.dothis.on('click', function() {
    $('.search-wrapper').css({ transform: "translateY(0)" });
    bs.searchform.toggleClass('active');
    bs.searchform.find('input').focus();
    bs.canvas.toggleClass('search-overlay');
    $('.search-field').simpleJekyllSearch();
  });

  bs.close.on('click', function() {
    $('.search-wrapper').removeAttr( 'style' );
    bs.searchform.toggleClass('active');
    bs.canvas.removeClass('search-overlay');
  });

  // Scroll
  smoothScroll.init({
    updateURL: false
  })
})( Zepto, window );