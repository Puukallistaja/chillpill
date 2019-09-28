<template lang="pug">
  .timer-controls(
    class=""
    :class="{'--counting': timerIs.COUNTING}"
  ) {{ Object.keys(timerIs).filter(status => timerIs[status]) }}
    q-btn(
      class="control reset"
      size="lg"
      rounded
      outline
      color="grey"
      label="Reset"
      v-if="!timerIs.IDLE"
      @click="$emit('set-counter-to', 'IDLE')"
    )
    q-btn(
      class="control onoff"
      size="lg"
      rounded
      :color="timerIs.COUNTING ? 'orange' : 'green'"
      :label="onoffLabel"
      @click="$emit('set-counter-to', timerIs.COUNTING ? 'PAUSED' : 'COUNTING')"
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
  border: 2px solid blue;
  .control {
    width: 8.125rem;
  }
}
</style>
