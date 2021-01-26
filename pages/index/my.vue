<template>
	<view>
		<view class="cu-card case no-card">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar padding-top-xl">
					<view class="cu-item">
						<view class="cu-avatar round lg" v-bind:style="{ 'background-image': 'url('+ user.avatar_url +')'}"></view>
						<view class="content flex-sub">
							<view class="text-grey">{{user.nickname}}</view>
							<view class="text-gray text-sm flex justify-between">
								手机号：{{user.phone}}
							</view>
						</view>
						<view class="cu-capsule round margin-right-lg">
							<view class='cu-tag bg-black'>
								邀请码
							</view>
							<view class="cu-tag line-black">
								13145200A
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
				<view class="action" @tap="orderTap">
					<text class="text-grey text-sm">查看全部订单</text>
				</view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for="(item,index) in orderTypes" :key="index">
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
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">优惠券</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">地址管理</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">清除缓存</text>
				</view>
				<view class="action">
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
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				orderTypes: [
					{
						label: "待付款",
						icon: "present",
						value: 0,
						number: 10
					},
					{
						label: "待发货",
						icon: "send",
						color: '7A7E83',
						value: 1,
						number: 0
					},
					{
						label: "待收货",
						icon: "deliver",
						color: '7A7E83',
						value: 2,
						number: 1000
					},
					{
						label: "退款/售后",
						icon: "refund",
						color: '7A7E83',
						value: 3,
						number: 0
					}
				],
				dotStyle: false,
				towerStart: 0,
				direction: ''
			}
		},
		computed: {
			...mapState({
				loginStatus:state=>state.loginStatus,
				user:state=>state.user,
			})
		},
		onShow() {
			if (!this.loginStatus) {
			  uni.navigateTo({
				  url: '../login/index'
			  });
			}
		},
		onLoad(e) {
			
		},
		methods: {
			orderTap() {
				uni.navigateTo({
					url: "/pages/order/lists"
				});
			},
			// 退出登录
			logout(){
				console.log('退出登录成功');
				uni.showModal({
					content: '是否要退出登录',
					success: (res)=> {
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
</style>