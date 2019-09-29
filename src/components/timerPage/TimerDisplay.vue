<template lang="pug">
	.display {{ humanReadableTime }}
</template>

<script>
import { date } from "quasar"

const { formatDate } = date

export default {
	name: "TimerDisplay",
	props: {
		millis: {
			type: Number,
			required: true,
		},
		timerIs: {
			type: Object,
			required: true,
		},
	},
	computed: {
		humanReadableTime() {
			return !this.timerIs.IDLE
				? formatDate(this.millis, "mm:ss")
				: `${formatDate(this.millis, "mm")} minutes`
		},
	},
}
</script>

<style lang="scss" scoped>
.display {
	font-size: 3rem;
	font-weight: 300;
	min-width: 12.5rem;
	text-align: center;
}
</style>
