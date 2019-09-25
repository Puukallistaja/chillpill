<template lang="pug">
  #q-app(class="app full-height	column items-center justify-around q-pa-xl")
    .time-left {{ minutes }} mins
    q-slider(
      v-model="minutes"
      label
      :min="0"
      :max="60"
    )
    q-btn(
      class="onoff-button"
      size="lg"
      rounded
      :color="countingDown ? 'deep-orange' : 'green'"
      :label="countingDown ? 'Stop' : 'Start'"
    )
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      minutes: 12,
      countingDown: false,
    }
  },
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