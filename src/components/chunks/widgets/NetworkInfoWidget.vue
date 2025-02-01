<script>

export default {
  name: 'NetworkInfoWidget',
  data() {
    return {
      slide: null
    }
  },
  computed: {
    sysinfo() {
      return this.$store.getters['getSystemInfoState']
    },
    netif() {
      return this.sysinfo.netif
    }
  },
  methods: {
    mac(str) {
      const _ex = str.split('')
      let mac = ''
      for (let i = 0; i < _ex.length; i++) {
        mac += _ex[i]
        if (i % 2 && i < _ex.length - 1) {
          mac += ':'
        }
      }
      return mac.toUpperCase()
    }
  }
}
</script>

<template>
  <VCard
    v-if="sysinfo"
    class="network-info"
    height="100%"
    :title="$t('Network information')"
    :subtitle="$t('Network interfaces information')"
  >
    <VCardText>
      <VCarousel
        :cycle="true"
        color="primary"
        hide-delimiter-background
        :show-arrows="false"
        height="190px"
      >
        <VCarouselItem
          v-for="net in netif"
          :key="net.name"
        >
          <VTable>
            <thead>
              <tr>
                <th colspan="3">
                  <div class="text-h6 text-center">
                    {{ net.name }}
                  </div>
                </th>
              </tr>
              <tr>
                <th>{{ $t('Mac address') }}</th>
                <th>{{ $t('IP address') }}</th>
                <th>{{ $t('Network mask') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ mac(net.mac) }}</td>
                <td>{{ net.ip }}</td>
                <td>{{ net.mask }}</td>
              </tr>
            </tbody>
          </VTable>
        </VCarouselItem>
      </VCarousel>
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">
.info {
  .info-inner {
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .value {
    span {
      display: block;
    }
  }
}

</style>
