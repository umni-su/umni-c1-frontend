<script>
import UmniLogo from "@/components/chunks/UmniLogo.vue";

export default {
  name: "InstallPage",
  components: {UmniLogo},
  data() {
    return {
      visible: false,
      username: '',
      password: '',
      passwordRepeat: ''
    }
  },
  computed: {
    disable() {
      return this.password.length < 6 || this.password !== this.passwordRepeat || !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(this.password)
    },
    loading() {
      return this.$store.getters['isLoading']
    },
    theme() {
      return this.$store.getters['getTheme']
    },
    macname() {
      return this.$store.getters['getMacname']
    },
  },
  methods: {
    async install() {
      await this.$store.dispatch('install', {
        u: this.username,
        p: this.password,
        pr: this.passwordRepeat
      })
    }
  }
}
</script>

<template>
  <VContainer
    class="bg-primary fill-height"
    fluid
  >
    <VRow class="install-block">
      <VCol
        cols="12"
        class="left d-flex align-center justify-center"
      >
        <VCard
          v-if="!visible"
          class="pa-4 d-flex align-center justify-center flex-column"
          width="340"
        >
          <template #text>
            <UmniLogo
              :width="250"
              :height="70"
              :short="false"
              class="mb-1 mx-auto"
              color="#008dd2"
            />
            <div class="text-subtitle-2 mb-4 opacity-50 text-center">
              {{ macname?.toUpperCase() }}
            </div>
            <div class="mt-6">
              <VBtn
                prepend-icon="mdi-play"
                color="primary-darken"
                width="100%"
                :text="$t('Start')"
                @click="visible = true"
              />
            </div>
          </template>
        </VCard>
        <VFadeTransition v-else>
          <VCard
            class="pa-4 d-flex align-center justify-center flex-column"
            width="340"
          >
            <VCardText>
              <VContainer>
                <VRow class="install-block">
                  <VCol
                    cols="12"
                  >
                    <UmniLogo
                      :width="250"
                      :height="70"
                      :short="false"
                      class="mb-1 mx-auto"
                      color="#008dd2"
                    />
                    <div class="text-subtitle-2 mb-4 opacity-50 text-center">
                      {{ macname?.toUpperCase() }}
                    </div>
                  </VCol>
                  <VCol
                    class="right"
                    cols="12"
                  >
                    <VForm>
                      <VTextField
                        v-model="username"
                        class="mb-4"
                        prepend-inner-icon="mdi-account"
                        :label="$t('Enter username')"
                      />
                      <VTextField
                        v-model="password"
                        class="mb-4"
                        prepend-inner-icon="mdi-key"
                        type="password"
                        :label="$t('Enter password')"
                      />
                      <VTextField
                        v-model="passwordRepeat"
                        class="mb-4"
                        prepend-inner-icon="mdi-key"
                        type="password"
                        :label="$t('Retype password')"
                      />
                      <VBtn
                        :loading="loading"
                        :disabled="disable"
                        prepend-icon="mdi-send"
                        class="w-100"
                        :text="$t('Start to use')"
                        @click="install"
                      />
                    </VForm>
                  </VCol>
                </VRow>
              </VContainer>
            </VCardText>
          </VCard>
        </VFadeTransition>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
</style>
