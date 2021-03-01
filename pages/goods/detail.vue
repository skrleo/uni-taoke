<template>
	<page>
		<view class="swiper-top" v-if="goodsInfo.thumb_urls.length > 0">
			<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500">
				<swiper-item v-for="(item,index) in goodsInfo.thumb_urls" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'" class="swiper-image"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<!--商品简介-->
		<view class="bg-white padding ui-goods-synopsis-view">
			<view class="margin-tb-sm price-view flex">
				<view class="flex-sub">
					<text class="text-price text-red text-xxl">{{goodsInfo.goods_price || 0}}</text>
					<text class="text-through text-gray text-sm padding-left-xs">原价￥{{goodsInfo.original_price || 0}}</text>
				</view>
				<view class="flex-sub text-right">
					<text class="text-black text-gray text-right">销量 {{goodsInfo.sales_num || 0}}</text>
				</view>
			</view>
			<view class="text-black">
				<!-- <text class="cu-tag bg-red radius sm margin-right-xs">京东</text> -->
				<text class="text-xl">{{goodsInfo.goods_name}}</text>
			</view>
			<view class="text-sm margin-top-sm ui-row-view">
				<text class="cuIcon-refresharrow text-red icon-text" />
				<text class="text-gray margin-left-xs">比同型号商品便宜3%，值得入手!</text>
			</view>
			
			<!--商品券-->
			<view class="ui-sponsored-card-view bg-white"  v-if="goodsInfo.has_coupon">
				<view class="card-price-view bg-white">
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
				<view class="card-num-view bg-white">
					<view class="text-xs" v-if="goodsInfo.coupon_quota">满{{goodsInfo.coupon_quota}}可用</view>
					<view class="text-xs" v-else>可用</view>
				</view>
			</view>
		</view>

		<!--关于卖家-->
		<view class="margin-top bg-white ui-selll-user-view-box">
			<view class="padding text-black text-lg">关于卖家</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<image class="cu-avatar round" :src="goodsInfo.mall_logo" mode="widthFix" />
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
		</view>
		
		<!--商品详情-->
		<view class="margin-top bg-white ui-details-view-box">
			<view class="padding text-black text-lg">商品详情</view>
			<view class="ui-img-box" v-if="goodsInfo.gallery_urls.length > 0">
				<image :src="item" v-for="(item,index) in goodsInfo.gallery_urls" :key="index" mode="widthFix"/>
			</view>
	
			<view class="ui-border-view margin-bottom-xl"/>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="bg-white ui-tabbar-view-box">
			<view class="flex mb-sm">
				<view class="flex-sub justify-between cu-bar tabbar">
					<button class="action" open-type="contact">
						<view class="cuIcon-service text-black">
						</view>
						客服
					</button>
					<button class="action">
						<!-- <view class="cuIcon-cart text-black">
						</view>
						购物车 -->
						<view class="cuIcon-favor text-black">
						</view>
						收藏
					</button>
				</view>
				<view class="flex-twice justify-between margin-sm">
					<button class="cu-btn lines-black margin-lr-sm" @click="sharePoster(goodsInfo)">分享赚<text class="text-red">￥{{goodsInfo.commission_price || '0.00' }}</text></button>
					<button class="cu-btn bg-black margin-left-xs" @click="buyGoods(goodsInfo)">立即购买</button>
				</view>
			</view>
		</view>
		
		<!-- 海报分享 -->
		<qrcode-poster ref="poster" :title="goodsInfo.goods_name" @touchmove.stop.prevent="moveHandle" :subTitle="goodsInfo.goods_name" :headerImg="goodsInfo.thumb_url" :price="goodsInfo.goods_price"></qrcode-poster>
	</page>
</template>

