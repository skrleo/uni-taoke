<template>
	<page>
		<view class="login bg-white">
			<view class="padding-xs flex align-center padding-top-xl">
				<view class="flex-sub text-center text-xl" style="margin-top: 80upx;">
					<view class="cu-avatar xl round" :style="{'background-image':'url(' + logo + ');'}"></view>
				</view>
			</view>
			<view class="padding-xs flex align-center margin-bottom-xl">
				<view class="flex-sub text-center text-xl">
					<text class="text-black text-bold">{{platform_name}}</text>
				</view>
			</view>
			<view class="uni-padding-wrap padding" style="text-indent: 2em;">
				<text>云淘趣(广州)网络科技有限公司是一家快速成长、锐意进取的年轻网络科技公司。公司以人为本，以客户为中心，以需求为导向，以服务为宗旨；以创新、专业、求实、诚信、和谐为经营理念。创新科技，最专业的技术。现以成为整个行业技术较专业的网络公司。迅速发展成为网络科技领域的后起之秀。</text>
			</view>
			<view class="text-center" style="margin-top: 228rpx;">
				<view class="text-sm">
					<text>Copyright©2020-2025</text>
				</view>
				<view class="text-sm">
					<text>云淘趣(广州)网络科技有限公司</text>
				</view>
			</view>
		</view>
	</page>
</template>


<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				platform_name:'云淘荟买',
				logo: 'https://img.17wangku.com/taoke/logo.png'
			}
		},
		computed: {
			...mapState({
				loginStatus: state => state.loginStatus,
				user: state => state.user,
			})
		},
		onLoad() {
			if (this.loginStatus) {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		methods: {
			
		}
	}
</script>


<style lang="scss" scoped>
	.login {
		position: absolute;
		height: 100%;
		width: 100%;
		margin: 0 auto;

		.protocol {
			margin-top: 220upx;
			bottom: 0;
			width: 100%;
			height: 160upx;
		}
	}
</style>
