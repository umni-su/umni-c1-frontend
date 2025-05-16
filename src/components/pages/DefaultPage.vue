<script>
import UmniLogo from "../chunks/UmniLogo.vue";
import ThemeSwitcher from "../chunks/ThemeSwitcher.vue";
import AppLoader from "../chunks/widgets/AppLoader.vue";
import DebugSwitcher from "@/components/chunks/DebugSwitcher.vue";

export default {
  name: "DefaultPage",
  components: {DebugSwitcher, ThemeSwitcher, UmniLogo, AppLoader},
  computed: {
    macname() {
      return this.$store.getters['getMacname']
    },
    theme() {
      return this.$store.getters['getTheme']
    },
    loading() {
      return this.$store.getters['isLoading']
    },
    interval() {
      return this.$store.getters['getRefreshInterval'] / 1000
    },
  },
  async created() {
    const pack = await import('../../../package.json')
    this.$store.commit('setVersion', pack.version)
    if (this.$route.path === '/') {
      this.$router.push({name: 'home_panel'})
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logOut')
    },
    setRefreshInterval(sec) {
      this.$store.commit('setRefreshInterval', sec * 1000)
    }
  }
}
</script>

<template>
  <VSheet
    :color="theme === 'light' ? 'primary' : 'secondary'"
    :class="!$vuetify.display.xs ? 'pa-10' : 'pa-1'"

    rounded="0"
    height="100%"
  >
    <VCard
      max-width="1200px"
      width="100%"
      class="mx-auto h-100"
    >
      <VLayout full-height>
        <VAppBar
          :theme="theme"
          class="pa-1"
          elevation="0"
          rounded="0"
        >
          <template #prepend>
            <VAppBarNavIcon
              :loading="loading"
              density="default"
              :to="{name:'home_panel'}"
            >
              <UmniLogo
                :fill="theme === 'light'?'#008dd2' : 'white'"
                :width="40"
                :height="40"
                class="pa-1 pt-2"
              />
            </VAppBarNavIcon>
          </template>
          <template #title>
            <div class="text-h6">
              {{ macname?.toUpperCase() }}
            </div>
          </template>
          <template #append>
            <VBtn
              density="comfortable"
              :variant="interval === 3 ? 'tonal' :'text'"
              :active="interval === 3"
              icon="mdi-timer-3"
              :color="interval === 3 ? 'primary' :'default'"
              @click="setRefreshInterval(3)"
            />
            <VBtn
              class="mx-2"
              density="comfortable"
              :variant="interval === 10 ? 'tonal' :'text'"
              :active="interval === 10"
              icon="mdi-timer-10"
              :color="interval === 10 ? 'primary' :'default'"
              @click="setRefreshInterval(10)"
            />
            <VBtn
              density="comfortable"
              icon="mdi-update"
              :color="theme === 'dark' ? 'white' : 'dark'"
              :to="{name: 'updates'}"
            />
            <ThemeSwitcher
              class="mx-2"
              density="comfortable"
            />
            <VBtn
              density="comfortable"
              :color="theme === 'dark' ? 'white' : 'dark'"
              variant="text"
              icon="mdi-cog"
              :active="$route.path.startsWith('/settings')"
              :to="{name:'settings'}"
            />
            <DebugSwitcher
              class="mx-2"
              density="comfortable"
            />
            <VBtn
              density="comfortable"
              :color="theme === 'dark' ? 'white' : 'dark'"
              variant="text"
              icon="mdi-logout"
              @click="logout"
            />
          </template>
        </VAppBar>
        <VMain>
          <VSheet
            class="pa-4 pt-2"
            height="100%"
            width="100%"
            color="transparent"
          >
            <VSheet
              height="100%"
              width="100%"
              color="transparent"
            >
              <RouterView />
            </VSheet>
            <AppLoader />
          </VSheet>
        </VMain>
      </VLayout>
    </VCard>
  </VSheet>
</template>

<style scoped>

</style>
