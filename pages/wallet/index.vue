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
									<text @click="recordTap(1)">提现记录<text class="cuIcon-right"></text></text>
								</view>
							</view>
							<view class="text-gray text-sm" style="height: 48px;display: table-cell;vertical-align:middle">
								<view class="text-orange line-height grid">
									<view>
										<text class="text-xxl margin-right">{{ this.$Tool.toMoney(wallet.balance_fee) || 0.00 }}</text>
									</view>
									<button class="cu-btn bg-orange shadow sm" @tap="extractTap">提现</button>
								</view>
							</view>
							<view class="text-orange text-sm">
								<text>待提现金额满10元即可提现</text>
							</view>
						</view>
						<view class="content padding-tb-sm">
							<view class="content flex-sub">
								<view class="text-gray text-sm flex justify-between">
									<text>已经结算金额(元) <text class="cuIcon-question"></text></text>
									<text @click="recordTap(2)">结算明细<text class="cuIcon-right"></text></text>
								</view>
							</view>
							<view class="text-gray text-sm" style="height: 38px;display: table-cell;vertical-align:middle">
								<view class="text-orange line-height">
								<text class="text-xl margin-right">{{ this.$Tool.toMoney(wallet.wallet_outcome) || 0.00 }}</text>
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
					<text class="text-grey"><text class="text-black">收益概览</text>(推广收益，不含今日)</text>
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
					<text class="text-black">推广渠道</text>
				</view>
				
				<view class="action">
					<text class="text-grey text-sm" @tap="orderTap">订单详情<text class="cuIcon-right"></text></text>
				</view>
			</view>
			<view class="cu-item grid col-1">
				
				<scroll-view scroll-x class="bg-white nav text-center">
					<view class="cu-item" :class="0==platformCur?'text-red':''" @tap="platformType" data-id="0">
						<text class="cuIcon-camerafill"></text> 拼多多
					</view>
					<view class="cu-item" :class="1==platformCur?'text-red':''" @tap="platformType" data-id="1">
						<text class="cuIcon-upstagefill"></text> 京东
					</view>
					<view class="cu-item" :class="2==platformCur?'text-red':''" @tap="platformType" data-id="2">
						<text class="cuIcon-clothesfill"></text> 唯品会
					</view>
				</scroll-view>
				
				<view class="grid col-2 bg-gray padding radius margin-bottom-sm">
					<view style="display: block;width: 50%;text-align: center;">
						<view>订单笔数(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-tb-sm">
							<text class="text-xl text-black">{{ analysis.order_number || 0 }}</text>
						</view>
					</view>
					<view style="display: block;width: 50%;text-align: center;">
						<view>订单金额(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-tb-sm">
							<text class="text-xl text-black">{{ analysis.order_amount || 0.00 }}</text>
						</view>
					</view>
					<view style="display: block;width: 50%;text-align: center;">
						<view>成团笔数(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-top-sm">
							<text class="text-xl text-black">{{ analysis.order_over || 0.00 }}</text>
						</view>
					</view>
					<view style="display: block;width: 50%;text-align: center;">
						<view>预估金额(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-top-sm">
							<text class="text-xl text-black">{{ analysis.promotion_amount || 0.00 }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border margin-bottom-xs">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey"><text class="text-black">推广效果</text>(近7天、30天含今日)</text>
				</view>
				
				<view class="action">
					<text class="text-grey text-sm" @tap="orderTap">订单详情<text class="cuIcon-right"></text></text>
				</view>
			</view>
			<view class="cu-item grid col-1">
				<view class="grid col-4">
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm" :class="0==dateRangeCur?'lines-red':'lines-gray'" @tap="dateRangeType" data-id="0">今日</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm" :class="1==dateRangeCur?'lines-red':'lines-gray'" @tap="dateRangeType" data-id="1">昨日</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm" :class="2==dateRangeCur?'lines-red':'lines-gray'" @tap="dateRangeType" data-id="2">近7天</button>
					</view>
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round sm" :class="3==dateRangeCur?'lines-red':'lines-gray'" @tap="dateRangeType" data-id="3">近30天</button>
					</view>
				</view>
				
				<view class="grid col-2 bg-gray padding radius margin-bottom-sm">
					<view style="display: block;width: 50%;text-align: center;">
						<view>订单笔数(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-tb-sm">
							<text class="text-xl text-black">{{ analysis.order_number || 0.00 }}</text>
						</view>
					</view>
					<view style="display: block;width: 50%;text-align: center;">
						<view>订单金额(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-tb-sm">
							<text class="text-xl text-black">{{ analysis.order_amount || 0.00 }}</text>
						</view>
					</view>
					<view style="display: block;width: 50%;text-align: center;">
						<view>成团笔数(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-top-sm">
							<text class="text-xl text-black">{{ analysis.order_over || 0.00 }}</text>
						</view>
					</view>
					<view style="display: block;width: 50%;text-align: center;">
						<view>预估金额(元)<text class="cuIcon-question"></text></view>
						<view class="text-sm margin-top-sm">
							<text class="text-xl text-black">{{ analysis.promotion_amount || 0.00 }}</text>
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
				platformCur: 0,
				dateRangeCur: 0,
				scrollLeft: 0,
				anmiaton:'',
				wallet:[],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				analysis:[]
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
			this.wallet = [];
			this.base_init();
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
				});
				this.getOrderAnalysis();
			},
			recordTap(type) {
				uni.navigateTo({
					url: '/pages/wallet/record?type=' + type
				});
			},
			orderTap() {
				uni.navigateTo({
					url: '../order/lists'
				});
			},
			extractTap() {
				uni.navigateTo({
					url: '/pages/wallet/extract'
				});
			},
			platformType(e) {
				this.platformCur = e.currentTarget.dataset.id;
				this.getOrderAnalysis();
				
			},
			dateRangeType(e) {
				this.dateRangeCur = e.currentTarget.dataset.id;
				this.getOrderAnalysis();
			},
			getOrderAnalysis() {
				var params = {
					platform_type: this.platformCur,
					date_range_type: this.dateRangeType,
				}
				this.$Http.get('/order/analysis',params).then(res => {
					if(res.statusCode !== 200){
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						return false;
					}
					this.analysis = res.data;
				})
			}
		}
	}
</script>

<style>
</style>
