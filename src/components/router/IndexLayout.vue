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
        value="1wire"
        prepend-icon="mdi-network"
        class="rounded-bs-0 rounded-be-0"
        :to="{name:'one_wire_panel'}"
      >
        {{ $t('1-wire') }}
      </VTab>
      <VTab
        value="relays"
        prepend-icon="mdi-lan"
        class="rounded-bs-0 rounded-be-0"
      >
        {{ $t('CAN bus') }}
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
