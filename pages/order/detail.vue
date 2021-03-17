<template>
	<view class="cu-card article no-card">
		<view class="padding" style="background-color: #2B2E3D;">
			<text class="text-white">{{order.order_status_desc}}</text>
		</view>
		<view class="cu-item shadow">
			<view class="content flex padding-bottom margin-top-lg">
				<image :src="order.thumb_url" mode="widthFix"></image>
				<view class="desc">
					<view>
						<view class="padding-bottom-xs text-black">
							<text>{{order.goods_name}}</text>
						</view>
						<view class='cu-tag line-red radius sm'>{{order.platform_name || '自营'}}</view>
					</view>
					<view class="flex justify-between text-gray">
						<text class="through">￥{{order.goods_price || '0.00'}}</text>
						<text>x{{order.buy_num || 1}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex justify-between bg-white padding-lr padding-bottom" v-if="order.original_price">
			<view class="text-black">
				<text>原价</text>
			</view>
			<view class="text-black">
				<text>￥{{order.original_price || '0.00'}}</text>
			</view>
		</view>
		<view class="flex justify-between bg-white padding-lr padding-bottom" v-if="order.coupon_discount">
			<view class="text-black">
				<text>优惠券</text>
			</view>
			<view class="text-black">
				<text>￥{{order.coupon_discount || '0.00'}}</text>
			</view>
		</view>
		<view class="bg-white text-black text-right padding-lr padding-bottom">
			<text class="text-black through">实付款:</text><text class="text-red text-lg">￥{{order.goods_price || '0.00'}}</text>
		</view>

		<view class="cu-list menu sm-border margin-top-sm no-border">
			<view class="cu-item">
				<view class="content">
					<text class="text-black">订单编号</text>
				</view>
				<view class="action">
					<text class="text-grey">{{order.order_sn}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="order.order_pay_way">
				<view class="content">
					<text class="text-black">支付方式</text>
				</view>
				<view class="action">
					<text class="text-grey">{{order.order_pay_way || '无'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">下单时间</text>
				</view>
				<view class="action">
					<text class="text-grey">{{order.order_create_time || '无'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">支付时间</text>
				</view>
				<view class="action">
					<text class="text-grey">{{order.order_pay_time || '无'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">是否结算</text>
				</view>
				<view class="action">
					<text class="text-grey">{{order.is_dispense == 1 ? '是' : '否'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">订单备注</text>
				</view>
				<view class="action">
					<text class="text-grey">{{order.remark || ''}}</text>
				</view>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="bg-white ui-tabbar-view-box" style="height: 138rpx;">
			<view class="padding">
				<text class="text-black through">预计可赚佣金:</text><text class="text-red through text-lg">￥{{order.promotion_amount || '0.00'}}</text>
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
				order: []
			};
		},
		computed: {
			...mapState({
				loginStatus: state => state.loginStatus,
				user: state => state.user,
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
				var params = {
					order_sn: e.order_sn,
					channel: e.platform_type
				}
				this.$Http.get('/order/detail', params).then(res => {
					if (res.statusCode !== 200) {
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
	.ui-tabbar-view-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
