import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.prototype.$store = store

Vue.config.productionTip = false

// 助手函数库
import $U from '@/utils/util.js';
Vue.prototype.$U = $U
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
			url: '/pages/login'
		});
	}
	// 验证是否绑定手机号
	if(checkPhone && !store.state.user.phone){
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login'
		});
	}
	callback()
}

// 权限验证跳转
Vue.prototype.navigateTo = (options,checkPhone = true)=>{
	// 权限验证
	if (!store.state.loginStatus) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login'
		});
	}
	// 验证是否绑定手机号
	if(checkPhone && !store.state.user.phone){
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login'
		});
	}
	uni.navigateTo(options);
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
