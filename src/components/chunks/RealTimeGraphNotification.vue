<script>
export default {
  name: "RealTimeGraphNotification"
}
</script>

<template>
  <VMenu open-on-hover>
    <template #activator="{props}">
      <VIcon
        color="primary"
        variant="text"
        density="compact"
        icon="mdi-help-circle"
        v-bind="props"
      />
    </template>
    <VAlert
      type="info"
      max-width="400"
      class="pa-4"
    >
      {{ $t('Real-time graph. When switching to another page, the status of the sensors is not written.') }}
    </VAlert>
  </VMenu>
</template>

<style scoped lang="scss">

</style>
