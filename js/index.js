$(function(){
  //模板一
  $.ajax({
    type:'get',
    url:BigNew.category_list,
    success:function(res){
      $('.level_two').html('<li class="up"></li>'+template('categorylist',res))
      $('.left_menu').html(template('categorylist',res))
    }
  })
  //模板二
  $.ajax({
    type:'get',
    url:BigNew.hotPic_news,
    success:function(res){
      $('.focus_list').html(template('picture',res))
    }
  })
  //模板三
  $.ajax({
    type:'get',
    url:BigNew.latest_news,
    success:function(res){
      if(res.code===200){
        $('.common_news').html(template('latest',res))
      }
    }
  })
  //模板四
  $.ajax({
    type:'get',
    url:BigNew.hotrank_list,
    success:function(res){
      // console.log(res);
      if(res.code==200){
        var htmlStr = template('hotrank_list',res)
        $('.hotrank_list').html(htmlStr)
      }
    }
  })
  //模板五
  $.ajax({
    type:'get',
    url:BigNew.latest_comment,
    success:function(res){
      console.log(res);
      if(res.code==200){
        var htmlStr = template('latestCommentList',res)
        $('.comment_list').html(htmlStr)
      }
    }
  })
  //模板六
  $.ajax({
    type:'get',
    url: BigNew.attention_news,
    success:function(res){
      // console.log(res);
      if(res.code==200){
        var htmlStr = template('attentionList',res)
        $('.guanzhu_list').html(htmlStr)
      }
    }
  })
  //搜索按钮
  $('.search_btn').on('click',function(){
    if(!($('.search_txt').val().trim())){
      alert('输入不能为空,请重新输入')
      return
    }
    window.location.href='./list.html?search='+$('.search_txt').val().trim()
  })
})