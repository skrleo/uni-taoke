<template>
	<view>
		<view class="cu-card case" v-for="(item,index) in activity_lists" :key="index">
			<view class="cu-item shadow">
				<view class="image">
					<image :src="item.thumb" mode="widthFix"></image>
					<view class="cu-tag bg-blue">美团</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.name}}</text></view>
				</view>
				<view class="cu-list">
					<view class="cu-item">
						<view class="text-content padding">
							{{item.name}}
						</view>
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
		methods: {
			base_init(){
				var params = {type:1,channel:'pdd'}
				this.$Http.get('/home/activity',params).then(res => {
					this.activity_lists = res.lists;
				})
			}
		}
	}
</script>

<style>
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
</style>
