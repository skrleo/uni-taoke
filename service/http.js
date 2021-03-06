import $store from '@/store/index.js';
export default {
	common:{
		method: 'GET',
		header:{
			"content-type":"application/json"
		},
		data:{}
	},
	request(options = {}){
		
		options.url = 'https://api.17wangku.com/api' + options.url
		options.method = options.method || this.common.method
		options.header = options.header || this.common.header
		
		// 验证权限token
		if($store.state.loginStatus){
			options.header.Authorization = 'Bearer ' + $store.state.token
			if(!options.header.Authorization){
				return uni.showToast({
					title: '非法token,请重新登录',
					icon: 'none'
				});
			}
		}
		
		return new Promise((res,rej)=>{
			uni.request({
				...options,
				success: (result) => {
					// 返回原始数据
					// console.log(result);
					if(options.native){
						return res(result)
					}
					// 请求服务端失败
					if (result.statusCode !== 200) {
						uni.showToast({
							title:result.data.message || '请求失败',
							icon: 'none'
						});
						return rej(result.data)
					}
					
					if (result.statusCode == 401) {
						uni.showToast({
							title:result.data.message || '登录异常',
							icon: 'none'
						});
						uni.navigateTo({
							url: '/pages/login/index',
						});
						return rej(result.data)
					}
					// 成功
					res(result.data)
				},
				fail:(error)=>{
					uni.showToast({
						title: error.message || '请求失败',
						icon: 'none'
					});
					return rej()
				}
			});
		})
	},
	get(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	upload(url,options = {}){
		options.url = 'https://api.17wangku.com/api' + url
		options.header = options.header || {}
		// 验证权限token
		if(options.token){
			options.header.token = $store.state.token
			if(!options.header.token){
				return uni.showToast({
					title: '非法token,请重新登录',
					icon: 'none'
				});
			}
		}
		
		return new Promise((res,rej)=>{
			uni.uploadFile({
				...options,
				success: (uploadFileRes) => {
					if(uploadFileRes.statusCode !== 200){
						return uni.showToast({
							title: '上传图片失败',
							icon: 'none'
						});
					}
					let data = JSON.parse(uploadFileRes.data)
					res(data)
				},
				fail:(err)=>{
					rej(err)
				}
			});
		})
		
	}
}