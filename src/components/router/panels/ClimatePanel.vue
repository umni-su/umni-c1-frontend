<script>
import RoundSlider from "vue-three-round-slider";

export default {
  name: "ClimatePanel",
  components: {
    RoundSlider
  },
  data() {
    return {
      mode: 'ot',
      hwSetpoint: 0,
      tBoilerSetpoint: 0,
      boilerTemp: 0,
      boilerActive: false,
      ntc1: 24.18,
      ntc2: 36.23,
      sliderPushed: false
    }
  },
  computed: {
    state() {
      return this.$store.getters['getOpenThermState']
    },
    serverData() {
      return {
        type: this.mode,
        state: {
          otdhwsp: this.hwSetpoint,
          ottbsp: this.tBoilerSetpoint,
          otch: this.boilerActive
        }
      }
    }
  },
  async created() {
    await this.getState()
  },
  methods: {
    async getState() {
      await this.$store.dispatch('getOpenThermState')
      this.hwSetpoint = this.state?.otdhwsp
      this.tBoilerSetpoint = this.state?.ottbsp
      this.boilerTemp = this.state?.ottb
      this.boilerActive = this.state?.otch
      this.ntc1 = this.state?.ntc1
      this.ntc2 = this.state?.ntc2
    },
    onSliderPushed() {
      if (!this.sliderPushed) {
        this.sliderPushed = true
      }
    },
    async saveOpenThermState() {
      await this.$store.dispatch('setState', this.serverData)
    },
    async activateBoiler() {
      this.boilerActive = !this.boilerActive
      await this.saveOpenThermState()
    },
    async canSaveTempState() {
      if (this.sliderPushed) {
        await this.saveOpenThermState()
        this.sliderPushed = false
      }
    }
  }
}
</script>

<template>
  <VWindowItem
    value="opentherm"
    class="fill-height"
    @mouseup="canSaveTempState"
  >
    <VSheet
      height="100%"
      class="index-panel"
      color="transparent"
    >
      <VContainer>
        <VRow
          class="sliders"
          no-gutters
        >
          <VCol class="slider">
            <RoundSlider
              v-model="hwSetpoint"
              end-angle="+270"
              start-angle="-45"
              :show-tooltip="false"
              min="20"
              max="80"
              width="5"
              radius="100"
              range-color="#008dd2"
              line-cap="round"
              path-color="rgba(128,144,152,0.3)"
              border-width="0"
              handle-size="+10"
              @update:model-value="onSliderPushed"
            />
            <div class="value">
              {{ hwSetpoint }}
              <div class="value-actions">
                <VBtn
                  :icon="boilerActive ? 'mdi-fire' : 'mdi-fire-off'"
                  :color="boilerActive ? 'orange' : 'secondary'"
                  variant="text"
                  @click="activateBoiler"
                />
              </div>
            </div>
            <div class="title">
              {{ $t('Hot water setpoint') }}
            </div>
          </VCol>

          <VCol class="slider">
            <RoundSlider
              v-model="tBoilerSetpoint"
              end-angle="+270"
              start-angle="-45"
              :show-tooltip="false"
              min="20"
              max="60"
              width="5"
              radius="100"
              range-color="#008dd2"
              line-cap="round"
              path-color="rgba(128,144,152,0.3)"
              border-width="0"
              handle-size="+10"
              @update:model-value="onSliderPushed"
            />
            <div class="value">
              {{ tBoilerSetpoint }}
              <div class="value-actions">
                <VBtn
                  prepend-icon="mdi-thermometer"
                  color="secondary"
                  variant="text"
                  :text="`${boilerTemp}&deg;C`"
                  :readonly="true"
                />
              </div>
            </div>
            <div class="title">
              {{ $t('Boiler setpoint') }}
            </div>
          </VCol>
        </VRow>
        <VRow class="ntc-sensors">
          <VCol>
            <VBtn
              class="w-100"
              prepend-icon="mdi-thermometer"
              variant="tonal"
            >
              {{ ntc1 }}&deg;C - {{ $t('NTC thermistor') }}
            </VBtn>
          </VCol>
          <VCol>
            <VBtn
              class="w-100"
              prepend-icon="mdi-thermometer"
              variant="tonal"
            >
              {{ ntc2 }}&deg;C - {{ $t('NTC thermistor') }}
            </VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </VSheet>
  </VWindowItem>
</template>

<style scoped>
.index-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .sliders {
    display: flex;
    align-items: center;
    justify-content: center;

    .slider {
      padding: 20px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .value {
        text-align: center;
        position: absolute;
        left: 20px;
        right: 20px;
        top: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 50px;
        color: var(--u-color-secondary);

        .value-actions {
          position: relative;
          top: -27px;
        }
      }

      .title {
        color: var(--u-color-secondary);
        text-align: center;
      }
    }
  }

  .ntc-sensors {
    display: flex;
    align-items: center;
    justify-content: center;

  }
}


</style>
