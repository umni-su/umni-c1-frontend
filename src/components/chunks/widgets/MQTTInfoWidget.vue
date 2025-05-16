<script>

export default {
  name: 'MQTTInfoWidget',
  computed: {
    sysinfo() {
      return this.$store.getters['getSystemInfoState']
    },
    mqtt() {
      return this.sysinfo.mqtt
    }
  }
}
</script>

<template>
  <VCard
    v-if="sysinfo"
    height="100%"
  >
    <VCardText class="d-flex flex-column align-center justify-center fill-height">
      <div class="text-h6">
        {{ $t('Connection state') }}
      </div>
      <VTooltip
        v-if="mqtt?.server"
        hover
      >
        {{ `${$t('connected to')} ${mqtt?.server}` }}
        <template #activator="{props}">
          <VChip
            class="mt-2"
            v-bind="props"
            color="success"
            variant="tonal"
            prepend-icon="mdi-web"
            :text="mqtt?.server"
          />
        </template>
      </VTooltip>
      <VList width="100%">
        <VListItem
          :subtitle="$t('Connection state')"
          :append-icon="mqtt?.server ? 'mdi-check' : 'mdi-close'"
        />
        <VListItem
          :subtitle="$t('Webhooks')"
          :append-icon="sysinfo.whk === 1 ? 'mdi-check' : 'mdi-close'"
        />
      </VList>
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">

</style>
