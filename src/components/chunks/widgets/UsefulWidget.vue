<script>
import packageJson from '../../../../package.json'
import {openUrl} from "@tauri-apps/plugin-opener";

export default {
  name: 'UsefulWidget',
  computed: {
    links() {
      return packageJson.links;
    },
    mqtt() {
      return this.sysinfo.mqtt
    }
  },
  methods: {
    async openExternalLink(url) {
      await openUrl(url);
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
      <VSheet class="text-center">
        <VChip
          color="primary"
          variant="outlined"
          size="large"
          rounded="pill"
          prepend-icon="mdi-web"
          :text="$t('Website')"
          href="#"
          @click.prevent="openExternalLink(links.site)"
        />
        <VChip
          color="success"
          variant="outlined"
          size="large"
          class="mx-3 my-3"
          rounded="pill"
          prepend-icon="mdi-bookmark"
          :text="$t('Documentation')"
          href="#"
          @click.prevent="openExternalLink(links.docs)"
        />
        <VChip
          color="orange"
          variant="outlined"
          size="large"
          rounded="pill"
          prepend-icon="mdi-book"
          :text="$t('API')"
          href="#"
          @click.prevent="openExternalLink(links.api)"
        />
      </VSheet>
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">

</style>
