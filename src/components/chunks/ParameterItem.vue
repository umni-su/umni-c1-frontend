<script>
export default {
  name: "ParameterItem",
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    },
    hideSubtitle: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'mdi-information-outline'
    }
  }
}
</script>

<template>
  <VListItem
    rounded="0"
    :title="title"
  >
    <template #prepend>
      <VTooltip
        width="200"
        hover
      >
        <template #activator="{props}">
          <VBtn
            class="mr-2"
            v-bind="props"
            :icon="icon"
            color="default"
            variant="text"
            density="compact"
          />
        </template>
        {{ subtitle }}
      </VTooltip>
    </template>
    <template #append>
      <VListItemAction>
        <slot />
      </VListItemAction>
    </template>
  </VListItem>
</template>
