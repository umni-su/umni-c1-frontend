<script>
export default {
  name: "DebugSwitcher",
  props: {
    asListItem:{
      type:Boolean,
      default:false
    }
  },
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
  <VListItem
    v-if="asListItem"
    :title="$t('Debug mode')"
    :prepend-icon="debug ? 'mdi-bug' :'mdi-bug-outline'"
    :variant="debug ? 'tonal' : 'plain'"
    :base-color="debug ? 'red' : 'default'"
    @click="setDebug"
  />
  <VBtn
    v-else
    v-tooltip="$t('Debug mode')"
    :icon="debug ? 'mdi-bug' :'mdi-bug-outline'"
    :variant="debug ? 'tonal' : 'plain'"
    :color="debug ? 'red' : 'default'"
    @click="setDebug"
  />
</template>

<style scoped lang="scss">

</style>
