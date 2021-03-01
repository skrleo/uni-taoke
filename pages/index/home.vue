<template>
	<view class="bg-white">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
		<view class="cu-bar search bg-white">
			<view class="search-form round" @tap="searchTap">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="搜索商品" confirm-type="search"></input>
			</view>
		</view>
		<swiper class="card-swiper square-dot" :indicator-dots="true" :circular="true" style="margin-top: -28px;"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in banner_list" :key="index">
				<view class="swiper-item" @click="jumpTap(item)">
					<image :src="item.thumb" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="cu-list grid col-5 no-border" v-if="grid_list.length > 0">
			<view class="cu-item" v-for="(item,index) in grid_list" :key="index" @tap='swiperInfo'>
				<view :class="['cuIcon-' + item.thumb,'text-' + item.bgcolor]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<view class="recommend" v-if="recommend_list.length > 0">
			<view class="col-12">
				<view
					class="recommend-item"
					:style="{
						'background-color': recommend_list[0].bgcolor
					}" 
					@click="jumpTap(recommend_list[0])"
				>
					<text class="recommend-item__title">{{ recommend_list[0].name }}</text>
					<text class="recommend-item__desc">{{ recommend_list[0].description }}</text>
					<view class="recommend-item__cover">
						<image mode="widthFix" :src="recommend_list[0].thumb" />
					</view>
				</view>
			</view>
			<view class="col-12">
				<view
					class="recommend-item"
					:style="{
						'background-color': recommend_list[1].bgcolor
					}"
					@click="jumpTap(recommend_list[1])"
				>
					<text class="recommend-item__title">{{ recommend_list[1].name }}</text>
					<text class="recommend-item__desc">{{ recommend_list[1].description }}</text>
					<view class="recommend-item__cover">
						<image mode="widthFix" :src="recommend_list[1].thumb" />
					</view>
				</view>
				<view
					class="recommend-item"
					:style="{
						'background-color': recommend_list[2].bgcolor
					}"
					@click="jumpTap(recommend_list[2])"
				>
					<text class="recommend-item__title">{{ recommend_list[2].name }}</text>
					<text class="recommend-item__desc">{{ recommend_list[2].description }}</text>
					<view class="recommend-item__cover">
						<image mode="widthFix" :src="recommend_list[2].thumb" />
					</view>
				</view>
			</view>
		</view>
		
		<view class="padding-xs col-1 align-center text-center">
			<view class="text-lg"><text class="text-black">热门推荐</text></view>
			<view class="text-xs"><text class="text-ABC">top picks</text></view>
		</view>
		
		<view class="ui-goods-list-box" v-if="goods_lists.length > 0">
			<goods-grid-list :list_data="goods_lists" @listTap="goodsInfo"></goods-grid-list>
		</view>
		</mescroll-body>
		
		<modal-confirm :show="modalShow" :content="clipboard" @confirmTap="confirmTap" @closeTap="closeTap"/>
	</view>
</template>

<script>
	import goodsGridList from '@/components/goods/goods-grid-list';
	import modalConfirm from '@/components/basics/modal-confirm';
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			MescrollBody,
			goodsGridList,
			modalConfirm
		},
		data() {
			return {
				cardCur: 0,
				goods_lists:[],
				banner_list: [],
				recommend_list: [],
				grid_list:[],
				dotStyle: false,
				towerStart: 0,
				modalShow: false,
				direction: '',
				clipboard: '',
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无更多'
					}
				},
				share:{
					title:'甄选好货，购物不仅能省钱还能赚钱',
					path:'/pages/index/home',
					imageUrl:'',
					desc:'',
					content:''
				}
			};
			InputBottom: 0
		},
		onLoad() {
			this.base_init();
			this.TowerSwiper('banner_list');
			uni.getClipboardData({
				success: (res) => {
					if(res.data !== ''){
						this.modalShow = true;
						this.clipboard = res.data;
					}
			　　}
	　　　　});
		},
		onShareAppMessage(res) {
			return {
				title:this.share.title,
				path:this.share.path,
				imageUrl:this.share.imageUrl,
				desc:this.share.desc,
				content:this.share.content,
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
			searchTap() {
				uni.navigateTo({
					url: "/pages/goods/history"
				});
			},
			jumpTap(item) {
				var options = {};
				if(item.jump_type !== 2){
					options = {url:item.jump_url}
				}else{
					options = {
						app_id:item.app_id,
						path:item.jump_url,
					}
				}
				if(item.is_login){
					this.checkAuth(()=>{
						this.navigateTo(options, item.jump_type);
					});
				}else{
					this.navigateTo(options, item.jump_type);
				}
			},
			downCallback() {
				this.mescroll.resetUpScroll();
				this.base_init();
			},
			upCallback(page) {
				this.$Http.get('/goods/lists?type=1&channel=pdd&pageNum='+page.num+'&pageSize='+page.size+'&goods_type=2').then(res => {
					if(page.num == 1) this.goods_lists = [];
					this.goods_lists=this.goods_lists.concat(res.lists);
					this.mescroll.endSuccess(res.lists.length);
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			base_init() {
				var params = {}
				this.$Http.get('/home/lists',params).then(res => {
					this.banner_list = res.data.banner;
					this.grid_list = res.data.grid;
					this.recommend_list = res.data.recommend;
				})
			},
			confirmTap() {
				this.modalShow = false;
				uni.navigateTo({
					url: "/pages/goods/search?keyword=" + this.clipboard
				});
			},
			closeTap() {
				this.modalShow = false;
			},
			swiperInfo(e) {
				uni.navigateTo({
					url: "/pages/login/index"
				});
			},
			goodsInfo(e) {
				uni.navigateTo({
					url: "/pages/goods/detail?g=" + e.data.sign_key +"&c=" + e.data.platform_type
				});
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
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

<style lang="scss" scoped>
	.ui-goods-list-box {
		position: relative;
		width: 100%;
		.list-radius {
			border-radius: 19rpx;
		}
		.goods-img {
			position: relative;
			width: 100%;
			image {
				width: 100%;
				border-radius: 19rpx 19rpx 0 0;
			}
			.pay-view {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				font-size: 46rpx;
			}
			.service-view {
				position: absolute;
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