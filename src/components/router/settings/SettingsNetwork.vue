<script>
import {createSuccessNotification} from "@/helpers/notificationHelper.js";
import RestartConfirmModal from "@/components/chunks/RestartConfirmModal.vue";

export default {
  name: "SettingsWifi",
  components: {RestartConfirmModal},
  data() {
    return {
      type: 'network',
      values: {},
      netSettingTypes: [
        {
          id: 1,
          label: this.$t('Dynamic (DHCP)')
        },
        {
          id: 2,
          label: this.$t('Static IP address')
        }
      ]
    }
  },
  computed: {
    settings() {
      return this.$store.getters['getNetworkSettings']
    },
    loading() {
      return this.$store.getters['isLoading']
    },
    serverData() {
      return this.values
    },
  },
  watch: {
    settings() {
      this.prepareSettings()
    }
  },
  async created() {
    this.prepareSettings()
  },
  methods: {
    prepareSettings() {
      this.values = {...this.settings, ...this.values}
      if (this.values?.wt === null) {
        this.values.wt = 1
      }
      if (this.values?.et === null) {
        this.values.et = 1
      }
    },
    async saveSettings() {
      const res = await this.$store.dispatch('saveNvsSettings', {
        type: this.type,
        data: this.serverData
      })
      if (res) {
        this.$store.commit('addNotification', createSuccessNotification(this.$t('Settings saved')));
        this.$refs.restart.open()
      }
    }
  },

}
</script>

<template>
  <VWindowItem value="network">
    <RestartConfirmModal ref="restart" />
    <VCard
      :disabled="loading"
      :loading="loading"
      :title="$t('Wired network settings')"
    >
      <VCardText>
        <VSelect
          v-model="values.et"
          class="mb-4"
          :label="$t('Settings type')"
          :items="netSettingTypes"
          item-value="id"
          item-title="label"
        />
        <div v-if="values.et === 2">
          <VTextField
            v-model="values.eip"
            class="mb-4"
            :label="$t('IP address')"
          />
          <VTextField
            v-model="values.enm"
            class="mb-4"
            :label="$t('Network mask')"
          />
          <VTextField
            v-model="values.egw"
            class="mb-4"
            :label="$t('Gateway')"
          />
          <VTextField
            v-model="values.edns"
            class="mb-4"
            :label="$t('DNS server')"
          />
        </div>
      </VCardText>
      <VCardTitle>{{ $t('Wifi settings') }}</VCardTitle>
      <VCardText>
        <VSelect
          v-model="values.wt"
          class="mb-4"
          :label="$t('Settings type')"
          :items="netSettingTypes"
          item-value="id"
          item-title="label"
        />
        <div v-if="values.wt === 2">
          <VTextField
            v-model="values.wip"
            class="mb-4"
            :label="$t('IP address')"
          />
          <VTextField
            v-model="values.wnm"
            class="mb-4"
            :label="$t('Network mask')"
          />
          <VTextField
            v-model="values.wgw"
            class="mb-4"
            :label="$t('Gateway')"
          />
          <VTextField
            v-model="values.wdns"
            class="mb-4"
            :label="$t('DNS server')"
          />
        </div>
      </VCardText>
      <VCardTitle>
        {{ $t('Station mode') }}
      </VCardTitle>
      <VCardText>
        <VTextField
          v-model="values.stname"
          class="mb-4"
          :label="$t('SSID name')"
        />
        <VTextField
          v-model="values.stpwd"
          class="mb-4"
          type="password"
          :label="$t('SSID password')"
        />
      </VCardText>
      <VCardActions>
        <VBtn
          prepend-icon="mdi-content-save"
          :text="$t('Save')"
          @click="saveSettings"
        />
      </VCardActions>
    </VCard>
  </VWindowItem>
</template>

<style scoped lang="scss">

</style>
