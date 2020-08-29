$(function(){
  $('.login_form').on('submit',function(e){
    e.preventDefault()
    //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
    $.ajax({
      type:'post',//get或post
      url:'http://localhost:8080/api/v1/admin/user/login',//请求的地址
      data:$(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType:'json',//text,json,xml,jsonp
      success:function(res){//成功的回调函数
        $('#mymodal').modal('show')
        $('.modal-body p').text(res.msg)
        if(res.code===200){
          $('#mymodal').on('hidden.bs.modal', function () {
            location.href='./index.html'
            window.localStorage.setItem('token',res.token)
          })
        } 
      },
        error:function(){
          $('#mymodal').modal('show')
          $('.modal-body p').text('网络高速公路，请稍后再试！')
        }
    })
  })
})