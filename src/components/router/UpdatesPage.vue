<script>
export default {
  name: "UpdatesPage",
  data() {
    return {
      url: null,
    }
  },
  computed: {
    disabled() {
      return !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i.test(this.url)
    }
  },
  methods: {
    async startUpdates() {
      await this.$store.dispatch('startUpdates', {
        url: this.url
      })
    }
  }
}
</script>

<template>
  <VSheet class="fill-height d-flex align-center justify-center">
    <VCard :title="$t('Update from URL')">
      <VCardText>
        <VTextField
          v-model="url"
          prepend-inner-icon="mdi-web"
          label="https://"
        >
          <template #append>
            <VBtn
              density="comfortable"
              variant="text"
              icon="mdi-send"
              :disabled="disabled"
              @click="startUpdates"
            />
          </template>
        </VTextField>
      </VCardText>
    </VCard>
  </VSheet>
</template>

<style scoped lang="scss">

</style>
