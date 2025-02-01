<script>
import LoginPage from "@/components/pages/LoginPage.vue";
import InstallPage from "@/components/pages/InstallPage.vue";
import DefaultPage from "@/components/pages/DefaultPage.vue";
import Notifications from "@/components/chunks/widgets/Notifications.vue";

export default {
  name: 'App',
  components: {Notifications, DefaultPage, InstallPage, LoginPage},
  data() {
    return {
      visible: false
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters['isAuthenticated']
    },
    installed() {
      return this.$store.getters['isInstalled']
    },
    theme() {
      return this.$store.getters['getTheme']
    }
  },
  created() {
    this.checkAuth()
  },
  methods: {
    async checkAuth() {
      await this.$store.dispatch('checkAuth')
      this.visible = true
    }
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

    <Notifications />
  </VApp>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
