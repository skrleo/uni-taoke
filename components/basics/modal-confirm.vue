<template>
	<view class="modal-box" :class="show?'show':''">
		<view class="cu-dialog">
			<view class="pure_top bg-white">
				<view class="pure_top_box">
					<view class="cu-bar justify-end">
						<view class="content text-white">是否要搜索以下内容</view>
					</view>
				</view>
			</view>
			<view class="padding bg-white text-lg text-black">
				{{content}}
			</view>
			<view class="cu-bar bg-white solid-top">
				<view class="action margin-0 flex-sub text-gray" @tap="closeEvent">取消</view>
				<view class="action margin-0 flex-sub solid-left text-black"  @tap="confirmEvent">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'modal-confirm',
		props: {
			content: {
				type: String,
				default: ""
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			confirmEvent() {
				this.$emit('confirmTap');
			},
			closeEvent() {
				this.$emit('closeTap');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pure_top {
	  width: 100%;
	  height: 140upx;
	  position: relative;
	  overflow: hidden;
	}
	.pure_top_box{
		content: '';
		width: 120%;
		height: 138upx;
		position: absolute;
		left: -10%; 
		top: 0;
		overflow: hidden;
		border-radius: 0 0 50% 50%;
		background-color: #2B2E3D;
	}
	.modal-box {
	    position: fixed;
		opacity: 0;
		top: inherit;
		left: inherit;
		right: inherit;
		bottom: inherit;
		z-index: 99999999;
	    text-align: center;
	    background: rgba(0, 0, 0, 0.6);
	    transition: all 0.3s;
		pointer-events: none;
		&::before {
		    content: "\200B";
		    display: inline-block;
		    height: 100%;
		    vertical-align: middle;
		}
		.dialog {
			position: relative;
			display: inline-block;
			vertical-align: middle;
			width: 618.18rpx;
			.img {
				width: 100%;
				border-radius: 3%;
			}
			.close {
			    color: #dadada;
			    top: 18.18rpx;
			    position: relative;
			    font-size: 54.54rpx;	
			}
		}
	}
	.modal-box.show {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 1;
		pointer-events: auto;
	}
</style>
