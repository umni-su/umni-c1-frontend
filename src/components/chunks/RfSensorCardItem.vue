<script>
import RfSensorTypeSelect from "@/components/chunks/RfSensorTypeSelect.vue";

export default {
  name: "RfSensorCardItem",
  components: {RfSensorTypeSelect},
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    hideDelete: {
      type: Boolean,
      default: false
    },
    showState: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:model-value', 'on-sensor-delete', 'on-more-click'],
  data() {
    return {
      sensor: {},
      // 1 - movement sensor
      // 2 - door sensor
      // 3 - water leak sensor
      // 4 - buttons (remote controller with buttons)
      // 20 - other
    }
  },
  computed: {
    sn() {
      return this.sensor.serial.toString(16).toUpperCase()
    }
  },
  watch: {
    sensor() {
      this.$emit('update:model-value', this.sensor)
    }
  },
  created() {
    this.sensor = this.modelValue
  },
  methods: {
    bit(i) {
      return 0x01 & (this.sensor.state >> i)
    },
    deleteRfSensor() {
      this.$emit('on-sensor-delete', this.sensor)
    },
    onMoreClick(sensor) {
      this.$emit('on-more-click', sensor)
    }
  }
}
</script>

<template>
  <VCard hover>
    <template #prepend>
      <VChip
        color="primary"
      >
        {{ sn }}
      </VChip>
      <VTooltip hover>
        <template #activator="{props}">
          <VBtn
            v-bind="props"
            density="compact"
            variant="text"
            class="ml-2"
            :icon="sensor.alarm ? 'mdi-bell' : 'mdi-bell-off'"
            :color="sensor.alarm ? 'orange' : 'secondary'"
            @click="sensor.alarm = !sensor.alarm"
          />
        </template>
        {{ sensor.alarm ? $t('Alarm mode is activated') : $t('Alarm mode is disabled') }}
      </VTooltip>
    </template>
    <template #append>
      <VBadge
        class="ml-n2"
        dot
        :color="sensor.ext ? 'orange' : 'transparent'"
      >
        <VBtn
          icon="mdi-dots-horizontal"
          variant="text"
          density="compact"
          color="default"
          @click="onMoreClick(sensor)"
        />
      </VBadge>
      <VBtnGroup
        v-if="showState"
        density="compact"
      >
        <VBtn
          v-for="num in [3,2,1,0]"
          :key="num"
          variant="tonal"
          icon
          density="compact"
          class="ma-1"
          readonly
          :text="`${bit(num)}`"
          :color="bit(num) === 1 ? 'primary' : 'secondary'"
        />
      </VBtnGroup>
      <VBtn
        v-if="!hideDelete"
        icon="mdi-trash-can"
        variant="text"
        density="compact"
        color="error"
        class="ml-2"
        @click="deleteRfSensor"
      />
    </template>
    <template #text>
      <RfSensorTypeSelect
        v-model="sensor.type"
        class="mb-4"
      />
      <VTextField
        v-model="sensor.label"
        class="overflow-visible"
        :label="$t('Name')"
        append-inner-icon="mdi-access-point"
      />
    </template>
  </VCard>
</template>

<style scoped lang="scss">

</style>
