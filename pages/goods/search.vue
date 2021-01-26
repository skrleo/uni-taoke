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
		
		<!--搜索区域-->
		<view class="padding ui-search-list-view bg-white" v-if="!deleteView">
			<!--搜索记录-->
			<view class="search-list-view">
				<view class="search-bar-view">
					<text class="text-black">历史搜索</text>
					<text class="cuIcon-delete text-gray icon-right" @tap="deleteTap"/>
				</view>
				<view class="btn-view">
					<button class="cu-btn round">耳机</button>
					<button class="cu-btn round">苹果手机</button>
					<button class="cu-btn round">电动车</button>
				</view>
			</view>
			
			<!--推荐搜索-->
			<view class="search-list-view">
				<view class="search-bar-view">
					<text class="text-black">推荐搜索</text>
				</view>
				<view class="btn-view">
					<button class="cu-btn round">耳机</button>
					<button class="cu-btn round">苹果手机</button>
					<button class="cu-btn round">电动车</button>
					<button class="cu-btn round">笔记本</button>
					<button class="cu-btn round">衣柜</button>
					<button class="cu-btn round">平板电脑</button>
					<button class="cu-btn round">华为手机</button>
					<button class="cu-btn round">小米</button>
					<button class="cu-btn round">三星</button>
				</view>
			</view>
		</view>
		
		<!--处理历史记录-->
		<view class="padding ui-search-list-view" v-if="deleteView">
			<!--搜索记录-->
			<view class="search-list-view">
				<view class="search-bar-view">
					<text class="text-black">历史搜索</text>
					<view class="text-sm text-right">
						<text class="text-gray">全部删除</text>
						<text class="text-red" @tap="logTap">完成</text>
					</view>
				</view>
				<view class="btn-view">
					<button class="cu-btn round">
						<text>耳机</text>
						<text class="cuIcon-roundclosefill close-icon"/>
					</button>
					<button class="cu-btn round">
						<text>苹果手机</text>
						<text class="cuIcon-roundclosefill close-icon"/>
					</button>
					<button class="cu-btn round">
						<text>电动车</text>
						<text class="cuIcon-roundclosefill close-icon"/>
					</button>
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
				uni.navigateTo({
					url: "/pages/goods/lists"
				});
			}
		}
	}
</script>

<style lang="scss">
	.ui-bar-search-title-box {
	    .cu-bar {
	        padding-top: var(--status-bar-height);
	        min-height: calc(var(--status-bar-height) + 101rpx);
	        .content {
	            top: var(--status-bar-height);
	            width: calc(100% - 181.81rpx);
	        }
	        .search-form [class*="cuIcon-"] {
	            margin: 0 0.8em 0 0.8em;
	        }
	        .search-form {
	            /* #ifdef MP */
	            margin-right: 181.81rpx;
	            /* #endif */
	            margin-left: 9.09rpx;
	            .close-icon {
	                font-size: 29.09rpx;
	            }
	        }
	    }
	    .cu-bar.fixed.no-shadow {
	        box-shadow: inherit;
	    }
	    .cu-bar.bg-white {
	        color: #333333;
	    }
	    .ui-seat-height {
	        width: 100%;
	        height: calc(var(--status-bar-height) + 101rpx);
	    }
	}
	
	.ui-search-list-view {
	    position: relative;
	    width: 100%;
	    .search-list-view {
	        .search-bar-view {
	            position: relative;
	            margin-bottom: 18.18rpx;
	            width: 100%;
	            .icon-right {
	                position: absolute;
	                right: 0;
	                top: 5.45rpx;
	            }
	            .text-right {
	                position: absolute;
	                right: 0;
	                top: 4rpx;
	                text+text {
	                    margin-left: 27.27rpx;
	                }
	            }
	        }
	        .btn-view {
	            position: relative;
	            padding-bottom: 36.36rpx;
	            width: 100%;
	            .cu-btn {
	                color: #333333;
	                height: 54.54rpx;
	                font-size: 23.63rpx;
	                margin-right: 27.27rpx;
	                margin-bottom: 18.18rpx;
	                .close-icon {
	                    top: 0;
	                    color: #9c9797;
	                    right: -9.09rpx;
	                    position: absolute;
	                    font-size: 27.27rpx;
	                }
	            }
	        }
	    }
	}
</style>