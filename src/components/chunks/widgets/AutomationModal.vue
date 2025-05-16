<script>
import ModalDialog from "@/components/chunks/ModalDialog.vue";
import AutomationsSelect from "@/components/chunks/AutomationsSelect.vue";
import DebugCard from "@/components/chunks/DebugCard.vue";

export default {
  name: "AutomationModal",
  components: {
    DebugCard,
    AutomationsSelect,
    ModalDialog
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    }
  },
  emits: ['update:model-value'],
  data() {
    return {
      opened: false,
      model: null
    }
  },
  computed: {
    debug() {
      return this.$store.getters['isDebug']
    }
  },
  watch: {
    modelValue() {
      this.model = this.modelValue
      if (this.model?.opt === null || this.model?.opt === undefined) {
        this.model = {...this.model, ...{opt: []}}
      }
    }
  },
  created() {
    this.model = this.modelValue
    if (this.model?.opt === null || this.model?.opt === undefined) {
      this.model = {...this.model, ...{opt: []}}
    }
  },
  methods: {
    open() {
      this.opened = true
    },
    close() {
      this.opened = false
    },
    onCloseModal() {
      this.$emit('update:model-value', this.model)
      this.close()
    }
  }
}
</script>

<template>
  <ModalDialog
    v-model="opened"
    :title="model.label ?? $t('No name')"
    @modal-close="onCloseModal"
  >
    <VSwitch
      v-model="model.ext"
      :label="$t('Extended actions')"
      color="primary"
    />
    <AutomationsSelect
      v-if="model.ext"
      v-model="model.opt"
    />
    <template #actions>
      <VBtn
        variant="tonal"
        block
        :text="$t('Apply')"
        prepend-icon="mdi-check"
        @click="onCloseModal"
      />
    </template>
    <DebugCard>
      MODELVALUE
      {{ modelValue }}
      MODEL
      {{ model }}
    </DebugCard>
  </ModalDialog>
</template>

<style scoped lang="scss">

</style>
