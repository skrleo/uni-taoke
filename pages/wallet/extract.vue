<template>
	<page>
		<form>
			<view class="cu-form-group">
				<view class="title">提现至</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'微信钱包'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">提现金额：￥</view>
				<input placeholder="0" name="input" type="number" class="text-xxl text-red" v-model="extract_amount"></input>
			</view>
			<view class="padding">可提现余额<text class="text-red">￥{{wallet.balance_fee || 0.00}}</text>，<text class="text-blue" @tap="extractTap">全部提现</text></view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-black margin-tb-sm lg" @click="submitTap">24小时到账，确认提现</button>
			</view>
		</form>
	</page>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				extract_amount:0,
				index: -1,
				wallet:[],
				picker: ['微信钱包']
			};
		},
		computed: {
			...mapState({
				loginStatus:state=>state.loginStatus,
				user:state=>state.user,
			})
		},
		onShow() {
			if (!this.loginStatus) {
				uni.navigateTo({
					url: '../login/index'
				});
			}
		},
		onLoad(e) {
			this.base_init();
		},
		methods: {
			base_init() {
				this.$Http.get('/wallet/detail').then(res => {
					if(res.statusCode !== 200){
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						return false;
					}
					this.wallet = res.data;
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			extractTap() {
				this.extract_amount = this.wallet.balance_fee;
			},
			submitTap() {
				if(parseFloat(this.extract_amount) > parseFloat(this.wallet.balance_fee)){
					uni.showToast({
						title: '提现金额不能大于可提现金额',
						icon: 'none'
					});
					return false;
				}
				var data = {
					extract_amount: this.extract_amount
				}
				this.$Http.get('/wallet/extract',data).then(res => {
					if(res.statusCode == 200){
						uni.showToast({
							title: '提交申请成功，请留意您的账号余额',
							icon: 'none'
						});
						uni.navigateBack({
							delta: 1
						}); 
					}else{
						uni.showToast({
							title: '提交申请失败，请联系客服',
							icon: 'none'
						});
					}
				})
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
