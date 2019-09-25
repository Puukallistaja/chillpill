<template lang="pug">
  #q-app(class="app full-height	column items-center justify-around q-pa-xl")
    .time-left {{ minutes }} mins
    q-slider(
      v-model="minutes"
      label
      :min="1"
      :max="60"
    )
    q-btn(
      class="onoff-button"
      size="lg"
      rounded
      :color="countingDown ? 'deep-orange' : 'green'"
      :label="countingDown ? 'Stop' : 'Start'"
      @click="toggleCountdown"
    )
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      timer: null,
      minutes: 12,
      countingDown: false,
    }
  },
  methods: {
    toggleCountdown(newState) {
      this.countingDown =
        newState !== undefined && typeof newState === "boolean"
          ? newState
          : !this.countingDown
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  watch: {
    countingDown(newState) {
      if (newState === true) {
        this.timer = setInterval(() => {
          --this.minutes
        }, 1000 * 60)
      } else {
        this.clearTimer()
      }
    },
    minutes(min) {
      if (this.timer && min <= 0) {
        this.minutes = 0
        this.countingDown = false
        this.clearTimer()

        const audio = new Audio('statics/chime.wav')
        audio.play()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  .time-left {
    font-weight: 100;
    font-size: 3rem;
  }
  .onoff-button {
    width: 6rem;
  }
}
</style>