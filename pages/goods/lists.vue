<template>
	<view>
		<!-- <view class="bg-white goods-list-bg" :style="{
						'background-image': 'url(' + goods_top_bg + ')'
					}">
		</view> -->

		<view class="goods-list-box">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<scroll-view scroll-y="true" class="sv" style="height:100%">
					<!--商品列表-->
					<view class="bg-white ui-search-list-view">
						<goods-grid-list :list_data="goods_lists" @listTap="goodsInfo"></goods-grid-list>
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
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		mixins: [MescrollMixin],
		components: {
			goodsSortList,
			goodsGridList,
		},
		data() {
			return {
				channel:'pdd',
				goods_type: 2,
				goods_top_bg: 'https://img.17wangku.com/taoke/5fcf63bba8e29.jpg',
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
			if(option !== undefined){
				this.channel = option.channel;
				this.goods_type = option.goods_type;
			}
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				this.$Http.get('/goods/lists?type=1&channel='+this.channel+'&pageNum='+page.num+'&pageSize='+page.size+'&goods_type=' + this.goods_type).then(res => {
					if(page.num == 1) this.goods_lists = [];
					this.goods_lists=this.goods_lists.concat(res.lists);
					if(res.spread !== undefined){
						uni.setNavigationBarTitle({
							title: res.spread.barTitle //这是修改后的导航栏文字
						})
						this.goods_top_bg = res.spread.goodsTopBg;
					}
					
					this.mescroll.endSuccess(res.lists.length);
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			BackPage() {
				uni.navigateBack();
			},
			goodsInfo(e) {
				uni.navigateTo({
					url: "/pages/goods/detail?g=" + e.data.sign_key +"&c=" + e.data.platform_type
				});
			}
		}
	}
</script>

<style lang="scss">
	.goods-list-bg{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 9999;
		height: 100px;
		background-repeat:no-repeat; 
		background-size:100% 100%;
		-moz-background-size:100% 100%;
	}
	
	.goods-list-box {
		// margin-top: 100px;
	}
	
	.ui-tabbar-view-box{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	@import "../../static/style/sort_list.scss";
</style>
