<script>
import LoginPage from "@/components/pages/LoginPage.vue";
import InstallPage from "@/components/pages/InstallPage.vue";
import DefaultPage from "@/components/pages/DefaultPage.vue";
export default {
  name: 'App',
  components: {
    DefaultPage,
    InstallPage,
    LoginPage
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    authenticated() {
      return true
    },
    installed() {
      return true
    },
    theme() {
      return this.$store.getters['getTheme']
    }
  },
  created() {
    this.visible = true
  },
  methods: {

  }
}
</script>

<template>
  <VApp
    v-if="visible"
    :theme="theme"
  >
    <LoginPage v-if="installed && !authenticated" />
    <InstallPage v-else-if="!installed" />
    <DefaultPage v-else-if="installed && authenticated" />
  </VApp>
</template>

<style>
body {
  /* Добавляет отступ сверху, равный высоте статус-бара/челки */
  padding-top: env(safe-area-inset-top);
  /* На всякий случай для низа (где полоска жестов) */
  padding-bottom: env(safe-area-inset-bottom);
  /* Для боковых вырезов в альбомной ориентации */
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
</style>
