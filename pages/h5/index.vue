<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="web_url"></web-view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				web_url:''
			}
		},
		onLoad(option) {
			this.web_url = option.web_url;
			if(option.title !== undefined){
				uni.setNavigationBarTitle({
					title: res.data.title
				})
			}
		}
	}
</script>

<style>

</style>
