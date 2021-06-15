<template>
	<view style="overflow-x: hidden;">
		<view class="bg">
			<image class="bg-img" src="/static/images/bg.png" mode=""></image>
		</view>
		
		<view class="nav" :style="{ paddingTop: statusBarHeight + 'px' }">
			<text class="cuIcon-back text-grey" @click="back"></text>
			<view class="nav-space"></view>
		</view>
		
		<view class="info" :style="{marginTop: statusBarHeight + 44 + 'px'}">
			<image class="info-bg" src="/static/images/info-bg.png" mode=""></image>
			
			<view class="info-content">
				<view class="info-avatar">
					<image class="info-avatar-pic" src="/static/images/avatar.png" mode=""></image>
				</view>
				<view class="info-name">
					<text class="info-name">刘翠花</text>
					<text class="info-level">升级至尊会员享额外特权</text>
				</view>
			</view>
			
			<view class="info-asset">
				<!-- <view class="info-asset-item">
					<text class="iai-title">积分</text>
					<text class="iai-value">0</text>
				</view> -->
				<view class="info-asset-item">
					<text class="iai-title">累计金额</text>
					<text class="iai-value">2563</text>
				</view>
				<view class="info-asset-item">
					<text class="iai-title">好友助力</text>
					<text class="iai-value">3</text>
				</view>
			</view>
		</view>
		
		<view class="level">
			<view class="level-rate">
				<text class="level-rate-text1">当前返利比例</text>
				<text class="level-rate-text2">25%</text>
			</view>
			
			<view class="level-info">
				<image class="level-info-icon" src="~@/static/images/vip.png" mode=""></image>
				<text class="level-info-text">V1至尊会员</text>
				<text class="level-info-integral">0</text>
			</view>
			
			<view class="level-distance">
				<button class="cu-btn lg round bg-orange" style="background-color: 383738;margin: 0 auto;" @tap="inviteTap">邀请好友，赚现金</button>
			</view>
		</view>

		<view class="cu-item grid col-1">
			<scroll-view scroll-x class="bg-white nav text-center">
				<block v-for="(item,index) in invite_list" :key="index">
					<view class="cu-item" :class="item.id == inviteCur?'text-white':''" @tap="inviteType" :data-id="item.id">
						<text :class="'cuIcon-'+ item.icon"></text>{{item.name}}
					</view>
				</block>
			</scroll-view>
		
			<view class="grid col-2 bg-white padding radius margin-bottom-sm">
				
			</view>
		</view>
	</view>
</template>

