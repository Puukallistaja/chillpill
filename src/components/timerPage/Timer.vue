<template lang="pug">
  .timer
    timer-controls(
      :timerIs="timerState"
      @set-counter-to="setCounterTo"
    )
</template>

<script>
import TimerControls from "./TimerControls"
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
    }
  },
  methods: {
    setCounterTo(STATUS) {
      Object.keys(this.timerState).forEach(
        status => (this.timerState[status] = false)
      )
      this.timerState[STATUS] = true
    },
  },
}
</script>

<style lang="scss" scoped>
.timer {
}
</style>
