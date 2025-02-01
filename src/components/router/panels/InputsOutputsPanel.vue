<script>
export default {
  name: "InputsOutputsPanel",
  data() {
    return {
      mode: 'dio',
      relays: null,
      inputs: null,
    }
  },
  computed: {
    state() {
      return this.$store.getters['getDioState']
    }
  },
  async created() {
    await this.getState()
  },
  methods: {
    async switchRelay(relay) {
      const data = {
        type: this.mode,
        state: {
          index: relay.index,
          state: relay.state === 1 ? 0 : 1
        }
      }
      await this.$store.dispatch('setState', data)
    },
    async getState() {
      await this.$store.dispatch('getDioState')
      this.relays = this.state.do
      this.inputs = this.state.di
    }
  }
}
</script>

<template>
  <VWindowItem
    class="fill-height"
    value="dio"
  >
    <VSheet height="100%">
      <VContainer fluid>
        <VCard
          :title="$t('Relays')"
          :subtitle="$t('Status management of relay outputs')"
        >
          <VCardText>
            <VRow>
              <VCol
                v-for="relay in relays"
                :key="relay.index"
                md="4"
                sm="6"
              >
                <VBtn
                  :color="relay.state === 1 ? 'primary' : 'secondary'"
                  variant="tonal"
                  width="100%"
                  @click="switchRelay(relay)"
                >
                  <template #prepend>
                    <VIcon
                      v-if="relay === 1"
                      icon="mdi-toggle-switch"
                    />
                    <VIcon
                      v-else
                      icon="mdi-toggle-switch-off"
                    />
                  </template>
                  {{ relay.label === null ? $t(`Relay #{index}`, {index: relay.index}) : relay.label }}
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <VCard
          class="mt-8"
          :title="$t('Inputs')"
          :subtitle="$t('Status of discrete inputs')"
        >
          <VCardText>
            <VRow>
              <VCol
                v-for="input in inputs"
                :key="input.index"
                md="4"
                sm="6"
              >
                <VBtn
                  readonly
                  :color="input.state === 1 ? 'primary' : 'secondary'"
                  variant="tonal"
                  width="100%"
                >
                  <template #prepend>
                    <VIcon
                      v-if="input.state === 1"
                      icon="mdi-bell"
                    />
                    <VIcon
                      v-else
                      icon="mdi-bell-off"
                    />
                  </template>
                  {{ input.label === null ? $t(`Input #{index}`, {index: input.index}) : input.label }}
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VContainer>
    </VSheet>
  </VWindowItem>
</template>

<style scoped lang="scss">

</style>
