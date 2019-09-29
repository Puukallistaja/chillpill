<template lang="pug">
  .timer
    | {{ millis }}
    timer-controls(
      :timerIs="timerState"
      @set-counter-to="setTimerStateTo"
    )
</template>

<script>
import TimerControls from "./TimerControls"
const INITAL_MILLIS = 1000 * 60 * 12

export default {
  name: "Timer",
  components: {
    TimerControls,
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
      return this.millis / 1000 / 60
    },
  },
  methods: {
    setTimerStateTo(newState) {
      console.log(newState)
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
  },
}
</script>

<style lang="scss" scoped>
.timer {
}
</style>
