<script>
import * as echarts from 'echarts';
import {markRaw} from "vue";
import BoilerErrorFlags from "@/components/chunks/BoilerError.vue";
import {baseOptions, gradientOptions} from "@/helpers/chartOptions.js";
import ModalDialog from "@/components/chunks/ModalDialog.vue";
import DebugCard from "@/components/chunks/DebugCard.vue";

export default {
  name: "ClimatePanel",
  components: {DebugCard, ModalDialog, BoilerErrorFlags},
  data() {
    return {
      otch: false,
      hwa: false,
      diag: false,
      mode: 'ot',
      chSetpoint: 0,
      dhwSetpoint: 0,
      boilerTemp: 0,
      boilerActive: false,
      dhwActive: false,
      ntc1: 24.18,
      ntc2: 36.23,
      sliderPushed: false,
      handler: null,
      tempChart: null,
      percentChart: null,
      openErrorModal: false,
    }
  },
  computed: {
    ready() {
      return this.state.ready
    },
    state() {
      return this.$store.getters['getOpenThermState']
    },
    interval() {
      return this.$store.getters['getRefreshInterval']
    },
    tempChartOptions() {
      return {
        ...baseOptions,
        ...{
          yAxis: {
            axisLabel: {
              formatter: '{value} °C'
            },
          },
          series: [
            {
              name: this.$t('Current boiler temperature'),
              type: 'line',
              smooth: true,
              data: this.otChartData
            }
          ]
        }
      }
    },
    percentChartOptions() {
      return {
        ...baseOptions,
        ...gradientOptions,
        ...{
          yAxis: {
            axisLabel: {
              formatter: '{value}%'
            },
          },
          series: [
            {
              name: this.$t('Modulation'),
              type: 'line',
              smooth: true,
              data: this.modulationChartData
            }
          ]
        }
      }
    },
    otChartData() {
      return this.$store.state.charts.ot.ch
    },
    modulationChartData() {
      return this.$store.state.charts.ot.modulation
    },
    serverData() {
      return {
        type: this.mode,
        state: {
          otdhwsp: this.dhwSetpoint,
          ottbsp: this.chSetpoint,
          otch: this.otch,
          hwa: this.hwa
        }
      }
    }
  },
  watch: {
    async interval() {
      clearInterval(this.handler)
      await this.getState()
      this.handler = setInterval(async () => {
        await this.getState()
      }, this.interval)
    }
  },
  async created() {
    await this.getState()
    this.handler = setInterval(async () => {
      await this.getState()
    }, this.interval)
    await Promise.resolve(
      this.$nextTick(() => {
        this.tempChart = markRaw(echarts.init(this.$refs.chTemChart.$el))
        this.tempChart.setOption(this.tempChartOptions)
        window.addEventListener('resize', () => {
          this.tempChart.resize()
        })

        this.percentChart = markRaw(echarts.init(this.$refs.percentChart.$el))
        this.percentChart.setOption(this.percentChartOptions)
        window.addEventListener('resize', () => {
          this.percentChart.resize()
        })
      })
    )
  },
  unmounted() {
    clearInterval(this.handler)
  },
  methods: {
    async getState() {
      await this.$store.dispatch('getOpenThermState')
      if (!this.ready) {
        return
      }
      this.otch = this.state?.otch
      this.hwa = this.state?.hwa
      this.chSetpoint = this.state?.ottbsp
      this.dhwSetpoint = this.state?.otdhwsp
      this.boilerTemp = this.state?.boiler_temperature?.toFixed(2)
      this.boilerActive = this.state?.central_heating_active
      this.dhwActive = this.state?.hot_water_active
      this.ntc1 = this.state?.ntc1?.toFixed(2)
      this.ntc2 = this.state?.ntc2.toFixed(2)
      if (this.tempChart && this.percentChart) {
        this.tempChart.setOption(this.tempChartOptions)
        this.percentChart.setOption(this.percentChartOptions)
      }

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
      this.otch = !this.otch
      await this.saveOpenThermState()
    },
    async toggleDHW() {
      this.hwa = !this.hwa
      await this.saveOpenThermState()
    },
    async canSaveTempState() {
      if (this.sliderPushed) {
        await this.saveOpenThermState()
        this.sliderPushed = false
      }
    },
    showErrorModal() {
      this.openErrorModal = true;
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
      v-if="state"
      height="100%"
      class="index-panel"
      color="transparent"
    >
      <VContainer>
        <VRow>
          <VCol
            v-if="state.fault && state?.asf_flags"
            cols="12"
            sm="3"
          >
            <VBtn
              prepend-icon="mdi-alert"
              block
              color="error"
              :text="$t('Boiler error')"
              @click="showErrorModal"
            />

            <ModalDialog
              v-model="openErrorModal"
              :title="$t('Boiler error')"
            >
              <BoilerErrorFlags
                :flags="state.asf_flags"
                @on-boiler-error-reset="getState"
              />
            </ModalDialog>
          </VCol>
          <VCol
            v-else
            cols="12"
            sm="3"
          >
            <VBtn
              v-if="state.adapter_success"
              readonly
              prepend-icon="mdi-heart-outline"
              block
              color="success"
              variant="tonal"
              :text="$t('In work')"
            />
            <VBtn
              v-else
              readonly
              prepend-icon="mdi-power-plug-off"
              block
              color="secondary"
              variant="tonal"
              :text="$t('Not connected')"
            />
          </VCol>
          <VCol
            cols="12"
            sm="3"
          >
            <VBtn
              readonly
              width="100%"
              :prepend-icon="state?.flame_on ? 'mdi-fire' : 'mdi-fire-off'"
              :color="state?.flame_on ? 'orange' : 'secondary'"
              variant="tonal"
              :text="state?.flame_on ? $t('The flame is on') : $t('The flame is off')"
            />
          </VCol>
          <VCol
            cols="12"
            sm="3"
          >
            <VTooltip
              location="top"
              open-on-hover
            >
              {{ $t('Current flame modulation level') }}
              <template #activator="{props}">
                <VBtn
                  readonly
                  v-bind="props"
                  width="100%"
                  prepend-icon="mdi-candle"
                  color="secondary"
                  variant="tonal"
                  :text="`${state?.modulation}`"
                />
              </template>
            </VTooltip>
          </VCol>
          <VCol
            cols="12"
            sm="3"
          >
            <VTooltip
              location="top"
              open-on-hover
            >
              {{ $t('Current water heat temperature') }}
              <template #activator="{props}">
                <VBtn
                  v-bind="props"
                  width="100%"
                  variant="tonal"
                  prepend-icon="mdi-thermometer"
                  color="secondary"
                  :text="`${boilerTemp}&deg;C`"
                />
              </template>
            </vtooltip>
          </VCol>
        </VRow>
        <VRow>
          <VCol
            sm="6"
            cols="12"
          >
            <VCard>
              <template #title>
                {{ $t('Current water heat temperature') }}
              </template>
              <template #text>
                <VSheet
                  ref="chTemChart"
                  height="300"
                />
              </template>
            </VCard>
          </VCol>
          <VCol
            sm="6"
            cols="12"
          >
            <VCard>
              <template #title>
                {{ $t('Modulation') }}
              </template>
              <template #text>
                <VSheet
                  ref="percentChart"
                  height="300"
                />
              </template>
            </VCard>
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            sm="6"
            class="slider-wrap"
          >
            <VCard
              width="100%"
              class="pa-4 slider"
              variant="tonal"
              :color="otch ? 'orange':'secondary'"
            >
              <div class="text-h6 text-center">
                {{ $t('Target heating temperature') }}
              </div>
              <VSlider
                v-model="chSetpoint"
                :hide-details="false"
                color="orange"
                :thumb-size="30"
                :min="state.ch_min_max.min"
                :max="state.ch_min_max.max"
                :step="1"
                @update:model-value="onSliderPushed"
              >
                <template #append>
                  <VBtn
                    variant="text"
                    readonly
                    :text="`${chSetpoint}`"
                    color="default"
                    size="x-large"
                    class="font-weight-bold"
                  />
                </template>
                <template #prepend>
                  <VBtn
                    :icon="otch ? 'mdi-fire' : 'mdi-fire-off'"
                    variant="text"
                    :color="otch ? 'orange':'secondary'"
                    @click="activateBoiler"
                  />
                </template>
              </VSlider>
              <div class="position-absolute bottom-0 left-0 right-0 text-center pa-2">
                <VChip
                  v-if="state.central_heating_active"
                  rounded="pill"
                  color="orange"
                  prepend-icon="mdi-check"
                  :text="$t('Active')"
                />
              </div>
            </VCard>
          </VCol>
          <VCol
            cols="12"
            sm="6"
            class="slider-wrap"
          >
            <VCard
              width="100%"
              class="pa-4 slider"
              variant="tonal"
              :color="hwa ? 'primary' :'secondary'"
            >
              <div class="text-h6 text-center">
                {{ $t('Hot water setpoint') }}
              </div>

              <VSlider
                v-model="dhwSetpoint"
                :thumb-size="30"
                :hide-details="false"
                color="primary"
                :min="state.dhw_min_max.min"
                :max="state.dhw_min_max.max"
                :step="1"
                @update:model-value="onSliderPushed"
              >
                <template #append>
                  <VBtn
                    variant="text"
                    readonly
                    :text="`${dhwSetpoint}`"
                    color="default"
                    size="x-large"
                    class="font-weight-bold"
                  />
                </template>
                <template #prepend>
                  <VBtn
                    variant="plain"
                    :color="hwa ? 'primary' :'secondary'"
                    :icon="hwa? 'mdi-water-boiler' : 'mdi-water-boiler-off'"
                    @click="toggleDHW"
                  />
                </template>
              </VSlider>
              <div class="position-absolute bottom-0 left-0 right-0 text-center pa-2">
                <VChip
                  v-if="state.hot_water_active"
                  rounded="pill"
                  color="primary"
                  prepend-icon="mdi-check"
                  :text="$t('Active')"
                />
              </div>
            </VCard>
          </VCol>
        </VRow>
        <VRow class="ntc-sensors">
          <VCol>
            <VCard variant="plain">
              <VBtn
                class="w-100"
                prepend-icon="mdi-thermometer"
                variant="tonal"
              >
                {{ ntc1 }}&deg;C - {{ $t('NTC thermistor') }}
              </VBtn>
            </VCard>
          </VCol>
          <VCol>
            <VCard variant="plain">
              <VBtn
                class="w-100"
                prepend-icon="mdi-thermometer"
                variant="tonal"
              >
                {{ ntc2 }}&deg;C - {{ $t('NTC thermistor') }}
              </VBtn>
            </VCard>
          </VCol>
        </VRow>

        <DebugCard>
          <VRow>
            <VCol cols="12">
              {{ state }}
            </VCol>
          </VRow>
        </DebugCard>
      </VContainer>
    </VSheet>
  </VWindowItem>
</template>

<style scoped>
.index-panel {
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;

  .sliders {
    display: flex;
    align-items: stretch;
    justify-content: center;

    .slider-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;

      .slider {
        padding: 20px;
        position: relative;

        &.slider-center {
          padding: 0;
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          flex-direction: column;
        }


        .value {
          text-align: center;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-size: 64px;
          line-height: 70px;
          color: var(--u-color-secondary);

          .value-actions {
            position: relative;
          }
        }

        .title {
          color: var(--u-color-secondary);
          text-align: center;
        }
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
