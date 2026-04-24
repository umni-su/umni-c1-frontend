<script>

export default {
  name: 'DateTimeWidget',
  computed: {
    sysinfo() {
      return this.$store.getters['getSystemInfo']
    },
    date() {
      return this.sysinfo !== null ? new Date(this.sysinfo?.date) : new Date()
    },
    hostname() {
      return this.$store.getters['getHostname'].toUpperCase()
    },
    capabilities(){
      return this.$store.getters['getCapabilities']
    },
    day() {
      return this.date.getDate().toString().padStart(2, '0')
    },
    month() {
      return (this.date.getMonth() + 1).toString().padStart(2, '0')
    }
  }
}
</script>

<template>
  <VCard
    v-if="date"
    color="primary"
    height="100%"
    variant="tonal"
  >
    <VCardText class="datetime">
      <div class="text-display-medium font-weight-black">
        {{ hostname }}
      </div>
      <div class="text-body-small mt-1">
        {{ $t('Allowed capabilities') }}
      </div>
      <div class="text-center mt-4">
        <VChip size="small" class="mr-1 mb-1" v-for="cap in capabilities" :key="cap" :text="cap" rounded="pill"></VChip>
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">
.datetime {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .time {
    font-size: 84px;
    line-height: 80px;
  }

  .date {
    color: var(--u-color-secondary);
    font-size: 24px;
  }

  .hostname {
    margin-top: 6px;
    font-weight: bold;
    color: var(--u-color-secondary)
  }
}
</style>
