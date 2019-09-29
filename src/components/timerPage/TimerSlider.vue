<template lang="pug">
  q-slider(
    label
    :value="minutes"
    :min="1"
    :max="60"
    @change="$emit('set-countdown-time', $event * 60 * 1000)"
  )
</template>

<script>
export default {
	name: "TimerSlider",
	props: {
		minutes: {
			type: Number,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped></style>
