<template>
  <div class="checkbox">
    <input :id="id" type="checkbox" v-model="checked">
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    initialValue: {
      default: false
    }
  },
  data() {
    return {
      checked: this.initialValue
    };
  }
};
</script>

<style lang="scss">
.checkbox {
  display: inline-block;
  line-height: 1;

  input {
    width: 1rem;
    height: 1rem;
    margin: 0;
    vertical-align: top;

    label {
      padding: 0 2rem 0 0.4rem;
    }
  }
}
</style>
