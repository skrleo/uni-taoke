<template>
	<view>
		<view v-if="loading" class="skeleton" :class="{ animate: animate }">
			<text class="text-center align-center" style="height: 100%;">加载中...</text>
		</view>
		<view v-else>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	const DEFAULT_ROW_WIDTH = '100%'
	const DEFAULT_LAST_ROW_WIDTH = '60%'

	export default {
		props: {
			loading: {
				type: Boolean,
				default: true,
			},
			animate: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {}
		},
		computed: {
			rowList() {
				let list = []
				for (let i = 0; i < this.row; i++) {
					list.push({
						width: i === this.row - 1 && i !== 0 ? DEFAULT_LAST_ROW_WIDTH : DEFAULT_ROW_WIDTH,
					})
				}
				return list
			},
		},
	}
</script>

<style scoped>
	.skeleton {
		display: flex;
		padding: 16px;
		--bg-color: #f2f3f5;
		--row-height: 16px;
		--row-margin-top: 16px;
	}

	.bg-skeleton {
		flex-shrink: 0;
		background: var(--bg-color);
	}
	

	.skeleton.animate {
		animation: skeleton-blink 1.8s ease-in-out infinite;
	}

	@keyframes skeleton-blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.6;
		}

		100% {
			opacity: 1;
		}
	}
</style>
