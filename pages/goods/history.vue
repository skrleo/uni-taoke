<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" v-model="keyword" placeholder="搜索商品" confirm-type="search" @confirm="searchTap()"></input>
			</view>
			
			<view class="action" @tap="searchTap">
				<text class="text-red">搜索</text>
			</view>
		</view>
		
		<!--搜索区域-->
		<view class="padding ui-search-list-view bg-white" v-if="!deleteView">
			<!--搜索记录-->
			<view class="search-list-view" v-if="history.length > 0">
				<view class="search-bar-view">
					<text class="text-black">历史搜索</text>
					<text class="cuIcon-delete text-gray icon-right" @tap="deleteTap"/>
				</view>
			
				<view class="btn-view">
					<button class="cu-btn round" v-for="(item,index) in history" :key="index" @click="searchWord(item)">{{item}}</button>
				</view>
			</view>
			
			<!--推荐搜索-->
			<view class="search-list-view" v-if="suggest.length > 0">
				<view class="search-bar-view">
					<text class="text-black">推荐搜索</text>
				</view>
				<view class="btn-view">
					<button class="cu-btn round" v-for="(item,index) in suggest" :key="index" @click="searchWord(item.value)">{{item.name}}</button>
				</view>
			</view>
		</view>
		
		<!--处理历史记录-->
		<view class="padding ui-search-list-view bg-white" v-if="deleteView">
			<!--搜索记录-->
			<view class="search-list-view">
				<view class="search-bar-view">
					<text class="text-black">历史搜索</text>
					<view class="text-sm text-right">
						<text class="text-gray" @click="delTap()">全部删除</text>
						<text class="text-red" @tap="logTap">完成</text>
					</view>
				</view>
				<view class="btn-view">
					<button class="cu-btn round" v-for="(item,index) in history" :key="index" @click="delTap(item)">
						<text>{{item}}</text>
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
				history:[],
				suggest:[],
				keyword:'',
				search_close: false, 
				searchKey: '', 
				deleteView: false,
			}
		},
		onLoad() {
			this.base_init();
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			base_init() {
				this.$Http.get('/search/lists').then(res => {
					if(res.statusCode == 200){
						this.history = res.data.history;
						this.suggest = res.data.suggest;
					}
				})
			},
			searchWord(keyword) {
				this.keyword = keyword;
				if(this.keyword !== ''){
					var params = {keyword:this.keyword};
					this.$Http.post('/search/store',params).then(res => {
						if(res.statusCode === 200){
							uni.navigateTo({
								url: "/pages/goods/search?keyword=" + this.keyword
							});
						}
					})
				}
			},
			delTap(val = ''){
				var params = {};
				if(val !== ''){
					params.keyword = val;
				}
				this.$Http.get('/search/destroy',params).then(res => {
					if(res.statusCode === 200){
						uni.showToast({
							title: '删除成功!',
							icon: 'none'
						});
						this.deleteView = false;
						this.base_init();
					}
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
			deleteTap() {
				this.deleteView = true;
			},
			logTap() {
				this.deleteView = false;
			},
			searchTap() {
				if(this.keyword == ''){
					uni.showToast({
						title: '搜索内容不能为空！',
						icon: 'none'
					});
					return false;
				}
				var params = {keyword:this.keyword};
				this.$Http.post('/search/store',params).then(res => {
					if(res.statusCode === 200){
						uni.navigateTo({
							url: "/pages/goods/search?keyword=" + this.keyword
						});
					}
				})
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