<template lang="pug">
  #q-app(
    class="chillpill full-height	column items-center justify-around q-pa-xl"
  )
    .time-set 
      span(v-if="countingDown") {{ formattedMillis }}
      span(v-else) {{ minutes }} mins
    q-slider(
      class="chillpill__slider"
      v-model="millis"
      label
      :label-value="minutes"
      :min="1 * 60 * 1000"
      :max="60 * 60 * 1000"
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
import { date } from "quasar"
export default {
  name: "App",
  data() {
    return {
      timer: null,
      millis: 1000 * 60 * 12,
      countingDown: false,
    }
  },
  computed: {
    minutes() {
      return Math.ceil(this.millis / 1000 / 60)
    },
    seconds() {
      return Math.ceil(this.millis / 1000)
    },
    formattedMillis() {
      return date.formatDate(this.millis, "mm:ss")
    },
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
    },
    changeRemainingMillis(thisMuch) {
      this.millis += thisMuch

      if (this.minutes >= 60) {
        this.millis = 1000 * 60 * 60
      }
      if (this.minutes <= 0) {
        this.millis = 0
      }
    },
  },
  watch: {
    countingDown(newState) {
      if (newState === true) {
        this.timer = setInterval(() => {
          this.millis -= 1000 //* 60
        }, 1000)
      } else {
        this.clearTimer()
      }
    },
    millis(min) {
      if (this.timer && min <= 0) {
        this.millis = 0
        this.countingDown = false
        this.clearTimer()

        const audio = new Audio("statics/chime.wav")
        audio.play()
      }
    },
  },
  created() {
    window.addEventListener("keydown", event => {
      const keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
      }
      if(event.keyCode === keys.LEFT || event.keyCode === keys.DOWN) {
          this.changeRemainingMillis(-1000 * 60)
      }
      if(event.keyCode === keys.RIGHT || event.keyCode === keys.UP) {
        this.changeRemainingMillis(1000 * 60)
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.chillpill {
  .time-set {
    font-weight: 100;
    font-size: 3rem;
  }
  &__slider {
    max-width: 25rem;
  }
  .onoff-button {
    width: 6rem;
  }
}
</style>