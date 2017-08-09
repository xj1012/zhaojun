function Ajax(type, url, data, fnSuc, fnFail) {
	//三目运算符创建ajax对象
	//var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	//创建ajax对象
	if(XMLHttpRequest){
	 	 var xhr=new XMLHttpRequest();
		
		}
	else{
		var xhr= new ActiveXObject("Microsoft.XMLHTTP");
			}
	//处理data数据
	var str = "";
	if(data){
		for(var attr in data) {
			str += attr + "=" + data[attr] + "&";
		}

		str = str.replace(/&$/, ""); //去掉最后一个&符号

	}
	
	
	type = type.toUpperCase(); //将类型转换成大写 get => GET

	if(type == "GET") {
		xhr.open("GET", url + "?" + str, true);
		xhr.send();
	}
	if(type == "POST") {
		xhr.open("POST", url, true);
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.send(str);
	}

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			
			var data = xhr.responseText;
			//console.log(data);
			if(fnSuc) {
				fnSuc(data);
			}
		} else {
			if(fnFail) {
				fnFail();
			}
		}
	}

}