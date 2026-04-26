<script>
export default {
  name: "OutputPort",
  props: {
    capability:{
      type: String,
      required: true
    },
    port:{
      type:Object,
      required:true
    }
  },
  data(){
    return {
      state:0
    }
  },
  computed: {

  },
  watch: {
    state(){
      //
    }
  },
  created() {
    this.state = this.port.state
  },
  methods: {
    async updateOutputState(){
      await this.$store.dispatch('switchRelay',{
        mode: this.capability,
        index: this.port.index,
        level:this.state
      })
    }
  }
}
</script>

<template>
  <VCol
    cols="12"
    md="3"
    sm="6"
  >
    <VCard variant="tonal">
      <template #title>
        {{ port.label }}
      </template>
      <template #append>
        <VBtn
          density="compact"
          variant="plain"
          color="default"
          :text="$t('Edit')"
          icon="mdi-pencil"
        />
      </template>
      <template #subtitle>
        {{ $t('Port #{index}',{index: port.index}) }}
      </template>
      <VCardText class=" pa-0 d-flex align-center justify-center">
        <VSwitch
          v-model="state"
          color="success"
          inline
          inset
          direction="vertical"
          @update:model-value="updateOutputState"
        />
      </VCardText>
    </VCard>
  </VCol>
</template>

<style scoped lang="scss">

</style>
