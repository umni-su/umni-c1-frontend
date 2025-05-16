<script>
import {markRaw} from "vue";
import * as echarts from 'echarts';
import RealTimeGraphNotification from "@/components/chunks/RealTimeGraphNotification.vue";

export default {
  name: "AnalogSensors",
  components: {RealTimeGraphNotification},
  data() {
    return {
      data: null,
      handler: null,
      ntcChart: null,
      aiChart: null
    }
  },
  computed: {
    state() {
      return this.$store.getters['getAiState']
    },
    interval() {
      return this.$store.getters['getRefreshInterval']
    },
    ntc1() {
      return this.state?.ntc1
    },
    ntc2() {
      return this.state?.ntc2
    },
    ai1() {
      return this.state?.ai1
    },
    ai2() {
      return this.state?.ai2
    },
    timeData() {
      return this.$store.state.charts.time
    },
    ntcDataOne() {
      return this.$store.state.charts.ntc1
    },
    ntcDataTwo() {
      return this.$store.state.charts.ntc2
    },
    aiDataOne() {
      return this.$store.state.charts.ai1
    },
    aiDataTwo() {
      return this.$store.state.charts.ai2
    },
    ntcChartOptions() {
      return {
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.timeData,
        },
        yAxis: {
          type: 'value',
          scale: true,
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        legend: {
          data: [
            this.ntc1.label !== null ? this.ntc1.label : this.ntc1.channel,
            this.ntc2.label !== null ? this.ntc2.label : this.ntc2.channel
          ]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: this.ntc1.label !== null ? this.ntc1.label : this.ntc1.channel,
            data: this.ntcDataOne,
            type: 'line',
            smooth: true
          },
          {
            name: this.ntc2.label !== null ? this.ntc2.label : this.ntc2.channel,
            data: this.ntcDataTwo,
            type: 'line',
            smooth: true
          }
        ]
      };
    },
    aiChartOptions() {
      return {
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.timeData
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: [
            this.ai1.label !== null ? this.ai1.label : this.ai1.channel,
            this.ai2.label !== null ? this.ai2.label : this.ai2.channel,
          ]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: this.ai1.label !== null ? this.ai1.label : this.ai1.channel,
            data: this.aiDataOne,
            type: 'line',
            smooth: true
          },
          {
            name: this.ai2.label !== null ? this.ai2.label : this.ai2.channel,
            data: this.aiDataTwo,
            type: 'line',
            smooth: true
          }
        ]
      };
    }
  },
  watch: {
    async interval() {
      clearInterval(this.handler)
      this.handler = setInterval(async () => {
        await this.getAnalogData()
      }, this.interval)
      await this.getAnalogData()
    }
  },
  async created() {
    this.handler = setInterval(async () => {
      await this.getAnalogData()
    }, this.interval)
    await this.getAnalogData()


    this.$nextTick(() => {
      this.ntcChart = markRaw(echarts.init(this.$refs.ntcChart.$el));
      this.aiChart = markRaw(echarts.init(this.$refs.aiChart.$el));
      this.ntcChart.setOption(this.ntcChartOptions)
      this.aiChart.setOption(this.aiChartOptions)
      window.addEventListener('resize', () => {
        this.ntcChart.resize()
        this.aiChart.resize()
      })
    })
  },
  unmounted() {
    clearInterval(this.handler)
  },
  methods: {
    async getAnalogData() {
      await this.$store.dispatch('getAnalogState')
      this.ntcChart?.setOption({
        xAxis: {
          data: this.timeData
        },
        series: [
          {
            data: this.ntcDataOne ?? []
          },
          {
            data: this.ntcDataTwo ?? []
          }
        ]
      })
      this.aiChart?.setOption({
        xAxis: {
          data: this.timeData
        },
        series: [
          {
            data: this.aiDataOne ?? []
          },
          {
            data: this.aiDataTwo ?? []
          }
        ]
      })
    }
  }
}
</script>

<template>
  <VWindowItem
    class="fill-height"
    value="analog"
  >
    <VSheet
      class="home-panel fill-height"
      color="transparent"
    >
      <VContainer
        class="h-100"
        fluid
      >
        <VRow>
          <VCol
            cols="12"
          >
            <VCard>
              <template #append>
                <RealTimeGraphNotification />
              </template>
              <template #title>
                {{ $t('NTC thermistor') }}
              </template>
              <template #text>
                <VSheet
                  ref="ntcChart"
                  height="400"
                />
              </template>
            </VCard>
          </VCol>
          <VCol
            cols="12"
          >
            <VCard>
              <template #append>
                <RealTimeGraphNotification />
              </template>
              <template #title>
                {{ $t('Analog sensors') }}
              </template>
              <template #text>
                <VSheet
                  ref="aiChart"
                  height="400"
                />
              </template>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </VSheet>
  </VWindowItem>
</template>

<style scoped>

</style>
