<script>
export default {
  name: "NtcConfCard",
  props: {
    ntc:{
      type:Object,
      default:null
    },
    index: {
      type:Number,
      default:null
    }
  },
  computed: {
    channelData(){
      return this.$store.getters.getState(`ntc${this.index}`)
    },
    temp(){
      return this.channelData?.value?.toFixed(1)
    },
    values(){
      return this.channelData?.history?.values
    },
    color(){
      const temp = parseFloat(this.temp)
      if (temp < 0){
        return 'blue'
      }
      else if (temp > 0 && temp <= 17){
        return 'secondary'
      } else if (temp <= 18 && temp <= 25){
        return 'green'
      } else {
        return 'red'
      }
    }
  }
}
</script>

<template>
  <VCard
    hover
    variant="tonal"
    :title="ntc.label"
    :subtitle="`#ntc${index}`"
  >
    <template #prepend>
      <VIcon
        :color="color"
        class="opacity-50"
        :size="64"
        icon="mdi-thermometer"
      />
    </template>
    <template #append>
      <div class="text-headline-large font-weight-black">
        {{ temp }} <VIcon
          :size="24"
          icon="mdi-temperature-celsius"
        />
      </div>
    </template>
    <template #text>
      <VSparkline
        v-model="values"
        type="trend"
        line-width="2"
        color="secondary"
        auto-draw
        smooth
      />
    </template>
  </VCard>
</template>

<style scoped lang="scss">

</style>
