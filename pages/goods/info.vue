<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor='bg-white'>
			<block slot="content">商品详情</block>
			<block slot="right">
				<text class="cuIcon-forward"/>
				<text class="cuIcon-more"/>
			</block>
		</bar-title>
		
		<!--提示-->
		<view class="bg-grey text-sm text-center padding-tb-xs text-white">所售商品均为第三方平台，本平台仅提供商品优惠券领取</view>
		
		<!--轮播图-->
		<view class="ui-banner-swiper-box">
			<swiper class="screen-swiper" circular autoplay @change="bannerSwiper">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<image :src="item" mode="aspectFill"/>
				</swiper-item>
			</swiper>
			<!--页码-->
			<text class="cu-tag bg-grey round sm ui-page">{{bannerCur + 1}} / {{bannerList.length}}</text>
		</view>
		
		<!--商品简介-->
		<view class="bg-white padding ui-goods-synopsis-view">
			<view class="margin-tb-sm price-view flex">
				<view class="flex-sub">
					<text class="text-price text-red text-xxl">{{goodsInfo.goods_price}}</text>
					<text class="text-through text-gray text-sm">原价￥{{goodsInfo.goods_price}}</text>
				</view>
				<view class="flex-sub text-right">
					<text class="text-black text-gray text-right">销量 {{goodsInfo.sale_num}}</text>
				</view>
			</view>
			<view class="text-black">
				<!-- <text class="cu-tag bg-red radius sm margin-right-xs">京东</text> -->
				<text class="text-xl">{{goodsInfo.goods_name}}</text>
			</view>
			<view class="text-sm margin-top-sm ui-row-view">
				<text class="cuIcon-refresharrow text-red icon-text"/>
				<text class="text-gray margin-left-xs">比同型号商品便宜3%，值得入手!</text>
			</view>
		</view>
		
		<!--商品券-->
		<view class="ui-sponsored-card-view" v-if="goodsInfo.has_coupon">
			<view class="card-price-view">
				<view class="text-red price-left-view">
					<text class="text-sm">￥</text>
					<text class="price">{{goodsInfo.coupon_discount}}</text>
				</view>
				<view class="name-content-view">
					<view class="text-cut text-red">有效期限</view>
					<view class="text-xs">{{goodsInfo.coupon_start_time}} - {{goodsInfo.coupon_end_time}}</view>
				</view>
				<view class="btn-right-view">
					<button class="cu-btn bg-red round sm" @click="getCoupon(goodsInfo.coupon_link)">立即领券</button>
				</view>
			</view>
			<view class="card-num-view">
				<view class="text-xs" v-if="goodsInfo.coupon_quota">满{{goodsInfo.coupon_quota}}可用</view>
				<view class="text-xs" v-else>可用</view>
			</view>
		</view>
		
		<!--关于卖家-->
		<view class="margin-top bg-white ui-selll-user-view-box">
			<view class="padding text-black text-lg">关于卖家</view>
			<view class="cu-list menu-avatar ">
				<view class="cu-item">
					<view class="cu-avatar round" style="background-image:url(/static/images/icons/jd.png);"/>
					<view class="content">
						<view class="text-black">
							<view class="text-cut">{{goodsInfo.mall_name}}</view>
						</view>
						<view class="flex">
							<text class="text-sm text-gray">可信赖商家 优质商家 金牌销售</text>
						</view>
					</view>
					<view class="action">
						<view class="cuIcon-right text-gray"/>
					</view>
				</view>
			</view>
			<view class="padding ui-grid-tab-view">
				<view class="grid text-center col-3 bg-gray">
					<view class="item-view">
						<view class="text-lg" v-if="goodsInfo.desc_txt">{{goodsInfo.desc_txt}}</view>
						<view class="text-lg" v-else>-</view>
						<view class="text-gray text-sm">描述分</view>
					</view>
					<view class="item-view">
						<view class="text-lg" v-if="goodsInfo.lgst_txt">{{goodsInfo.lgst_txt}}</view>
						<view class="text-lg" v-else>-</view>
						<view class="text-gray text-sm">物流分</view>
					</view>
					<view class="item-view">
						<view class="text-lg" v-if="goodsInfo.serv_txt">{{goodsInfo.serv_txt}}</view>
						<view class="text-lg" v-else>-</view>
						<view class="text-gray text-sm">服务分</view>
					</view>
				</view>
			</view>
			<!-- #ifndef MP-TOUTIAO -->
			<view class="ui-goods-swiper-view">
				<swiper class="screen-swiper square-dot" indicator-dots circular :autoplay="false">
					<swiper-item v-for="(item,index) in Math.ceil(goodsList.length / 4)" :key="index">
						<view class="grid col-4">
							<block v-for="(items,indexs) in goodsList" :key="indexs" v-if="setSwiperItem(indexs,index)">
								<view class="goods-item" @tap='goodsListTap(items)'>
									<view class="cu-avatar radius xl" :style="[{backgroundImage:'url('+ items.goods_thumb +')'}]"/>
									<text class="text-sm text-price-view">￥{{items.goods_price}}</text>
								</view>
							</block>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- #endif -->
		</view>
		
		
		<!--商品详情-->
		<view class="margin-top padding bg-white ui-details-view-box">
			<!-- <view class="text-xl title-view">
				<text class="cuIcon-titles text-red"/>
				<text class="text-black">商品详情</text>
			</view>
			<view class="grid col-2">
				<view class="col-item">
					<text class="text-gray">颜色：</text>
					<text class="text-black">银色</text>
				</view>
				<view class="col-item">
					<text class="text-gray">容量：</text>
					<text class="text-black">256G</text>
				</view>
				<view class="col-item">
					<text class="text-gray">购买渠道：</text>
					<text class="text-black">其他版本</text>
				</view>
				<view class="col-item">
					<text class="text-gray">成色：</text>
					<text class="text-black">9成新</text>
				</view>
				<view class="col-item">
					<text class="text-gray">拆修情况：</text>
					<text class="text-black">无拆修</text>
				</view>
			</view>
			<view class="text-cut col-item">
				<text class="text-gray">详细信息：</text>
				<text class="text-black">有发票，有配件，有包装</text>
			</view> -->
			
			<view class="ui-img-box">
				<image src="/static/images/home/goods/11.png" mode="widthFix"/>
				<image src="/static/images/home/goods/12.png" mode="widthFix"/>
			</view>
			
			<view class="ui-border-view"/>
			
			<view class="text-right text-gray margin-top text-sm">
				<text>1068人想要</text>
				<text class="cuIcon-titles margin-lr-xs"/>
				<text>10600次浏览</text>
			</view>
		</view>

		<!--相似商品-->
		<view class="margin-tb ui-resemble-goods-box">
			<view class="padding bg-white text-black text-lg text-title-view">相似商品</view>
			<view class="grid col-2">
				<view class="bg-white grid-item-box" v-for="(item,index) in goodsList">
					<view class="item-view" @tap='goodsListTap(item)'>
						<view class="cu-avatar radius lg" v-bind:style="{'background-image':'url('+item.goods_thumb+')'}"/>
						<view class="padding-sm ui-text-view">
							<view class="text-cut text-black text-sm">{{item.goods_name}}</view>
							<view class="text-price-view">
								<text class="text-price text-lg text-red">{{item.goods_price}}</text>
								<view class="flex-sub text-right">
									<text class="cu-tag light bg-red radius sm ">返<text class="text-price">{{item.commission_price}}</text></text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="margin-lr-sm margin-bottom-sm text-gray user-info-box">
						<view class="flex">
							<view class="flex-sub">
								<view class="flex flex-wrap user-info">
									<view class="basis-xs">
										<image class="cu-avatar sm img" src="../../static/images/icons/jd.png" lazy-load mode="widthFix"/>
									</view>
									<view class="basis-xl text-cut line-height">
										<text class="text-sm">{{item.mall_name}}</text>
									</view>
									<image class="v-icon" src="/static/images/comm/v.png" v-if='item.is_owner' lazy-load mode="widthFix" />
								</view>
							</view>
							<view class="flex-sub text-right">
								<text class="text-sm">{{item.sale_num}}已购</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!--占位底部距离-->
		<view class="cu-tabbar-height"></view>
		
		<!--底部操作-->
		<view class="bg-white ui-footer-fixed ui-foot-padding-bottom">
			<view class="cu-bar">
				<view class="flex flex-wrap">
					<view class="basis-xs">
						<view class="text-center">
							<view class="cuIcon-like"/>
							<view class="text-sm" @tap="favored">收藏</view>
						</view>
					</view>
					<view class="basis-sm">
						<view class="btn-view">
							<button class="cu-btn bg-orange round shadow-blur" @tap="share">分享赚{{goodsInfo.commission_price}}元</button>
						</view>
					</view>
					<view class="basis-sm">
						<view class="btn-view">
							<button class="cu-btn bg-red round shadow-blur" @tap="buys">自购返{{goodsInfo.commission_price}}元</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>


<script>
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		data() {
			return {
				search_close: false, searchKey: '', deleteView: false,
			}
		},
		onLoad() {
			
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			BackPage() {
				uni.navigateBack();
			},
			searchInput(event) {
				let value = event.detail.value;
				this.searchKey = value;
				if(value) {
					this.search_close = true;
				} else {
					this.search_close = false;
				}
			},
			closeInput() {
				this.searchKey = '';
				this.search_close = false;
			},
			deleteTap() {
				this.deleteView = true;
			},
			logTap() {
				this.deleteView = false;
			},
			searchTap() {
				console.log("123");
				uni.navigateTo({
					url: "/pages/goods/lists"
				});
			}
		}
	}
</script>

<style lang="scss">
	
</style>
