<script>
import InputPort from "@/components/chunks/InputPort.vue";
import DebugCard from "@/components/chunks/DebugCard.vue";

export default {
  name: "InputsPanel",
  components: {DebugCard, InputPort},
  computed: {
    inputs(){
      return this.$store.getters['getInputs']
    },
  }
}
</script>

<template>
  <VRow>
    <InputPort
      v-for="port in inputs"
      :key="port"
      :port="port"
    />
  </VRow>
  <DebugCard>
    {{ inputs }}
  </DebugCard>
</template>

<style scoped lang="scss">

</style>
