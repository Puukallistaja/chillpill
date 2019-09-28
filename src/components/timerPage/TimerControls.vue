<template lang="pug">
  .timer-controls(
    class="flex justify-center"
    :class="{'--counting': timerIs.COUNTING}"
  )
    q-btn(
      class="control onoff"
      size="lg"
      rounded
      :color="timerIs.COUNTING ? 'orange' : 'green'"
      :label="timerIs.COUNTING ? 'Pause' : 'Start'"
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
}
</script>

<style lang="scss" scoped>
.control-buttons {
  border: 1px solid red;
}
</style>
