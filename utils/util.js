import $H from '@/service/http.js';
export default {
	// 监听网络
	onNetWork(){
		let func = (res)=>{
			if (res.networkType === 'none') {
				uni.showToast({
					title: '当前处于断网状态,请先连接',
					icon: 'none'
				});
			}
		}
		uni.getNetworkType({
		    success:func
		});
		uni.onNetworkStatusChange(func);
	},
	// 数组置顶
	__toFirst(arr,index){
		if (index != 0) {
			arr.unshift(arr.splice(index,1)[0]);
		}
		return arr;
	},
	/**
	 * @see http://www.likecs.com/default/index/show?id=106461
	 * @param {Object} tmplIds
	 * @param {Object} resolve
	 * @param {Object} reject
	 */
	requestSubscribe(tmplIds) {
		uni.getSetting({
		    withSubscriptions: true,
		    success: async res => {
				let {
					authSetting = {},
					subscriptionsSetting: { mainSwitch = false, itemSettings = {} } = {}
				} = res;
				if (mainSwitch == false) {
					uni.showModal({
						title: "温馨提示",
						content: "检测到您没有开启全部订阅消息的权限，是否去设置？",
						success: res => {
							if (res.confirm) {
								uni.openSetting({
									success: res => {
										// console.log(res);
									}
								});
							}
						}
					});
				} else {
					uni.requestSubscribeMessage({
						tmplIds: tmplIds,
						success: res => {
							// console.log(res, "订阅，成功");
						}
					})
				}
		    }
		});
	}
}