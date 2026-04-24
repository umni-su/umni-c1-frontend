<script>
import LoginPage from "@/components/pages/LoginPage.vue";
import InstallPage from "@/components/pages/InstallPage.vue";
import DefaultPage from "@/components/pages/DefaultPage.vue";
import Notifications from "@/components/chunks/widgets/Notifications.vue";

export default {
  name: 'App',
  components: {  Notifications, DefaultPage, InstallPage, LoginPage},
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

<style scoped></style>
