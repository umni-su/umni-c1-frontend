<script>

export default {
  name: 'DateTimeWidget',
  computed: {
    sysinfo() {
      return this.$store.getters['getSystemInfoState']
    },
    date() {
      return this.sysinfo !== null ? new Date(this.sysinfo?.date) : new Date()
    },
    hostname() {
      return this.sysinfo.hostname
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
      <div class="date mb-4">
        {{ day }}.{{ month }}.{{ date.getFullYear() }}
      </div>
      <div class="time">
        {{ date.toTimeString().substring(0, 5) }}
      </div>
      <div class="hostname">
        {{ hostname }}
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
