$(window).ready(function(){
	

	var oForm = document.getElementById("form");
	var oInput1 = document.getElementById("input1");
	var oInput2 = document.getElementById("input2");
	var oEro1 = document.getElementById("erro1");
	//var oBtn = document.getElementById("input4");
	var flg = true;
	//手机邮箱验证
	function aInput1() {
		var regPhone = /^1\d{10}$/;
		if(!regPhone.test(oInput1.value) || oInput1.value == "") {
			flg = false;
			oEro1.innerHTML = "<i class='iconfont'>" + "&#xe78e;" + "</i>请输入正确的手机号格式！！";
		} else {
			flg = true;
			oEro1.innerHTML = "";
		}
		
		if(oInput2.value.length < 6 || oInput2.value.length > 20 || oInput2.value == ""){
			flg = false;
		}
		else{
			flg = true;
		}
	}
	//手机号失去焦点
	oInput1.onblur = function() {
		aInput1();
	}
	oInput2.onblur = function() {
		aInput1();
	}
	//倒计时
	btnSendCode.onclick = function() {
		sendMessage();
	}
	
	var $Btn=$("#input4").on("click",function(){
		aInput1();
		//alert(flg);
		if(flg){			
			$("#form").submit();
			alert("注册成功！");
		}
		else{
			alert("注册信息有误，请重新注册！");
		}
	})

	
})