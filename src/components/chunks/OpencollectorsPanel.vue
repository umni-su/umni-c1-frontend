<script>
import DebugCard from "@/components/chunks/DebugCard.vue";
import OutputPort from "@/components/chunks/OutputPort.vue";

export default {
  name: "OpenollectorsPanel",
  components: {DebugCard, OutputPort},
  computed:{
    openCollectors(){
      return this.$store.getters['getOpenCollectors']
    }
  }
}
</script>

<template>
  <VContainer fluid>
    <VRow>
      <OutputPort
        v-for="port in openCollectors"
        :key="port"
        capability="opencollectors"
        :port="port"
      />
    </VRow>
    <VRow>
      <DebugCard>
        {{ openCollectors }}
      </DebugCard>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">

</style>
