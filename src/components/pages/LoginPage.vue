<script>
import UmniLogo from "@/components/chunks/UmniLogo.vue";

export default {
  name: "LoginPage",
  components: {UmniLogo},
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    disable() {
      return this.$store.getters['isLoading']
    },
    loading() {
      return this.$store.getters['isLoading']
    },
    macname() {
      return this.$store.getters['getMacname']
    },
    theme() {
      return this.$store.getters['getTheme']
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('logIn', {
        u: this.username,
        p: this.password
      })
    }
  }
}
</script>

<template>
  <VLayout
    full-window-height
    width="100%"
  >
    <VContainer
      fluid
      :class="theme === 'light'?'bg-primary': 'default'"
      class="fill-height"
    >
      <VRow class="install-block">
        <VCol
          cols="12"
          class="left d-flex align-center justify-center"
        >
          <VCard
            elevation="10"
            class="pa-4 d-flex align-center justify-center flex-column"
            width="340"
            height="100%"
          >
            <UmniLogo
              :width="250"
              :height="70"
              :short="false"
              class="mb-1 mx-auto"
              color="#008dd2"
            />
            <div class="text-subtitle-2 mb-4 opacity-50">
              {{ macname?.toUpperCase() }}
            </div>
            <VForm class="w-100">
              <VTextField
                v-model="username"
                autocomplete="off"
                class="mb-4"
                prepend-inner-icon="mdi-account"
                :label="$t('User')"
              />
              <VTextField
                v-model="password"
                autocomplete="off"
                class="mb-4"
                prepend-inner-icon="mdi-key"
                type="password"
                :label="$t('Password')"
              />
              <VBtn
                :loading="loading"
                :disabled="disable"
                prepend-icon="mdi-send"
                class="w-100"
                color="primary-darken"
                :text="$t('Login')"
                @click="login"
              />
            </VForm>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VLayout>
</template>

<style scoped>

</style>
