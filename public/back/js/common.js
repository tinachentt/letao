$(function(){
  //二级分类显示gongneng
  $(".lt-aside .info").click(function(){
    $(".lt-aside .info .child").slideToggle();
  })
  //点击显示影藏导航栏
  $(".icon-nav").click(function(){
    $(".lt-aside").toggleClass("hidd");
    $(".topbar").toggleClass("hi");
  })
  //点击退出首页
  $(".icon-login").click(function(){
    $('#myModal').modal('show');
  })
  $("#myModal .out").click(function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(e){
        // console.log(e)
        if(e.success){
          location.href="login.html";
        }
      }
    })
  })


  //登陆拦截
  if(location.href.indexOf('login.html')===-1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      dataType:"json",
      success:function(e){
        // console.log(e)
        if(e.success){
          // location.href="login.html";
        }
        if(e.error==400){
          location.href="login.html";
        }
      }
  })
}

})