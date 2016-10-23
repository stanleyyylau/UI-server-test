function getHashTag(){
  return window.location.hash.substr(1);
}

function goToHashTag(index){
  $('.m-content').hide();
  var listBtns = $('.qa-list li a');
  listBtns.removeClass('on-select');
  listBtns.each(function(i,element){
    if($(element).data('qaid')==index){
      $(element).addClass('on-select');
      return false;
    }
  })
  $('.m-content').eq(index).fadeIn();
}

window.onhashchange = function(){
  var index = getHashTag();
  goToHashTag(index);
}

window.onload = function(){
  var index = getHashTag();
  goToHashTag(index);
}
