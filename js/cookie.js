
//获取cookie
function getCookie(name) {
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0; i < arr.length; i++) {
		//注：数组中的内容是字符串的形式  那么可以调用split方法，否则不可以
		var arr1 = arr[i].split("=");
		if(arr1[0] == name) {
			return arr1[1];
		}
	}

}
// 用法：getCookie("user");

//增加修改cookie
function setCookie(name, value, n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	document.cookie = name + "=" + value + ";expires=" + oDate;
}
 // 用法：setCookie("user","andy",7);
 
 
//删除cookie
function removeCookie(name) {
	//删除cookie，把生命期设为过期时间
	setCookie(name, 1, -1);
}
// 用法：removeCookie("user");