<script>
export default {
  name: "DebugSwitcher",
  computed: {
    debug() {
      return this.$store.getters['isDebug']
    },
  },
  methods: {
    setDebug() {
      this.$store.commit('setDebug', !this.debug)
    }
  }
}
</script>

<template>
  <VBtn
    v-tooltip="$t('Debug mode')"
    :icon="debug ? 'mdi-bug' :'mdi-bug-outline'"
    :variant="debug ? 'tonal' : 'plain'"
    :color="debug ? 'red' : 'default'"
    @click="setDebug"
  />
</template>

<style scoped lang="scss">

</style>
