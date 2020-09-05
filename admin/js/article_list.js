$(function(){
  //
//其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
  $.ajax({
    type:'get',//get或post
    url:BigNew.category_list,//请求的地址
    // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',//text,json,xml,jsonp
    success:function(res){//成功的回调函数
      if(res.code===200){
        $('#selCategory').html(template('ooo',res))
      }
    }
  })
  //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
  $.ajax({
    type:'get',//get或post
    url:BigNew.article_query,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',//text,json,xml,jsonp
    success:function(res){//成功的回调函数
      // console.log(res)
      if(res.code===200){
        $('tbody').html(template('uuu',res.data))
        if(res.data.totalCount===0){
          $('#pagination-demo').hide().next().show()
        }else {
          $('#pagination-demo').show().next().hide()
        }
        pagination(res)
      }
    }
  })
  var PAGE=1
  function pagination(info) {
    $('#pagination-demo').twbsPagination({
      // totalPages: 35,
      totalPages: info.data.totalPage,
      visiblePages: 7, // 每个显示的最多页码值
      first: '首页',
      last: '尾页',
      prev: '上一页',
      next: '下一页',
      initiateStartPageClick: false,
      onPageClick: function (event, page) {
        PAGE=page
        //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
        $.ajax({
          type:'get',//get或post
          url:BigNew.article_query,//请求的地址
          data:{
            key:$('#myForm input[name=key]').val(),
            type: $('#myForm select[name=type]').val(),
            state:$('#myForm select[name=state]').val(),
            page:page,
            perpage:6
          },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
          dataType:'json',//text,json,xml,jsonp
          success:function(res){//成功的回调函数
            if(res.code===200){
              $('tbody').html(template('uuu',res.data))
            }
          }
        })
      }
    })
  }

  //筛选
  $('#myForm').on('submit',function(e){
    e.preventDefault()
    //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
    $.ajax({
      type:'get',//get或post
      url:BigNew.article_query,//请求的地址
      data:{
        key:$('#myForm input[name=key]').val(),
        type: $('#myForm select[name=type]').val(),
        state:$('#myForm select[name=state]').val(),
        page:1,
        perpage:6
      },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType:'json',//text,json,xml,jsonp
      success:function(res){//成功的回调函数
        if(res.code===200){
          // console.log(res)
          $('tbody').html(template('uuu',res.data))
          if(res.data.totalCount===0){
            $('#pagination-demo').hide().next().show()
          }else {
            $('#pagination-demo').show().next().hide()
          }
           // 改变页码显示
          // 第1个参数是当总页码改变的时候
          // 第2个参数是现在的总页码值
          // 第3个参数是默认显示的页码值
          $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
        }
      }
    })
  })

  //删除
  $('#delModal').on('shown.bs.modal', function (e) {
    window.ID=$(e.relatedTarget).data('id')
  })
  $('#delModal .surebtn').on('click',function(){
    //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
    $.ajax({
      type:'post',//get或post
      url:BigNew.article_delete,//请求的地址
      data:{
        id:ID
      },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType:'json',//text,json,xml,jsonp
      success:function(res){//成功的回调函数
        if(res.code===204){
          $('#delModal').modal('hide')
          //其他参数:beforeSend在发送之前可以使用return false取消,timeout超时时间,error,async同步还是异步
          $.ajax({
            type:'get',//get或post
            url:BigNew.article_query,//请求的地址
            data:{
              key:$('#myForm input[name=key]').val(),
              type: $('#myForm select[name=type]').val(),
              state:$('#myForm select[name=state]').val(),
              page:1,
              perpage:6
            },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType:'json',//text,json,xml,jsonp
            success:function(res){//成功的回调函数
              if(res.code===200){
                console.log(res)
                $('tbody').html(template('uuu',res.data))
                if(res.data.totalCount===0){
                  $('#pagination-demo').hide().next().show()
                }else {
                  if(res.data.data.length===0){
                    PAGE-=1
                  }
                }
                 // 改变页码显示
                // 第1个参数是当总页码改变的时候
                // 第2个参数是现在的总页码值
                // 第3个参数是默认显示的页码值
                $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
              }
            }
          })
        }
      }
    })
  })

  $('#release_btn').on('click',function(){
    parent.$('.menu .level02 li:eq(1)').click()
  })
})