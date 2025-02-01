<script>
import UmniLogo from "@/components/chunks/UmniLogo.vue";
import ThemeSwitcher from "@/components/chunks/ThemeSwitcher.vue";

export default {
  name: "DefaultPage",
  components: {ThemeSwitcher, UmniLogo},
  computed: {
    theme() {
      return this.$store.getters['getTheme']
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logOut')
    }
  }
}
</script>

<template>
  <VSheet
    :color="theme === 'light' ? 'primary' : 'secondary'"
    class="pa-10"
    rounded="0"
    height="100%"
  >
    <VCard
      max-width="1000px"
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
          <template #append>
            <VBtn
              icon="mdi-update"
              :color="theme === 'dark' ? 'white' : 'dark'"
            />
            <ThemeSwitcher />
            <VBtn
              :color="theme === 'dark' ? 'white' : 'dark'"
              variant="text"
              icon="mdi-cog"
              :active="$route.path.startsWith('/settings')"
              :to="{name:'settings'}"
            />
            <VBtn
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
          </VSheet>
        </VMain>
      </VLayout>
    </VCard>
  </VSheet>
</template>

<style scoped>

</style>
