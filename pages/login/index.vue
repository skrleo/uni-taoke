<template>
	<page class="bg-white">
		<view class="login bg-white">
			<view class="padding-xs flex align-center padding-top-xl">
				<view class="flex-sub text-center text-xl" style="margin-top: 80upx;">
					<view class="cu-avatar xl round" style="background-image:url(https://img.17wangku.com/taoke/logo.png);"></view>
				</view>
			</view>
			<view class="padding-xs flex align-center margin-bottom-xl">
				<view class="flex-sub text-center text-xl">
					<text class="text-black text-bold">云淘荟买</text>
				</view>
			</view>
			<view class="margin-left-lg" style="margin-top: 120upx;">
				<view class="text-lg margin-bottom-sm">
					<text class="text-black line-height">登录后该小程序将获得以下权限</text>
				</view>
				<text class="cuIcon-title text-black"></text>获得你的公开信息（昵称，头像等）
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-black margin-tb-sm lg" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">微信一键登录</button>
			</view>

			<view class="cu-modal" :class="showModal==true?'show':''" style="margin-top: 50upx;">
				<view class="cu-dialog">
					<view class="padding-xl">
						<view class="margin-top-lg margin-left-lg">
							<view class="text-xl margin-bottom-sm">
								<text class="text-black line-height">绑定手机号</text>
							</view>
							请先绑定手机号在进行此操作
						</view>
						<view class="padding flex flex-direction">
							<button class="cu-btn bg-green margin-tb-sm lg round" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
							 withCredentials="true">微信用户一键绑定</button>
						</view>
					</view>
				</view>
			</view>

			<view class="flex align-center justify-center text-muted protocol bg-white">
				注册即代表同意<text class="text-red" @tap="protocolTap">《用户协议》</text>
			</view>
		</view>
	</page>
</template>


<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				showModal: false,
				sessionKey: '',
				openid: ''
			}
		},
		computed: {
			...mapState({
				loginStatus: state => state.loginStatus,
				user: state => state.user,
			})
		},
		onLoad() {
			if (this.loginStatus) {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		methods: {
			protocolTap: function() {
				uni.navigateTo({
					url: "../rich/index?type=1"
				});
			},
			getUserInfo: function() {
				// #ifdef MP-WEIXIN
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res2) => {
									this.$Http.get('/oauth/login?code=' + res2.code).then(res => {
										if (res.statusCode == 200) {
											if (res.data.is_login) {
												// 修改vuex的state,持久化存储
												this.$store.commit('login', res.data)
												// 提示和跳转
												uni.navigateBack({
													delta: 1
												});
												uni.showToast({
													title: '登录成功',
													icon: 'none'
												});
											} else {
												this.openid = res.data.openid;
												this.sessionKey = res.data.session_key;
												this.showModal = true;
											}
										} else {
											//联网失败, 结束加载
											uni.showToast({
												title: "请求异常，请稍后再试！",
												icon: "none"
											});
										}
									})
								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})

						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
				//#endif
			},
			getPhoneNumber: function(e) {
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					uni.getUserInfo({
						provider: 'weixin',
						success: (info) => {
							var params = {
								encrypted: e.detail.encryptedData,
								session: this.sessionKey,
								iv: e.detail.iv,
								openid: this.openid,
								avatar_url: info.userInfo.avatarUrl,
								nickname: info.userInfo.nickName,
								sex: info.userInfo.gender,
								country: info.userInfo.country,
								province: info.userInfo.province,
								city: info.userInfo.city,
							}
							this.$Http.post('/oauth/register', params).then(res => {
								if (res.statusCode == 200) {
									this.showModal = false;
									// 修改vuex的state,持久化存储
									this.$store.commit('login', res.data)
									// 提示和跳转
									uni.navigateBack({
										delta: 1
									});
									uni.showToast({
										title: '登录成功',
										icon: 'none'
									});
								} else {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})
						},
						fail: () => {
							uni.showToast({
								title: "微信登录授权失败",
								icon: "none"
							});
						}
					})
				} else {
					uni.showToast({
						title: "用户取消登录",
						icon: "none"
					});
					uni.switchTab({
						url: "/pages/index/home"
					});
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
	.login {
		position: absolute;
		height: 100%;
		width: 100%;
		margin: 0 auto;

		.protocol {
			margin-top: 220upx;
			bottom: 0;
			width: 100%;
			height: 160upx;
		}
	}
</style>