<script>
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	export default {
		data() {
			return {
				inviteCur: 1,
				statusBarHeight,
				invite_list:[{
					id: 1,
					icon: 'upstage',
					name: '好友助力榜'
				},{
					id: 2,
					icon: 'upstage',
					name: '推广助力榜'
				}]
			}
		},
		methods: {
			inviteType(){
				this.inviteCur = e.currentTarget.dataset.id;
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	.main-title {
		padding: 30rpx 30rpx;
		font-size: 34rpx;
		color: #1C1C1C;
	}
	
	.tip {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #A5A3A2;
	}
	
	.rmb {
		font-size: 26rpx;
		color: #E3BE83;
	}
	
	.bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 400rpx;
		z-index: -2;
		
		&-img {
			width: 100%;
			height: 100%;
		}
	}
	
	.hover {
		opacity: 0.7;
	}
	
	.nav {
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 44px;
		padding: 0 30rpx;
		background-image: url('~@/static/images/nav-bg.png');
		background-size: 100%;
		z-index: 99;
		
		&-back {
			width: 20rpx;
			height: 40rpx;
		}
		
		&-title {
			color: #FFFFFF;
			font-size: 42rpx;
		}
		
		&-space {
			width: 70rpx;
			height: 40rpx;
		}
	}
	
	.info {
		position: relative;
		padding: 0 15rpx;
		width: 730rpx;
		height: 360rpx;
		
		&-bg {
			position: absolute;
			width: 730rpx;
			height: 360rpx;
			z-index: -1;
		}
		
		&-content {
			padding: 70rpx 50rpx 0 50rpx;
			margin-bottom: 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		
		&-avatar {
			margin-right: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 85rpx;
			height: 85rpx;
			background-color: #fff;
			padding: 1rpx;
			border-radius: 50%;
			
			&-pic {
				width: 83rpx;
				height: 83rpx;
			}
		}
		
		&-name {
			display: flex;
			flex-direction: column;
			color: #FFFFFF;
			font-size: 35rpx;
		}
		
		&-level {
			margin-top: 15rpx;
			font-size: 24rpx;
		}
		
		&-asset {
			padding: 0 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			
			&-item {
				display: flex;
				flex-direction: column;
			}
		}
	}
	
	.iai {
		&-title {
			margin-bottom: 20rpx;
			margin-right: 100rpx;
			font-size: 24rpx;
			color: #CFB386;
		}
		
		&-value {
			font-size: 35rpx;
			color: #FFFFFF;
		}
	}
	
	.recharge {
		position: relative;
		margin-bottom: 35rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		
		&-tag {
			position: absolute;
			top: -2rpx;
			left: -2rpx;
			width: 170rpx;
			height: 36rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			background-image: url('~@/static/images/tag.png');
			background-size: 100%;
			
			&-text {
				font-size: 20rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
		
		&-item {
			position: relative;
			padding: 40rpx 0;
			margin-left: 15rpx;
			width: 200rpx;
			height: 230rpx;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			border: solid 2rpx #F2F2F3;
			border-radius: 12rpx;
			
			&-active {
				border-color: #EDD2A9;
				background-color: #FBF1E5;
			}
			
			&-duration {
				margin-bottom: 30rpx;
				font-size: 26rpx;
				color: #1C1C1C;
			}
			
			&-price {
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: baseline;
				
				&-text {
					font-size: 48rpx;
					color: #E3BE83;
				}
			}
			
			&-des {
				font-size: 22rpx;
				color: #A5A3A2;
			}
		}
	}
	
	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 85rpx;
		border-radius: 50rpx;
		background-image: linear-gradient(#EFCF9E, #E4BF85);
		
		&-text {
			font-size: 30rpx;
			color: #1C1C1C;
		}
	}
	
	.update {
		margin: 35rpx 30rpx 20rpx 30rpx;
	}
	
	.privilege {
		padding: 0 30rpx;
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
		
		&-item {
			margin: 0 23rpx;
			margin-bottom: 25rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			&-pic {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 20rpx;
			}
			
			&-text {
				font-size: 24rpx;
				color: #383738;
			}
		}
	}
	
	.level {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 466rpx;
		background-image: url('~@/static/images/vip-bg.png');
		background-size: 100%;
		
		&-rate {
			position: absolute;
			top: 43rpx;
			left: 33rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			
			&-text1 {
				margin-right: 20rpx;
				color: #1C1C1C;
				font-size: 34rpx;
			}
			
			&-text2 {
				font-size: 34rpx;
				color: #C07C07;
			}
		}
		
		&-info {
			// position: absolute;
			// top: 188rpx;
			// left: 350rpx;
			margin-top: 70rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			&-icon {
				margin-bottom: 20rpx;
				width: 48rpx;
				height: 38rpx;
			}
			
			&-text {
				margin-bottom: 20rpx;
				font-size: 26rpx;
				color: #292929;
			}
			
			&-integral {
				font-size: 40rpx;
				color: #C07C07;
			}
		}
		
		&-distance {
			position: absolute;
			left: 30rpx;
			right: 30rpx;
			bottom: 35rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			
			&-text {
				font-size: 26rpx;
				color: #292929;
			}
			
			&-button {
				padding: 0 30rpx;
				height: 60rpx;
			}
		}
	}
</style>
