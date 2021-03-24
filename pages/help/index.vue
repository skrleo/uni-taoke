<template>
	<view>
		<view class="course">
			<view class="fold-list margin" v-for="(item,index) in help_lists" :key="index">
				<view class="fold-title padding flex justify-between solid-bottom" @click="changeContent(index)">
					<view class="text-black text-bold">
						{{item.title}}
					</view>
					<view class="text-black">
						<text :class="item.is_show ?'cuIcon-unfold':'cuIcon-right'"></text>
					</view>
				</view>
				<view class="fold-content padding" v-show="item.is_show" v-for="(itemMsg,indexMsg) in item.children" :key="indexMsg">
					{{itemMsg.description}}
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				help_lists: []
			}
		},
		onLoad(options) {
			this.base_init(options);
		},
		methods: {
			base_init() {
				this.$Http.get('/help/lists').then(res => {
					if(res.statusCode == 200){
						this.help_lists = res.data;
					}
				})
			},
			changeContent(index) {
				this.help_lists[index].is_show = !this.help_lists[index].is_show;
			}
		}
	}
</script>