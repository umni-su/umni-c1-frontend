<script>
export default {
  name: "AdcConfCard",
  props: {
    adc:{
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
      return this.$store.getters.getState(`ai${this.index}`)
    },
    value(){
      return this.channelData?.value
    },
    values(){
      return this.channelData?.history?.values
    },
    color(){
      return 'primary'
    }
  }
}
</script>

<template>
  <VCard
    hover
    variant="text"
    :title="adc.label"
    :subtitle="`#ai${index}`"
  >
    <template #prepend>
      <VIcon
        :color="color"
        class="opacity-50"
        :size="64"
        icon="mdi-sine-wave"
      />
    </template>
    <template #append>
      <div class="text-headline-large font-weight-black">
        {{ value }}
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
