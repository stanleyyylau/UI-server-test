// $('input, textarea').placeholder();

var app = {
  bindEvent: function(){
    $('.form-common .on-submit').on('click', app.handleCommonForm);
    $('.form-business .on-submit').on('click', app.handleBusinessForm);
  },

  handleCommonForm: function(e){
    e.preventDefault();
    var helper = {
      formContent: {},
      backEndUrl: "https://st-portfolio-on.herokuapp.com/message",

      getFormContent: function(){
        helper.formContent.name = $('.form-common #name').val();
        helper.formContent.contact = $('.form-common #contact').val();
        helper.formContent.requirement = $('.form-common #requirement').val();
      },

      validateForm: function(){
        var regHelper = {
          name: /^[\u4e00-\u9fa5]{2,4}$/,
          contact: /^1[34578]\d{9}$/
        }

        if(!(helper.formContent.name)){
          return dialog({
                        content: '请输入正确的名字',
                        ok: function () {$('.form-common #name').focus();},
                        cancel: false
                        }).show();
        }
        if(!(helper.formContent.contact)){
          return dialog({
                        content: '请输入正确的联系方式',
                        ok: function () {$('.form-common #contact').focus();},
                        cancel: false
                        }).show();
        }
        if(!(helper.formContent.requirement)){
          return dialog({
                        content: '请输入正确的需求',
                        ok: function () {$('.form-common #requirement').focus();},
                        cancel: false
                        }).show();
        }

        return "passed"
      },

      sendToServer: function(d){
        $.ajax({
          url: helper.backEndUrl,
          method: 'POST',
          data: {message: helper.formContent},
          success: function(data){
            if(data.status === 200){
               d.close();
              dialog({
                  content: '发送成功',
                  ok: function () {
                    helper.resetForm();
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

      onBtnClick: function(){
        helper.getFormContent();
        var isValidatePassed = helper.validateForm();
        if(isValidatePassed == "passed"){
          var d = dialog({
              title: '确定',
              content: '是否确认提交申请?',
              okValue: '确定',
              ok: function () {
                  helper.sendToServer(d);
                  this.title('提交中…');
                  return false;
              },
              cancelValue: '取消',
              cancel: function () {}
          });
          d.show();
        }
      },

      resetForm: function(){
        $('.form-common')[0].reset();
      }
    }
    helper.onBtnClick();
  },

  handleBusinessForm: function(e){
    e.preventDefault();
    var helper = {
      formContent: {},
      backEndUrl: "https://st-portfolio-on.herokuapp.com/message",

      getFormContent: function(){
        helper.formContent.content = $('.form-business textarea').val();
      },

      validateForm: function(){
        if(!(helper.formContent.content)){
          return dialog({
                        content: '请输入合作的联系方式，地址等',
                        ok: function () {$('.form-business textarea').focus();},
                        cancel: false
                        }).show();
        }
        return 'passed';
      },

      sendToServer: function(d){
        $.ajax({
          url: helper.backEndUrl,
          method: 'POST',
          data: {message: helper.formContent},
          success: function(data){
            if(data.status === 200){
               d.close();
              dialog({
                  content: '发送成功',
                  ok: function () {
                    helper.resetForm();
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

      onBtnClick: function(){
        helper.getFormContent();
        var isValidatePassed = helper.validateForm();
        if(isValidatePassed == "passed"){
          var d = dialog({
              title: '确定',
              content: '是否确认提交申请?',
              okValue: '确定',
              ok: function () {
                  helper.sendToServer(d);
                  this.title('提交中…');
                  return false;
              },
              cancelValue: '取消',
              cancel: function () {}
          });
          d.show();
        }
      },

      resetForm: function(){
        $('.form-business')[0].reset();
      }
    }
    helper.onBtnClick();
  },
}

app.bindEvent();
