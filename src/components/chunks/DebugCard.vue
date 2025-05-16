<script>
export default {
  name: "DebugCard",
  data() {
    return {
      show: false
    }
  },
  computed: {
    debug() {
      return this.$store.getters['isDebug']
    }
  }
}
</script>

<template>
  <VCard
    v-if="debug"
    color="red"
    variant="tonal"
    class="mt-4"
  >
    <template #prepend>
      <VIcon icon="mdi-bug" />
    </template>
    <template #append>
      <VBtn
        density="compact"
        color="red"
        variant="plain"
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      />
    </template>
    <template #title>
      {{ $t('Debug mode') }}
    </template>
    <template
      v-if="show"
      #text
    >
      <pre><slot /></pre>
    </template>
  </VCard>
</template>

<style scoped lang="scss">

</style>
