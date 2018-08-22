

$(function(){


  //渲染页面
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:1,
        pageSize:5
      },
      dataType:"json",
      success:function(e){
        console.log(e)
        var htmlstr = template("tpl",e);
        $("tbody").html(htmlstr);
      }
    })
  }

  //点击添加商品按钮 弹出模态框 渲染二级分类

  $(".addbtn").on("click",function(){
    $(".modal").modal("show");

    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:10
      },
      dataType:"json",
      success:function(e){
        console.log(e);
        var htmlstr = template("protpl",e);
        $(".proul").html(htmlstr);

      }
    })
  })

  //设置二级分类的值
 $(".proul").on("click","li a",function(){
   var str = $(this).text()
  $(".selSed span:first-child").text(str);
   var id = $(this).parent().data("id");
   $('[name="brandId"]').val(id);
   //改变表单的校验状态
   $("#form").data('bootstrapValidator').updateStatus("brandId", "VALID");
 })

 //多文件上传预览
 var arr = [];
 
 $("#fileupload").fileupload({
  dataType:"json",
  //e：事件对象
  //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
  done:function (e, data) {
  
    var url = data.result;
    // console.log(url)
    //往数组的前面追加图片地址
    arr.unshift(url);
    //判断图片数量如果大于三张。就减去最后一张
    
    if(arr.length>3){
      arr.pop();
    $('#imgbox img').eq(-1).remove();
      
    }
    //讲图片渲染在前台页面

    $('#imgbox').prepend('<img src="'+data.result.picAddr+'">');

    console.log(arr);

    if(arr.length===3){
   $("#form").data('bootstrapValidator').updateStatus("start", "VALID");
      
    }
  }
});

//验证表单
$('#form').bootstrapValidator({
  //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  excluded: [],
  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    brandId: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        regexp: {
          regexp: /^[a-zA-Z0-9_\.]+$/,
          message: '用户名由数字字母下划线和.组成'
        }
      }
    },
    proName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
      }
    },
    proDesc: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
      }
    },
    num: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        regexp: {
          regexp: /^[1-9]\d*$/,
          message: '非零开头的数字组成'
        }
      }
    },
    size: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        regexp: {
          regexp: /^\d{2}-\d{2}$/,
          message: '非零开头的数字组成'
        }
      }
    },
    oldPrice: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
      }
    },
    price: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
      }
    },
    brandLogo: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
      }
    },
    start:{
      validators: {
        //不能为空
        notEmpty: {
          message: 'tupian不能为空'
        },
      }
    }
  }

});

$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  var formstr = $("#form").serialize();
  console.log( arr[0].picAddr)  
  formstr += "&picAddr1="+ arr[0].picAddr+"&picName1="+arr[0].picName;
  formstr += "&picAddr2="+ arr[1].picAddr+"&picName2="+arr[1].picName;
  console.log(formstr)
  formstr += "&picAddr3="+ arr[2].picAddr+"&picName3="+arr[2].picName;
  $.ajax({
    type:"post",
    url:"/product/addProduct",
    data:formstr,
    dataType:"json",
    success:function(e){
      console.log(e);
    $(".modal").modal("hide");
    render();
    $("#form").data('bootstrapValidator').resetForm(true);
    $('#imgbox img').remove();
    }
  })
});

})