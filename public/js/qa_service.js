function getHashTag(){
  return window.location.hash.substr(1);
}

function goToHashTag(index){
  var $contents = $('.m-content');
  $contents.hide();
  $contents.each(function(i,element){
    if($(element).data('page')==index){
      $(element).fadeIn();
      // Hanlde pagination here
      $('.panigation-container').show();
      var $pageItems = $('.J_page .page-item')
      $pageItems.removeClass('page-item-cur');
      $pageItems.removeClass('page-item-disabled');
      $pageItems.eq(Number(index)+1).addClass('page-item-cur');
      if(index == 0){
        $pageItems.eq(0).addClass('page-item-disabled');
      }
      if(index == 2){
        $pageItems.eq($pageItems.length-1).addClass('page-item-disabled');
      }
      return false;
    }
  })
}

window.onhashchange = function(){
  var index = getHashTag();
  goToHashTag(index);
}

window.onload = function(){
  var index = getHashTag();
  goToHashTag(index);
}


$('.page-item.up, .page-item.down').on('click',function(e){
  e.preventDefault();
  if($(this).hasClass('page-item-disabled')){
    return;
  }
  if($(this).hasClass('up')){
    var currentPage = getHashTag();
    // goToHashTag(Number(currentPage)+1);
    var initialPage = location.pathname;
    var targetPage = Number(currentPage)-1;
    location.replace(initialPage+'#'+targetPage);
  }else{
    var currentPage = getHashTag();
    // goToHashTag(Number(currentPage)-1);
    var initialPage = location.pathname;
    var targetPage = Number(currentPage)+1;
    location.replace(initialPage+'#'+targetPage);
  }
})
