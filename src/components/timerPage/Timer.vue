<template lang="pug">
  .timer
    timer-display(
      :millis="millis"
    )
    timer-slider(
      :minutes="minutes"
      @set-countdown-time="setCountdownTime"
    )
    timer-buttons(
      :timerIs="timerState"
      @set-counter-to="changeTimerState"
    )
</template>

<script>
import TimerButtons from "./TimerButtons"
import TimerDisplay from "./TimerDisplay"
import TimerSlider from "./TimerSlider"

const audio = new Audio("statics/chime.wav")

const INITAL_MILLIS = 1000 * 60 * 12

export default {
	name: "Timer",
	components: {
		TimerButtons,
		TimerDisplay,
		TimerSlider,
	},
	data() {
		return {
			timerState: {
				IDLE: true,
				COUNTING: false,
				PAUSED: false,
			},
			millis: INITAL_MILLIS,
			timer: null,
		}
	},
	computed: {
		seconds() {
			return this.millis / 1000
		},
		minutes() {
			return Math.ceil(this.millis / 1000 / 60)
		},
	},
	methods: {
		changeTimerState(newState) {
			Object.keys(this.timerState).forEach(
				state => (this.timerState[state] = false)
			)
			this.timerState[newState] = true

			switch (newState) {
				case "COUNTING":
					this.startCountdown()
					break
				case "PAUSED":
					this.stopCountdown()
					break
				case "IDLE":
					this.stopCountdown()
					this.millis = INITAL_MILLIS
					break
			}
		},
		startCountdown() {
			this.timer = setInterval(() => {
				this.millis -= 1000
			}, 1000)
		},
		stopCountdown() {
			clearInterval(this.timer)
			this.timer = null
		},
		setCountdownTime(ms) {
			this.millis = ms
		},
	},
	watch: {
		millis(currentMillis) {
      if (currentMillis <= 0) {
				this.changeTimerState('IDLE')
        audio.play()
      }
    },
	}
}
</script>

<style lang="scss" scoped></style>
