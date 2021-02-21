import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.prototype.$store = store

Vue.config.productionTip = false

// 助手函数库
import $U from '@/utils/util.js';
Vue.prototype.$U = $U
// 工具函数库
import $Tool from '@/utils/tools.js';
Vue.prototype.$Tool = $Tool
// 引入请求库
import $Http from '@/service/http.js';
Vue.prototype.$Http = $Http
// 上拉刷新 下拉加载
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
Vue.component('mescroll-body', MescrollBody)

// 权限验证操作
Vue.prototype.checkAuth = (callback,checkPhone = true)=>{
	// 权限验证
	if (!store.state.loginStatus) {
		return uni.navigateTo({
			url: '/pages/login/index'
		});
	}
	// 验证是否绑定手机号
	if(checkPhone && !store.state.user.phone){
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/index'
		});
	}
	callback()
}

// 权限验证跳转
Vue.prototype.navigateTo = (options,type = 1)=>{

	if(type === 1){
		uni.navigateTo({
			url: options.url
		});
		return false;
	}
	
	if(type === 2){
		uni.navigateToMiniProgram(options);
		return false;
	}
	
	if(type === 3){
		uni.navigateTo({
			url: "/pages/h5/index?web_url=" + options.url
		});
		return false;
	}
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
