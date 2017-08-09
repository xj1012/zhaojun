window.onload=function(){
	
var oForm = document.getElementById("form");
var oInput1 = document.getElementById("input1");
var oInput2 = document.getElementById("input2");
var oEro1= document.getElementById("erro1");
var oEro2= document.getElementById("erro2");
var oBtn=document.getElementById("input4");
var oCheck=document.getElementById("check");
//标识位
var flg = true;
//手机邮箱验证
function aInput1() {
	var regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
	var regPhone = /^1\d{10}$/;	
	if(!(regEmail.test(oInput1.value) ||regPhone.test(oInput1.value))||oInput1.value=="") {
		flg = false;	
		oEro1.innerHTML = "<i class='iconfont'>"+"&#xe78e;"+"</i>请输入正确的手机号或邮箱格式！！";
	} else {
		oEro1.innerHTML = "";
	}
}
//判断密码
function aInput2() {
	if(oInput2.value.length < 6 || oInput2.value.length > 20 || oInput2.value == "") {
		flg = false;
		oEro2.innerHTML = "<i class='iconfont'>"+"&#xe78e;"+"</i>您输入的密码有误,请重新输入！";
	} else {
		oEro2.innerHTML = "";
	}
}

oInput1.onblur=function(){
	aInput1();
}
oInput2.onblur=function(){
	aInput2();
}


//点击事件
oBtn.onclick=function(){
	//console.log("aaaaa");
     flg=true;
	 aInput1();
	 aInput2();	
	
 //ajax请求数据
 Ajax("get","logo.json",{},fn);
}
    function fn(data){
    	var val1=oInput1.value;
	    var val2=oInput2.value;
    	 //for循环遍历数据
	   for(let i=0;i<data.length;i++){
	  	 if(val1==data[i].username&&val2==data[i].password){
	  	 	flg=true;
	  	 }
	   }  	
	   if(!flg){
		 alert("输入信息有误，请重新注册！");
		 }
	   else{
		  location.href="index.html";
		 }
   }   
}