<script>
import * as echarts from 'echarts';
import {markRaw} from "vue";
import BoilerErrorFlags from "@/components/chunks/BoilerError.vue";
import {baseOptions, gradientOptions} from "@/helpers/chartOptions.js";
import ModalDialog from "@/components/chunks/ModalDialog.vue";
import DebugCard from "@/components/chunks/DebugCard.vue";
import OpenThermComponent from "@/components/chunks/OpenThermComponent.vue";

export default {
  name: "ClimatePanel",
  components: {OpenThermComponent, DebugCard, ModalDialog, BoilerErrorFlags},
  data() {
    return {
      otch: false,
      hwa: false,
      diag: false,
      mode: 'ot',
      chSetpoint: 0,
      dhwSetpoint: 0,
      boilerTemp: 0,
      boilerActive: false,
      dhwActive: false,
      ntc1: 24.18,
      ntc2: 36.23,
      sliderPushed: false,
      handler: null,
      tempChart: null,
      percentChart: null,
      openErrorModal: false,
    }
  },
  computed: {
    ready() {
      return this.state.ready
    },
    interval() {
      return this.$store.getters['getRefreshInterval']
    },
    state() {
      return this.$store.getters['getOpenThermData']
    },
  },
  watch: {
    async interval() {
      clearInterval(this.handler)
      await this.getState()
      this.handler = setInterval(async () => {
        await this.getState()
      }, this.interval)
    }
  },
  async created() {
    await this.getState()
    this.handler = setInterval(async () => {
      await this.getState()
    }, this.interval)
  },
  unmounted() {
    clearInterval(this.handler)
  },
  methods: {
    async getState() {
      await this.$store.dispatch('getOpenThermState')
      if (!this.ready) {
        return
      }

    },

  }
}
</script>

<template>
  <VWindowItem
    value="opentherm"
    class="fill-height"
  >
    <OpenThermComponent
      v-if="state"
      :opentherm-data="state"
    />
  </VWindowItem>
</template>

<style scoped>
.index-panel {
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;

  .sliders {
    display: flex;
    align-items: stretch;
    justify-content: center;

    .slider-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;

      .slider {
        padding: 20px;
        position: relative;

        &.slider-center {
          padding: 0;
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          flex-direction: column;
        }


        .value {
          text-align: center;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-size: 64px;
          line-height: 70px;
          color: var(--u-color-secondary);

          .value-actions {
            position: relative;
          }
        }

        .title {
          color: var(--u-color-secondary);
          text-align: center;
        }
      }
    }
  }

  .ntc-sensors {
    display: flex;
    align-items: center;
    justify-content: center;

  }
}


</style>
