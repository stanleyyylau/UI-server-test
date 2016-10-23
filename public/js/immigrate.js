// API for testing message sending : https://st-portfolio-on.herokuapp.com/message

var app = (function(){
  var slider = {
      wontChange: {
        $controlBtns: $('.status-bar li'),
        activeClassName: 'immigrate_control_btn_active',
        $sliderViewPort: $('.slider-viewport')
      },

      makeActive: function(index){
        slider.wontChange.$controlBtns.removeClass(slider.wontChange.activeClassName);
        slider.wontChange.$controlBtns.eq(index).addClass(slider.wontChange.activeClassName)
      },

      goTo: null,

      whenBtnIsClicked: function(){
        var str = $(this).html();
        var number = Number(str);
        number = number - 1;
        slider.goTo(number);
      },

      bindEvent: function(){
        slider.wontChange.$controlBtns.on('click', slider.whenBtnIsClicked);
        slider.goTo = slider.wontChange.$sliderViewPort.slider({
          isFadeIn: true,
          doItAfterEachSlide: function(index){
            slider.makeActive(index);
          },
          sliderViewport: 886
        }).goTo;
      }
  }

  var sendMessage = {
    message: {},
    url: "https://st-portfolio-on.herokuapp.com/message",

    sendToServer: function(d, form){
      $.ajax({
        url: sendMessage.url,
        method: 'POST',
        data: {message: sendMessage.message},
        success: function(data){
          if(data.status === 200){
             d.close();
            dialog({
                content: '发送成功',
                ok: function () {
                  sendMessage.resetForm(form);
                },
                cancel: false
            }).show();


          }else{
            d.close();
            dialog({
                content: '发送失败',
                ok: function () {},
                cancel: false
            }).show();

          }
        },
        error: function(){
          d.close();
            dialog({
                content: '网络出错',
                ok: function () {},
                cancel: false
              }).show();

        }
      });
    },

    onSubmitClick: function(e){
      e.preventDefault();
      var theForm = this.closest('form');
      sendMessage.getFormContent();
      var isValidatePassed = sendMessage.validateForm();
      if(isValidatePassed == 'passed'){
        sendMessage.d = dialog({
            title: '确定',
            content: '是否确认提交申请?',
            okValue: '确定',
            ok: function () {
                sendMessage.sendToServer(sendMessage.d, theForm);
                this.title('提交中…');
                return false;
            },
            cancelValue: '取消',
            cancel: function () {}
        });
        sendMessage.d.show();
      }
    },

    getFormContent: function(){
      sendMessage.message.name = $('form #name').val();
      sendMessage.message.age = $('form #age').val();
      sendMessage.message.contact = $('form #contact').val();
      sendMessage.message.wechat = $('form #wechat-account').val();
      sendMessage.message.IELTS = $('form #IELTS-score').val();
      sendMessage.message.experience = $('form #detail-experience').val();
    },

    validateForm: function(){
      var helper = {
        name: /^[\u4e00-\u9fa5]{2,4}$/,
        phone: /^1[34578]\d{9}$/
      }
      if(!(helper.name.test(sendMessage.message.name))){
        return dialog({
                      content: '请输入正确的名字',
                      ok: function () {$('form #name').focus();},
                      cancel: false
                      }).show();
      }
      if(!( sendMessage.message.age>1 && sendMessage.message.age<100 )){
        return dialog({
                      content: '请输入正确的年龄',
                      ok: function () {$('form #age').focus();},
                      cancel: false
                      }).show();
      }
      if(!(helper.phone.test(sendMessage.message.contact))){
        return dialog({
                      content: '请输入正确的联系方式',
                      ok: function () {$('form #contact').focus();},
                      cancel: false
                      }).show();
      }
      if(!sendMessage.message.wechat){
        return dialog({
                      content: '请输入正确的微信号码',
                      ok: function () {$('form #wechat-account').focus();},
                      cancel: false
                      }).show();
      }
      if( !(sendMessage.message.IELTS>0 && sendMessage.message.IELTS < 10) ){
        return dialog({
                      content: '请输入正确的雅思成绩',
                      ok: function () {$('form #IELTS-score').focus();},
                      cancel: false
                      }).show();
      }
      if( !sendMessage.message.experience ){
        return dialog({
                      content: '请输入相关经历',
                      ok: function () {$('form #detail-experience').focus();},
                      cancel: false
                      }).show();
      }
      return 'passed';
    },

    resetForm: function(form){
      form.reset();
    },

    bindEvent: function(){
      $( ".apply-form-submit" ).on( "click", sendMessage.onSubmitClick )
    }
  }

  var temp = {
    bindEvent: function(){
      $('.related-item').mouseenter(temp.handlerIn).mouseleave(temp.handlerOut);
      $('.enroll-now').on('click',function(){
        $('.assistance').scrollView();
      });
      $('.to-top').backToTop();

      //IE placeholder bug fixed
      $('input, textarea').placeholder();
    }
  }

  var init = function(){
    temp.bindEvent();
    slider.bindEvent();
    sendMessage.bindEvent();
  }

  init();
  return {
    sliderGoTo: slider.goTo,
    backEndUrl: sendMessage.url,
    resetForm: sendMessage.resetForm
  }
}
)();
