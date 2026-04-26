<script>
export default {
  name: "InputPort",
  props: {
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
    isActive(){
      return this.port.active;
    },
    isOn(){
      return this.port.state;
    }
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

  }
}
</script>

<template>
  <VCol
    cols="12"
    md="3"
    sm="6"
  >
    <VCard
      :color="isOn ? 'primary' : 'secondary'"
      :class="isOn ? '' : 'opacity-50'"
      variant="tonal"
    >
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
        {{ $t('Port #{index}',{index: port.port}) }}
      </template>
    </VCard>
  </VCol>
</template>

<style scoped lang="scss">

</style>
