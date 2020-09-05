$(function(){
  //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
  $.ajax({
    type:'get',//get或post
    url:BigNew.category_list,//请求的地址
    // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',//text,json,xml,jsonp
    success:function(res){//成功的回调函数
      if(res.code===200){
        $('.category').html(template('categoryList',res))
      }
    }
  })
  $('#inputCover').on('change', function () {
    $('#form .article_cover').attr('src', URL.createObjectURL((this.files)[0]))
  })
  jeDate("#testico", {
    onClose: false,
    multiPane: false,
    theme: { bgcolor: "#D91600", pnColor: "#FF6653" },
    format: "YYYY-MM-DD",
    isTime: false,
    minDate: "2014-09-19 00:00:00"
  })
  var E= window.wangEditor
  var editor=new E('#editor')
  editor.create()
  $('#form').on('click','.btn',function(e){
    e.preventDefault()
    var data=new FormData($('#form')[0])
    if($(e.taget).hasClass('btn-release')){
      data.append('state','已发布')
    }
    data.append('content',editor.txt.html())
    $.ajax({
      type:'post',
      url:BigNew.article_publish,
      data:data,
      contentType:false,
      processData:false,
      success:function(res){
        if(res.code===200){
          parent.$('.menu .level02>li:eq(0)').click()
          window.history.back()
        }
      }

    })
  })
})