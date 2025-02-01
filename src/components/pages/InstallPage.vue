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
    }
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
        <VSheet
          v-if="!visible"
          color="transparent"
          width="200"
        >
          <UmniLogo
            class="d-block mx-auto"
            :width="180"
            :height="180"
          />
          <div class="mt-6">
            <VBtn
              prepend-icon="mdi-play"
              color="primary-darken"
              width="100%"
              :text="$t('Start')"
              @click="visible = true"
            />
          </div>
        </VSheet>
        <VFadeTransition v-else>
          <VCard
            color="primary-darken"
            class="d-flex align-center justify-center"
            width="340"
            height="100%"
          >
            <VCardText>
              <VContainer>
                <VRow class="install-block">
                  <VCol
                    cols="12"
                    class="left d-flex align-center justify-center"
                  >
                    <UmniLogo />
                  </VCol>
                  <VCol
                    class="right"
                    cols="12"
                  >
                    <VForm>
                      <VTextField
                        v-model="username"
                        prepend-inner-icon="mdi-account"
                        :label="$t('Enter username')"
                      />
                      <VTextField
                        v-model="password"
                        prepend-inner-icon="mdi-key"
                        type="password"
                        :label="$t('Enter password')"
                      />
                      <VTextField
                        v-model="passwordRepeat"
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
