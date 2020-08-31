$(function(){
  //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
  $.ajax({
    type:'get',//get或post
    url:BigNew.user_detail,//请求的地址
    // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // dataType:'json',//text,json,xml,jsonp
    success:function(res){//成功的回调函数
      if(res.code===200){
        for(var key in res.data){
          $(`#form input[name=${key}`).val(res.data[key])
        }
        $('.user_pic').attr('src',res.data.userPic)
      }
    }
  })
  $('#exampleInputFile').change(function(){
    // console.log(this.files[0])
    var url=URL.createObjectURL(this.files[0]) 
    $('.user_pic').attr('src',url)
  })
  $('#form').on('submit',function(e){
    e.preventDefault()
    var data= new FormData(this)
    //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
    $.ajax({
      type:'post',//get或post
      url:BigNew.user_edit,//请求的地址
      contentType: false, // 不要进行其它编码 不需要额外编码就是二进制
      processData: false, 
      data:data,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType:'json',//text,json,xml,jsonp
      success:function(res){//成功的回调函数
        if(res.code===200){
          $.ajax({
            type:'get',//get或post
            url:BigNew.user_info,//请求的地址
            // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType:'json',//text,json,xml,jsonp
            success:function(res){//成功的回调函数
              if(res.code===200){
              parent.$('.sider .user_info img').attr('src',res.data.userPic)
              parent.$('.sider .user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)
              parent.$('.header_bar img').attr('src',res.data.userPic)
              }
            }
          })
        }
      }
    })
  })
})