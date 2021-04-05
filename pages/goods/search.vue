<template>
	<view>
		<view class="bg-white search grid col-1">
			<view class="cu-bar">
				<view class="wrapper bg-white">
					<view class="tooltip" v-if="tooltip">
						<view class="solid-bottom" v-for="(item,index) in platform" :key="index" @click="cutoverTap(item)">
							<view class="padding-sm" :data-id="item.type">{{item.name}}</view>
						</view>
					</view>
					<view class="padding-left-xs" @tap="platformTap">
						<text :data-id="platform_type">{{platform_name}}</text>
						<text class="cuIcon-triangledownfill"></text>
					</view>
				</view>
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input :adjust-position="false" type="text" v-model="keyword" placeholder="搜索商品" confirm-type="search" @confirm="searchTap()"></input>
				</view>

				<view class="action" @tap="searchTap">
					<text class="text-red">搜索</text>
				</view>
			</view>
			<view class="solid-bottom">
				<view class="flex p-xs margin-bottom-sm mb-sm">
					<view class="flex-twice flex justify-around">
						<view @click="sortBy('score')">
							<text>综合</text>
						</view>
						<view @click="sortBy('sales', sales_icon)">
							<text>销量</text><text :class="'cuIcon-' + sales_icon"></text>
						</view>
					</view>
					<view class="flex-sub flex justify-around">
						<view style="padding-top: 5upx;" @click="sortBy('deploy', deploy_icon)">
							<text :class="'cuIcon-' + deploy_icon"></text>
						</view>
						|
						<view @click="sortBy('filter')">
							<text>筛选</text><text class="cuIcon-filter"></text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 右边抽屉 -->
		<view class="cu-modal drawer-modal justify-end" :class="icon_type=='filter'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left bg-white" style="height: 100%;width: 100%;">
					<form>
						<view style="margin-top: 188upx;height: 100%;width: 100%;padding-left: 21upx;">
							<view class="title text-black margin-bottom padding-left-xs">价格区间</view>
							<view class="flex justify-center margin-bottom-sm">
								<input placeholder="最低价" class="sm-border radius roud-input" name="input"></input>
								<text style="line-height: 58upx;height: 58upx;" class="padding-lr">-</text>
								<input placeholder="最高价" class="sm-border radius roud-input" name="input"></input>
							</view>
						</view>
					</form>

					<view class="ui-tabbar-view-box flex justify-center margin-bottom-xl">
						<button class="cu-btn lines-gray margin-lr-sm padding-lr-xl">重置</button>
						<button class="cu-btn bg-black margin-left-xs padding-lr-xl">确定</button>
					</view>
				</view>
			</view>
		</view>

		<view class="goods-list-box">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<scroll-view scroll-y="true" class="sv" style="height:100%">
					<!--商品列表-->
					<view class="bg-white ui-search-list-view">
						<goods-sort-list :list_data="goods_lists" @listTap="goodsInfo" v-if="deploy_icon == 'apps'"></goods-sort-list>
						<goods-grid-list :list_data="goods_lists" @listTap="goodsInfo" v-if="deploy_icon == 'list'"></goods-grid-list>
					</view>
				</scroll-view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import goodsSortList from '@/components/goods/goods-sort-list';
	import goodsGridList from '@/components/goods/goods-grid-list';

	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		mixins: [MescrollMixin],
		components: {
			goodsSortList,
			goodsGridList,
		},
		data() {
			return {
				tooltip:false,
				deploy_icon: 'apps',
				sales_icon: 'triangledownfill',
				icon_type: '',
				shareTitle: '',
				shareImage: '',
				sharePath: '/pages/goods/lists',
				CustomBar: this.CustomBar,
				fields: [{
						label: "综合",
						is_icon: 0,
						icon_o: '',
						icon: ''
					},
					{
						label: "销量",
						is_icon: 0,
						icon_o: 'triangledownfill',
						icon: 'triangleupfill'
					},
					{
						label: "宫格",
						is_icon: 0,
						icon_o: 'apps',
						icon: 'list'
					},
					{
						label: "筛选",
						is_icon: 0,
						icon_o: 'filter',
						icon: 'filter',
					},
				],
				search_close: false,
				searchKey: '',
				deleteView: false,
				TabCur: 0,
				keyword: '',
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '-我是有底线的-'
					}
				},
				goods_lists: [],
				platform_type: 'pdd',
				platform_name: '拼多多',
				platform:[{name: '拼多多',type : 'pdd'},{name: '京东',type : 'jd'},{name: '唯品会',type : 'vip'}]
			}
		},
		onLoad(option) {
			this.keyword = option.keyword;
			this.platform_type = option.channel;
			this.platform_name = this.platform.find(v => v.type == option.channel).name;
			var params = {
				page_type: 'search',
				channel: this.platform_type,
				keyword: this.keyword
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
			sortBy(type, sort = '') {
				this.tooltip = false;
				if (type == 'filter') {
					if (this.icon_type == 'filter') {
						this.icon_type = '';
					} else {
						this.icon_type = 'filter';
					}
					return false;
				}

				if (type == 'sales') {
					if (sort == 'triangledownfill') {
						this.sales_icon = 'triangleupfill';
					} else {
						this.sales_icon = 'triangledownfill';
					}
					return false;
				}

				if (type == 'score') {

					return false;
				}

				if (type == 'deploy') {
					if (sort == 'apps') {
						this.deploy_icon = 'list';
					} else {
						this.deploy_icon = 'apps';
					}
					return false;
				}

			},
			hideModal(e) {
				this.tooltip = false;
				this.icon_type = null
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				this.$Http.get('/goods/lists?type=1&channel=' + this.platform_type + '&pageNum=' + page.num + '&pageSize=' + page.size +
					'&goods_type=1&keyword=' + this.keyword).then(res => {
					if (page.num == 1) this.goods_lists = [];
					this.goods_lists = this.goods_lists.concat(res.lists);
					this.mescroll.endSuccess(res.lists.length);
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			BackPage() {
				uni.navigateBack();
			},
			tabSelect(e) {
				this.tooltip = false;
				this.TabCur = e.currentTarget.dataset.id;
			},
			goodsInfo(e) {
				this.tooltip = false;
				uni.navigateTo({
					url: "/pages/goods/detail?g=" + e.data.sign_key + "&c=" + e.data.platform_type
				});
			},
			searchTap() {
				this.tooltip = false;
				if (this.keyword == '') {
					uni.showToast({
						title: '搜索内容不能为空！',
						icon: 'none'
					});
					return false;
				}
				var params = {
					keyword: this.keyword
				};
				this.$Http.post('/search/store', params).then(res => {
					if (res.statusCode === 200) {
						this.goods_lists = []
						this.mescroll.resetUpScroll()
					}
				})
			},
			cutoverTap(e){
				this.tooltip = false;
				this.platform_type = e.type;
				this.platform_name = e.name;
			},
			platformTap(){
				this.tooltip = true;
			}
		}
	}
</script>

<style lang="scss">
	.search {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 9999;
	}

	.goods-list-box {
		margin-top: 152upx;
	}

	.roud-input {
		width: 185upx;
		border: 3upx solid #e6e6e6;
		border-radius: 38upx;
		height: 58upx;
		padding: 3upx 26upx;
		line-height: 58upx;
	}

	.ui-tabbar-view-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.wrapper {
		position: relative;
		display: inline-block;
	}
	
	.wrapper_show {
		visibility: hidden;
	}

	.wrapper .tooltip {
		width: 100px;
		background-color: #555;
		color: #fff;
		border-radius: 6px;
		padding: 5px 0;
		text-align: center;
		position: absolute;
		z-index: 1;
		top: 135%;
		left: 50%;
		transition: opacity 1s;
	}

	.wrapper .tooltip::after {
		content: "";
		position: absolute;
		bottom: 100%;
		left: 50%;
		margin-left: -45px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent #555 transparent;
	}
	@import "../../static/style/sort_list.scss";
</style>
