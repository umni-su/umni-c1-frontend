<script>
export default {
  name: "SettingsPage",
  data() {
    return {
      tab: null
    }
  },
  async created() {
    console.log('Create settings page')
    await this.getSettings()
  },
  methods: {
    async getSettings() {
      await this.$store.dispatch('getNvsSettings')
    },
  }
}
</script>

<template>
  <VSheet
    rounded="0"
    height="100%"
    color="transparent"
  >
    <VTabs
      v-model="tab"
      grow
      center-active
      align-tabs="center"
      show-arrows
    >
      <VTab
        :to="{name:'settings'}"
        value="system"
        prepend-icon="mdi-cog"
      >
        {{ $t('System') }}
      </VTab>
      <VTab
        value="network"
        prepend-icon="mdi-wifi"
        :to="{name:'settings_nw'}"
      >
        {{ $t('Network') }}
      </VTab>
      <VTab
        value="climate"
        prepend-icon="mdi-thermostat"
        :to="{name:'settings_ot'}"
      >
        {{ $t('Climate') }}
      </VTab>
      <VTab
        value="sensors"
        prepend-icon="mdi-dip-switch"
        :to="{name:'settings_dio'}"
      >
        {{ $t('Sensors') }}
      </VTab>

      <VTab
        value="rf"
        prepend-icon="mdi-access-point"
        :to="{name:'settings_rf'}"
      >
        {{ $t('Radio channel') }}
      </VTab>
      <VTab
        value="1wire"
        prepend-icon="mdi-network"
        :to="{name:'settings_1wire'}"
      >
        {{ $t('1-wire') }}
      </VTab>
      <VTab
        value="api"
        prepend-icon="mdi-arrow-decision"
        :to="{name:'settings_api'}"
      >
        {{ $t('Automation') }}
      </VTab>
    </VTabs>
    <VWindow
      v-model="tab"
      class="pa-4"
    >
      <RouterView />
    </VWindow>
  </VSheet>
</template>

<style scoped lang="scss">

</style>
