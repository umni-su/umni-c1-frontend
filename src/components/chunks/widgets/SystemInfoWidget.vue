<script>
import {resetErrorCodeToString} from '@/helpers/resetReason.js'
import {chipInfoToString} from '@/helpers/chipInfo.js'
import dateToStringDateTime from "@/helpers/dateToStringDateTime.js";

export default {
  name: 'SystemInfoWidget',
  computed: {
    sysinfo() {
      return this.$store.getters['getSystemInfoState']
    },
    lastReset() {
      const date = new Date(this.sysinfo?.last_reset)
      return dateToStringDateTime(date)
    },
    resetReason() {
      return resetErrorCodeToString(this.sysinfo?.reset_reason)
    },
    freeHeap() {
      return this.sysinfo?.free_heap
    },
    totalHeap() {
      return this.sysinfo?.total_heap
    },
    usage() {
      return ((this.totalHeap - this.freeHeap) * 100 / this.totalHeap).toFixed(2)
    },
    className() {
      if (this.usage <= 60) {
        return 'bg-success'
      } else if (this.usage < 80 && this.usage > 60) {
        return 'bg-warning'
      } else {
        return 'bg-error'
      }
    },
    uptime() {
      return this.toDHS(this.sysinfo.uptime)
    },
    version() {
      return this.$store.getters['getVersion']
    }
  },
  methods: {
    chipInfoToString,
    toDHS(t) {
      let cd = 24 * 60 * 60 * 1000 * 1000,
        ch = 60 * 60 * 1000 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000 / 1000),
        pad = function (n) {
          return n < 10 ? '0' + n : n
        }
      if (m === 60) {
        h++
        m = 0
      }
      if (h === 24) {
        d++
        h = 0
      }
      return {days: d, hours: pad(h), minutes: pad(m)}
    }
  }
}
</script>

<template>
  <VCard
    v-if="sysinfo"
    class="fill-height"
    :title="$t('System information')"
  >
    <template #subtitle>
      <VProgressLinear
        class="mt-1"
        color="primary"
        :model-value="usage"
      />
    </template>
    <VTable>
      <tbody>
        <tr>
          <td>{{ $t('Firmware version') }}</td>
          <td>{{ sysinfo?.fw_ver }}</td>
        </tr>
        <tr>
          <td>{{ $t('Web version') }}</td>
          <td>{{ version }}</td>
        </tr>
        <tr>
          <td>{{ $t('Uptime') }}</td>
          <td>{{ uptime.days }}{{ $t('d') }} {{ uptime.hours }}{{ $t('h') }} {{ uptime.minutes }}{{ $t('m') }}</td>
        </tr>
        <tr>
          <td>{{ $t('Memory usage') }}</td>
          <td>{{ usage }}%</td>
        </tr>
        <tr>
          <td>{{ $t('Last reset') }}</td>
          <td>{{ lastReset }}</td>
        </tr>
        <tr>
          <td>{{ $t('Reset reason') }}</td>
          <td>{{ resetReason }}</td>
        </tr>
        <tr>
          <td>{{ $t('Chip and revision') }}</td>
          <td>{{ chipInfoToString(sysinfo.chip) }} REV{{ sysinfo.revision }}</td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>

<style scoped lang="scss">
.card-body-full-height {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -20px;
}


</style>
