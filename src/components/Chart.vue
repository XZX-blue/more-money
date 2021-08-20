<template>
 <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import * as echarts from 'echarts'

@Component
export default class Chart extends Vue{
  @Prop() options:any;
  mounted(){
  const chart= echarts.init(this.$refs.wrapper);
    chart.setOption(this.options);
    }
  }
</script>

<style scoped lang="scss">
  .wrapper{
    height: 400px;
  }
</style>
