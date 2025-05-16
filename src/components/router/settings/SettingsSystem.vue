<script>
import {createSuccessNotification} from "@/helpers/notificationHelper.js";
import ConfirmationDialog from "@/components/chunks/ConfirmationDialog.vue";
import RestartConfirmModal from "@/components/chunks/RestartConfirmModal.vue";

export default {
  name: "SettingsSystem",
  components: {RestartConfirmModal, ConfirmationDialog},
  data() {
    return {
      type: 'system',
      values: {},
      changeCredentials: false,
      updateSources: [
        {
          id: 1,
          label: this.$t('Stable channel'),
        },
        {
          id: 2,
          label: this.$t('Beta channel'),
        }
      ]
    }
  },
  computed: {
    settings() {
      return this.$store.getters['getSystemSettings']
    },
    loading() {
      return this.$store.getters['isLoading']
    },
    serverData() {
      if (this.changeCredentials) {
        return this.values
      } else {
        const data = {...{}, ...this.values}
        delete data.admusr
        delete data.pwd
        return data
      }
    }
  },
  watch: {
    settings() {
      this.values = {...this.settings, ...this.values}
    }
  },
  async created() {
    this.values = {...this.settings, ...this.values}
  },
  methods: {
    async saveSettings() {
      const res = await this.$store.dispatch('saveNvsSettings', {
        type: this.type,
        data: this.serverData
      })
      if (res) {
        this.$store.commit('addNotification', createSuccessNotification(this.$t('Settings saved')));
        this.$refs.restart.open()
      }
    },
    async reboot() {
      const ok = await this.$refs.confirm.show({
        title: this.$t('Restart device'),
        message: this.$t('Are you sure you want to restart device?'),
        okIcon: 'mdi-restart',
        okText: this.$t('Reboot'),
        okColor: 'primary'
      })
      if (ok) {
        this.$store.dispatch('reboot')
        location.reload()
      }
    },
    async factoryReset() {
      const ok = await this.$refs.confirm.show({
        title: this.$t('Factory reset'),
        message: this.$t('Device will be reset all configuration'),
        okIcon: 'mdi-trash-can',
        okText: this.$t('Reset'),
        okColor: 'error'
      })
      if (ok) {
        this.$store.dispatch('factoryReset')
        location.reload()
      }
    }
  },
}
</script>

<template>
  <VWindowItem
    value="system"
  >
    <RestartConfirmModal ref="restart" />
    <VContainer fluid>
      <VRow>
        <VCol
          cols="12"
          md="8"
        >
          <VCard
            :disabled="loading"
            :loading="loading"
            :title="$t('Main settings')"
          >
            <VCardText>
              <VForm>
                <VTextField
                  v-model="values.name"
                  class="mb-4"
                  :label="$t('Hostname')"
                />
                <VSelect
                  v-model="values.upd"
                  item-value="id"
                  item-title="label"
                  class="mb-4"
                  :items="updateSources"
                  :label="$t('Updates source')"
                />
                <VTextField
                  v-model="values.tz"
                  class="mb-4"
                  :label="$t('Timezone')"
                />
                <VTextField
                  v-model="values.ntp"
                  clearable
                  :label="$t('NTP server')"
                />
                <VCheckbox
                  v-model="changeCredentials"
                  :label="$t('Change credentials')"
                />
                <div
                  v-if="changeCredentials"
                  class="mt-4"
                >
                  <VTextField
                    v-model="values.admusr"
                    class="mb-4"
                    clearable
                    :label="$t('Username')"
                  />
                  <VTextField
                    v-model="values.pwd"
                    class="mb-4"
                    clearable
                    :label="$t('Password')"
                  />
                </div>
              </VForm>
            </VCardText>
            <VCardActions>
              <VBtn
                :disabled="loading"
                :loading="loading"
                prepend-icon="mdi-content-save"
                :text="$t('Save')"
                @click="saveSettings"
              />
            </VCardActions>
          </VCard>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <VCard
            :title="$t('Maintenance')"
          >
            <VCardText>
              <VBtn
                class="w-100"
                variant="tonal"
                color="secondary"
                prepend-icon="mdi-download"
                :text="$t('Backup')"
              />
              <VBtn
                class="w-100 mt-4"
                variant="tonal"
                color="primary"
                prepend-icon="mdi-restart"
                :text="$t('Reboot')"
                @click="reboot"
              />
              <VBtn
                class="w-100 mt-4"
                variant="tonal"
                color="error"
                prepend-icon="mdi-trash-can"
                :text="$t('Factory reset')"
                @click="factoryReset"
              />
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
    <ConfirmationDialog ref="confirm" />
  </VWindowItem>
</template>

<style scoped lang="scss">

</style>
