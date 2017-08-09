$(document).ready(function() {
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
	//倒计时
	djs();

	function djs() {
		var date2 = new Date("2017-8-20");
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
		$(".timespan")[0].innerHTML = d + "天" + " " + cert(h) + "小时 " + cert(m) + "分钟 " + cert(s) + "秒";

		//清除定时器
		if(h == 0 && m == 0 && s == 0) {
			clearInterval(iTem);
		}
	}
	var iTem = setInterval(function() {
		djs();
	}, 1000);
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
	//主体内容部分  第一次请求数据
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
				if(arr.length >= 4) {
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

			console.log(arr)

			$.each(data, function(index, values) {
				if(arr.indexOf(index) >= 0) {
					html += "<li><a href='buyCar.html?"+values.id+"'><img src='" + values.imageURL + "'><p class='p1'>" + values.content + "</p><p><span class='price'>" + values.newPrice + "</span><span class='old-price'>" + values.oldPrice + "</span><span class='discount'>" + values.discount + "</span>" +
						"</p></a></li>";
				}

			})
			$(".product-list")[0].innerHTML = html;
		}

	});
	//主体内容第二次请求数据
	$.ajax({
		type: "get",
		url: "details.json",
		async: true,
		success: function(data) {
			var html = "";
			$.each(data, function(index, values) {
				html += "<li><a href='buyCar.html?"+values.id+"'><img src='" + values.imageURL + "'><p class='p1'>" + values.content + "</p><p><span class='price'>" + values.newPrice + "</span><span class='old-price'>" + values.oldPrice + "</span><span class='discount'>" + values.discount + "</span>" +
					"</p></a></li>";
			})
			$("#u-hover-list")[0].innerHTML = html;
		}

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