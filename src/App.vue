<template lang="pug">
  #q-app
    router-view
</template>

<script>
import { date } from "quasar"
const { formatDate } = date

export default {
  name: "App",
}
</script>

<style lang="scss" scoped></style>
