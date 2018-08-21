                                


$(function(){
  render();

  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:99
      },
      dataType:"json",
      success:function(e){
        console.log(e)
        var htmlstr = template("tpl",e);
        $("tbody").html(htmlstr);
      }
    })
  }

  $(".addbtn").on("click",function(){
    $('#myModal').modal("show");
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:10
      },
      dataType:"json",
      success:function(e){
        console.log(e)
        var htmlstr = template("sencondtpl",e);
        $(".secondul").html(htmlstr);
      }
    })
  })

  //文件上传
  
  $("#fileupload").fileupload({
    
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      var url = data.result.picAddr;
      console.log(url);
      $("#addpic").attr("src",url);
      $('[name="brandLogo"]').val(url);
      $("form").data("bootstrapValidator").updateStatus("brandLogo","VALID")
    }
  });



  //二级分类下拉选择
  $('.secondul').on('click',"li a",function(){
    var str = $(this).text();
    console.log(str);
    $(".selSed span:first-child").text(str);
    var id = $(this).parent().data("id");
    console.log(id)
    $('[name="categoryId"]').val(id);

    $("#form").data('bootstrapValidator').updateStatus("categoryId","VALID")

  })

  // 表单验证
  $('#form').bootstrapValidator({

    excluded: [':disabled'],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty: {
            message: '不能为空'
          },
         }
      },
      brandName:{
        validators:{
          notEmpty: {
            message: '分类名不能为空'
          },
         }
      },
      brandLogo:{
        validators:{
          notEmpty: {
            message: '图片不能为空'
          },
      }
    } 
    }
  })

  //表单提交
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();

    // e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(e){
        console.log(e)
        $('#myModal').modal("hide");
        render();

        $("#form").data('bootstrapValidator').resetForm(true);
        $(".selSed span:first-child").text("请选择一级分类");
        $('#imgbox img').attr("src","./images/default.png");

      }
  

    })
 });
})