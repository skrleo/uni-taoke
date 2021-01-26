<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round" @tap="searchTap">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="搜索商品" confirm-type="search"></input>
			</view>
			
			<view class="action" @tap="searchTap">
				<text class="text-red">搜索</text>
			</view>
		</view>
		
		
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<scroll-view scroll-y="true" class="sv" style="height:100%">
				<!--商品列表-->
				<view class="bg-white ui-search-list-view">
					<goods-sort-list :list_data="goods_lists" @listTap="goodsSortListTap"></goods-sort-list>
				</view>
			</scroll-view>
		</mescroll-body>
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
				search_close: false, searchKey: '', deleteView: false,
				TabCur: 0, goods_lists: [],
			}
		},
		onLoad() {
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				this.$Http.get('/goods/lists?type=1&channel=pdd&pageNum='+page.num+'&pageSize='+page.size).then(res => {
					if(page.num == 1) this.goods_lists = [];
					this.goods_lists=this.goods_lists.concat(res.lists);
					this.mescroll.endSuccess(res.lists.length);
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
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
			BackPage() {
				uni.navigateBack();
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			goodsSortListTap(e) {
				uni.navigateTo({
					url: '/pages/goods/goods?id='+e.data.goods_id+'&channel='+e.data.channel+'&search_id='+e.data.search_id
				});
			},
			searchTap() {
				console.log("搜索..");
			},
		}
	}
</script>

<style lang="scss">
	@import "../../static/style/sort_list.scss";
</style>
