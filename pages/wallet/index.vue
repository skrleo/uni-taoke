<template>
	<page>
		<!--提示-->
		<view class="bg-orange text-sm text-center padding-tb-xs text-white"><text class="cuIcon-infofill margin-right-xs"></text>每月21日系统结算上月的收入，建议22日提现</view>
		
		<view class="cu-card case">
			<view class="cu-item shadow">
				<view class="cu-list padding bg-black" style="height: 195px;">
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view class="content flex-sub">
								<view class="text-gray text-sm flex justify-between">
									<text>待提现余额(元)</text>
									<text>提现记录<text class="cuIcon-right"></text></text>
								</view>
							</view>
							<view class="text-gray text-sm" style="height: 48px;display: table-cell;vertical-align:middle">
								<view class="text-orange line-height grid">
									<view>
										<text class="text-xxl margin-right">{{ wallet.balance_fee || 0.00 }}</text>
									</view>
									<button class="cu-btn bg-orange shadow sm">提现</button>
								</view>
							</view>
							<view class="text-orange text-sm">
								<text>待提现金额满100元即可提现</text>
							</view>
						</view>
						<view class="content padding-tb-sm">
							<view class="content flex-sub">
								<view class="text-gray text-sm flex justify-between">
									<text>已经结算金额(元) <text class="cuIcon-question"></text></text>
									<text>结算明细<text class="cuIcon-right"></text></text>
								</view>
							</view>
							<view class="text-gray text-sm" style="height: 38px;display: table-cell;vertical-align:middle">
								<view class="text-orange line-height">
								<text class="text-xl margin-right">{{ wallet.wallet_outcome || 0.00 }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">收益概览(推广收益，不含今日)</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm grid">
					<view style="display: block;width: 50%;">
						<view>本月预估收益(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-top-sm">
							<text class="text-xl text-black">{{ wallet.last_month_income || 0.00 }}</text>
						</view>
					</view>
					<view style="display: block;width: 50%;">
						<view>上月预估收益(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-top-sm">
							<text class="text-xl text-black">{{ wallet.current_month_income || 0.00 }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border margin-bottom-xs">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">推广效果(近7天、30天含今日)</text>
				</view>
				
				<view class="action">
					<text class="text-grey text-sm" @tap="orderTap">订单详情<text class="cuIcon-right"></text></text>
				</view>
			</view>
			<view class="cu-item grid col-4">
				<view class="margin-tb-sm text-center">
					<button class="cu-btn round lines-red sm">今日</button>
				</view>
				<view class="margin-tb-sm text-center">
					<button class="cu-btn round lines-gray sm">昨日</button>
				</view>
				<view class="margin-tb-sm text-center">
					<button class="cu-btn round lines-gray sm">近7天</button>
				</view>
				<view class="margin-tb-sm text-center">
					<button class="cu-btn round lines-gray sm">近30天</button>
				</view>
			</view>
			<view class="cu-item no-border">
				<view class="content padding-tb-sm grid">
					<view style="display: block;width: 50%;">
						<view>订单笔数(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-top-sm">
							<text class="text-xl text-black">0.00</text>
						</view>
					</view>
					<view style="display: block;width: 50%;">
						<view>订单金额(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-top-sm">
							<text class="text-xl text-black">0.00</text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-item no-border">
				<view class="content padding-tb-sm grid">
					<view style="display: block;width: 50%;">
						<view>成团笔数(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-top-sm">
							<text class="text-xl text-black">0.00</text>
						</view>
					</view>
					<view style="display: block;width: 50%;">
						<view>预估金额(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-top-sm">
							<text class="text-xl text-black">0.00</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</page>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				anmiaton:'',
				wallet:[],
				dotStyle: false,
				towerStart: 0,
				direction: ''
			}
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
					this.wallet = res.data;
				})
			},
			orderTap() {
				uni.navigateTo({
					url: '../order/lists'
				});
			}
		}
	}
</script>

<style>
</style>
