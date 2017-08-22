<template>
  <div class="card">
    <div class="header">
      <h4 class="title">{{ formLabel }}</h4>
    </div>
    <div class="content">
      <form
        :method="formMethod"
        :action="formAction">
        <div class="row">
          <div class="col-md-2">
            <img :src="person.picture" :alt="person.name">
          </div>
          <div class="col-md-10">
            <div class="row">
              <div class="col-md-4">
                <generic-input label="Nome" v-model="person.name"></generic-input>
              </div>
              <div class="col-md-4">
                <generic-input label="Gênero" v-model="person.gender"></generic-input>
              </div>
              <div class="col-md-4">
                <select v-model="person.assistance_priority">
                  <option value="0">Emergência</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <generic-input label="Data de nascimento" v-model="person.birth_date"></generic-input>
          </div>
          <div class="col-md-4">
            <generic-input v-model="person.place_of_birth_state"></generic-input>
          </div>
          <div class="col-md-4">
            <generic-input label="Naturalidade" v-model="person.place_of_birth_city"></generic-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <select v-model="person.enrollment_status">
              <option value="1">Matriculado</option>
            </select>
          </div>
          <div class="col-md-4">
            <generic-input label="Data de matrícula" v-model="person.enrollment_date"></generic-input>
          </div>
          <div class="col-md-4">
            <generic-input label="Data de cadastro" v-model="person.created_at"></generic-input>
          </div>
        </div>

        <!-- <select v-model="person.work_status">
          <option value="0">Desempregado</option>
        </select>
        <select v-model="person.type">
          <option value="0">Desempregado</option>
        </select> -->
      </form>
    </div>
  </div>
</template>

<script>
  import GenericInput from '../../components/paper-dashboard-theme/input.vue';

  export default {
    name: 'form',

    computed: {
      formAction() {
        return this.person.id !== null ? `/people/${this.person.id}` : '/people';
      },

      formMethod() {
        return this.person.id !== null ? 'PATCH' : 'POST';
      },

      formLabel() {
        return 'Inscription';
      },
    },

    components: {
      GenericInput,
    },

    props: {
      person: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style>
</style>
