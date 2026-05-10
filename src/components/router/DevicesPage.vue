<script>
import DeviceItem from "@/components/chunks/DeviceItem.vue";
import {invoke} from "@tauri-apps/api/core";

export default {
  name: "DevicesPage",
  components: {
    DeviceItem
  },
  data(){
    return {
      term: null
    }
  },
  computed:{
    devices () {
      return this.$store.getters.getFilteredDevices(this.term);
    }
  },
  methods:{
    openAddDevice(){
      this.$store.commit('setAddDevice', true)
    },
    load(){
      return this.$store.getters.getFilteredDevices(this.term);
    },
    async initScanner() {
      this.$store.commit('setScanMode', true);
      try {
        await invoke('start_mdns_discovery');
      } catch (err) {
        console.error("Ошибка mDNS:", err);
      }
    },
  }
}
</script>

<template>
  <VSheet elevation="2">
    <VCard
      variant="text"
      max-width="1200"
      class="mx-auto"
    >
      <template #append>
        <VMenu>
          <template #activator="{props}">
            <VBtn
              variant="text"
              density="comfortable"
              color="default"
              v-bind="props"
              icon="mdi-dots-vertical"
            />
          </template>
        </VMenu>
      </template>
      <template #title>
        {{ $t('My devices') }}
      </template>
      <template #text>
        <VSheet class="mb-4 text-right">
          <VBtn
            class="mr-4"
            prepend-icon="mdi-plus"
            :text="$t('Add device')"
            @click="openAddDevice"
          />
          <VBtn
            color="secondary"
            variant="outlined"
            prepend-icon="mdi-refresh"
            :text="$t('Scan devices')"
            @click="initScanner"
          />
        </VSheet>
        <VTextField
          v-model="term"
          append-inner-icon="mdi-magnify"
          clearable
          class="mb-4"
          :label="$t('Name or IP address')"
        />
        <DeviceItem
          v-for="device in devices"
          :key="device"
          class="mb-4"
          :device="device"
        />
      </template>
    </VCard>
  </VSheet>
</template>

<style scoped lang="scss">

</style>
