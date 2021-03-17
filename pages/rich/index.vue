<template>
	<view class="content bg-white">
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap padding">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				title: '',
				content: '',
				shareTitle: '',
				shareImage: '',
				sharePath: '/pages/rich/index'
			}
		},
		onLoad(options) {
			this.base_init(options);
			var params = {
				page_type: 'rich',
				type: options.type
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
			base_init(e) {
				var params = {
					type: e.type
				}
				this.$Http.get('/rich/resolve', params).then(res => {
					if (res.statusCode !== 200) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						return false;
					}
					uni.setNavigationBarTitle({
						title: res.data.title
					})
					this.title = res.data.title;
					this.content = res.data.content;
				})
			},
		}
	}
</script>

<style>

</style>
