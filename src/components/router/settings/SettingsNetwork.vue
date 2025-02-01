<script>
import {createSuccessNotification} from "@/helpers/notificationHelper.js";

export default {
  name: "SettingsWifi",
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
      }
    }
  },

}
</script>

<template>
  <VWindowItem value="network">
    <VCard
      :disabled="loading"
      :loading="loading"
      :title="$t('Wired network settings')"
    >
      <VCardText>
        <VSelect
          v-model="values.et"
          :label="$t('Settings type')"
          :items="netSettingTypes"
          item-value="id"
          item-title="label"
        />
        <div v-if="values.et === 2">
          <VTextField
            v-model="values.eip"
            :label="$t('IP address')"
          />
          <VTextField
            v-model="values.enm"
            :label="$t('Network mask')"
          />
          <VTextField
            v-model="values.egw"
            :label="$t('Gateway')"
          />
          <VTextField
            v-model="values.edns"
            :label="$t('DNS server')"
          />
        </div>
      </VCardText>
      <VCardTitle>{{ $t('Wifi settings') }}</VCardTitle>
      <VCardText>
        <VSelect
          v-model="values.wt"
          :label="$t('Settings type')"
          :items="netSettingTypes"
          item-value="id"
          item-title="label"
        />
        <div v-if="values.wt === 2">
          <VTextField
            v-model="values.wip"
            :label="$t('IP address')"
          />
          <VTextField
            v-model="values.wnm"
            :label="$t('Network mask')"
          />
          <VTextField
            v-model="values.wgw"
            :label="$t('Gateway')"
          />
          <VTextField
            v-model="values.wdns"
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
          :label="$t('SSID name')"
        />
        <VTextField
          v-model="values.stpwd"
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
