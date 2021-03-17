<template>
	<view>
		<view class="pure_top">
			<view class="pure_top_box">
				<view class="user_info_box padding-lr flex justify-between">
					<view class="flex justify-start">
						<view class="cu-avatar round lg align-center" v-bind:style="{ 'background-image': 'url('+ user.avatar_url +')'}"></view>
						<view class="content flex-sub padding-left-xs margin-top-xs">
							<view class="text-grey">{{user.nickname}}<text class="cuIcon-refresh margin-left-sm" @tap="refreshTap"></text></view>
							<view class="text-gray text-sm flex justify-between">
								手机号：{{ this.$Tool.formatMobile(user.phone)}}
							</view>
						</view>
					</view>
					<view class="flex-sub padding-sm margin-xs" v-if="user.invite_code">
						<view class="cu-capsule round fr" v-if="user.invite_code">
							<view class='cu-tag bg-orange'>
								邀请码
							</view>
							<view class="cu-tag line-orange">
								{{user.invite_code}}
							</view>
						</view>
					</view>
				</view>
				<view class="cu-card case user_info_box animation-slide-top">
					<view class="cu-item shadow">
						<view class="cu-item">
							<view class="content flex-sub padding bg-orange flex justify-between" style="height: 120px;">
								<view class="text-white">至尊会员享额外特权</view>
								<view class="margin-tb-sm text-center" @tap="walletTap">
									<button class="cu-btn round sm shadow bg-black">查看钱包</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu sm-border card-menu margin-top">
			<view class="cu-item arrow">
				<view class="content">
					<text class="text-grey">我的订单</text>
				</view>
				<view class="action" @click="orderTap(0)">
					<text class="text-grey text-sm">查看全部订单</text>
				</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(item,index) in orderTypes" :key="index" @click="orderTap(item.value)">
					<view :class="['cuIcon-' + item.icon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.number!=0">
							<block v-if="item.number!=1">{{item.number>99?'99+':item.number}}</block>
						</view>
					</view>
					<text>{{item.label}}</text>
				</view>
			</view>
		</view>

		<view class="cu-list menu sm-border card-menu margin-top">
			<view class="cu-item arrow" @click="jumpTap(1)">
				<view class="content">
					<text class="cuIcon-ticket text-grey"></text>
					<text class="text-grey">常见问题</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="jumpTap(1)">
				<navigator class="content">
					<text class="cuIcon-form text-grey"></text>
					<text class="text-grey">关于我们</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-question text-grey"></text>
					<text class="text-grey">清除缓存</text>
				</view>
				<view class="action" @tap="clearTap">
					<text class="text-grey text-sm">0.0MB</text>
				</view>
			</view>
		</view>

		<view class="cu-list menu sm-border card-menu margin-top">
			<view class="cu-item text-center" @click="logout">
				<view class="content">
					<text class="text-red">退出当前账号</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				anmiaton: '',
				orderTypes: [{
						label: "待付款",
						icon: "present",
						value: 1,
						number: 0
					},
					{
						label: "待发货",
						icon: "send",
						color: '7A7E83',
						value: 2,
						number: 0
					},
					{
						label: "待收货",
						icon: "deliver",
						color: '7A7E83',
						value: 3,
						number: 0
					},
					{
						label: "退款/售后",
						icon: "refund",
						color: '7A7E83',
						value: 4,
						number: 0
					}
				],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				shareTitle: '邀请您加入云淘荟买，更多优惠等你来淘！',
				shareImage: '',
				sharePath: '/pages/index/home',
			}
		},
		computed: {
			...mapState({
				loginStatus: state => state.loginStatus,
				user: state => state.user,
			})
		},
		created() {
			if (!this.loginStatus) {
				uni.navigateTo({
					url: '../login/index'
				});
			}
		},
		onLoad(e) {
			var params = {
				page_type: 'my'
			}
			this.$Http.get('/page/share', params).then(res => {
				if (res.statusCode == 200 && res.data) {
					this.shareTitle = res.data.name;
					this.shareImage = res.data.thumb;
					this.sharePath = res.data.path;
				}
			});
		},
		onShareAppMessage(res) {
			return {
				title: this.shareTitle,
				path: this.sharePath,
				imageUrl: this.shareImage,
				success(res) {
					uni.showToast({
						title: '分享成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					})
				}
			}
		},
		methods: {
			jumpTap(type) {
				uni.navigateTo({
					url: "/pages/rich/index?type=" + type
				});
			},
			refreshTap() {
				// 获取用户信息
				uni.getUserInfo({
					provider: 'weixin',
					success: info => {
						var params = {
							avatar_url: info.userInfo.avatarUrl,
							nickname: info.userInfo.nickName,
							sex: info.userInfo.gender,
							country: info.userInfo.country,
							province: info.userInfo.province,
							city: info.userInfo.city,
						}
						this.$Http.post('/oauth/sync', params).then(res => {
							if (res.statusCode == 200) {
								// 更新用户资料
								this.$store.commit('sync', params)
							} else {
								uni.showToast({
									title: "更新资料失败",
									icon: "none"
								});
							}
						})
					}
				});
			},
			walletTap() {
				uni.navigateTo({
					url: "/pages/wallet/index"
				});
			},
			orderTap(index = 0) {
				uni.navigateTo({
					url: "/pages/order/lists?TabCur=" + index
				});
			},
			clearTap() {
				uni.showToast({
					title: '清除缓存成功',
					icon: 'none'
				});
			},
			// 退出登录
			logout() {
				uni.showModal({
					content: '是否要退出登录',
					success: (res) => {
						if (res.confirm) {
							this.$store.commit('logout')
							uni.navigateTo({
								url: '../login/index',
							});
							uni.showToast({
								title: '退出登录成功',
								icon: 'none'
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}

	.pure_top {
		width: 100%;
		height: 160px;
		position: relative;
		overflow: hidden;
	}

	.pure_top_box {
		content: '';
		width: 120%;
		height: 148px;
		position: absolute;
		left: -10%;
		top: 0;
		overflow: hidden;
		border-radius: 0 0 50% 50%;
		background-color: #2B2E3D;
	}

	.user_info_box {
		width: 80%;
		margin: 0 auto;
	}
</style>
