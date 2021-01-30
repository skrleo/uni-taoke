<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center order_type_list bg-white">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-black':''" v-for="(item,index) in nav_list" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="order_lists_box">
			<view class="cu-card article" v-for="(item,index) in 10" :key="index">
				<view class="cu-item shadow">
					<view class="flex justify-between padding">
						<view class="text-cut">订单号： 202101304556484</view>
						<view class="text-cut">交易成功</view>
					</view>
					<view class="content">
						<image src="https://img.pddpic.com/mms-material-img/2021-01-23/2021-01-23/b5c8abd5-8b98-4f2c-b2af-8df725210a22.jpeg.a.jpeg"></image>
						<view class="desc">
							<view class="text-content"> 
								<text>贝士优榴莲千层蛋糕爆浆6寸猫山王榴莲奶油网红生日</text>
								<view>
									<view class="cu-tag bg-red light sm round">正义天使</view>
									<view class="cu-tag bg-green light sm round">史诗</view>
								</view>
							</view>
							<view class="flex justify-between">
								<text class="text-red through">￥188</text>
								<text class="text-gray">x12</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nav_list: [
					'全部',
					'待付款',
					'待发货',
					'待收货',
				],
				TabCur: 0,
				scrollLeft: 0
			}
		},
		onLoad() {
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss">
	.order_type_list {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 9999;
	}
	.order_lists_box {
		margin-top: 110upx;
	}
	.cu-item {
		margin-top: 0 !important;
	}
	@import "../../static/style/sort_list.scss";
</style>