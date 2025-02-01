<script>
export default {
  name: "OneWirePanel",
  data() {
    return {
      mode: 'ow'
    }
  },
  computed: {
    state() {
      return this.$store.getters['getOneWireState']
    }
  },
  async created() {
    await this.getState()
  },
  methods: {
    async getState() {
      await this.$store.dispatch('getOneWireState')
    }
  }
}
</script>

<template>
  <VWindowItem
    value="1wire"
    class="fill-height"
  >
    <VSheet
      height="100%"
      class="one-wire-panel"
      color="transparent"
    >
      <VContainer fluid>
        <VRow>
          <VCol
            v-for="wire in state"
            :key="wire"
            cols="12"
            md="6"
          >
            <VCard
              :disabled="!wire.active"
              :title="wire.label !== null ? wire.label : $t('No name')"
              :subtitle="wire.sn"
            >
              <template
                v-if="wire.fam === 40"
                #append
              >
                <VIcon icon="mdi-thermometer" />
                {{ wire.val }}&deg;C
              </template>
              <template
                v-else
                #append
              >
                Wire type not implemented {{ wire }}
              </template>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </VSheet>
  </vwindowitem>
</template>

<style scoped lang="scss">

</style>
