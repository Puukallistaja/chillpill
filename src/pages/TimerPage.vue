<template lang="pug">
  q-page(class="flex flex-center")
    timer
</template>

<script>
import Timer from "../components/timerPage/Timer"
export default {
  name: "TimerPage",
  components: {
    Timer,
  },
}
</script>

<style lang="scss" scoped></style>
