<script>
import * as echarts from 'echarts';
import {markRaw} from "vue";
import RealTimeGraphNotification from "@/components/chunks/RealTimeGraphNotification.vue";

export default {
  name: "OneWirePanel",
  components: {RealTimeGraphNotification},
  data() {
    return {
      mode: 'ow',
      handler: null,
      chart: null
    }
  },
  computed: {
    interval() {
      return this.$store.getters['getRefreshInterval']
    },
    state() {
      return this.$store.getters['getOneWireState']
    },
    timeChart() {
      return this.$store.state.charts.timeOw
    },
    dataChart() {
      return this.$store.state.charts.ow
    },
    chartOptions() {
      return {
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        grid: {
          left: '80px',
          right: '50px',
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.timeChart
        },
        yAxis: {
          type: 'value',
          scale: true,
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        legend: {
          data: []
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: this.dataChart
      };
    }
  },
  watch: {
    async interval() {
      clearInterval(this.handler)
      this.handler = setInterval(async () => {
        await this.getState()
      }, this.interval)
      await this.getState()
    }
  },
  async created() {
    this.handler = setInterval(async () => {
      await this.getState()
    }, this.interval)
    await this.getState()
    await Promise.resolve(
      this.$nextTick(() => {
        const height = this.$refs.card.$el.offsetHeight
        this.$refs.chart.$el.style.height = `${height}px`
        this.chart = markRaw(echarts.init(this.$refs.chart.$el))
        this.chart.setOption(this.chartOptions)
        const legendData = this.dataChart.map(ow => ow.name)
        this.chart.setOption({legend: {data: legendData}})
        window.addEventListener('resize', () => {
          this.chart.resize()
        })
      })
    )
  },
  unmounted() {
    clearInterval(this.handler)
  },
  methods: {
    async getState() {
      await this.$store.dispatch('getOneWireState')
      this.chart?.setOption({
        xAxis: {
          data: this.timeChart
        },
        series: this.dataChart
      })
    }
  }
}
</script>

<template>
  <VWindowItem
    value="1wire"
    class="fill-height"
  >
    <VCard
      ref="card"
      class="fill-height"
    >
      <template #title>
        {{ $t('1-wire sensors') }}
      </template>
      <template #append>
        <RealTimeGraphNotification />
      </template>
      <template #text>
        <VSheet
          ref="chart"
          :min-height="400"
        />
      </template>
    </VCard>
  </vwindowitem>
</template>

<style scoped lang="scss">

</style>
