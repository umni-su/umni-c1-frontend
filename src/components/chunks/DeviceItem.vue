<script>
import DebugCard from "@/components/chunks/DebugCard.vue";

export default {
  name: "DeviceItem",
  components: {DebugCard},
  props:{
    device:{
      type:Object,
      required:true
    }
  },
  computed: {
    theme(){
      return this.$vuetify.theme.name
    }
  },
  created() {

  },
  methods: {
    openEditDevice(){

    },
    deleteDevice(){

    },
    async setActive(){
      await this.$store.commit('setActiveDevice', this.device)
      this.opened = false
    },
  }
}
</script>

<template>
  <VCard :variant="theme === 'dark' ? 'tonal' : 'elevated'">
    <template #title>
      {{ device.name.toUpperCase() }}
    </template>
    <template #text>
      <div> {{ $t('IP address') }}: {{ device.ip }}</div>
      <div>{{ $t('Activity') }}: {{ $moment(device.lastSeen).fromNow() }}</div>
      <DebugCard>
        {{ device }}
      </DebugCard>
    </template>
    <template #append>
      <VChip
        v-if="device.active"
        color="secondary"
        rounded="pill"
        size="small"
        class="mr-2"
        :text="$t('Default')"
        prepend-icon="mdi-star"
      />
      <VChip
        v-else
        color="primary"
        rounded="pill"
        size="small"
        class="mr-2"
        :text="$t('Choose')"
        prepend-icon="mdi-chevron-right"
        @click="setActive"
      />

      <VMenu>
        <template #activator="{props}">
          <VBtn
            v-bind="props"
            density="comfortable"
            color="default"
            icon="mdi-dots-vertical"
          />
        </template>
        <VList slim>
          <VListSubheader :title="device.name.toUpperCase()" />
          <VListItem
            prepend-icon="mdi-pencil"
            :title="$t('Edit')"
            @click="openEditDevice"
          />
          <VListItem
            base-color="error"
            prepend-icon="mdi-trash-can"
            :title="$t('Delete')"
            @click="deleteDevice"
          />
        </VList>
      </VMenu>
    </template>
  </VCard>
</template>

<style scoped lang="scss">

</style>
