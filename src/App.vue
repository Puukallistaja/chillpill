<template lang="pug">
  #q-app
    q-slider(
      v-model="minutes"
    )
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      minutes: 12
    };
  }
};
</script>
