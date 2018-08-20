                                


$(function(){
  render();

  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
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


  $("#fileupload").fileupload({
    
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      var url = data.result.picAddr;
      console.log(url);
      $("#addpic").attr("src",url);
    }
  });



  //二级分类下拉选择
  $('.secondul').on('click',"li a",function(){
    var str = $(this).text();
    console.log(str);
    $(".selSed span:first-child").text(str);
  })

  //表单验证
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      
    }
  })
})