

$(function(){



  //页面渲染
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
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



  //点击添加分类。展示模态框
 $(".addbtn").on("click",function(){
   $("#myModal").modal("show");
 })


 //校验表单
 $("#form").bootstrapValidator({
   fields:{
    categoryName:{
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        }
      }
    }
   }
 })

 $("#form").on("success.form.bv",function(e){

  e.preventDefault();
   var categoryName = $("#addinp").val();
   console.log(categoryName)
  $.ajax({
    type:"post",
    url:"/category/addTopCategory",
    data:{
      categoryName:categoryName
      
    },
    dataType:"json",
    success:function(e){
      // console.log(e)
      if(e.success){
        $("#myModal").modal("hide");
        render();
        $('#form').data("bootstrapValidator").resetForm(true);
      }
    }
  })
})



})