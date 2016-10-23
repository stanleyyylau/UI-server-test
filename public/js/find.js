/*
* @Author: anchen
* @Date:   2016-10-17 14:20:54
* @Last Modified by:   anchen
* @Last Modified time: 2016-10-17 15:10:05
*/

$(document).ready(function() {
  var loading = new loadMore(options);
  read.province(defaultCity);

  $('.J_address').html('<i class="iconfont icon-didian"></i>' + defaultCity.children.name)

  $('#J_province, #J_city').on('change', function(event) {
    if (event.target.id === 'J_province') {
      read.city($(this).val())
      $('.J_submit').prop('disabled', true)
    } else {
      $('.J_submit').prop('disabled', false)
    }
  });

  $('.J_address, .J_cancel').on('click', function(event) {
    if(!common.getUa()) {
      if (event.target.className.indexOf('J_address') > -1 || event.target.className.indexOf('icon-didian') > -1) {
        $('.J_dialog').fadeIn(500)
      } else {
        $('.J_dialog').fadeOut(500)
      }
    } else {
      addressScroller.show()
      addressScroller.init()
    }
  });

  $('.J_scrollerConfirm, .J_scrollerCancel').on('click', function(event) {
    if (event.target.className.indexOf('J_scrollerConfirm') > -1) {
        addressScroller.confirm()
      } else {
        addressScroller.cancel()
      }
  });
})
