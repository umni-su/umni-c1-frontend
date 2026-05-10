<script>
import AdcConfCard from "@/components/chunks/AdcConfCard.vue";

export default {
  name: "AdcConf",
  components: {
    AdcConfCard
  },
  computed:{
    ai1() {
      return this.$store.getters.getState('ai1')
    },
    ai2() {
      return this.$store.getters.getState('ai2')
    },
    adcConf(){
      return this.$store.getters['getAdcConf']
    }
  },
  methods:{
    getChannelData(key){
      switch(key){
        case 'ai1':
          return this.ai1
        case 'ai2':
          return this.ai2
        default:
          return null
      }
    },
  }

}
</script>

<template>
  <VSheet>
    <VContainer fluid>
      <VRow>
        <VCol
          v-for="(adc,i) in adcConf.channels"
          :key="adc"
          cols="12"
          md="6"
        >
          <AdcConfCard
            :adc="adc"
            :index="i + 1"
          />
        </VCol>
      </VRow>
    </VContainer>
  </VSheet>
</template>

<style scoped lang="scss">

</style>
