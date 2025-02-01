<script>
import {createSuccessNotification} from "@/helpers/notificationHelper.js";

export default {
  name: "SettingsDio",
  data() {
    return {
      type: 'sensors',
      valuesDo: [],
      valuesDi: []
    }
  },
  computed: {
    settingsDo() {
      return this.$store.getters['getDoSettings']
    },
    settingsDi() {
      return this.$store.getters['getDiSettings']
    },
    loading() {
      return this.$store.getters['isLoading']
    },
    serverData() {
      return {do: this.valuesDo, di: this.valuesDi}
    },
  },
  created() {
    this.valuesDo = this.settingsDo
    this.valuesDi = this.settingsDi
  },
  methods: {
    async toggleRelayState(relay) {
      const data = {
        type: 'dio',
        state: {
          index: relay.index,
          state: relay.state === 1 ? 0 : 1
        }
      }
      await this.$store.dispatch('setState', data)
      relay.state = relay.state === 1 ? 0 : 1
    },
    async saveSettings() {
      const res = await this.$store.dispatch('saveNvsSettings', {
        type: this.type,
        data: {
          do: this.valuesDo,
          di: this.valuesDi
        }
      })
      if (res) {
        this.$store.commit('addNotification', createSuccessNotification(this.$t('Settings saved')));
      }
    }
  }
}
</script>

<template>
  <VWindowItem
    value="sensors"
  >
    <VCard
      :disabled="loading"
      :loading="loading"
    >
      <VCardTitle>{{ $t('Relays settings') }}</VCardTitle>
      <VCardText>
        <VContainer fluid>
          <VRow no-gutters>
            <VCol
              v-for="rel in settingsDo"
              :key="rel.index"
              sm="6"
              cols="12"
            >
              <VTextField
                v-model="rel.label"
                class="mr-4"
                :label="$t('Relay #{index} label', {index:rel.index})"
              >
                <template #prepend>
                  <VBtn
                    variant="tonal"
                    :color="rel.state === 1? 'primary' : 'secondary'"
                    :prepend-icon="rel.state === 1? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"
                    @click="toggleRelayState(rel)"
                  >
                    {{ rel.index }}
                  </VBtn>
                </template>
              </VTextField>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
      <VCardTitle>{{ $t('Inputs settings') }}</VCardTitle>
      <VCardText>
        <VContainer fluid>
          <VRow no-gutters>
            <VCol
              v-for="inp in settingsDi"
              :key="inp.index"
              sm="6"
              cols="12"
            >
              <VTextField
                v-model="inp.label"
                class="mr-4"
                :label="$t('Input #{index} label', {index:inp.index})"
              >
                <template #prepend>
                  <VBtn
                    variant="tonal"
                    :color="inp.state === 1? 'primary' : 'secondary'"
                    :prepend-icon="inp.state === 1? 'mdi-bell' : 'mdi-bell-off'"
                    readonly
                  >
                    {{ inp.index }}
                  </VBtn>
                </template>
              </VTextField>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
      <VCardTitle>{{ $t('Analog sensors settings') }}</VCardTitle>
      <VCardText>In develop...</VCardText>
      <template #actions>
        <VBtn
          :text="$t('Save')"
          prepend-icon="mdi-content-save"
          @click="saveSettings"
        />
      </template>
    </VCard>
  </VWindowitem>
</template>

<style scoped lang="scss">

</style>
