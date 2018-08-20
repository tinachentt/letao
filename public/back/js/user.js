

$(function(){

  var currentPage;//页码
  var pageSize;//总页数
  var id;
  var isDelete;

  //渲染页面
render();

  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage||1,
        pageSize:5
      },
      dataType:"json",
      success:function(e){
        // console.log(e);
        var htmlstr = template("tpl",e);
        $("tbody").html(htmlstr);
          //翻页
     pageSize=Math.ceil(e.total/e.size);
          
      $("#pagination").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:e.page,//当前页
        totalPages:pageSize,//总页数
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(a, b, c,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          currentPage=page;
          render();
        }
       });
      }
    })
  }

  //点击禁用开启按钮弹出模态框
  $("tbody").on("click",".btnstart",function(){
    id = $(this).parent().parent().attr("dataid");
    $("#modalstart").modal("show");

    // console.log(id);
    isDelete = $(this).hasClass("btn-danger")? 1:0;

    console.log(id,isDelete)

  
  })

  $(".startout").on("click",function(){
      $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:id,
        isDelete:isDelete
      },
      dataType:"json",
      success:function(e){
        console.log(e)
        $("#modalstart").modal("hide");
        render();
      }
    })
  })
  
})