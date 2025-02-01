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
      class="fill-height bg-primary"
    >
      <VRow class="install-block">
        <VCol
          cols="12"
          class="left d-flex align-center justify-center"
        >
          <VCard
            color="primary-darken"
            class="pa-4 d-flex align-center justify-center flex-column"
            width="340"
            height="100%"
          >
            <UmniLogo class="mb-4" />
            <VForm class="w-100">
              <VTextField
                v-model="username"
                prepend-inner-icon="mdi-account"
                :label="$t('User')"
              />
              <VTextField
                v-model="password"
                prepend-inner-icon="mdi-key"
                type="password"
                :label="$t('Password')"
              />
              <VBtn
                :loading="loading"
                :disabled="disable"
                prepend-icon="mdi-send"
                class="w-100"
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
