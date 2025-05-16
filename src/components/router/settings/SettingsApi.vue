<script>
import {createSuccessNotification} from "@/helpers/notificationHelper.js";
import RestartConfirmModal from "@/components/chunks/RestartConfirmModal.vue";

export default {
  name: "SettingsApi",
  components: {RestartConfirmModal},
  data() {
    return {
      type: 'api',
      values: {
        mqen: false,
        mqhost: null,
        mqport: 0,
        mquser: null,
        mqpwd: null,
        whk: false,
        whkurl: null
      }
    }
  },
  computed: {
    settings() {
      return this.$store.getters['getApiSettings']
    },
    serverData() {
      return {
        type: this.type,
        data: this.values
      }
    },
    loading() {
      return this.$store.getters['isLoading']
    },
    disabled() {
      const re = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
      let status = false;
      if (this.values?.whk === 1 && (this.values?.whkurl === null || !re.test(this.values?.whkurl))) {
        status = true;
      }

      if (this.values?.mqen === 1 && (this.values?.mqhost === null || !re.test(this.values?.mqhost))) {
        status = true;
      }
      return status
    }
  },
  watch: {
    settings() {
      this.values = this.settings
    }
  },
  mounted() {
    this.values = this.settings
  },
  methods: {
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
    value="api"
  >
    <RestartConfirmModal ref="restart" />
    <VCard
      :loading="loading"
      :disabled="loading"
    >
      <VCardTitle>{{ $t('Automation') }}</VCardTitle>
      <VCardText v-if="settings">
        <VSwitch
          v-model.number="values.mqen"
          color="primary"
          hide-details
          :label="$t('Connect to UMNI ECO')"
          :false-value="0"
          :true-value="1"
        />
        <VContainer
          v-if="values.mqen === 1"
          fluid
        >
          <VRow>
            <VCol
              cols="12"
              md="8"
            >
              <VTextField
                v-model="values.mqhost"
                prepend-inner-icon="mdi-web"
                :label="$t('Server address')"
              />
            </VCol>
            <VCol
              cols="12"
              md="4"
            >
              <VTextField
                v-model.number="values.mqport"
                type="number"
                prepend-inner-icon="mdi-counter"
                :label="$t('Server port')"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="values.mquser"
                prepend-inner-icon="mdi-account"
                :label="$t('Username')"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="values.mqpwd"
                prepend-inner-icon="mdi-key"
                type="password"
                :label="$t('Password')"
              />
            </VCol>
          </VRow>
        </VContainer>
        <VSwitch
          v-model.number="values.whk"
          hide-details
          color="primary"
          :label="$t('Use webhooks')"
          :false-value="0"
          :true-value="1"
        />
        <VContainer
          v-if="values.whk === 1"
          fluid
        >
          <VRow no-gutters>
            <VCol
              cols="12"
              md="8"
            >
              <VTextField
                v-model="values.whkurl"
                prepend-inner-icon="mdi-web"
                :label="$t('Webhook address')"
              />
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
      <VCardActions>
        <VBtn
          :disabled="loading || disabled"
          :loading="loading"
          :text="$t('Save')"
          prepend-icon="mdi-content-save"
          @click="saveSettings"
        />
      </VCardActions>
    </VCard>
  </VWindowItem>
</template>

<style scoped lang="scss">

</style>
