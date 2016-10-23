/* 
* @Author: anchen
* @Date:   2016-10-17 14:23:24
* @Last Modified by:   anchen
* @Last Modified time: 2016-10-17 14:56:17
*/

var read = {
  province: function(data) {
    var arr = [];
    read.arrProvince = [];
    var obj = {};
    var tpl = '<option value="0">请选择省</option>';
    if (cityData) {
      arr = cityData.reverse()
      for (var i = arr.length - 1; i >= 0; i--) {
        if (data && data.id === arr[i].code) {
          tpl += '<option value="' + arr[i].code + '" selected>' + arr[i].name + '</option>'
          read.city(arr[i].code, data.children.id)
        } else {
          tpl += '<option value="' + arr[i].code + '">' + arr[i].name + '</option>'
        }
        obj.name = arr[i].name
        obj.value = arr[i].code
        read.arrProvince.push(obj)
        obj = {}
      }
      $('#J_province').html(tpl)
    }
  },
  city: function(id, childrenId) {
    read.arrCity = [];
    var obj = {}
    var tpl = '<option value="0">请选择市</option>'
    for (var i = 0; i < cityData.length; i++) {
      if (cityData[i].code === id) {
        for (var j = 0; j < cityData[i].children.length; j++) {
          if (childrenId && cityData[i].children[j].code === childrenId) {
            tpl += '<option value="' + cityData[i].children[j].code + '" selected>' + cityData[i].children[j].name + '</option>'
          } else {
            tpl += '<option value="' + cityData[i].children[j].code + '">' + cityData[i].children[j].name + '</option>'
          }
          obj.name = cityData[i].children[j].name
          obj.value = cityData[i].children[j].code
          read.arrCity.push(obj)
          obj = {}
        }
        break;
      }
    }
    $('#J_city').html(tpl)
  }
};