$(function () {
  $.ajax({
    type: 'get',
    url: BigNew.comment_list,
    success: function (res) {
      if(res.code===200){
        $('tbody').html(template('commentlist', res.data))
        if(res.data.totalCount===0){
          $('#pagination-demo').hide().next().show()
        }else{
          $('#pagination-demo').show().next().hide()
          pagination(res)
        }
      }
    }
  })
  var PAGE = 1
  function pagination(res, visiblePages) {
    $('#pagination-demo').twbsPagination({
      totalPages: res.data.totalPage, // 总页数
      visiblePages: visiblePages || 7, // 可见最大上限页码值
      first: '首页',
      last: '最后一页',
      next: '下一页',
      prev: '上一页',
      initiateStartPageClick: false, // 不要默认点击 
      onPageClick: function (event, page) {
        PAGE=page
        $.ajax({
          type: 'get',
          url: BigNew.comment_list,
          data:{
            page:PAGE,
          },
          success: function (res) {
            if(res.code===200){
              console.log(res)
              $('tbody').html(template('commentlist', res.data))
            }
          }
        })
      }
    })
  }
  //通过
  $('tbody').on('click','.btn-info',function(){
    var $that=$(this)
    $.ajax({
      type:'post',
      url:BigNew.comment_pass,
      data:{
        id:$that.data('id')
      },
      success:function(res){
        if(res.code===200){
          $that.parent().prev().text('已批准')
        }else{
          alert(res.msg)
        }
      }
    })
  })

  //拒绝  
  $('tbody').on('click','.btn-warning',function(){
    var $that=$(this)
    $.ajax({
      type:'post',
      url:BigNew.comment_reject,
      data:{
        id:$that.data('id')
      },
      success:function(res){
        if(res.code===200){
          $that.parent().prev().text(res.msg)
        }else{
          alert(res.msg)
        }
      }
    })
  })


  //删除
  $('tbody').on('click','.btn-danger',function(){
    var that=$(this)
    $.ajax({
      type:'post',
      url:BigNew.comment_delete,
      data:{
        id:that.data('id')
      },
      success:function(res){
        if(res.code===200){
          $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            success: function (res) {
              if(res.code===200){
                $('tbody').html(template('commentlist', res.data))
                if(res.data.totalCount===0){
                  $('#pagination-demo').hide().next().show()
                }else{
                  $('#pagination-demo').show().next().hide()
                  pagination(res)
                  if(res.data.data.length===0){
                    PAGE-=1
                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, PAGE)
                  }
                }
              }
            }
          })
      }
    }
  })
})
})