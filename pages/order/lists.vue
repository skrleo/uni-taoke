<template>
	<view>
		<view class="cu-bar order_type_list bg-white">
			<view class="cu-item flex-sub text-center" :class="index==TabCur?'text-black text-bold cur':''" v-for="(item,index) in nav_list" :key="index" @tap="tabSelect" :data-id="item.value">
				{{item.name}}
			</view>
		</view>
		<view class="order_lists_box">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<view class="cu-card article" v-for="(item,index) in order_lists" :key="index" @click="detailTap(item)">
					<view class="cu-item shadow">
						<view class="flex justify-between padding">
							<view class="text-cut"><view class='cu-tag line-red margin-right-sm radius sm'>{{item.platform_name || '自营'}}</view>订单号： {{item.order_sn}}</view>
							<view class="text-cut">{{item.status_name}}</view>
						</view>
						<view class="content padding-bottom" v-if="item.order_type == 1">
							<image :src="item.thumb_url"></image>
							<view class="desc">
								<view class="text-content"> 
									<text>{{item.goods_name}}</text>
								</view>
								<view class="flex justify-between">
									<text class="text-red through">￥{{item.goods_price}}</text>
									<text class="text-gray">x{{item.buy_num}}</text>
								</view>
							</view>
						</view>
						<view class="content padding-bottom" v-if="item.order_type == 2">
							<scroll-view scroll-x class="nav z" scroll-with-animation>
								<block v-for="(goods,index) in item.goods_info" :key="index">
									<image :src="goods.thumb_url" mode="widthFix" style="width: 180rpx;"/>
								</block>
							</scroll-view>
						</view>
						<view class="flex justify-between padding-lr margin-top-lg">
							<text class="text-red through">预计佣金：￥{{item.promotion_amount}}</text>
							<text class="text-black">实付金额：￥<text class="text-xl">{{item.order_amount}}</text></text>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			MescrollBody
		},
		data() {
			return {
				nav_list: [{
					name: '全部',
					value: 0,
				},{
					name: '待付款',
					value: 1
				},{
					name: '待发货',
					value: 2
				},{
					name: '待收货',
					value: 3
				},{
					name: '退款/售后',
					value: 4
				}
				],
				TabCur: 0,
				scrollLeft: 0,
				order_lists:[]
			}
		},
		onLoad(e) {
			if(e.TabCur !== undefined){
				this.TabCur = e.TabCur;
			}else{
				this.TabCur = 0;
			}
		},
		methods: {
			downCallback() {
				this.mescroll.resetUpScroll();
			},
			upCallback(page) {
				this.$Http.get('/order/lists?pageNum='+page.num+'&pageSize='+page.size+'&status=' + this.TabCur).then(res => {
					if(page.num == 1) this.order_lists = [];
					this.order_lists=this.order_lists.concat(res.lists);
					this.mescroll.endSuccess(res.lists.length);
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.order_lists = []; // 先清空列表,显示加载进度
				this.mescroll.resetUpScroll();
			},
			detailTap(e) {
				uni.navigateTo({
					url: '/pages/order/detail?order_sn=' + e.order_sn + '&platform_type=' + e.platform_type
				});
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
		margin-top: 120upx;
	}
	.cu-item {
		margin-top: 0 !important;
	}
	@import "../../static/style/sort_list.scss";
</style>