<script>
export default {
  name: "RfSensorTypeSelect",
  props: {
    modelValue: {
      type: Number,
      default: null
    }
  },
  emits: ['update:model-value'],
  data() {
    return {
      value: null,
      types: [
        {
          key: 1,
          label: this.$t('Motion sensor')
        },
        {
          key: 2,
          label: this.$t('Door opening sensor')
        },
        {
          key: 3,
          label: this.$t('Water leak sensor')
        },
        {
          key: 4,
          label: this.$t('Remote controller')
        },
        {
          key: 5,
          label: this.$t('Smoke sensor')
        },
        {
          key: 20,
          label: this.$t('Other')
        }
      ]
    }
  },
  watch: {
    value() {
      this.$emit('update:model-value', this.value)
    }
  },
  created() {
    this.value = this.modelValue
  }
}
</script>

<template>
  <VSelect
    v-model="value"
    clearable
    autocomplete="off"
    :label="$t('Type')"
    :items="types"
    item-title="label"
    item-value="key"
  />
</template>

<style scoped lang="scss">

</style>