<script>
	import qrcodePoster from '@/components/poster/poster'
	export default {
		data() {
			return {
				cardCur: 0,
				dotStyle: false,
				towerStart: 0,
				direction: '',
				goodsInfo:[],
				is_show_model:false,
			};
		},
		components: {
			qrcodePoster,
		},
		onLoad(options) {
			if(options.scene !== undefined){
				options = this.$Tool.getJson(decodeURIComponent(options.scene).split('&'));
			}
			this.getGoodsInfo(options);
			// this.TowerSwiper('swiperList');
		},
		onShareAppMessage(res) {
			return {
				title: this.goodsInfo.goods_name,
				path:'/pages/goods/detail?g=' + this.goodsInfo.sign_key +"&c=" + this.goodsInfo.platform_type,
				imageUrl:this.goodsInfo.thumb_url,
				desc:this.goodsInfo.goods_name,
				content:this.goodsInfo.goods_name,
				success(res){
					uni.showToast({
						title:'分享成功'
					})
				},
				fail(res){
					uni.showToast({
						title:'分享失败',
						icon:'none'
					})
				}
			}
		},
		methods: {
			getGoodsInfo(e) {
				var params = {
					g: e.g,
					c: e.c
				}
				this.$Http.get('/goods/detail', params).then(res => {
					if(res.statusCode !== 200){
						uni.navigateTo({
							url: '/pages/index/home'
						});
						return false;
					}
					this.goodsInfo = res.data;
				})
			},
			//分享海报
			sharePoster(){
				this.checkAuth(()=>{
					var params = {
						channel: this.goodsInfo.platform_type,
						sign_key: this.goodsInfo.sign_key
					}
					this.$Http.get('/goods/poster', params).then(res => {
						if(res.statusCode == 200){
							this.$refs.poster.showCanvas(res.data.path_url);
							this.is_show_model = false
						}
					})
				})
			},
			getCoupon() {
				this.checkAuth(()=>{
					var params = {
						channel: this.goodsInfo.platform_type,
						goods_sign: this.goodsInfo.goods_sign,
						is_mini:1,
					}
					this.$Http.get('/goods/transform',params).then(res => {
						var app_id = res.data.we_app_info.app_id;
						var page_path = res.data.we_app_info.page_path;
						if(res.data.is_authority === 1){
							this.navigateTo({
								appId: app_id,
								path: page_path
							}, 2);
						} else {
							uni.showModal({
								title: '授权提示',
								content: '首次下单需要平台授权，才能绑定您的收益！',
								success: (res) => {
									if (res.confirm) {
										this.navigateTo({
											appId: app_id,
											path: page_path
										}, 2);
									}
								}
							});
						}
					})
				})
			},
			buyGoods(item) {
				this.checkAuth(()=>{
					var params = {
						channel: item.platform_type,
						goods_sign:item.goods_sign,
						is_mini:1,
					}
					this.$Http.get('/goods/transform',params).then(res => {
						var app_id = res.data.we_app_info.app_id;
						var page_path = res.data.we_app_info.page_path;
						if(res.data.is_authority === 1){
							this.navigateTo({
								appId: app_id,
								path: page_path
							}, 2);
						} else {
							uni.showModal({
								title: '授权提示',
								content: '首次下单需要平台授权，才能绑定您的收益！',
								success: (res) => {
									if (res.confirm) {
										this.navigateTo({
											appId: app_id,
											path: page_path
										}, 2);
									}
								}
							});
						}
					})
				})
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
		}
	}
</script>

<style lang='scss'>
	.swiper-top {
		width: 100%;
	}

	.swiper-image {
		width: 100%;
		height: auto;
	}

	.screen-swiper {
		width: 100%;
		height: 708upx;
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
		height: 708upx;
	}

.ui-sponsored-card-view {
    position: relative;
	background-color: #FFFFFF;
    margin: 27.27rpx 27.27rpx 0;
    .card-price-view {
        position: relative;
        background: #FFF5F5;
        border-radius: 14.54rpx 14.54rpx 0 0;
        padding: 18.18rpx;
        .price-left-view {
            position: absolute;
            height: 105.45rpx;
            width: 145.45rpx;
            text-align: center;
            line-height: 125.45rpx;
            .price {
                font-size: 45.45rpx;
                font-weight: 400;
            }
        }
        .name-content-view {
            position: relative;
            padding-top: 12rpx;
            padding-left: 163.63rpx;
            padding-right: 145.45rpx;
            height: 105.45rpx;
            line-height: 1.8;
            color: #999898;
            &::before {
                content: '';
                position: absolute;
                top: -18.18rpx;
                bottom: -18.18rpx;
                margin-left: -18.18rpx;
                border-left: 2rpx dashed #fdbabc;
            }
        }
        .btn-right-view {
            position: absolute;
            right: 27.27rpx;
            top: 18.18rpx;
            height: 125.45rpx;
            line-height: 125.45rpx;
        }
    }
    .card-num-view {
        position: relative;
        background: #FFECED;
        border-radius: 0 0 14.54rpx 14.54rpx;
        border-top: 2rpx dashed #dedbdb;
        padding: 10.9rpx 27.27rpx;
        color: #999898;
        &::before {
            content: '';
            position: absolute;
            width: 36.36rpx;
            height: 36.36rpx;
            background: #ffffff;
            border-radius: 50%;
            top: -18.18rpx;
            left: -18.18rpx;
        }
        &::after {
            content: '';
            position: absolute;
            width: 36.36rpx;
            height: 36.36rpx;
            background: #ffffff;
            border-radius: 50%;
            top: -18.18rpx;
            right: -18.18rpx;
        }
        view {
            position: relative;
            padding-right: 72.72rpx;
        }
        text {
            position: absolute;
            right: 27.27rpx;
            top: 14.54rpx;
        }
    }
}

.ui-selll-user-view-box {
    .cu-list.menu-avatar>.cu-item {
        height: 99.99rpx;
        .content {
            left: 127.27rpx;
            width: calc(100% - 94.54rpx - 127.27rpx);
            .cu-tag.sm {
                padding: 0;
                width: 27.27rpx;
                height: 27.27rpx;
                text-align: center;
                line-height: 27.27rpx;
            }
        }
        &:after {
            width: 0;
            height: 0;
            border-bottom: 0;
        }
    }
    .cu-list.menu-avatar>.cu-item>.cu-avatar {
        width: 72.72rpx;
        height: 72.72rpx;
    }
    .ui-grid-tab-view {
        position: relative;
        width: 100%;
        .grid {
            border-radius: 9.09rpx;
            .item-view {
                position: relative;
                padding: 14.54rpx 0;
            }
            .item-view+.item-view {
                &:before {
                    content: "";
                    position: absolute;
                    background: #e2e2e2;
                    height: 45.45rpx;
                    top: 27.27rpx;
                    width: 2rpx;
                    z-index: 0;
                    left: 0;
                }
            }
        }
    }
    .ui-goods-swiper-view {
        .goods-item {
            position: relative;
            text-align: center;
            .text-price-view {
                position: absolute;
                bottom: 3.63rpx;
                left: 36.36rpx;
                color: #fff;
            }
        }
        .screen-swiper {
            min-height: 145.45rpx;
            height: 172.72rpx;
        }
    }
}

.ui-details-view-box {
    position: relative;
    .title-view {
        padding: 9.09rpx 0 18.18rpx;
    }
    .col-item {
        margin: 9.09rpx 0;
    }
    .ui-text-content-view {
        margin: 27.27rpx 0;
    }
    .ui-img-box {
        position: relative;
        width: 100%;
        image {
            width: 100%;
            border-radius: 18.18rpx;
        }
        image+image {
            margin-top: 18.18rpx;
        }
    }
}

.ui-tabbar-view-box{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
