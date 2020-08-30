$(function(){
  //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
  $.ajax({
    type:'get',//get或post
    url:BigNew.user_info,//请求的地址
    // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',//text,json,xml,jsonp
    success:function(res){//成功的回调函数
      if(res.code===200){
      $('.sider .user_info img').attr('src',res.data.userPic)
      $('.sider .user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)
      $('.header_bar img').attr('src',res.data.userPic)
      }
    }
  })
})
$(function(){
  $('.header_bar .logout').click(function(){
    window.localStorage.removeItem('token')
    window.location.href='./login.html'
  })
})
$(function(){
  $('.menu .level01').on('click',function(){
    $(this).addClass('active').siblings('div').removeClass('active')
    if($(this).index()===1){
      $('.menu .level02').slideToggle()
      $('.menu .level01').find('b').toggleClass('rotate0')
      $('.menu .level02 li:eq(0)').click()
    }
  })
})
$(function(){
  $('.menu .level02 li').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active')
  })
})