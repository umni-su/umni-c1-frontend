<script>

export default {
  name: 'IndexLayout',

  data() {
    return {
      tab: null,
    }
  },
  computed: {
    hasOpenTherm(){
      return this.$store.getters.hasOpenTherm
    },
    hasOutputs(){
      return this.$store.getters.hasOutputs
    },
    hasOpenCollectors(){
      return this.$store.getters.hasOpenCollectors
    },
    hasInputs(){
      return this.$store.getters.hasInputs
    },
  },
  methods: {

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
        value="home"
        prepend-icon="mdi-home"
        :to="{name:'home_panel'}"
      >
        {{ $t('Dashboard') }}
      </VTab>
      <VTab
        v-if="hasOpenTherm"
        value="opentherm"
        prepend-icon="mdi-thermostat"
        :to="{name:'climate_panel'}"
      >
        {{ $t('Climate') }}
      </VTab>
      <VTab
        v-if="hasOutputs || hasInputs || hasOpenCollectors"
        value="dio"
        prepend-icon="mdi-dip-switch"
        :to="{name:'dio_panel'}"
      >
        {{ $t('Relays and inputs') }}
      </VTab>
      <VTab
        value="analog"
        prepend-icon="mdi-sine-wave"
        :to="{name:'analog'}"
      >
        {{ $t('Analog sensors') }}
      </VTab>
      <VTab
        value="rf"
        prepend-icon="mdi-access-point"
        :to="{name:'rf_panel'}"
      >
        {{ $t('Radio channel') }}
      </VTab>
      <VTab
        value="1wire"
        prepend-icon="mdi-network"
        :to="{name:'one_wire_panel'}"
      >
        {{ $t('1-wire') }}
      </VTab>
    </VTabs>
    <VTabsWindow
      v-model="tab"
      class="full-card-window-height"
    >
      <VSheet
        max-width="1200"
        class="mx-auto pa-4 fill-height"
      >
        <RouterView />
      </VSheet>
    </VTabsWindow>
  </VSheet>
</template>
<style scoped lang="scss">

</style>
