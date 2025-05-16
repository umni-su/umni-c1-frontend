<script>

export default {
  name: 'IndexLayout',

  data() {
    return {
      tab: null,
    }
  },
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
        value="home"
        prepend-icon="mdi-home"
        class="rounded-bs-0 rounded-be-0"
        :to="{name:'home_panel'}"
      >
        {{ $t('Dashboard') }}
      </VTab>
      <VTab
        value="opentherm"
        prepend-icon="mdi-thermostat"
        class="rounded-bs-0 rounded-be-0"
        :to="{name:'climate_panel'}"
      >
        {{ $t('Climate') }}
      </VTab>
      <VTab
        value="dio"
        prepend-icon="mdi-dip-switch"
        class="rounded-bs-0 rounded-be-0"
        :to="{name:'dio_panel'}"
      >
        {{ $t('Relays and inputs') }}
      </VTab>
      <VTab
        value="analog"
        prepend-icon="mdi-sine-wave"
        class="rounded-bs-0 rounded-be-0"
        :to="{name:'analog'}"
      >
        {{ $t('Analog sensors') }}
      </VTab>
      <VTab
        value="rf"
        prepend-icon="mdi-access-point"
        class="rounded-bs-0 rounded-be-0"
        :to="{name:'rf_panel'}"
      >
        {{ $t('Radio channel') }}
      </VTab>
      <VTab
        value="1wire"
        prepend-icon="mdi-network"
        class="rounded-bs-0 rounded-be-0"
        :to="{name:'one_wire_panel'}"
      >
        {{ $t('1-wire') }}
      </VTab>
    </VTabs>
    <VTabsWindow
      v-model="tab"
      class="full-card-window-height"
    >
      <RouterView />
    </VTabsWindow>
  </VSheet>
</template>
<style scoped lang="scss">

</style>
