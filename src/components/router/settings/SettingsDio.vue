<script>
import {createSuccessNotification} from "@/helpers/notificationHelper.js";
import AutomationModal from "@/components/chunks/widgets/AutomationModal.vue";
import DebugCard from "@/components/chunks/DebugCard.vue";
import RestartConfirmModal from "@/components/chunks/RestartConfirmModal.vue";

export default {
  name: "SettingsDio",
  components: {RestartConfirmModal, DebugCard, AutomationModal},
  data() {
    return {
      actionSet: {
        action: null,
        ports: []
      },
      diActive: {},
      valuesDo: [],
      valuesDi: [],
      analogValues: {
        ntc1: {
          type: 6,
          channel: 0,
          en: false,
          label: null
        },
        ntc2: {
          type: 6,
          channel: 3,
          en: false,
          label: null
        },
        ai1: {
          channel: 6,
          en: false,
          type: 1,
          label: null
        },
        ai2: {
          channel: 7,
          en: false,
          type: 1,
          label: null
        },
      },
      aiTypes: [
        {
          value: 1,
          title: this.$t('Light sensor')
        },
        {
          value: 2,
          title: this.$t('Soil moisture sensor')
        },
        {
          value: 3,
          title: this.$t('Amperage sensor {ampere}A', {ampere: 5})
        },
        {
          value: 4,
          title: this.$t('Amperage sensor {ampere}A', {ampere: 20})
        },
        {
          value: 5,
          title: this.$t('Amperage sensor {ampere}A', {ampere: 30})
        },
        {
          value: 6,
          title: this.$t('NTC thermistor')
        },
        {
          value: 20,
          title: this.$t('Other')
        }
      ]
    }
  },
  computed: {
    debug() {
      return this.$store.getters['isDebug']
    },
    settingsDo() {
      const settingsDo = this.$store.getters['getDoSettings']
      settingsDo?.sort((a, b) => {
        return a.order - b.order
      })
      return settingsDo
    },
    settingsDi() {
      const settingsDi = this.$store.getters['getDiSettings']
      settingsDi?.sort((a, b) => {
        return a.order - b.order
      })
      return settingsDi
    },
    loading() {
      return this.$store.getters['isLoading']
    },
    serverData() {
      return {do: this.valuesDo, di: this.valuesDi}
    },
    analogSettings() {
      return this.$store.getters['getAnalogSettings']
    }
  },
  watch: {
    settingsDi() {
      this.valuesDi = this.settingsDi
    },
    settingsDo() {
      this.valuesDo = this.settingsDo
    },
    analogSettings() {
      this.analogValues = {...this.analogValues, ...this.analogSettings}
    },
  },
  mounted() {
    this.valuesDo = this.settingsDo
    this.valuesDi = this.settingsDi
    this.analogValues = {...this.analogValues, ...this.analogSettings}
  },
  methods: {
    async toggleRelayState(relay) {
      const data = {
        type: 'dio',
        state: {
          index: relay.index,
          state: relay.state === 1 ? 0 : 1
        }
      }
      await this.$store.dispatch('setState', data)
      relay.state = relay.state === 1 ? 0 : 1
    },
    async saveSettings(settingType) {
      let data = {}
      switch (settingType) {
        case 'sensors':
          data = {
            do: this.valuesDo,
            di: this.valuesDi
          }
          break
        case 'ai':
          data = this.analogValues
          break
      }
      const res = await this.$store.dispatch('saveNvsSettings', {
        type: settingType,
        data
      })
      if (res) {
        this.$store.commit('addNotification', createSuccessNotification(this.$t('Settings saved')));
        this.$refs.restart.open()
      }
    },
    openDiModal(inp) {
      this.diActive = inp
      if (!Object.prototype.hasOwnProperty.call(inp, 'ext')) {
        this.diActive.ext = false
      }
      if (!Object.prototype.hasOwnProperty.call(inp, 'opt')) {
        this.diActive.opt = []
      }
      this.$refs.diModal.open()
    },
    applyDiAutomationConfig(model) {
      this.diActive = model
      // this.diExtendSetting = Object.create({})
    }
  },
}
</script>

