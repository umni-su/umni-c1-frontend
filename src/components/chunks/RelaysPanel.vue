<script>
import DebugCard from "@/components/chunks/DebugCard.vue";
import OutputPort from "@/components/chunks/OutputPort.vue";
import InputPort from "@/components/chunks/InputPort.vue";

export default {
  name: "RelaysPanel",
  components: {OutputPort, DebugCard},
  computed:{
    outputs(){
      return this.$store.getters['getOutputs']
    }
  }
}
</script>

<template>
  <VContainer fluid>
    <VRow>
      <OutputPort
        v-for="port in outputs"
        :key="port"
        capability="outputs"
        :port="port"
      />
    </VRow>
    <VRow>
      <DebugCard>
        {{ outputs }}
      </DebugCard>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">

</style>
