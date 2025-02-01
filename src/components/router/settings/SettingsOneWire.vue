<script>
import {createSuccessNotification} from "@/helpers/notificationHelper.js";

export default {
  name: "SettingsOneWire",
  data() {
    return {
      type: '1wire',
      values: [],
      deleted: []
    }
  },
  computed: {
    loading() {
      return this.$store.getters['isLoading']
    },
    settings() {
      return this.$store.getters['getOneWireSettings']
    },
    serverData() {
      return {
        type: this.type,
        data: this.values,
        del: this.deleted
      }
    }
  },
  watch: {
    settings() {
      this.values = this.settings
    }
  },
  created() {
    this.values = this.settings
  },
  methods: {
    deleteOneWireSensor(w) {
      this.values = this.values.filter(wire => wire.sn !== w.sn)
      this.deleted.push(w.sn)
    },
    async saveSettings() {
      const res = await this.$store.dispatch('saveNvsSettings', this.serverData)
      if (res) {
        this.$store.commit('addNotification', createSuccessNotification(this.$t('Settings saved')));
      }
    }
  }

}
</script>

<template>
  <VWindowItem
    value="1wire"
  >
    <VCard
      :loading="loading"
      :disabled="loading"
    >
      <VCardTitle>{{ $t('1-wire sensors') }}</VCardTitle>
      <VCardText>
        <VContainer fluid>
          <VRow>
            <VCol
              v-for="w in values"
              :key="w.sn"
              md="6"
              cols="12"
            >
              <VCard
                :color="w.active ? '' : 'secondary'"
                variant="text"

                :title="w.sn"
                :subtitle="$t('Serial number')"
              >
                <VCardText>
                  <VTextField
                    v-model="w.label"
                    :label="$t('Name')"
                  />
                </VCardText>
                <template #append>
                  <VBtn
                    density="compact"
                    icon="mdi-trash-can"
                    color="error"
                    variant="text"
                    @click="deleteOneWireSensor(w)"
                  />
                </template>
              </VCard>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
      <VCardActions>
        <VBtn
          :disabled="loading"
          :loading="loading"
          :text="$t('Save')"
          prepend-icon="mdi-content-save"
          @click="saveSettings"
        />
      </VCardActions>
    </VCard>
  </VWindowItem>
</template>

<style scoped lang="scss">

</style>
