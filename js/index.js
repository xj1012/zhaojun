$(document).ready(function() {
	//关注
	$("#enter").hover(function() {
		$(".wei").show();
	},function() {
		$(".wei").hide();
	});
	$(".wei").hover(function() {
		$(".wei").show();
	},function() {
		$(".wei").hide();
	})
	
	
	//联系人
	$("#sever").hover(function() {
		$(".center").show();
	},function() {
		$(".center").hide();
	})
	$(".center").hover(function() {
		$(".center").show();
	},function() {
		$(".center").hide();
	})
	
	
	//购物车
	$(".car").hover(function() {
		$(".select").show();
	},function() {
		$(".select").hide();
	});
	$(".select").hover(function() {
		$(".select").show();
	},function() {
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

	//min-nav导航
	$("#min-nav .age").hover(function() {
		$("#min-nav .hide").show();
	}, function() {
		$("#min-nav .hide").hide();
	});
	$("#min-nav .hide").hover(function() {
		$("#min-nav .hide").show();
	}, function() {
		$("#min-nav .hide").hide();
	});

	function scroll() {
		var scrollTop = $(this).scrollTop();
		if(scrollTop >= 119) {
			$("#min-nav2").css("display", "block");
			$("#min-nav2").css("position", "fixed");
			$("#min-nav2").css("top", 0);
			$("#min-nav2").css("box-shadow", "0 2px 10px #D1D1D1");
			
			$("#min-nav2").css("z-index", 8);
			
			
		} else {
			$("#min-nav2").css("position", "static");
			$("#min-nav2").css("display", "none");
		}
	}
	$(window).scroll(function() {
		scroll();
	})

	//轮播图
	var i = 0;

	function move() {
		i++;
		if(i == $("#banner .lb li").length) {
			i = 0;
		}
		//运动过程
		$("#banner .lb li").eq(i).stop().fadeIn(500).siblings().stop().fadeOut(500);
		//改变小脚标  让其跟随运动
		$("#ball span").eq(i).addClass("active").siblings().removeClass("active");
	}
	var timer = setInterval(function() {
		move();
	}, 3000)
	//给下标添加移入移出事件
	$("#ball span").hover(function() {
		i = $(this).index() - 1;
		move();
		clearInterval(timer);
	}, function() {
		timer = setInterval(move, 3000);
	})

	//主体部分
	//左侧json数据处理
	$.ajax({
		type: "get",
		url: 'index.json',
		async: true,
		success: function(data) {
			var html1 = "";
			var html2 = "";
			var sumTwo = "";
			var sum = "";
			var indexTwo = 0;
			var point=0;
			$.each(data, function(index, values) {
				point++;
                if(index<50){
                	if(indexTwo == 0) {
					indexTwo++;
					html1 += "<div class='a-logo'><img src='" + values.titleImg + "'></div>" +
						"<div class='a-span'><span>" + values.title + "</span><span>绿色理念的自然品牌</span>" +
						"</div><span class='r'>5.5折起 &gt;</span>"
				} else {
					indexTwo++;
					html2 += " <div class='detal'><img src='" + values.imageURL + "'><p><i class='cur-price'>" + values.newPrice + "</i>" +
						"<i class='old-price'>" + values.oldPrice + "</i></p><p class='title'>" + values.content + "</p></div>"
				}
				if(indexTwo == 5) {
					sumTwo = "<a href='details.html' id='data'>" + "<div class='a-t'>" + html1 + "</div>" + "<div class='a-b'>" + html2 + "</div></a>";
					sum += sumTwo;
					indexTwo = 0;
					html2 = "";
					html1 = "";
				}
                }
				
			});
			if(point>50){
				$("#more").show();
			}
			$("#a-left")[0].innerHTML = sum;

		}
	});
	//加载更多
	$("#more").click(function(){
		console.log("aaaaa");
		
		$.ajax({
		type: "get",
		url: 'index.json',
		async: true,
		success: function(data) {
			var html1 = "";
			var html2 = "";
			var sumTwo = "";
			var sum = "";
			var indexTwo = 0;
			$.each(data, function(index, values) {
                
				if(indexTwo == 0) {
					indexTwo++;
					html1 += "<div class='a-logo'><img src='" + values.titleImg + "'></div>" +
						"<div class='a-span'><span>" + values.title + "</span><span>绿色理念的自然品牌</span>" +
						"</div><span class='r'>5.5折起 &gt;</span>"
				} else {
					indexTwo++;
					html2 += " <div class='detal'><img src='" + values.imageURL + "'><p><i class='cur-price'>" + values.newPrice + "</i>" +
						"<i class='old-price'>" + values.oldPrice + "</i></p><p class='title'>" + values.content + "</p></div>"
				}
				if(indexTwo == 5) {
					sumTwo = "<a href='#' id='data'>" + "<div class='a-t'>" + html1 + "</div>" + "<div class='a-b'>" + html2 + "</div></a>";
					sum += sumTwo;
					indexTwo = 0;
					html2 = "";
					html1 = "";
				}
			});
			
			
			
			var oDiv=document.createElement("div");
			oDiv.innerHTML = sum;
			$("#a-left")[0].appendChild(oDiv);

		}
	});
	})

    //tab切换
	var aMenu2Li = $('#menu2 li');
	aMenu2Li.bind('mouseenter', function() {
		var iIndex = $(this).index();
		// 清除所有LI的className, 当前LI添加className
		aMenu2Li.removeClass('cur').eq(iIndex).addClass('cur');
		$('.panel2').removeClass('active').eq(iIndex).addClass('active');
	});
	$('.list2 li').hover(function() {
		$(this).find("img").css({
			"opacity": .5
		});
	}, function() {
		$(this).find("img").css({
			"opacity": 1
		});
	})

	//小轮播
	var j = 0;

	function move1() {
		j++;
		if(j == $(".main-right-c li").length) {
			j = 1;
			$(".main-right-c ul").css("left", 0);

		}
		$(".main-right-c ul").css("width", ($(".main-right-c li").length + 1) * $(".main-right-c li").eq(0).outerWidth() + "px");
		$(".main-right-c ul").stop().animate({
			"left": -j * $(".main-right-c").eq(0).outerWidth()
		}, 1000);
	}
	move1();
	var timer = setInterval(function() {
		move1();
	}, 3000)
	//右点击
	$(".btnRight").click(function() {
		clearInterval(timer);
		move1();
	})
	//左点击
	$(".btnLeft").click(function() {
		clearInterval(timer);
		if(j == 0) {
			$(".main-right-c ul").css("left", -($(".main-right-c li").length - 1) * $(".main-right-c").eq(0).outerWidth() + "px");
			j = $(".main-right-c li").length - 3;
		} else {
			j = j - 2;
		}
		move1();
	})
	//按钮显示或隐藏
	$(".main-right-c").hover(function() {
		$(".btnRight").show();
		$(".btnLeft").show();

	}, function() {
		$(".btnRight").hide();
		$(".btnLeft").hide();
	})

	//tab切换
	var aMenu3Li = $('#menu3 li');
	aMenu3Li.bind('mouseenter', function() {
		var iIndex = $(this).index();
		// 清除所有LI的className, 当前LI添加className
		aMenu3Li.removeClass('active').eq(iIndex).addClass('active');
		$('.panel3').removeClass('active').eq(iIndex).addClass('active');
	});
	$('.list3 li').hover(function() {
		$(this).find("img").css({
			"opacity": .5
		});
	}, function() {
		$(this).find("img").css({
			"opacity": 1
		});
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

});