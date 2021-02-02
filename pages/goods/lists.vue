<template>
	<view>
		<view class="bg-white search grid col-1">
			<view class="cu-bar">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input :adjust-position="false" type="text" v-model="keyword" placeholder="搜索商品" confirm-type="search"></input>
				</view>
				
				<view class="action" @tap="searchTap">
					<text class="text-red">搜索</text>
				</view>
			</view>
			<view>
				<view class="grid text-center text-black"  :class="'col-' + fields.length">
					<view class="padding-bottom" v-for="(item,index) in fields" :key="index">
						{{item.label}}
						<text v-if="item.order === 'desc'" class="cuIcon-triangledownfill"></text>
						<text v-if="item.order === 'asc'" class="cuIcon-triangleupfill"></text>
						<text v-if="item.order === 'filter'" class="cuIcon-filter"></text>
					</view>
				</view>
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
				fields: [
					{
						label: "综合",
						value: "score",
						order: ""
					},
					{
						label: "销量",
						value: "sales",
						order: "desc"
					},
					{
						label: "价格",
						value: "price",
						order: "asc"
					},
					{
						label: "其他",
						value: "other",
						order: "filter"
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
						tip: '暂无更多'
					}
				},
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
				uni.navigateTo({
					url: "/pages/goods/detail?search_id=" + e.data.search_id + '&goods_sign=' + e.data.goods_sign
				});
			},
			searchTap(){
				this.goods_lists = []
				this.mescroll.resetUpScroll()
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
		margin-top: 170upx;
	}
	@import "../../static/style/sort_list.scss";
</style>
