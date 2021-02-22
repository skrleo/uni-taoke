<template>
	<view class="activity_lists_box">
		<view class="cu-card case" v-for="(item,index) in activity_lists" :key="index">
			<view class="cu-item shadow" @click="activityInfo(item)">
				<view class="image">
					<image :src="item.thumb" class="activity_thumb" mode="widthFix"></image>
					<view class="cu-tag bg-blue">{{item.type === 1 ? '美团' : '饿了么'}}</view>
				</view>
				<view class="cu-list">
					<view class="cu-item flex flex-wrap justify-between align-center padding">
						<view class="text-content">
							{{item.name}}
						</view>
						<button class="cu-btn round sm bg-black shadow margin-right-xs">立即领取</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activity_lists: []
			}
		},
		onLoad() {
			this.base_init();
		},		
		onShareAppMessage(res) {
			return {
				title: '点外卖领券还可以省钱,美食外卖红包天天领！',
				path:'/pages/index/activity',
				imageUrl:'',
				desc:'',
				content:'',
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
			base_init() {
				var params = {
					type: 1,
					channel: 'pdd'
				}
				this.$Http.get('/home/activity', params).then(res => {
					this.activity_lists = res.lists;
				})
			},
			activityInfo(e) {
				var params = {
					channel: 'mt',
					jump_url: e.jump_url
				}
				// if(e.type === 1){
				// 	this.$Http.get('/goods/transform', params).then(res => {
				// 		if (res.statusCode === 200) {
				// 			if (res.data.jump_type === 1) {
				// 				this.navigateTo({
				// 					url: res.data.jump_url
				// 				}, res.data.jump_type);
				// 			}
				// 			if (res.data.jump_type === 2) {
				// 				this.navigateTo({
				// 					appId: res.data.appId,
				// 					path: res.data.path,
				// 				}, res.data.jump_type);
				// 			}
				// 		} else {
				// 			uni.showToast({
				// 				title: '请求异常！',
				// 				icon: 'none'
				// 			});
				// 		}
				// 	})				
				// }
				
				if (e.jump_type === 1) {
					this.navigateTo({
						url: e.jump_url
					}, e.jump_type);
				}
				if (e.jump_type === 2) {
					this.navigateTo({
						appId: e.app_id,
						path: e.jump_url,
					}, e.jump_type);
				}
			},
		}
	}
</script>

<style>
	.activity_lists_box {
		padding-top: 38upx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.activity_thumb {
		width: 100%;
	}

	.cu-item {
		margin-top: 0 !important;
	}
</style>
