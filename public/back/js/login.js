$(function(){

  //重置表单 
  $(".login .reset").on("click",function(){
    $("#form").data('bootstrapValidator').resetForm(true);
  })


  //表单校验配置
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 4,
            max: 12,
            message: '用户名长度必须在6到12之间'
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }

  })


  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(e){
        console.log(e)
        if(e.success){
          location.href="index.html"
        }
        if(e.error==1000){
          // alert("用户名不存在")
          $("#form").data('bootstrapValidator').updateStatus('username',"INVALID", "callback");
        }
        if(e.error==1001){
          // alert("密码错误")
          $("#form").data('bootstrapValidator').updateStatus('password',"INVALID", "callback");
        }
      }
    })
  })


})