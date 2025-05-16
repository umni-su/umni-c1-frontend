<script>
import ModalDialog from "@/components/chunks/ModalDialog.vue";
import RfSensorCardItem from "@/components/chunks/RfSensorCardItem.vue";
import {createSuccessNotification} from "@/helpers/notificationHelper.js";
import ConfirmationDialog from "@/components/chunks/ConfirmationDialog.vue";
import RfSensorTypeSelect from "@/components/chunks/RfSensorTypeSelect.vue";
import DebugCard from "@/components/chunks/DebugCard.vue";
import AutomationModal from "@/components/chunks/widgets/AutomationModal.vue";
import RestartConfirmModal from "@/components/chunks/RestartConfirmModal.vue";

const sec = 20
export default {
  name: "SettingsRf",
  components: {
    RestartConfirmModal,
    AutomationModal, DebugCard, RfSensorTypeSelect, ConfirmationDialog, RfSensorCardItem, ModalDialog
  },
  data() {
    return {
      type: 'rf',
      search: false,
      scan: false,
      scanHandler: null,
      seconds: sec,
      sensors: [],
      config: [],
      filter: {
        type: null
      },
      activeSensor: {}
    }
  },
  computed: {
    loading() {
      return this.$store.getters['isLoading']
    },
    state() {
      return this.$store.getters['getRfState']
    },
    disabled() {
      return this.sensors.length < 1 || this.sensors.filter(s => {
        return s?.label === undefined || s?.type === undefined
      }).length > 0
    },
    filtered() {
      return this.filter.type > 0 ? this.config.filter(s => s.type === this.filter.type) : this.config
    },
    serverData() {
      return this.sensors.map(s => {
        return {
          serial: s.serial,
          label: s.label,
          type: s.type,
          alarm: s.alarm,
          state: s.state
        }
      })
    }
  },
  async created() {
    await this.getState()
  },
  methods: {
    async getState() {
      await this.$store.dispatch('getRfState')
      this.config = this.state
    },
    addSensor() {
      this.search = true
      this.scan = true
    },
    startScan() {
      this.scan = true;
      this.scanHandler = setInterval(async () => {
        this.seconds--;
        console.log(`scan ${this.seconds}`)
        this.sensors = await this.$store.dispatch('scanRfSensors').finally(() => {
          if (this.seconds < 1) {
            this.stopScan()
          }
        })
      }, 1000)
    },
    stopScan() {
      clearInterval(this.scanHandler)
      this.scan = false;
      this.seconds = sec
    },
    async saveScanned() {
      const res = await this.$store.dispatch('saveNvsSettings', {
        type: this.type,
        data: {
          scan: true,
          sensors: this.serverData
        }
      })
      if (res) {
        this.$store.commit('addNotification', createSuccessNotification(this.$t('Settings saved')))
        this.sensors = []
        await this.getState()
      }
    },
    async saveConfig() {
      const res = await this.$store.dispatch('saveNvsSettings', {
        type: this.type,
        data: {
          scan: false,
          sensors: this.config
        }
      })
      if (res) {
        this.$store.commit('addNotification', createSuccessNotification(this.$t('Settings saved')))
        this.$refs.restart.open()
      }
    },
    async onSensorDelete(sensor) {
      const ok = await this.$refs.conf.show({
        title: this.$t('Deleting sensor'),
        message: this.$t('Delete wireless sensor?'),
        okIcon: 'mdi-trash-can',
        okText: this.$t('Delete'),
        okColor: 'error'
      })
      if (ok) {
        this.config = this.config.filter(s => s.serial !== sensor.serial)
        await this.saveConfig()
      }
    },
    openAutomationModal(sensor) {
      console.log(sensor)
      this.activeSensor = sensor
      this.$refs.automationModal.open()
    },
    updateSensorConfig(model) {
      const index = this.config.findIndex(sensor => sensor.serial === model.serial)
      if (index > -1) {
        this.config[index] = model
      }
    }
  }
}
</script>

<template>
  <VWindowItem
    value="rf"
  >
    <RestartConfirmModal ref="restart" />
    <VCard :disabled="loading">
      <template #title>
        {{ $t('Wireless sensors') }}
      </template>
      <template #append>
        <RfSensorTypeSelect
          v-model="filter.type"
          class="mr-4"
          width="290"
          clearable
          prepend-icon="mdi-filter"
        />
        <VBtn
          prepend-icon="mdi-plus"
          :text="$t('Add')"
          @click="addSensor"
        />
      </template>
      <template #text>
        <VContainer>
          <VRow>
            <VCol
              v-for="(sensor,i) in filtered"
              :key="sensor"
              cols="12"
              md="6"
            >
              <RfSensorCardItem
                v-model="filtered[i]"
                :show-state="false"
                class="mt-4"
                @on-sensor-delete="onSensorDelete"
                @on-more-click="openAutomationModal"
              />
            </VCol>
          </VRow>
          <DebugCard>
            <VRow>
              <VCol>
                {{ config }}
              </VCol>
            </VRow>
          </DebugCard>
        </VContainer>
      </template>
      <template
        v-if="config.length > 0"
        #actions
      >
        <VBtn
          :text="$t('Save')"
          prepend-icon="mdi-content-save"
          @click="saveConfig"
        />
      </template>
    </VCard>
    <ModalDialog
      v-model="search"
      persistent
      @modal-open="startScan"
      @modal-close="stopScan"
    >
      <VEmptyState>
        <template #media>
          <VProgressCircular
            v-if="scan"
            :size="96"
            class="mb-4"
            color="primary"
            indeterminate
          >
            <template #default>
              <div class="text-h5">
                {{ seconds }}
              </div>
            </template>
          </VProgressCircular>
          <VIcon
            v-else
            icon="mdi-remote"
            color="primary"
            class="mb-4"
          />
        </template>
        <template #text>
          {{ $t('Make the sensor triggers, then press the scan button') }}
          <VSheet v-if="sensors.length > 0">
            <RfSensorCardItem
              v-for="(sensor,i) in sensors"
              :key="sensor"
              v-model="sensors[i]"
              hide-delete
              class="mt-4"
            />
          </VSheet>
        </template>
        <template #actions>
          <VBtn
            v-if="scan"
            color="primary"
            prepend-icon="mdi-stop"
            :text="$t('Stop')"
            @click="stopScan"
          />
          <VBtnGroup v-else>
            <VBtn
              :disabled="loading"
              color="primary"
              prepend-icon="mdi-refresh"
              :text="$t('Scan')"
              @click="startScan"
            />
            <VBtn
              v-if="sensors.length > 0"
              class="ml-4"
              :disabled="disabled || loading"
              :text="$t('Save')"
              prepend-icon="mdi-content-save"
              color="primary"
              @click="saveScanned"
            />
          </VBtnGroup>
        </template>
      </VEmptyState>
    </ModalDialog>
    <AutomationModal
      ref="automationModal"
      v-model="activeSensor"
      @update:model-value="updateSensorConfig($event)"
    />
    <ConfirmationDialog ref="conf" />
  </VWindowItem>
</template>

<style scoped lang="scss">

</style>
