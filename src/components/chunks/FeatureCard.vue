<script>
export default {
  name: "FeatureCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    enabled:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon(){
      return this.enabled ? 'mdi-check-circle' : 'mdi-close-circle'
    },
    color(){
      return this.enabled ? 'success' : 'secondary'
    }
  }
}
</script>

<template>
  <VSheet class="pa-1 d-inline-block">
    <VChip
      class="pa-2"
      :color="color"
      rounded="pill"
      variant="tonal"
    >
      <VIcon
        class="mr-1"
        :color="color"
        :icon="icon"
      />
      {{ title }}
      <template
        v-if="$slots.content"
        #append
      >
        <slot name="content" />
      </template>
    </VChip>
  </VSheet>
</template>

<style scoped lang="scss">

</style>
