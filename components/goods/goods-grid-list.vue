<template>
	<view class="ui-goods-list-box" v-if="list_data.length > 0">
		<view class="flex flex-wrap">
			<view class="basis-df padding-sm">
				<block v-for="(item,index) in list_data" :key="index" v-if="index%2==0">
					<view class="bg-white margin-bottom-sm list-radius" @tap="listTap(item,index)">
						<view class="goods-img">
							<image :src="item.goods_thumb" mode="widthFix" lazy-load/>
						</view>
						<view class="padding-xs">
							<view class="text-cut-2 text-black">{{item.goods_name}}</view>
							<view class="margin-top-xs">
								<view class="flex">
									<view class="flex-sub">
										<text class="text-price text-red text-xl text-left">{{item.goods_price}}</text>
									</view>
									<view class="flex-sub text-right">
										<text class="cu-tag line-orange sm radius" v-if="item.has_coupon">券</text>
										<text class="cu-tag light bg-red radius sm ">返<text class="text-price">{{item.commission_price}}</text></text>
									</view>
								</view>
							</view>
							<view class="margin-top-sm margin-bottom-xs text-gray user-info-box">
								<view class="flex">
									<view class="flex-sub" style="width: 55%;">
										<view class="flex justify-start user-info">
											<view class="basis-xs">
												<image class="cu-avatar sm round" :src="item.platform_logo" mode="widthFix" />
											</view>
											<view class="basis-xl text-cut line-height" style="padding-top: 10upx;">
												<text class="text-sm">{{item.mall_name}}</text>
											</view>
										</view>
									</view>
									<view class="flex-sub text-right" style="padding-top: 10upx;">
										<text class="text-sm">{{item.sale_num}}已付款</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="basis-df padding-sm padding-left-xs">
				<block v-for="(item,index) in list_data" :key="index" v-if="index%2!=0">
					<view class="bg-white margin-bottom-sm list-radius" @tap="listTap(item,index)">
						<view class="goods-img">
							<image :src="item.goods_thumb" mode="widthFix" lazy-load/>
						</view>
						<view class="padding-xs">
							<view class="text-cut-2 text-black">{{item.goods_name}}</view>
							<view class="margin-top-xs">
								<view class="flex">
									<view class="flex-sub">
										<text class="text-price text-red text-xl text-left">{{item.goods_price}}</text>
									</view>
									<view class="flex-sub text-right">
										<text class="cu-tag line-orange sm radius" v-if="item.has_coupon">券</text>
										<text class="cu-tag light bg-red radius sm ">返<text class="text-price">{{item.commission_price}}</text></text>
									</view>
								</view>
							</view>
							<view class="margin-top-sm margin-bottom-xs text-gray user-info-box">
								<view class="flex">
									<view class="flex-sub" style="width: 55%;">
										<view class="flex justify-start user-info">
											<view class="basis-xs">
												<image class="cu-avatar sm round" :src="item.platform_logo" mode="widthFix" />
											</view>
											<view class="basis-xl text-cut line-height" style="padding-top: 10upx;">
												<text class="text-sm">{{item.mall_name}}</text>
											</view>
										</view>
									</view>
									<view class="flex-sub text-right" style="padding-top: 10upx;">
										<text class="text-sm">{{item.sale_num}}已付款</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'goods-sort-list',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			},
			show: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			listTap(data,index) {
				this.$emit('listTap', {
					data,
					index
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ui-goods-list-box {
		float: left;
		.basis-df {
			width: 50%;
		}
		.list-radius {
			border-radius: 19rpx;
		}
		.goods-img {
			width: 100%;
			image {
				width: 100%;
				border-radius: 19rpx 19rpx 0 0;
			}
			.pay-view {
				top: 20rpx;
				right: 20rpx;
				font-size: 46rpx;
			}
			.service-view {
				width: 100%;
				bottom: 7.5rpx;
				right: 10rpx;
			}
			.mold-view {
				position: absolute;
				width: 100%;
				bottom: 7.5rpx;
				left: 10rpx;
			}
		}
		.text-time {
			line-height: 47rpx;
		}
		.recommend-list-box {
			.img-aat {
				width: 55rpx;
				margin-top: 10rpx;
			}
			.img-goods {
				font-variant: small-caps;
				margin: 0;
				padding: 0;
				display: inline-flex;
				text-align: center;
				-webkit-box-pack: center;
				justify-content: center;
				-webkit-box-align: center;
				align-items: center;
				white-space: nowrap;
				position: relative;
				width: 137rpx;
				height: 137rpx;
				background-size: cover;
				background-position: center;
				vertical-align: middle;
				border-radius: 12%;
			}
		}
	}
	.ui-goods-list-box.show {
		display: block;
	}
	
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	
	.recommend {
		display: flex;
		height: 400rpx;
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;

		.col-12 {
			display: flex;
			flex-direction: column;
			width: 50%;
			margin: 0 10rpx;
		}

		&-item {
			flex: 1;
			border-radius: 6rpx;
			margin-bottom: 20rpx;
			padding: 20rpx;
			position: relative;

			&__title {
				display: block;
				font-size: 30rpx;
				font-weight: 500;
				margin-bottom: 5rpx;
			}

			&__desc {
				display: block;
				font-size: 24rpx;
				color: #666;
				letter-spacing: 1rpx;
			}

			&__cover {
				position: absolute;
				right: 30rpx;
				bottom: 20rpx;

				image {
					height: 100rpx;
					width: 100rpx;
				}
			}
		}
	}
</style>