<template>
  <div class="form-group">
      <label>{{ label }}</label>
      <slot name="pre-addon"></slot>
      <input
        :value="value"
        :type="type"
        :placeholder="placeholder"
        class="form-control border-input"
      />
      <slot name="post-addon"></slot>
  </div>
</template>

<script>
  export default {
    name: 'input',
    props: {
      type: {
        type: String,
        default: 'text',
      },

      label: {
        type: String,
      },

      placeholder: {
        type: String,
      },

      value: {
        type: String,
        required: true,
      },
    },
  };
</script>
