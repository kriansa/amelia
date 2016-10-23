<template>
  <div>
    <h1>I'm a app: {{ message }}</h1>
    <Sample></Sample>
  </div>
</template>

<style scoped lang="scss">
  h1, h2, h3 {
    font-size: 16px;
    color: blue;
  }
</style>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Sample from '../../components/sample.vue';

  export default {
    data() {
      return {
        message: 'Hello World!',
      };
    },
    components: { Sample },
  };
</script>
