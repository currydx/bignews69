$(function () {
  //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
  $.ajax({
    type: 'get',//get或post
    url: BigNew.category_list,//请求的地址
    // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',//text,json,xml,jsonp
    success: function (res) {//成功的回调函数
      $('.category').html(template('lll', res))
    }
  })

  jeDate("#testico", {
    onClose: false,
    multiPane: false,
    theme: { bgcolor: "#D91600", pnColor: "#FF6653" },
    format: "YYYY-MM-DD",
    isTime: false,
    minDate: "2014-09-19 00:00:00"
  })
  var E = window.wangEditor
  var editor = new E('#editor')
  // 或者 var editor = new E( document.getElementById('editor') )
  editor.create() 
  var id = utils.convertToObj(location.search.slice(1)).id
  //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
  $.ajax({
    type: 'get',//get或post
    url: BigNew.article_search,//请求的地址
    data: {
      id: id
    },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',//text,json,xml,jsonp
    success: function (res) {//成功的回调函数
      if (res.code === 200) {
        $('#form [name=id]').val(res.data.id)
        $('#form [name=title]').val(res.data.title)
        $('#form .article_cover').attr('src', res.data.cover)
        $('#form select[name=categoryId]').val(res.data.categoryId)
        $('#form #testico').val(res.data.date)
        editor.txt.html(res.data.content)
      }
    }
  })
  $('#inputCover').on('change', function () {
    $('.article_cover').attr('src', URL.createObjectURL((this.files)[0]))
  })

  // 通过form表单注册点击事件
  $('#form').on('click','.btn',function(e){
    //取消默认行为
    e.preventDefault()
    //e.target指向触发事件的源头(哪个按钮)
    console.log(e.target)//DOM对象
    //通过formdata准备数据
    var data=new FormData($('#form')[0])
    //追加富文本内容
    data.append('content',editor.txt.html())
    //判断按钮
    if($(e.target).hasClass('btn-edit')){
      data.append('state','已发布')
    }
    //发送请求更新文章
    //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
    $.ajax({
      type:'post',//get或post
      url:BigNew.article_edit,//请求的地址
      data:data,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      contentType: false, // 不要进行其它编码 不需要额外编码就是二进制
      processData: false, // 不要转换成字符串
      dataType:'json',//text,json,xml,jsonp
      success:function(res){//成功的回调函数
        if(res.code===200){
          window.history.back()
        }
      }
    })
  })

})