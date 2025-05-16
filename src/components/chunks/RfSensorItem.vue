<script>
export default {
  name: "RfSensorItem",
  props: {
    sensor: {
      type: Object,
      required: true
    }
  },
  computed: {
    // 1 - movement sensor
    // 2 - door sensor
    // 3 - water leak sensor
    // 4 - buttons (remote controller with buttons)
    // 20 - other
    typeString() {
      switch (this.sensor.type) {
        case 1:
          return this.$t('Motion sensor')
        case 2:
          return this.$t('Door opening sensor')
        case 3:
          return this.$t('Water leak sensor')
        case 4:
          return this.$t('Remote controller')
        default:
          return this.$t('Other')
      }
    },
    icon() {
      switch (this.sensor.type) {
        case 1:
          return 'mdi-motion-sensor'
        case 2:
          return 'mdi-door-closed-lock'
        case 3:
          return 'mdi-water-alert'
        case 4:
          return 'mdi-remote'
        case 5:
          return 'mdi-smoke-detector-variant'
        default:
          return 'mdi-help'
      }
    }
  },
  methods: {
    bit(i) {
      return 0x01 & (this.sensor.state >> i)
    },
  }
}
</script>

<template>
  <VCard hover>
    <template #append>
      <VBtn
        readonly
        density="compact"
        variant="text"
        color="secondary"
        :icon="icon"
      />
      <VTooltip hover>
        <template #activator="{props}">
          <VBtn
            v-bind="props"
            density="compact"
            variant="text"
            :icon="sensor.alarm ? 'mdi-bell' : 'mdi-bell-off'"
            :color="sensor.alarm ? 'orange' : 'secondary'"
          />
        </template>
        {{ sensor.alarm ? $t('Alarm mode is activated') : $t('Alarm mode is disabled') }}
      </VTooltip>
    </template>
    <template #title>
      {{ sensor.label }}
    </template>
    <template #subtitle>
      {{ typeString }}
    </template>
    <template #text>
      <VBtn
        v-for="num in [3,2,1,0]"
        :key="num"
        variant="text"
        :icon="bit(num) === 1 ? 'mdi-toggle-switch-variant' : 'mdi-toggle-switch-variant-off'"
        density="compact"
        class="ma-1"
        readonly
        :color="bit(num) === 1 ? 'primary' : 'secondary'"
      />
    </template>
    <template #actions>
      <VBtn
        readonly
        variant="tonal"
        class="pa-0"
        density="compact"
        width="100%"
        :text="sensor.serial.toString(16)"
      />
    </template>
  </VCard>
</template>

<style scoped lang="scss">

</style>
