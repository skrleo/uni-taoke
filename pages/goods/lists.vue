<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" v-model="keyword" placeholder="搜索商品" confirm-type="search"></input>
			</view>
			
			<view class="action" @tap="searchTap">
				<text class="text-red">搜索</text>
			</view>
		</view>
		
		<view class="goods-list-box">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<scroll-view scroll-y="true" class="sv" style="height:100%">
					<!--商品列表-->
					<view class="bg-white ui-search-list-view">
						<goods-sort-list :list_data="goods_lists" @listTap="goodsInfo"></goods-sort-list>
					</view>
				</scroll-view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import goodsSortList from '@/components/goods/goods-sort-list';
	
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		mixins: [MescrollMixin],
		components: {
			goodsSortList,
		},
		data() {
			return {
				search_close: false, 
				searchKey: '', 
				deleteView: false,
				TabCur: 0, 
				keyword: '',
				goods_lists: [],
			}
		},
		onLoad(option) {
			this.keyword = option.keyword;
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				this.$Http.get('/goods/lists?type=1&channel=pdd&pageNum='+page.num+'&pageSize='+page.size+'&goods_type=1&keyword=' + this.keyword).then(res => {
					if(page.num == 1) this.goods_lists = [];
					this.goods_lists=this.goods_lists.concat(res.lists);
					this.mescroll.endSuccess(res.lists.length);
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			BackPage() {
				uni.navigateBack();
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			goodsInfo(e) {
				var params = {type:1,channel:'pdd',goods_id:e.data.goods_id,is_mini:1}
				this.$Http.get('/goods/transform',params).then(res => {
					this.navigateTo({
						appId: res.data.we_app_info.app_id,
						path: res.data.we_app_info.page_path
					}, 2);
				})
			},
			searchTap() {
				this.$Http.get('/goods/lists?type=1&channel=pdd&pageNum='+page.num+'&pageSize='+page.size+'&goods_type=1&keyword=' + this.keyword).then(res => {
					this.goods_lists = res.lists;
				})
			},
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
		margin-top: 100upx;
	}
	@import "../../static/style/sort_list.scss";
</style>
