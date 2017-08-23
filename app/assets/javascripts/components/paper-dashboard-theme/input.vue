<template>
  <div class="form-group">
      <label>{{ label }}</label>
      <slot name="pre-addon"></slot>
      <input
        :value="value"
        :type="type"
        :disabled="disabled"
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

      disabled: {
        type: Boolean,
        default: false,
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
