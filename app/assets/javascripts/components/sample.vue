<template>
  <h1>I'm a component with the message: {{ message }}</h1>
</template>

<style scoped lang="scss">
  h1 { // stylelint-disable-line selector-no-type
    font-size: 16px;
    color: #318b22;
  }
</style>

<script>
  export default {
    data() {
      return {
        message: 'Component message',
      };
    },
  };
</script>
