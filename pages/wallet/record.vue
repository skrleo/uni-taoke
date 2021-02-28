<template>
	<view class="bg-white">
		<view class="padding-lr">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<view class="flex solid-bottom padding justify-between" v-for="(item,index) in record_lists" :key="index">
					<view style="display: block;">
						<view class="text-lg text-black">{{record_lists.name}}</view>
						<view class="text-sm" style="padding-top: 3rpx;">
							<text>{{record_lists.created_at}}</text>
						</view>
					</view>
					<view style="display: block;">
						<view :class="type == 1?'text-red':''"><text class="text-xl" v-if="type == 1">-</text>{{record_lists.fee}}元</view>
						<view class="text-sm" style="padding-top: 3rpx;text-align: center;">
							<text>{{record_lists.status_name}}</text>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			MescrollBody
		},
		data() {
			return {
				type: 1,
				record_lists:[]
			}
		},
		onLoad(e) {
			if(e.type !== undefined){
				this.type = e.type;
				var barTitle = '';
				if(this.type == 1){
					barTitle = '提现记录';
				}
				if(this.type == 2){
					barTitle = '结算明细';
				}
				uni.setNavigationBarTitle({
					title: barTitle
				})
				this.base_init(e);
			}
		},
		methods: {
			
			downCallback() {
				this.mescroll.resetUpScroll();
			},
			upCallback(page) {
				this.$Http.get('/extract/record?type=' + this.type).then(res => {
					if(page.num == 1) this.record_lists = [];
					this.record_lists=this.record_lists.concat(res.lists);
					this.mescroll.endSuccess(res.lists.length);
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			}
		}
	}
</script>

<style>

</style>
