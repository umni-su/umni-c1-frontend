<script>
import packageJson from '../../../../package.json'

export default {
  name: 'UsefulWidget',
  computed: {
    links() {
      return packageJson.links;
    },
    mqtt() {
      return this.sysinfo.mqtt
    }
  }
}
</script>

<template>
  <VCard
    v-if="links"
    height="100%"
  >
    <VCardText class="d-flex flex-column align-center justify-center fill-height">
      <VSheet>
        <VChip
          color="primary"
          variant="outlined"
          size="large"
          rounded="pill"
          prepend-icon="mdi-web"
          :text="$t('Website')"
          target="_blank"
          :href="links.site"
        />
        <VChip
          color="success"
          variant="outlined"
          size="large"
          class="mx-3 my-3"
          rounded="pill"
          prepend-icon="mdi-bookmark"
          :text="$t('Documentation')"
          target="_blank"
          :href="links.docs"
        />
        <VChip
          color="orange"
          variant="outlined"
          size="large"
          rounded="pill"
          prepend-icon="mdi-book"
          :text="$t('API')"
          target="_blank"
          :href="links.api"
        />
      </VSheet>
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">

</style>
