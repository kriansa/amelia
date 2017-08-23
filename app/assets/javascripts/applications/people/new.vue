<template>
  <person-form :person="person"></person-form>
</template>

<script>
  import PersonForm from './form.vue';

  export default {
    data() {
      return {
        person: {
          picture: 'https://pbs.twimg.com/profile_images/831993825635745796/HnVmB0-k.jpg',
          address: {},
          phone1: '(11) 83321-8181',
          responsible1: 'Residencial - José Pedro (Pai)',
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
