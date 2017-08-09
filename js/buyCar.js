$(document).ready(function() {
	//购物车请求数据（非同步操作）
	var str = location.search;
    //获取商品id
	var id = str.substring(str.indexOf("?") + 1, str.length);
    //购物车请求数据
	$.ajax({
		type: "get",
		url: "details.json",
		async: false,
		success: function(data) {
			var html = "";
			var html1 = "";
			$.each(data, function(index, values) {
				if(index + 1 == id) {
					html += "<div id='left'>" + "<div id='top'>" + "<img src='" + values.imageURL + "'>" +
						"<div id='zoom'></div>" + "</div>" + "<ul id='list'>" + "<li><img src='" + values.imageURL + "' class='active'></li>" +
						"<li><img src='images/sr53.jpg'></li>" + "<li><img src='images/sr52.jpg'></li>" +
						"<li><img src='images/sr54.jpg'></li>" + "<li><img src='images/sr88.jpg'></li>" +
						"</ul>" + "</div>" + "<div id='right'>" + "<img src='" + values.imageURL + "'>" +
						"</div>";
					html1 += "<div class='read-c-t'>" +
						"<h1>今日特卖2017夏季新款甜美碎花超仙气质遮肚子短袖雪纺衫女装上衣服夏装潮 </h1>" +
						"<p>市场竞争激烈，山寨货价格低廉，质量得不到保障，掌柜建议亲货比三家.不怕货比货，注重品质与客户口碑，好不好您说了算哦！！！款式简约，做工精致，很大气优雅，特别推荐。</p>" +
						"<i>" + "<span class='pink'></span>" + "<span class='price'>" + values.newPrice + "</span>" +
						"<span class='discount'>" + values.discount + "</span>" + "<span class='baoyou'>包邮</span>" +
						"<span class='consult' >参考价：</span>" + "<span class='old-price'>" + values.oldPrice + "</span>" +
						"</i>" + "</div>";
				}

			})

			$(".read-l")[0].innerHTML = html;
			$("#red-top")[0].innerHTML = html1;
		}

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

	//input框跨域获取数据
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
	//主体内容
	
	//倒计时部分
	djs();
	function djs() {
		var date2 = new Date("2017-8-20 23:59:59");
		var date1 = new Date();
		var diff = (date2 - date1);
		var d = Math.floor(diff / 1000 / 60 / 60 / 24);
		var h = Math.floor(diff / 3600 / 1000) % 60;
		var m = Math.floor(diff / 60 / 1000) % 60;
		var s = Math.floor(diff / 1000) % 60;

		function cert(num) {
			//三目运算
			var num = num < 10 ? "0" + num : num;
			return num;
		}
		$("#box")[0].innerHTML = d + " 天" + " " + cert(h) + "小时 " + cert(m) + "分钟 " + cert(s) + "秒";
		//清除定时器
		if(h == 0 && m == 0 && s == 0) {
			clearInterval(iTem);
		}
	}
	var iTem = setInterval(function() {
		djs();
	}, 1000);
	
	
	//放大镜效果
	var oList = document.getElementById("list");
	var aListImg = oList.getElementsByTagName("img");
	var oTop = document.getElementById("top");
	var oImg = oTop.getElementsByTagName("img")[0];
	var oLeft = document.getElementById("left");
	var oRight = document.getElementById("right");
	var oImg2 = oRight.getElementsByTagName("img")[0];
	var oZoom = document.getElementById("zoom");
	//给每个小图加鼠标移入事件
	for(var i = 0; i < aListImg.length; i++) {
		aListImg[i].onmouseenter = function() {
			//改变缩略图（小图）的src
			oImg.src = this.src;
			//改变大图的src  让它随之active而改变
			oImg2.src = this.src;
			//清空img的所有className
			for(var j = 0; j < aListImg.length; j++) {
				aListImg[j].className = "";
			}
			//给当前的img设置active的 className名
			this.setAttribute("class", "active");

		}
	}
	//给left添加鼠标移入事件
	oTop.onmousemove = function(ev) {
		oZoom.style.display = "block";
		oRight.style.display = "block";
		var ev = ev || window.event;
		var x = ev.pageX - oLeft.offsetLeft - oZoom.offsetWidth / 2;
		var y = ev.pageY - oLeft.offsetTop - oZoom.offsetHeight / 2;
		//边界处理
		if(x <= 0) {
			x = 0;
		}
		if(y <= 0) {
			y = 0;
		}
		if(x >= oLeft.offsetWidth - oZoom.offsetWidth) {
			x = oLeft.offsetWidth - oZoom.offsetWidth;
		}
		if(y >= oLeft.offsetHeight - oZoom.offsetHeight - oList.offsetHeight) {
			y = oLeft.offsetHeight - oZoom.offsetHeight - oList.offsetHeight;
		}
        //改变模态的left与top值
		oZoom.style.left = x + "px";
		oZoom.style.top = y + "px";
		//等比例缩放
		oImg2.style.left = -oZoom.offsetLeft / oLeft.offsetWidth * oImg2.offsetWidth + "px";
		oImg2.style.top = -oZoom.offsetTop / oLeft.offsetHeight * oImg2.offsetHeight + "px";
	}
	//给left添加鼠标移出事件
	oTop.onmouseleave = function() {
		oZoom.style.display = "none";
		oRight.style.display = "none";
	}
	//购物车数量  
	$("#carAdd").click(function() {
		//$(".num").text();
		//cookie取值    
		if(parseInt($(".num").text()) > 0) {
			var k = $("#numBer").text();
			var sum=parseInt($(".num").text()) + parseInt($("#numBer").text());
			$("#numBer").text(sum);
			   var IDS=[];
	           var NUMBER=[];
	           //获取cookie值
		       var arr= getCookie("IDS");
		       var arr2=getCookie("NUMBER");
		       //判断cookie是否存在值 
		       //若没有  则扔进去
		       if(arr==undefined){
		       	  IDS.push(id);
		       	  NUMBER.push(sum);		       	  
		       }
		       //有的话 则进行分割
		       else{
		       	var ids= arr.split(",");
		       	var numbers=arr2.split(",");
		       	//定义一个标志位
		       	var point=true;
		       	for(var j=0;j<ids.length;j++){
		       		if(id==ids[j]){		       			
                      IDS.push(id);
                      NUMBER.push(parseInt(numbers[j]+sum));
                      point=false;
		       		}
		       		else{
		       		  IDS.push(ids[j]);
                      NUMBER.push(parseInt(numbers[j]));
                      
		       		}
		       	}
		       	if(point){
		       		IDS.push(id);
		       		NUMBER.push(sum);		       		
		       	 }		       	
		       }
		       //将值存到cookie里
		        setCookie("IDS",IDS);
		       	setCookie("NUMBER",NUMBER);
		} else {
			$("#hid").show();
			$("#numBer").text(0);
		}

	})
	//数量加减
	$("#jia").click(function() {
		$("#hid").hide();
		var n = $(".num").text();
		$(".num").text("");
		$(".num").text(parseInt(n) + 1);
	})
	$("#jian").click(function() {
		$("#hid").hide();
		if(parseInt($(".num").text()) == 0) {
			click = null;
			return;
		}
		var n = $(".num").text();
		$(".num").text("");
		$(".num").text(parseInt(n) - 1);

	})

	$("#cart").click(function() {
		location.href = "carList.html?=" + id + "=" + $("#numBer").text();
	})
	//三角显示隐藏
	$("#sanjiao").hover(function() {
		$("#hideNode").show();
	}, function() {
		$("#hideNode").hide();
	})
	//滑过加入购物车 让手机二维码显示
	$("#carAdd").mouseenter(function() {
		$("#Node2").show();
	})
	$("#Node2 span").click(function() {
		$("#Node2").hide();
	})

	//猜你喜欢--json数据处理
	$.ajax({
		type: "get",
		url: "details.json",
		async: true,
		success: function(data) {
			var html = "";
			var arr = [];

			var flgTwo = true;
			while(flgTwo) {
				var flg = true;
				var i = Math.floor(Math.random() * (52 - 0) + 0);
				if(arr.length == 0) {
					arr.push(i);
				}
				if(arr.length >= 8) {
					flgTwo = false;
				}
				if(arr.length > 0 && arr.length != 0 && flgTwo) {
					for(var j = 0; j < arr.length; j++) {

						if(arr[j] == i) {
							flg = false;

						}
					}
					if(flg) {
						arr.push(i);
					}
				}
			}

			$.each(data, function(index, values) {
				if(arr.indexOf(index) >= 0) {
					html += "<li class='hello valign'><a href='#'>" +
						"<img src='" + values.imageURL + "'>" +
						"<p class='p1'>" + values.content + "</p>" +
						"<p><span class='price'>" + values.newPrice + "</span>" +
						"<span class='old-price'>" + values.oldPrice + "</span>" +
						"<span class='discount'>" + values.discount + "</span>" + "</p>" + "</a></li>";
				}

			})
			$("#list-like")[0].innerHTML = html;
		}

	});

	//买家口评--json数据处理	     
	//ajax获取数据 随机生成八条评论数据    有bug存在	
	function fn(k){ 
	  $.ajax({
		type: "get",
		url: "buyCar.json",
		async: true,
		success: function(data) {
			var html = "";
			var arr = [];
			var flgTwo = true;
			while(flgTwo) {
				var flg = true;
				var i = Math.floor(Math.random() * (17 - 0) + 0);
				if(arr.length == 0) {
					arr.push(i);
				}
				if(arr.length >= 9) {
					flgTwo = false;
				}
				if(arr.length > 0 && arr.length != 0 && flgTwo) {
					for(var j = 0; j < arr.length; j++) {

						if(arr[j] == i) {
							flg = false;

						}
					}
					if(flg) {

						arr.push(i);
					}
				}
			}
			//console.log(arr);
			$.each(data, function(index, values) {				
				if(arr.indexOf(index) >= 0) {
					html += "<div class='proInt'>" + "<span>" + "<p>" + values.content + "</p>" +
					"<p>" + values.explain + "</p>" + "</span>" + "<span>" + "<p>颜色：<b>" + values.color + "</b></p>" +
					"<p>尺码：<b>" + values.size + "</b></p>" + "</span>" + "<span>" + "<p>" + values.phone + "</p>" +
					"<p><img src='images/xinxin.png'></p>" + "</span>" + "</div>";
				}
			})
			$List[0].innerHTML = html;
		}
	}); 
  }
	fn(1);
	//分页效果			
	var $List = $(".evaluate-c-b");
	var $oPage = $(".evaluate-btn");
	//console.log($oPage);
	var $oNums = $("#nums");
	//console.log($oNums);
	//让数据显示在evaluate-c-b里面
	//判断页数 假定有两页
	var html1 = "";
	for(var i = 0; i <8; i++) {
		html1 += "<a href='javascript:;'>" + (i + 1) + "</a>"
	}
	$oNums.append(html1);
	var $aA = $oPage.find("a");
	//console.log($aA);
	//让第一页高亮显示  给其添加className
	$aA.eq(1).addClass("cur");
	//确定页码
	var k = 1;
	for(let i = 0; i < $aA.length; i++) {
		$aA.eq(i).click(function() {			
			switch(i) {
				case 0: //上一页
					k--;
					break;
				case $aA.length - 1: //下一页
					k++
					break;
				default:
					k = i;
			}
			//判断页码k值的范围
			if(k>0 && k<9){
			//清空所有a标签的classname
			for(var m = 0; m < $aA.length; m++) {
				$aA.eq(m).removeClass("cur");
			}
			//给当前的a标签添加classname;
			$aA.eq(k).addClass("cur");		
			fn(k);	
			}
			//判断如果k<1时   就让其显示第一条数据
			if(k<1){
				k=1;
			}
			//如果k>length-2时   让其显示最后一条数据
			if(k>$aA.length - 1){
				k=8;
			}	    
			return false;
		});

	}














//右边json数据处理
$.ajax({
	type: "get",
	url: "details.json",
	async: true,
	success: function(data) {
		var html = "";
		var arr = [];
		var flgTwo = true;
		while(flgTwo) {
			var flg = true;
			var i = Math.floor(Math.random() * (52 - 0) + 0);
			if(arr.length == 0) {
				arr.push(i);
			}
			if(arr.length >= 15) {
				flgTwo = false;
			}
			if(arr.length > 0 && arr.length != 0 && flgTwo) {
				for(var j = 0; j < arr.length; j++) {

					if(arr[j] == i) {
						flg = false;
					}
				}
				if(flg) {
					arr.push(i);
				}
			}
		}
		$.each(data, function(index, values) {
			if(arr.indexOf(index) >= 0) {
				html += "<li>" + "<a href='#'>" + "<img src='" + values.imageURL + "'>" +
					"<p class='p1'>" + values.content + "</p>" + "<p class='p2'>" +
					"<span class='price'>" + values.newPrice + "</span>" +
					"<span class='old-price'>" + values.oldPrice + "</span>" +
					"<span class='discount'>" + values.discount + "</span>" + "</p>" + "</a>" + "</li>";
			}

		})
		$("#main-list-r")[0].innerHTML = html;
	}
});
//顶部悬浮
function scroll() {
	var scrollTop = $(this).scrollTop();
	if(scrollTop >= 836) {
		$("#buy").css("display", "block");
		$(".title").css("position", "fixed");
		$(".title").css("top", 0);

		$(".title").css("z-index", 4);

	} else {
		$(".title").css("position", "static");
		$("#buy").css("display", "none");
	}
}
$(window).scroll(function() {
	scroll();
})

//楼梯效果
//给楼梯添加点击事件 触发滚动条滚动
$(".title li").click(function() {
	$("html,body").stop().animate({
		"scrollTop": $(".louti").eq($(this).index()).offset().top - 90
	}, 1000);
});

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