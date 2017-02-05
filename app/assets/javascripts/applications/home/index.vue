<template>
  <div>
    <h1>I'm a app: {{ message }}</h1>
    <Sample></Sample>
  </div>
</template>

<style scoped lang="scss">
  /* stylelint-disable selector-no-type */
  h1,
  h2,
  h3 {
    font-size: 16px;
    color: #ff586f;
  }
</style>

<script>
  import 'bootstrap/dist/css/bootstrap.css';
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
