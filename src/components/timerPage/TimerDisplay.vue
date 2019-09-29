<template lang="pug">
  h2.display {{ humanReadableTime }}
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

<style lang="scss" scoped></style>
