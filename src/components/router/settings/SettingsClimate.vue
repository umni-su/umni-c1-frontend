<script>
import ParameterItem from "@/components/chunks/ParameterItem.vue";
import BoilerErrorFlags from "@/components/chunks/BoilerError.vue";
import {createSuccessNotification} from "@/helpers/notificationHelper.js";
import RestartConfirmModal from "@/components/chunks/RestartConfirmModal.vue";

export default {
  name: "SettingsClimate",
  components: {RestartConfirmModal, BoilerErrorFlags, ParameterItem},
  data() {
    return {
      tab: 'info',
      config: null
    }
  },
  computed: {
    opentherm() {
      return this.$store.getters['getOpenThermState']
    },
    fault() {
      return this.config?.fault
    },
    flags() {
      return this.config.flags ? this.config.flags : {}
    },
    isChActive() {
      return this.config?.central_heating_active === 1
    },
    isDhwActive() {
      return this.config?.hot_water_active === 1
    },
    flameOn() {
      return this.config?.flame_on

    },
    asfFlags() {
      return this.config?.asf_flags
    },
    curveBounds() {
      return this.config?.curve_bounds
    },
    outsideTemperature() {
      return this.config?.outside_temperature
    },
    color() {
      if (this.fault) {
        return 'error'
      }
      return 'primary'
    },
    loading() {
      return this.$store.getters['isLoading']
    },
    serverData() {
      return {
        type: 'ot',
        //state: this.config,
        state: {
          otch: this.config.otch,
          hwa: this.config.hwa,
          otdhwsp: parseInt(this.config.otdhwsp),
          ottbsp: parseInt(this.config.ottbsp),
          ototc: this.config.ototc,
          othcr: this.config.othcr,
          mod: this.config.mod,
          ch_min_max: this.config.ch_min_max,
          dhw_min_max: this.config.dhw_min_max,
        }
      }
    }
  },
  async created() {
    await this.getOtConfig()
  },
  methods: {
    async getOtConfig() {
      await this.$store.dispatch('getOpenThermState')
      this.config = this.opentherm
    },
    async setBoilerState() {
      const res = await this.$store.dispatch('setState', this.serverData)
      if (res) {
        this.$store.commit('addNotification', createSuccessNotification(this.$t('Settings saved')))
        this.$refs.restart.open()
      }
    }
  }
}
</script>

