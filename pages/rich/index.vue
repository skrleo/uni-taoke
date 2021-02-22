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
				type : 1,
				title: '',
				content: ''
			}
		},
		onLoad(options) {
			this.base_init(options);
		},
		methods: {
			base_init(e) {
				var params = {
					type: e.type
				}
				this.$Http.get('/rich/resolve',params).then(res => {
					if(res.statusCode !== 200){
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
