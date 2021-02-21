import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import $http from '@/service/http.js';
import $U from '@/utils/util.js';

export default new Vuex.Store({
	state:{
		// 登录
		loginStatus:false,
		token:false,
		user:{},
	},
	getters:{
		
	},
	mutations:{
		// 登录
		login(state,data){
			state.loginStatus = true
			state.user = data.user
			state.token = data.token
			uni.setStorageSync('user', JSON.stringify(data));
		},
		// 更新资料
		sync(state,obj){
			if(state.user){
				state.user.sex = obj.sex
				state.user.nickname = obj.nickname
				state.user.avatar_url = obj.avatar_url
				uni.setStorageSync('user', JSON.stringify(state.user));
			}
		},
		// 退出登录
		logout(state){
			state.loginStatus = false
			state.user = {}
			state.token = false
			uni.removeStorageSync('user');
		},
	},
	actions:{
		// 初始化登录状态
		initUser({state,dispatch}){
			let data = uni.getStorageSync('user');
			if(data){
				let info = JSON.parse(data)
				state.loginStatus = true
				state.token = info.token
				state.user = info.user
			}
		}
	}
})