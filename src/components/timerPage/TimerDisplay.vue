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
	},
	computed: {
		humanReadableTime() {
			return formatDate(this.millis, "mm:ss")
		},
	},
}
</script>

<style lang="scss" scoped></style>