<template>
  <VWindowItem
    value="sensors"
  >
    <RestartConfirmModal ref="restart" />
    <VCard
      :disabled="loading"
      :loading="loading"
    >
      <VCardTitle>{{ $t('Relays settings') }}</VCardTitle>
      <VCardText>
        <VContainer fluid>
          <VRow>
            <VCol
              v-for="(rel, index) in settingsDo"
              :key="rel.index"
              sm="6"
              cols="12"
            >
              <VTextField
                v-model="rel.label"
                density="compact"
                :label="$t('Relay #{index} label', {index:(index + 1)})"
              >
                <template #append>
                  <VSwitch
                    :model-value="rel.state"
                    hide-details
                    density="compact"
                    variant="tonal"
                    color="primary"
                    :true-value="1"
                    :false-value="0"
                    @click="toggleRelayState(rel)"
                  />
                </template>
              </VTextField>
            </VCol>
          </VRow>
          <DebugCard>
            <VRow>
              <VCol>
                {{ settingsDo }}
              </VCol>
            </VRow>
          </DebugCard>
        </VContainer>
      </VCardText>
      <VCardTitle>{{ $t('Inputs settings') }}</VCardTitle>
      <VCardText>
        <VContainer fluid>
          <VRow>
            <VCol
              v-for="(inp, index) in settingsDi"
              :key="inp.index"
              sm="6"
              cols="12"
            >
              <VTextField
                v-model="inp.label"
                :label="$t('Input #{index} label', {index:(index+ 1)})"
              >
                <template #prepend-inner>
                  <VIcon
                    variant="tonal"
                    :color="inp.state === 1? 'orange' : 'secondary'"
                    :icon="inp.state === 1? 'mdi-bell' : 'mdi-bell-off'"
                    readonly
                  />
                </template>
                <template #append>
                  <VBadge
                    class="ml-n2"
                    dot
                    :color="inp.ext ? 'orange' : 'transparent'"
                  >
                    <VBtn
                      height="40"
                      icon="mdi-dots-horizontal"
                      variant="text"
                      density="comfortable"
                      color="default"
                      @click="openDiModal(inp)"
                    />
                  </VBadge>
                </template>
              </VTextField>
            </VCol>
          </VRow>

          <DebugCard>
            <VRow>
              <VCol>
                {{ settingsDi }}
              </VCol>
            </VRow>
          </DebugCard>
        </VContainer>
      </VCardText>
      <template #actions>
        <VBtn
          :text="$t('Save')"
          prepend-icon="mdi-content-save"
          @click="saveSettings('sensors')"
        />
      </template>
    </VCard>
    <VCard
      v-if="analogValues"
      :disabled="loading"
      :loading="loading"
      class="mt-4"
    >
      <VCardTitle>{{ $t('Analog sensors settings') }}</VCardTitle>
      <VCardText>
        <VContainer>
          <VRow>
            <VCol
              cols="12"
              sm="6"
            >
              <VSwitch
                v-model="analogValues.ntc1.en"
                color="primary"
                hide-details
                density="compact"
                class="pa-2"
                :label="$t('T1 temperature sensor')"
              />
              <VTextField
                v-model="analogValues.ntc1.label"
                :disabled="!analogValues.ntc1.en"
                :label="$t('Name')"
                prepend-inner-icon="mdi-thermometer"
              >
                <template #append>
                  <VBadge
                    class="ml-n2"
                    dot
                    :color="analogValues.ntc1?.ext ? 'orange' : 'transparent'"
                  >
                    <VBtn
                      height="40"
                      icon="mdi-dots-horizontal"
                      variant="text"
                      density="comfortable"
                      color="default"
                      @click="openDiModal(analogValues.ntc1)"
                    />
                  </VBadge>
                </template>
              </VTextField>
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <VSwitch
                v-model="analogValues.ntc2.en"
                color="primary"
                hide-details
                density="compact"
                class="pa-2"
                :label="$t('T2 temperature sensor')"
              />
              <VTextField
                v-model="analogValues.ntc2.label"
                :disabled="!analogValues.ntc2.en"
                :label="$t('Name')"
                prepend-inner-icon="mdi-thermometer"
              >
                <template #append>
                  <VBadge
                    class="ml-n2"
                    dot
                    :color="analogValues.ntc2?.ext ? 'orange' : 'transparent'"
                  >
                    <VBtn
                      height="40"
                      icon="mdi-dots-horizontal"
                      variant="text"
                      density="comfortable"
                      color="default"
                      @click="openDiModal(analogValues.ntc2)"
                    />
                  </VBadge>
                </template>
              </VTextField>
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
            >
              <VSwitch
                v-model="analogValues.ai1.en"
                color="primary"
                hide-details
                density="compact"
                class="pa-2"
                :label="$t('Analog sensor {num}', {num: 1})"
              />
              <VTextField
                v-model="analogValues.ai1.label"
                :disabled="!analogValues.ai1.en"
                :label="$t('Name')"
                prepend-inner-icon="mdi-sine-wave"
              >
                <template #append>
                  <VBadge
                    class="ml-n2"
                    dot
                    :color="analogValues.ai1?.ext ? 'orange' : 'transparent'"
                  >
                    <VBtn
                      height="40"
                      icon="mdi-dots-horizontal"
                      variant="text"
                      density="comfortable"
                      color="default"
                      @click="openDiModal(analogValues.ai1)"
                    />
                  </VBadge>
                </template>
              </VTextField>
              <VAutocomplete
                v-model="analogValues.ai1.type"
                :disabled="!analogValues.ai1.en"
                :label="$t('Type')"
                class="mt-4"
                density="compact"
                variant="outlined"
                :items="aiTypes"
              />
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <VSwitch
                v-model="analogValues.ai2.en"
                color="primary"
                hide-details
                density="compact"
                class="pa-2"
                :label="$t('Analog sensor {num}', {num: 2})"
              />
              <VTextField
                v-model="analogValues.ai2.label"
                :disabled="!analogValues.ai2.en"
                :label="$t('Name')"
                prepend-inner-icon="mdi-sine-wave"
              >
                <template #append>
                  <VBadge
                    class="ml-n2"
                    dot
                    :color="analogValues.ai2?.ext ? 'orange' : 'transparent'"
                  >
                    <VBtn
                      height="40"
                      icon="mdi-dots-horizontal"
                      variant="text"
                      density="comfortable"
                      color="default"
                      @click="openDiModal(analogValues.ai2)"
                    />
                  </VBadge>
                </template>
              </VTextField>
              <VAutocomplete
                v-model="analogValues.ai2.type"
                :disabled="!analogValues.ai2.en"
                :label="$t('Type')"
                density="compact"
                variant="outlined"
                class="mt-4"
                :items="aiTypes"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <DebugCard>
                {{ analogValues }}
              </DebugCard>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
      <template #actions>
        <VBtn
          :text="$t('Save')"
          prepend-icon="mdi-content-save"
          @click="saveSettings('ai')"
        />
      </template>
    </VCard>
    <AutomationModal
      ref="diModal"
      v-model="diActive"
      @update:model-value="applyDiAutomationConfig"
    />
  </VWindowitem>
</template>

<style scoped lang="scss">
.ext-enabled {
  position: absolute;
  z-index: 10;
  top: -7px;
  right: -8px
}
</style>
