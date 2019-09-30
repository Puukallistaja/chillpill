<template lang="pug">
  .timer
    display.timer__display(
      :millis="millis"
      :timerIs="timerState"
    )
    slider.timer__slider(
      :minutes="minutes"
      @set-countdown-time="setCountdownTime"
    )
    buttons(
      :timerIs="timerState"
      @set-counter-to="changeTimerState"
    )
</template>

<script>
import Buttons from "./TimerButtons"
import Display from "./TimerDisplay"
import Slider from "./TimerSlider"

const chime = new Audio("statics/chime.wav")
const INITAL_MILLIS = 1000 * 60 * 12

export default {
	name: "Timer",
	components: {
		Buttons,
		Display,
		Slider,
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
			return Math.ceil(this.millis / 1000)
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
				this.changeTimerState("IDLE")
				chime.play()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.timer {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: calc(100vh - 50px);
	width: 100%;

	&__display {
		margin-top: 0rem;
	}
	&__slider {
		width: 80%;
		max-width: 48rem;
	}
}
</style>
