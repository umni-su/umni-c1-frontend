<script>
export default {
  name: "BoilerErrorFlags",
  props: {
    flags: {
      type: Object,
      required: true
    }
  },
  emits: ['on-boiler-error-reset'],
  computed: {
    loading() {
      return this.$store.getters['isLoading']
    }
  },
  methods: {
    async resetBoilerErrors() {
      const res = await this.$store.dispatch('resetBoilerErrors')
      if (res) {
        this.$emit('on-boiler-error-reset')
      }
    }
  }
}
</script>

<template>
  <VCard
    :disabled="loading"
    color="error"
    variant="tonal"
    elevation="0"
    :title="$t('Boiler error')"
  >
    <template #append>
      <VIcon
        color="error"
        icon="mdi-alert"
      />
    </template>
    <template #text>
      <div class="param">
        <div class="param-title">
          {{ $t('Error code') }}
        </div>
        <div class="param-value">
          {{ flags.fault_code }}
        </div>
      </div>

      <div class="param">
        <div class="param-title">
          {{ $t('Diagnostic code') }}
        </div>
        <div class="param-value">
          {{ flags.fault_code }}
        </div>
      </div>

      <div class="param">
        <div class="param-title">
          {{ $t('Low water pressure') }}
        </div>
        <div class="param-value">
          {{ flags.is_low_water_press ? $t('Yes') : $t('No') }}
        </div>
      </div>

      <div class="param">
        <div class="param-title">
          {{ $t('Gas flame fault') }}
        </div>
        <div class="param-value">
          {{ flags.is_gas_flame_fault ? $t('Yes') : $t('No') }}
        </div>
      </div>

      <div class="param">
        <div class="param-title">
          {{ $t('Air pressure fault') }}
        </div>
        <div class="param-value">
          {{ flags.is_air_press_fault ? $t('Yes') : $t('No') }}
        </div>
      </div>

      <div class="param">
        <div class="param-title">
          {{ $t('Overheating') }}
        </div>
        <div class="param-value">
          {{ flags.is_water_over_temp ? $t('Yes') : $t('No') }}
        </div>
      </div>
    </template>
    <template #actions>
      <VBtn
        width="100%"
        :disabled="!flags.can_reset"
        color="error"
        prepend-icon="mdi-restart"
        variant="tonal"
        :text="$t('Reset')"
        @click="resetBoilerErrors"
      />
    </template>
  </VCard>
</template>

<style scoped lang="scss">
.param {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
}
</style>
