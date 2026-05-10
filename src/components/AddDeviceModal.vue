<script>
import {storage as deviceStorage} from "@/store/devices/device_store.js";

import ModalDialog from "@/components/chunks/ModalDialog.vue";

const ipv4Basic = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

export default {
  name: "AddDeviceModal",
  components: {ModalDialog},
  data(){
    return {
      error: false,
      load: false,
      open:false,
      response: null,
      devices: [],
      device:{
        name: null,
        ip:null,
        hostname:null,
        txt: {}
      }
    }
  },
  computed:{
    addDevice(){
      return this.$store.getters['isAddDevice']
    },
    ipIsValid(){
      return ipv4Basic.test(this.device.ip);
    },
    responseHasHostnameAndIp(){
      return this.response?.hostname && this.hasTargetIp(this.device.ip)
    },
  },
  watch:{
    device:{
      deep:true,
      handler(){
        if(!this.responseHasHostnameAndIp){
          this.response = null
        }
      }
    },
    open(v){
      this.$store.commit('setAddDevice',v)
    },
    addDevice(v){
      this.clearDeviceForm()
      this.open = v
    },
  },
  created(){
    this.open = false;
  },
  unmounted() {
    this.open = false;
  },
  methods: {
    hasTargetIp(ip){
      if(this.response?.networks){
        const founded = this.response.networks?.findIndex((item) => item.ip === ip)
        return founded !== -1
      }
      return false
    },
    clearDeviceForm(){
      this.device.name = null
      this.device.ip = null
      this.device.hostname = null
      this.device.txt = {}
    },
    async addDeviceToStore(){
      if(this.responseHasHostnameAndIp){
        const ip = this.device.ip
        const newDevice = {
          name: this.response.hostname,
          ip: ip,
          hostname: `${this.response.hostname}.local`,
          txt: {
            unique_id: this.response.hostname,
            name: this.response.hostname,
          }
        }

        await this.$store.commit('setActiveDevice', { ...newDevice })
        this.open = false
      }
    },
    async getInfo(){
      this.load = true
      this.error = false
      try {
        this.response = await this.$store.dispatch('checkDevice', this.device.ip)
      } catch {
        this.error =true
          this.response = null
      } finally {
        this.load = false
      }
    }
  },
}
</script>

<template>
  <ModalDialog
    v-model="open"
    :title="$t('Add device')"
  >
    <VTextField
      v-model="device.ip"
      clearable
      :hide-details="false"
      :label="$t('IP address')"
    >
      <template #append-inner>
        <VBtn
          :loading="load"
          :disabled="!ipIsValid || load"
          size="small"
          prepend-icon="mdi-send"
          :text="$t('Check')"
          rounded="pill"
          @click="getInfo"
        />
      </template>
      <template #details>
        <div
          v-if="error"
          class="text-error"
        >
          {{ $t('Error while scan device. Maybe device is unavailable.') }}
        </div>
      </template>
    </VTextField>
    <VSheet v-if="responseHasHostnameAndIp">
      <VTextField
        :label="$t('Name')"
        readonly
        class="mb-4"
        :model-value="response.hostname"
      >
        <template #prepend-inner>
          <VIcon
            color="green"
            icon="mdi-check-circle"
          />
        </template>
      </VTextField>
      <VTextField
        :label="$t('Hostname')"
        readonly
        class="mb-4"
        :model-value="`${response.hostname}.local`"
      >
        <template #prepend-inner>
          <VIcon
            color="green"
            icon="mdi-check-circle"
          />
        </template>
      </VTextField>
      <VBtn
        :text="$t('Add')"
        prepend-icon="mdi-plus"
        @click="addDeviceToStore"
      />
    </VSheet>
  </ModalDialog>
</template>

<style scoped lang="scss">

</style>
