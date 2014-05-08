$(document).ready(function () {

  // Can link another page from this
  $('.tr-linkable').click( function() {
      window.location = $(this).find('a').attr('href');
  }).hover( function() {
      $(this).toggleClass('hover');
  });

  // Will trigger an event, but that might not be a link
  $('.tr-clickable').hover( function() {
      $(this).toggleClass('hover');
  });

});
