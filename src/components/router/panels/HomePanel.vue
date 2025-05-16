<script>
import DateTimeWidget from "@/components/chunks/widgets/DateTimeWidget.vue";
import NetworkInfoWidget from "@/components/chunks/widgets/NetworkInfoWidget.vue";
import SystemInfoWidget from "@/components/chunks/widgets/SystemInfoWidget.vue";
import MQTTInfoWidget from "@/components/chunks/widgets/MQTTInfoWidget.vue";

export default {
  name: "HomePanel",
  components: {MQTTInfoWidget, SystemInfoWidget, NetworkInfoWidget, DateTimeWidget},
  data() {
    return {
      data: null,
      handler: null
    }
  },
  computed: {
    sysinfo() {
      return this.$store.getters['getSystemInfoState']
    },
    interval() {
      return this.$store.getters['getRefreshInterval']
    }
  },
  watch: {
    async interval() {
      clearInterval(this.handler)
      this.handler = setInterval(async () => {
        await this.getSystemInfoState()
      }, this.interval)
      await this.getSystemInfoState()
    }
  },
  async created() {
    this.handler = setInterval(async () => {
      await this.getSystemInfoState()
    }, this.interval)
    await this.getSystemInfoState()
  },
  unmounted() {
    clearInterval(this.handler)
  },
  methods: {
    async getSystemInfoState() {
      await this.$store.dispatch('getSystemInfoState')
    }
  }
}
</script>

<template>
  <VWindowItem
    class="fill-height"
    value="home"
  >
    <VSheet
      v-if="sysinfo"
      class="home-panel fill-height"
      color="transparent"
    >
      <VContainer
        class="h-100"
        fluid
      >
        <VRow class="fill-height">
          <VCol
            cols="12"
            md="6"
          >
            <DateTimeWidget />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <MQTTInfoWidget />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <NetworkInfoWidget />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <SystemInfoWidget />
          </VCol>
        </VRow>
      </VContainer>
    </VSheet>
  </VWindowItem>
</template>

<style scoped>

</style>
