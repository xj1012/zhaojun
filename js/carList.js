$(document).ready(function() {
   //通过id得到购物车对应的商品
	var str=location.search;
    var pot=str.split("=");
    var id=pot[1];
    $.ajax({
		type: "get",
		url: "details.json",
		async: false,
		success: function(data) {
			//从cookie中获取商品id或数量
			   var arr= getCookie("IDS");
		       var arr2=getCookie("NUMBER");
			   var html = "";
			   var indexs=[];
			   var valuess=[];
			for(var y=0;y<2;y++){
			$.each(data, function(index, values) {
				//判断获取的cookie是有值  若有 扔入数组中  
				if(y==0){
					indexs.push(index);
					valuess.push(values);
				}
				//若没有 则进行分割   查找数组中是否存在
				else{
					if(arr!=undefined){
				   var ids= arr.split(",");
		       	   var numbers=arr2.split(",");
					if(indexs.indexOf(parseInt(ids[index]))>0){
						//alert(ids[index]);
					html += "<li><img src='"+valuess[parseInt(ids[index])-1].imageURL+"'><div class='r'>"+"<b class='del'>删除商品</b>"+
							"<a href='javascript:;' class='jian'>-</a>"+"<span class='num'>"+numbers[index]+"</span>"+"<a href='javascript:;' class='jia'>+"+"</a>"+
							"</div>"+"</li>";
	               }
				}
			  }	
			});
			}
			//alert(html);
			$("#oList")[0].innerHTML = html;			
		}

	})
    //添加删除功能
            var $b=$(".del");
            //给父元素中的b标签添加点击事件  删除父元素中的li标签
           $("#oList").on("click","b",function(){
			   $(this).parents("li").remove();
			  });
    
  //数量加减    (存在多条数据的bug)
	$(".jia").click(function() {
		var n = $(".num").text();
		$(".num").text("");
		$(".num").text(parseInt(n) + 1);
		
	})
	$(".jian").click(function() {
		if(parseInt($(".num").text()) == 0) {
			click = null;
			return;
		}
		var n = $(".num").text();
		$(".num").text("");
		$(".num").text(parseInt(n) - 1);

	})
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
	//关注
	$("#enter").hover(function() {
		$(".wei").show();
	}, function() {
		$(".wei").hide();
	});
	$(".wei").hover(function() {
		$(".wei").show();
	}, function() {
		$(".wei").hide();
	})

	//联系人
	$("#sever").hover(function() {
		$(".center").show();
	}, function() {
		$(".center").hide();
	})
	$(".center").hover(function() {
		$(".center").show();
	}, function() {
		$(".center").hide();
	})

	//购物车
	$(".car").hover(function() {
		$(".select").show();
	}, function() {
		$(".select").hide();
	});
	$(".select").hover(function() {
		$(".select").show();
	}, function() {
		$(".select").hide();
	});
	
	//跨域获取数据
	var $input = $(".right input");
	var $oList = $(".right .list");
	$input.on('input', function() {
		var val = this.value;
		$.ajax({
			type: "get",
			url: 'http://rec.mogujie.com/jsonp/recommend/1?callback=data&pid=17721&p_keyWord=' + val + '&row=10&_=1501636097230',
			async: true,
			dataType: "jsonp",
			jsonpCallback: 'data',
			success: function(data) {
				var data = data.data.data;
				var html = "";
				console.log(data);
				for(var i in data) {
					html += "<li><a href=''>" + data[i].query + "</a></li>"
				}
				console.log($('.list'))
				$('.list')[0].innerHTML = html;
				$('.list').css("display", "block");
			}
		});
	})
	$input.on('blur', function() {
		$('.list').css("display", "none");
	})
	//导航部分
	var aMenuLi = $('#menu li');
	aMenuLi.bind('mouseenter', function() {
		var iIndex = $(this).index();
		// 清除所有LI的className, 当前LI添加className
		aMenuLi.removeClass('active').eq(iIndex).addClass('active');

		$('.panel').removeClass('active').eq(iIndex).addClass('active');
	});
	$("#min").hover(function() {
		$("#nav .hide").show();
	})
	$("#nav .hide").mouseleave(function() {
		$("#nav .hide").hide();
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	//底部定位
	$(".last-f").hover(function() {
		$(".hide1").show();
	}, function() {
		$(".hide1").hide();
	})
	$(".hide1").hover(function() {
		$(".hide1").show();
	}, function() {
		$(".hide1").hide();
	})
	$(".last-s").hover(function() {
		$(".hide2").show();
	}, function() {
		$(".hide2").hide();
	})
	$(".hide2").hover(function() {
		$(".hide2").show();
	}, function() {
		$(".hide2").hide();
	})
	$(".last-t").hover(function() {
		$(".last-t").find("i")[0].innerHTML = "客服在线";
		$(".last-t").find("i").css("font-size", "14px");
	}, function() {
		$(".last-t").find("i")[0].innerHTML = "&#xe6df;";
	})

	$(".last-l").hover(function() {
		$(".last-l").find("i")[0].innerHTML = "回到顶部";
		$(".last-l").find("i").css("font-size", "14px");
	}, function() {
		$(".last-l").find("i")[0].innerHTML = "&#xe601;";
	})
	//回到顶部
	$(".last-l").click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 1000);
	})

})