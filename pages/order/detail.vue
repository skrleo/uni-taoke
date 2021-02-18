<template>
	<view class="cu-card article no-card">
		<view class="cu-item shadow">
			<view class="content flex padding-bottom margin-top-lg">
				<image :src="order.thumb_url"></image>
				<view class="desc">
					<view class="text-content"> 
						<text>{{order.goods_name}}</text>
					</view>
					<view class="flex justify-between">
						<text class="text-red through">￥{{order.goods_price}}</text>
						<text class="text-gray">x{{order.buy_num}}</text>
					</view>
				</view>
			</view><!-- 
			<view class="flex justify-between padding-lr margin-top-lg">
				<text class="text-red through">预计佣金：￥{{order.promotion_amount}}</text>
				<text class="text-black">实付金额：￥<text class="text-xl">{{order.order_amount}}</text></text>
			</view> -->
		</view>
		
		<view class="cu-list menu sm-border margin-top-sm">
			<view class="cu-item">
				<view class="content">
					<text class="text-black">订单编号</text>
				</view>
				<view class="action">
					<text class="text-grey">{{order.order_sn}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">支付方式</text>
				</view>
				<view class="action">
					<text class="text-grey">无</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">下单时间</text>
				</view>
				<view class="action">
					<text class="text-grey">{{order.order_create_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">支付时间</text>
				</view>
				<view class="action">
					<text class="text-grey">{{order.order_receive_time || '无'}}</text>
				</view>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="bg-white ui-tabbar-view-box">
			<view class="flex justify-between padding">
				<text class="text-red through">预计佣金：￥{{order.promotion_amount}}</text>
				<text class="text-black">实付金额：￥<text class="text-xl">{{order.order_amount}}</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				order:[]
			};
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
			this.base_init(e);
		},
		methods: {
			base_init(e) {
				console.log(e)
				var params = {order_sn:e.order_sn}
				this.$Http.get('/order/detail',params).then(res => {
					if(res.statusCode !== 200){
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						return false;
					}
					this.order = res.data;
				})
			}
		}
	}
</script>

<style lang='scss'>
	.ui-tabbar-view-box{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>