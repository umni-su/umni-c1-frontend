<script>
import ModalDialog from "@/components/chunks/ModalDialog.vue";

export default {
  name: "RestartConfirmModal",
  components: {ModalDialog},
  data() {
    return {
      reboot: false
    }
  },
  methods: {
    open() {
      this.reboot = true
    },
    close() {
      this.reboot = false
    },
    rebootDevice() {
      this.$store.dispatch('reboot')
      location.reload()
    }
  }
}
</script>

<template>
  <ModalDialog
    v-model="reboot"
    :title="$t('Restart device')"
  >
    <VAlert
      icon="mdi-alert"
    >
      <slot name="alert-text">
        {{ $t('Settings has been updated. Probably you must reboot you device.') }}
      </slot>
    </VAlert>
    <template #actions>
      <VBtn
        variant="tonal"
        color="error"
        prepend-icon="mdi-restart"
        :text="$t('Reboot')"
        @click="rebootDevice"
      />
      <VBtn
        class="ml-4"
        variant="tonal"
        prepend-icon="mdi-close"
        :text="$t('Close')"
        @click="close"
      />
    </template>
  </ModalDialog>
</template>

<style scoped lang="scss">

</style>
