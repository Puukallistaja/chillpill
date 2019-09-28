<template lang="pug">
  .timer-controls(
    class=""
    :class="{'--counting': timerIs.COUNTING}"
  ) 
    //- | {{ Object.keys(timerIs).filter(status => timerIs[status]) }}
    q-btn(
      class="control reset"
      :class="{split: timerIs.COUNTING || timerIs.PAUSED}"
      size="lg"
      rounded
      outline
      color="grey"
      label="Reset"
      @click="$emit('set-counter-to', 'IDLE')"
    )
    q-btn(
      class="control onoff"
      :class="{split: timerIs.COUNTING || timerIs.PAUSED}"
      size="lg"
      rounded
      :color="timerIs.COUNTING ? 'orange' : 'green'"
      :label="onoffLabel"
      @click="$emit('set-counter-to', newTimerState)"
    )
</template>

<script>
export default {
  name: "TimerControls",
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
.timer-controls {
  display: grid;
  justify-content: center;
  min-width: 24.250rem;

  .control {
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
