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
      rounded
      color="green"
      label="Start"
      size="lg"
    )
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      minutes: 12,
      // countingDown: false,
    };
  }
};
</script>

<style lang="scss" scoped>
.app {
  border: 1px solid red;
  .time-left {
    font-weight: 100;
    font-size: 3rem;
  }
}
</style>