<template>
  <VWindowItem
    value="climate"
    class="fill-height"
  >
    <RestartConfirmModal ref="restart" />
    <VAlert
      v-if="config && !config.adapter_success"
      icon="mdi-water-boiler-alert"
      variant="tonal"
      color="error"
      :text="$t('Connection to boiler not established')"
    >
      <template #append>
        <VBtn
          color="default"
          icon="mdi-reload"
          variant="plain"
          density="compact"
          :loading="loading"
          @click="getOtConfig"
        />
      </template>
    </VAlert>
    <VRow v-else-if="config && config.adapter_success">
      <VCol
        cols="12"
        sm="8"
        class="order-1"
      >
        <VCard>
          <VList
            select-strategy="leaf"
          >
            <VListSubheader>
              {{ $t('Common information') }}
            </VListSubheader>
            <ParameterItem
              :title="$t('Slave version')"
              :subtitle="$t('Slave product version number and type')"
            >
              {{ config.slave_ot_version }}
            </ParameterItem>
            <ParameterItem
              :title="$t('Slave OpenTherm version')"
              :subtitle="$t('The implemented version of the OpenTherm Protocol Specification in the slave')"
            >
              {{ config.slave_product_version }}
            </ParameterItem>
            <ParameterItem
              :title="$t('Maximum boiler capacity')"
              :subtitle="$t('Maximum possible rated boiler power in kilowatts')"
            >
              {{ config.cap_mod.kw }}kW
            </ParameterItem>
            <VListSubheader>
              {{ $t('Boiler modes') }}
            </VListSubheader>
            <ParameterItem
              :title="$t('Hot water')"
              :subtitle="$t('Hot water supply management')"
            >
              <template #default>
                <VChip
                  rounded="pill"
                  :prepend-icon="flags.dhw_present ? 'mdi-check' : 'mdi-close'"
                  :text="flags.dhw_present ? $t('Yes') :$t('No')"
                  density="compact"
                  :color="flags.dhw_present ? 'success' : 'error'"
                />
              </template>
            </ParameterItem>
            <ParameterItem
              :title="$t('Modulation')"
              :subtitle="$t('Support for modulation mode')"
            >
              <template #default>
                <VChip
                  rounded="pill"
                  :prepend-icon="flags.control_type === 0 ? 'mdi-check' : 'mdi-close'"
                  :text="flags.control_type === 0 ? $t('Yes') :$t('No')"
                  density="compact"
                  :color="flags.control_type === 0 ? 'success' : 'error'"
                />
              </template>
            </ParameterItem>
            <ParameterItem
              :title="$t('Pump control')"
              :subtitle="$t('Support for pump control mode')"
            >
              <VChip
                rounded="pill"
                :prepend-icon="flags.pump_control_allowed ? 'mdi-check' : 'mdi-close'"
                :text="flags.pump_control_allowed ? $t('Yes') :$t('No')"
                density="compact"
                :color="flags.pump_control_allowed ? 'success' : 'error'"
              />
            </ParameterItem>
            <ParameterItem
              :title="$t('Second heating circuit')"
              :subtitle="$t('Central heating second circuit is present')"
            >
              <VChip
                rounded="pill"
                :prepend-icon="flags.ch2_present ? 'mdi-check' : 'mdi-close'"
                :text="flags.ch2_present ? $t('Yes') :$t('No')"
                density="compact"
                :color="flags.ch2_present ? 'success' : 'error'"
              />
            </ParameterItem>

            <VListSubheader>
              {{ $t('Heating') }}
            </VListSubheader>

            <ParameterItem
              :title="$t('Heating active')"
              :subtitle="$t('Enable or disable heating')"
            >
              <VSwitch
                v-model="config.otch"
                :text="config.otch ? $t('Yes') : $t('No')"
                hide-details
                :color="config.otch ? 'orange' : 'default'"
                @update:model-value="setBoilerState"
              />
            </ParameterItem>
            <ParameterItem
              :title="$t('Target heating temperature')"
              :subtitle="$t('The set heating temperature of the heating circuit')"
            >
              <VTextField
                v-model.number="config.ottbsp"
                type="number"
                width="60"
                hide-spin-buttons
              />
            </ParameterItem>
            <ParameterItem
              :title="$t('CH setpoint lower')"
              :subtitle="$t('The value is transmitted from the boiler, or it is set systemically')"
            >
              <VTextField
                v-model.number="config.dhw_min_max.min"
                type="number"
                width="60"
                hide-spin-buttons
              />
            </ParameterItem>
            <ParameterItem
              :title="$t('CH setpoint upper')"
              :subtitle="$t('The value is transmitted from the boiler, or it is set systemically')"
            >
              <VTextField
                v-model.number="config.dhw_min_max.max"
                type="number"
                width="60"
                hide-spin-buttons
              />
            </ParameterItem>
            <VListSubheader>
              {{ $t('Temperature compensation') }}
            </VListSubheader>

            <ParameterItem
              :title="$t('Temperature compensation')"
              :subtitle="$t('Outside temperature compensation')"
            >
              <VSwitch
                v-model.number="config.ototc"
                color="success"
                type="number"
                hide-details
                @update:model-value="setBoilerState"
              />
            </ParameterItem>
            <div v-if="config.ototc">
              <ParameterItem
                :title="$t('Outside temperature')"
                :subtitle="$t('May not be supported by your boiler')"
              >
                {{ outsideTemperature }}&deg;
              </ParameterItem>
              <ParameterItem
                :title="$t('Heating curve ratio')"
                :subtitle="$t('May not be supported by your boiler')"
              >
                <VTextField
                  v-model.number="config.othcr"
                  type="number"
                  width="60"
                  hide-spin-buttons
                />
              </ParameterItem>
            </div>

            <VListSubheader>
              {{ $t('Hot water') }}
            </VListSubheader>

            <ParameterItem
              :disabled="!flags.dhw_present"
              :title="$t('Hot water active')"
              :subtitle="$t('Enable or disable hot water')"
            >
              <VSwitch
                v-model="config.hwa"
                :text="config.hwa ? $t('Yes') : $t('No')"
                hide-details
                :color="config.hwa ? 'primary' : 'default'"
                @update:model-value="setBoilerState"
              />
            </ParameterItem>
            <ParameterItem
              :title="$t('Hot water setpoint')"
              :subtitle="$t('Hot water heating temperature setpoint')"
            >
              <VTextField
                v-model.number="config.otdhwsp"
                type="number"
                width="60"
                hide-spin-buttons
              />
            </ParameterItem>
            <ParameterItem
              :title="$t('DHW setpoint lower')"
              :subtitle="$t('The value is transmitted from the boiler, or it is set systemically')"
            >
              <VTextField
                v-model.number="config.ch_min_max.min"
                type="number"
                width="60"
                hide-spin-buttons
              />
            </ParameterItem>
            <ParameterItem
              :title="$t('DHW setpoint upper')"
              :subtitle="$t('The value is transmitted from the boiler, or it is set systemically')"
            >
              <VTextField
                v-model.number="config.ch_min_max.max"
                type="number"
                width="60"
                hide-spin-buttons
              />
            </ParameterItem>
            <VListSubheader>
              {{ $t('Modulation') }}
            </VListSubheader>
            <ParameterItem
              :title="$t('Minimum boiler modulation level')"
              :subtitle="$t('Minimum boiler modulation level in percents (%)')"
            >
              {{ config.cap_mod.min_mod }}%
            </ParameterItem>
            <ParameterItem
              :title="$t('Maximum modulation level')"
              :subtitle="$t('In percents')"
            >
              <VTextField
                v-model.number="config.mod"
                type="number"
                width="60"
                hide-spin-buttons
              />
            </ParameterItem>
          </VList>
          <template #actions>
            <VBtn
              variant="flat"
              prepend-icon="mdi-content-save"
              :text="$t('Save')"
              width="100%"
              :loading="loading"
              @click="setBoilerState"
            />
          </template>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        sm="4"
        class="order-1"
      >
        <BoilerErrorFlags
          v-if="fault"
          class="mb-4"
          :flags="asfFlags"
          @on-boiler-error-reset="getOtConfig"
        />

        <VCard
          :title="$t('Boiler state')"
          variant="tonal"
          elevation="0"
        >
          <template #append>
            <VBtn
              color="default"
              icon="mdi-reload"
              variant="plain"
              density="compact"
              :loading="loading"
              @click="getOtConfig"
            />
          </template>
          <template #text>
            <VBtn
              width="100%"
              :prepend-icon="config.otch ? 'mdi-fire' : 'mdi-fire-off'"
              :color="config.otch ? 'orange' : 'default'"
              variant="tonal"
              :text="config.otch ? $t('Turn off') : $t('Turn on')"
              @click="setBoilerState"
            />
            <VList>
              <ParameterItem
                class="pa-0"
                hide-subtitle
                :title="$t('Flame')"
                :subtitle="$t('Shows the active status of the burner')"
              >
                <template #default>
                  <VBtn
                    readonly
                    :icon="flameOn ? 'mdi-fire' : 'mdi-fire-off'"
                    :color="flameOn ? 'orange' : 'default'"
                    variant="text"
                    density="compact"
                  />
                </template>
              </ParameterItem>
              <ParameterItem
                class="pa-0"
                hide-subtitle
                :title="$t('Modulation')"
                :subtitle="$t('Current flame modulation level')"
              >
                <template #default>
                  {{ config.modulation }}%
                </template>
              </ParameterItem>
              <ParameterItem
                class="pa-0"
                hide-subtitle
                :title="$t('Current boiler temperature')"
                :subtitle="$t('Current temperature of the water flow in the heating circuit')"
              >
                <template #default>
                  {{ config.boiler_temperature.toFixed(2) }}°C
                </template>
              </ParameterItem>
              <ParameterItem
                v-if="config.return_temperature > 0"
                class="pa-0"
                hide-subtitle
                :title="$t('Return temperature')"
                :subtitle="$t('Current temperature of the water flow of the return part of the heating circuit')"
              >
                <template #default>
                  {{ config.return_temperature.toFixed(2) }}°C
                </template>
              </ParameterItem>
              <ParameterItem
                class="pa-0"
                hide-subtitle
                :title="$t('Pressure')"
                :subtitle="$t('Current flame modulation level')"
              >
                <template #default>
                  {{ config.pressure }}
                </template>
              </ParameterItem>
            </VList>
          </template>
        </VCard>
      </VCol>
    </VRow>
  </VWindowItem>
</template>

<style scoped lang="scss">

</style>
