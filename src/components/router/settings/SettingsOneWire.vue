<script>
import {createSuccessNotification} from "@/helpers/notificationHelper.js";
import AutomationModal from "@/components/chunks/widgets/AutomationModal.vue";
import DebugCard from "@/components/chunks/DebugCard.vue";
import RestartConfirmModal from "@/components/chunks/RestartConfirmModal.vue";

export default {
  name: "SettingsOneWire",
  components: {RestartConfirmModal, DebugCard, AutomationModal},
  data() {
    return {
      type: '1wire',
      values: [],
      deleted: [],
      selectedOwItem: {},
    }
  },
  computed: {
    loading() {
      return this.$store.getters['isLoading']
    },
    settings() {
      return this.$store.getters['getOneWireSettings']
    },
    serverData() {
      return {
        type: this.type,
        data: this.values,
        del: this.deleted
      }
    }
  },
  watch: {
    settings() {
      this.values = this.settings
    }
  },
  created() {
    this.values = this.settings
  },
  methods: {
    onUpdateAutomationConfig(model) {
      this.selectedOwItem = model
    },
    showAutomationModal(owItem) {
      this.selectedOwItem = owItem
      if (!Object.prototype.hasOwnProperty.call(this.selectedOwItem, 'opt')) {
        this.selectedOwItem.opt = []
      }
      if (!Object.prototype.hasOwnProperty.call(this.selectedOwItem, 'ext')) {
        this.selectedOwItem.ext = false
      }
      this.$refs.modal.open()
    },
    deleteOneWireSensor(w) {
      this.values = this.values.filter(wire => wire.sn !== w.sn)
      this.deleted.push(w.sn)
    },
    async saveSettings() {
      const res = await this.$store.dispatch('saveNvsSettings', this.serverData)
      if (res) {
        this.$store.commit('addNotification', createSuccessNotification(this.$t('Settings saved')));
        this.$refs.restart.open()
      }
    }
  }

}
</script>

<template>
  <VWindowItem
    value="1wire"
  >
    <RestartConfirmModal ref="restart" />
    <VCard
      :loading="loading"
      :disabled="loading"
    >
      <VCardTitle>{{ $t('1-wire sensors') }}</VCardTitle>
      <VCardText>
        <VContainer fluid>
          <VRow>
            <VCol
              v-for="w in values"
              :key="w.sn"
              md="6"
              cols="12"
            >
              <VCard
                :class="w.active ? '' : 'opacity-50'"
                :title="w.sn.toUpperCase()"
                :subtitle="$t('Serial number')"
              >
                <VCardText>
                  <VTextField
                    v-model="w.label"
                    :label="$t('Name')"
                  >
                    <template
                      v-if="w.active"
                      #append
                    >
                      <VBadge
                        v-if="w.ext"
                        dot
                        color="orange"
                      >
                        <VBtn
                          icon="mdi-dots-horizontal"
                          variant="text"
                          density="comfortable"
                          color="default"
                          @click="showAutomationModal(w)"
                        />
                      </VBadge>
                      <VBtn
                        v-else
                        icon="mdi-dots-horizontal"
                        variant="text"
                        density="comfortable"
                        color="default"
                        @click="showAutomationModal(w)"
                      />
                    </template>
                    <template
                      v-else
                      #append-inner
                    >
                      <VChip
                        v-if="!w.active"
                        :text="$t('Inactive')"
                        color="error"
                        class="mr-2"
                        variant="flat"
                      />
                    </template>
                  </VTextField>
                </VCardText>
                <template #append>
                  <VBtn
                    density="compact"
                    icon="mdi-trash-can"
                    color="error"
                    variant="text"
                    @click="deleteOneWireSensor(w)"
                  />
                </template>
              </VCard>
            </VCol>
          </VRow>
          <DebugCard>
            <VRow>
              <VCol>
                {{ settings }}
              </VCol>
            </VRow>
          </DebugCard>
        </VContainer>
      </VCardText>
      <VCardActions>
        <VBtn
          :disabled="loading"
          :loading="loading"
          :text="$t('Save')"
          prepend-icon="mdi-content-save"
          @click="saveSettings"
        />
      </VCardActions>
    </VCard>
    <AutomationModal
      ref="modal"
      v-model="selectedOwItem"
      @update:model-value="onUpdateAutomationConfig"
    />
  </VWindowItem>
</template>

<style scoped lang="scss">

</style>
