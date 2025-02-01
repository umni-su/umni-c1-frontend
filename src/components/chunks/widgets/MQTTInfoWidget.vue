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
    :title="$t('MQTT status')"
    :subtitle="$t('Connection state')"
  >
    <VCardText>
      <VIcon icon="mdi-web" />
      {{ $t('connected to') }} {{ mqtt.server }}
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">

</style>
