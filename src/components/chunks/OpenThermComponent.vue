<template>
  <VContainer
    fluid
    class="opentherm-dashboard"
  >
    <VRow>
      <VCol cols="4">
        {{ supportedFeatures.modulation_read }}
      </VCol>
    </VRow>
    <VRow v-if="debugMode">
      <VCol cols="12">
        <DebugCard>
          <template #default>
            <pre>
            <code>
              {{ openthermData }}
            </code>
          </pre>
          </template>
        </DebugCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import DebugCard from "@/components/chunks/DebugCard.vue";

export default {
  name: 'OpenThermComponent',
  components: {DebugCard},

  props: {
    openthermData: {
      type: Object,
      required: true,
      default: () => ({
        en: true,
        ready: false,
        adapter_success: false,
        status_code: 0,
        ch_en: true,
        ch_sp: 60,
        dhw_en: true,
        dhw_sp: 59,
        otc_en: false,
        cool_en: false,
        ch2_en: false,
        mod: 0,
        hcr: 0,
        ch_active: false,
        dhw_active: false,
        flame_on: false,
        is_fault: false,
        boiler_temperature: 0,
        return_temperature: 0,
        dhw_temperature: 0,
        outside_temperature: 0,
        modulation: 0,
        pressure: 0,
        flow_rate: 0,
        flow_rate_ch2: 0,
        fault_code: 0,
        boiler_config: {
          control_type: "ON/OFF",
          dhw_present: false,
          dhw_config: "INSTANTANEOUS",
          ch2_present: false,
          cooling_supported: false,
          pump_control_allowed: false,
          slave_ot_version: 0,
          slave_product_version: 0
        },
        bounds: {
          ch: { min: 0, max: 0 },
          dhw: { min: 0, max: 0 },
          hcr: { min: 0, max: 0 }
        },
        supported_features: {
          modulation_read: false,
          modulation_write: false,
          heat_curve_read: false,
          heat_curve_write: false,
          outside_temperature: false,
          return_temperature: false,
          pressure: false,
          flow_rate: false,
          dhw_present: false,
          modulating: true
        }
      })
    }
  },

  computed: {
    disabled(){
      return ! this.enabled || !this.ready() || !this.adapterSuccess
    },
    debugMode(){
      return this.$store.getters['isDebug']
    },
    enabled(){
      return this.openthermData.enabled
    },
    ready(){
      return this.openthermData.ready
    },
    adapterSuccess(){
      return this.openthermData.adapter_success
    },
    config(){
      return this.openthermData.boiler_config
    },
    supportedFeatures(){
      return this.openthermData.supported_features || {}
    },

    canReadModulation() {
      return this.supportedFeatures.modulation_read || false
    },

    canReadHeatCurve() {
      return this.supportedFeatures.heat_curve_read || false
    },

    canReadOutsideTemperature() {
      return this.supportedFeatures.outside_temperature || false
    },

    canReadReturnTemperature() {
      return this.supportedFeatures.return_temperature || false
    },

    canReadPressure() {
      return this.supportedFeatures.pressure || false
    },

    canReadFlowRate() {
      return this.supportedFeatures.flow_rate || false
    },

    // Write возможности
    canWriteModulation() {
      return this.supportedFeatures.modulation_write || false
    },

    canWriteHeatCurve() {
      return this.supportedFeatures.heat_curve_write || false
    },

    // Проверки на наличие датчиков
    hasOutsideTemperatureSensor() {
      return this.supportedFeatures.outside_temperature || false
    },

    hasReturnTemperatureSensor() {
      return this.supportedFeatures.return_temperature || false
    },

    hasPressureSensor() {
      return this.supportedFeatures.pressure || false
    },

    hasFlowRateSensor() {
      return this.supportedFeatures.flow_rate || false
    },

    hasDHW() {
      return this.supportedFeatures.dhw_present || false
    },

    isModulation() {
      return this.supportedFeatures.modulating || false
    }

  },

  methods: {

  }
}
</script>

<style scoped>

</style>
