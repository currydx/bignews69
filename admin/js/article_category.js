$(function () {
  render()
  //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
  function render() {
    $.ajax({
      type: 'get',//get或post
      url: BigNew.category_list,//请求的地址
      // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType: 'json',//text,json,xml,jsonp
      success: function (res) {//成功的回调函数
        if (res.code === 200) {
          $('tbody').html(template("categoryTemplate", res))
        }
      }
    })
  }
  
  $('#myModal').on('shown.bs.modal', function (e) {
    if(e.relatedTarget==$('#xinzengfenlei')[0]){
      $('#myModal h4').text('新增文章类别')
      $('.surebtn').text('新增')
      $('#myForm')[0].reset()
      $('#myForm input[name=id]').val('')
    }else{
      $('#myModal h4').text('更新文章类别')
      $('.surebtn').text('更新')
      //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
      $.ajax({
        type:'get',//get或post
        url:BigNew.category_search,//请求的地址
        data:{
         id: $(e.relatedTarget).data('id')
        },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',//text,json,xml,jsonp
        success:function(res){//成功的回调函数
          if(res.code===200){
            $('#myForm input[name=id]').val(res.data[0].id)
            $('#myForm input[name=name]').val(res.data[0].name)
            $('#myForm input[name=slug]').val(res.data[0].slug)
          }
        }
      })
    }
  })
  $('.surebtn').on('click',function(){
    //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
    $.ajax({
      type:'post',//get或post
      url:$('#myForm input[name=id]').val()?BigNew.category_edit:BigNew.category_add,//请求的地址
      data:$('#myForm').serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      // dataType:'json',//text,json,xml,jsonp
      success:function(res){//成功的回调函数
        if(res.code===201||res.code===200){
          render()
        }
      },
      complete:function(){
        $('#myModal').modal('hide')
      }
    })
  })
  //删除
  $('#delModal').on('shown.bs.modal', function (e) {
    window.ID=$(e.relatedTarget).data('id')
  })
  $('.deletebtn').on('click',function(){
    //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
    $.ajax({
      type:'post',//get或post
      url:BigNew.category_delete,//请求的地址
      data:{id:ID},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType:'json',//text,json,xml,jsonp
      success:function(res){//成功的回调函数
        if(res.code===204){
          $('#delModal').modal('hide')
          render()
        }
      }
    })
  })
})

