let _tool = {
	//获取字符串的真实长度（字节长度）
	strLeng(str) {
		if(str) {
			let len = str.length, truelen = 0;
			for(let x = 0; x < len; x++) {
				if(str.charCodeAt(x) > 128){
					truelen += 2;
				}else{
					truelen += 1;
				}
			}
			return truelen;
		} else {
			return 0;
		}
	},
	//计算页数
	getPageNum(total,row) {
		let num = Number(total) / Number(row);
		//是否为整数
		if(num%1 !== 0) {
			let b = num.toString();	//转字符串
			let a = parseInt(b.substring(0,b.indexOf('.')));	//取小数点前
			let s = b.replace(/\d+\.(\d*)/, '$1');	//取小数点后
			if(s > 0) {
				num = a + 1;
			}
		}
		return num;
	},
	//设置手机通知栏字体颜色
	setBarColor(black = false) {
		if(black) {
			uni.setNavigationBarColor({
			    frontColor: '#000000',
			    backgroundColor: '#FAFAFA'
			});
		} else {
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: '#FAFAFA'
			});
		}
	},
	getJson(arr){
	    var theRequest = new Object();
	    for (var i = 0; i < arr.length; i++) {
	        var kye = arr[i].split("=")[0]
	        var value = arr[i].split("=")[1]
	        // 给对象赋值
	        theRequest[kye] = value
	    }
	    return theRequest;
	},
	toMoney(money) {
		return parseFloat(money).toLocaleString();
	},
	formatMobile(mobile) {
		return mobile.replace(/^(.{3}).*(.{4})/, '$1****$2');
	}
};

export default _tool;