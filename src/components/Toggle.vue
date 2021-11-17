<template>
  <label :for="`${this.for}`" class="toggle-wrapper">
    <input
      @input="$emit('input', $event.target.value)"
      :name="name"
      :id="id"
      type="checkbox"
      :checked="value"
    />
    <div class="toggle material-icons"></div>
    <span style="color: inherit" class="inline-block text- ml-3"> {{ label }} </span>
  </label>
</template>
<script>
export default {
  name: 'toggle',
  props: {
    id: {
      type: String,
      default: 'toggle',
    },
    for: {
      type: String,
      default: 'toggle',
    },
    name: {
      type: String,
      default: 'toggle',
    },
    label: {
      type: String,
      default: 'Toggle',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
