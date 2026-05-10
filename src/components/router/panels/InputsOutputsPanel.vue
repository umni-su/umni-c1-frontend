<script>
import RelaysPanel from "@/components/chunks/RelaysPanel.vue";
import InputsPanel from "@/components/InputsPanel.vue";
import OpenollectorsPanel from "@/components/chunks/OpencollectorsPanel.vue";

export default {
  name: "InputsOutputsPanel",
  components: {OpenollectorsPanel, InputsPanel, RelaysPanel},
  data(){
    return {
      panels: [],
      event: {
        capability: null,
        identifier: null,
        value: null,
      }
    }
  },
  computed:{
    hasOutputs(){
      return this.$store.getters['hasOutputs'];
    },
    hasInputs(){
      return this.$store.getters['hasInputs'];
    },
    hasOpenCollectors(){
      return this.$store.getters['hasOpenCollectors'];
    },

  },
  watch:{

  },
  async created(){
    if(this.hasOutputs){
      this.panels.push('outputs')
    }
    if(this.hasInputs){
      this.panels.push('inputs')
    }
    if(this.hasOpenCollectors){
      this.panels.push('opencollectors')
    }
    await this.getData();
  },
  methods:{
    async getInputs(){
      await this.$store.dispatch('getConf', 'inputs').catch(e=>{
        console.log(e)
      });
    },
    async getOutputs(){
      await this.$store.dispatch('getConf', 'outputs').catch(e=>{
        console.log(e)
      });
    },
    async getOpenCollectors(){
      await this.$store.dispatch('getConf', 'opencollectors').catch(e=>{
        console.log(e)
      });
    },
    async getData(){
      if(this.hasOutputs){
        await this.getOutputs();
      }
      if(this.hasInputs){
        await this.getInputs();
      }
      if(this.hasOpenCollectors){
        await this.getOpenCollectors();
      }
    }
  }
}
</script>

<template>
  <VWindowItem
    class="fill-height"
    value="dio"
  >
    <VSheet
      width="100%"
      color="transparent"
    >
      <VExpansionPanels
        v-model="panels"
        multiple
      >
        <VExpansionPanel
          v-if="hasOutputs"
          value="outputs"
        >
          <VExpansionPanelTitle>
            {{ $t('Outputs') }}
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <RelaysPanel />
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel
          v-if="hasInputs"
          value="inputs"
        >
          <VExpansionPanelTitle>
            {{ $t('Inputs') }}
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <InputsPanel />
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel
          v-if="hasOpenCollectors"
          value="opencollectors"
        >
          <VExpansionPanelTitle>
            {{ $t('Open collector') }}
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <OpenollectorsPanel />
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VSheet>
  </VWindowItem>
</template>

<style scoped lang="scss">

</style>
