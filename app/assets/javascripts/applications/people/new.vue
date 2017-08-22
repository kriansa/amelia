<template>
  <person-form :person="person"></person-form>
</template>

<script>
  import PersonForm from './form.vue';

  export default {
    data() {
      return {
        person: {

        },
      };
    },
    components: {
      PersonForm,
    },
  };
</script>

<style>
</style>
