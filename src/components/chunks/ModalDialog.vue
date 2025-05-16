<script>
export default {
  name: 'ModalDialog',
  props: {
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue', 'modal-open', 'modal-close'],
  data() {
    return {
      opened: false
    }
  },
  watch: {
    modelValue() {
      this.opened = this.modelValue
    },
    opened() {
      this.$emit('update:modelValue', this.opened)
      this.$emit(this.opened ? 'modal-open' : 'modal-close', this.open)
    }
  },
  created() {
    this.opened = this.modelValue
  }
}
</script>

<template>
  <VDialog
    v-model="opened"
    persistent
    max-width="700"
  >
    <template #default>
      <VCard
        :title="title"
        :subtitle="subtitle"
      >
        <template #append>
          <VBtn
            density="comfortable"
            color="default"
            icon="mdi-close"
            variant="plain"
            @click="opened = false;"
          />
        </template>
        <VCardText>
          <slot />
        </VCardText>
        <div
          v-if="$slots.actions"
          class="actions pb-6 px-6"
        >
          <VSpacer />
          <slot name="actions" />
        </div>
      </VCard>
    </template>
  </VDialog>
</template>

<style scoped>
.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
