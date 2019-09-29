<template lang="pug">
  .timer-buttons(
    :class="{'--counting': timerIs.COUNTING}"
  ) 
    q-btn(
      class="button reset"
      :class="{'split': timerIs.COUNTING || timerIs.PAUSED}"
      size="lg"
      rounded
      outline
      color="grey"
      label="Reset"
      @click="$emit('set-counter-to', 'IDLE')"
    )
    q-btn(
      class="button onoff"
      :class="{'split': timerIs.COUNTING || timerIs.PAUSED}"
      size="lg"
      rounded
      :color="timerIs.COUNTING ? 'orange' : 'green'"
      :label="onoffLabel"
      @click="$emit('set-counter-to', newTimerState)"
    )
</template>

<script>
export default {
	name: "TimerButtons",
	props: {
		timerIs: {
			type: Object,
			required: true,
		},
	},
	computed: {
		newTimerState() {
			return this.timerIs.COUNTING ? "PAUSED" : "COUNTING"
		},
		onoffLabel() {
			return this.timerIs.COUNTING
				? "Pause"
				: this.timerIs.PAUSED
				? "Continue"
				: "Start"
		},
	},
}
</script>

<style lang="scss" scoped>
.timer-buttons {
	display: grid;
	justify-content: center;
	min-width: 24.25rem;

	.button {
		width: 8.125rem;
		grid-column: 1;
		grid-row: 1;

		&.onoff {
			&.split {
				transform: translateX(8rem);
			}
		}
		&.reset {
			&.split {
				transform: translateX(-8rem);
			}
		}
	}
}
</style>
