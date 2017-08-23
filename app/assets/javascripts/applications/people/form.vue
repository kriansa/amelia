<template>
  <div class="card">
    <div class="header">
      <h3 class="title">Fulano Pedro</h3>
    </div>
    <div class="content">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab"><i class="ti-id-badge"></i> <span class="hidden-xs">Dados</span></a></li>
        <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab"><i class="ti-home"></i> <span class="hidden-xs">Família</span></a></li>
        <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab"><i class="ti-help"></i> <span class="hidden-xs">Questionário</span></a></li>
        <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab"><i class="ti-support"></i> <span class="hidden-xs">Saúde</span></a></li>
        <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab"><i class="ti-notepad"></i> <span class="hidden-xs">Anotações</span></a></li>
      </ul>

      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="family">
          <div class="row">
            <div class="col-md-12">
              <generic-input label="Nome" v-model="person.parentesc_name"></generic-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3">
              <generic-input label="Data de nascimento" v-model="person.birth_date"></generic-input>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <label>Escolaridade</label>
                <select class="form-control border-input" v-model="person.assistance_priority">
                  <option>Selecione</option>
                  <option value="0">Analfabeto</option>
                </select>
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <label>Naturalidade</label>
                <select class="form-control border-input" v-model="person.assistance_priority">
                  <option>Selecione</option>
                  <option value="0">São Paulo</option>
                </select>
              </div>
            </div>

            <div class="col-md-2">
              <div class="form-group">
                <label>UF</label>
                <select class="form-control border-input" v-model="person.assistance_priority">
                  <option>Selecione</option>
                  <option value="0">SP</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane" id="home" style="display: none">
          <form
            :method="formMethod"
            :action="formAction">
            <div class="row">
              <div class="col-md-2">
                <img :src="person.picture":alt="person.name" class="avatar border-white">
                <input type="file" />
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
                    <div class="form-group">
                      <label>Grau de prioridade</label>
                      <select class="form-control border-input" v-model="person.assistance_priority">
                        <option>Selecione</option>
                        <option value="0">Emergência</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <generic-input label="Data de nascimento" v-model="person.birth_date"></generic-input>
                  </div>
                  <div class="col-md-4">
                    <generic-input label="Data de matrícula" v-model="person.place_of_birth_state"></generic-input>
                  </div>
                  <div class="col-md-4">
                    <generic-input label="Naturalidade" v-model="person.place_of_birth_city"></generic-input>
                  </div>
                </div>
              </div>
            </div>

            <h3 class="title">Status</h3>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label>Muito bonito</label>
                  <select class="form-control border-input" v-model="person.enrollment_status">
                    <option>Selecione</option>
                    <option value="1">Matriculado</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <generic-input label="Data de matrícula" v-model="person.enrollment_date"></generic-input>
              </div>
              <div class="col-md-4">
                <generic-input label="Data de cadastro" v-model="person.created_at"></generic-input>
              </div>
            </div>

            <h3 class="title">Endereço</h3>
            <div class="row">
              <div class="col-md-4">
                <generic-input label="CEP" v-model="person.address.zip_code"></generic-input>
              </div>
              <div class="col-md-4">
                <generic-input label="Logradouro" v-model="person.address.address"></generic-input>
              </div>
              <div class="col-md-4">
                <generic-input label="Número" v-model="person.address.number"></generic-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-2">
                <div class="form-group">
                  <label>UF</label>
                  <select class="form-control border-input" v-model="person.address.state">
                    <option>Selecione</option>
                    <option value="1">SP</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Cidade</label>
                  <select class="form-control border-input" v-model="person.address.city">
                    <option>Selecione</option>
                    <option value="1">São Paulo</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <generic-input label="Ponto de referência" v-model="person.address.reference_point"></generic-input>
              </div>
            </div>

            <h3 class="title">Contato</h3>
            <div class="row">
              <div class="col-md-12">
                <div class="content table-responsive table-full-width">
                  <table class="table table-striped">
                    <thead>
                      <th>Telefone</th>
                      <th>Nome</th>
                      <th>Parentesco</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>(11) 3321-8181</td>
                        <td>José Pedro</td>
                        <td>Pai</td>
                      </tr>
                      <tr>
                        <td>(11) 3321-8181</td>
                        <td>José Pedro</td>
                        <td>Pai</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Escola</label>
                  <select class="form-control border-input" v-model="person.address.state">
                    <option>Selecione</option>
                    <option value="1">Escola Rural</option>
                  </select>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <label>Série</label>
                  <select class="form-control border-input" v-model="person.address.city">
                    <option>Selecione</option>
                    <option value="1">1º do Ensino Fundamental</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Turno</label>
                  <select class="form-control border-input" v-model="person.address.city">
                    <option>Selecione</option>
                    <option value="1">Matutino</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <button class="btn btn-primary pull-right">Salvar e Continuar <i class="ti-arrow-right"></i></button>
        <div class="clearfix"></div>
      </div>
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
