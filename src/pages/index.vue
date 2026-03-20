<script setup>
  import { onMounted, reactive, ref, watchEffect, onBeforeUnmount } from 'vue';
  import { useStore } from 'vuex';
  import { statistics1, statistics2, statistics3 } from '@/api/admin';
  import * as echarts from 'echarts';

  var myChart = null;

  const store = useStore();
  const tag = ref('week');
  const loading = ref(true);
  const chartRef = ref(null);
  const data = reactive({
    block: [],
    tip: {
      goods: [],
      order: [],
    },
    statistics: {
      x:[],
      y:[]
    }
  });

  const onChange = async (type) => {
    if (type !== tag.value) {
      tag.value = type;
      const statistics = await statistics3(type);
      data.statistics = statistics;
    }
  }

  onMounted(async () => { 
    const [block, tipData, statistics] = await Promise.all([statistics1(), statistics2(), statistics3()]);
    data.block = block.panels;
    data.tip = tipData;
    data.statistics = statistics;
    loading.value = false;

    window.addEventListener('resize', () => {
      myChart && myChart.resize()
    })
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => myChart && myChart.resize())
  });


  watchEffect(() => {
    const el = document.getElementById('admin_main');
    if (!loading.value && chartRef.value && data.statistics.x.length && el) {
      myChart = echarts.init(el);
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: data.statistics.x
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data.statistics.y,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      });
    }
  }, [loading, chartRef, data]);
</script>

<template>
  <div>
    <div class="block" v-permission="['getStatistics1,GET']">
      <el-skeleton :loading="loading">
        <el-card v-for="(item, idx) in data.block" :key="idx" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>{{item.title}}</span>
              <el-tag :type="item.unitColor || 'primary'">{{item.unit}}</el-tag>
            </div>
          </template>
          <span class="ft30">{{item.value}}</span>
          <template #footer>
            <div class="card-footer">
              <span>{{item.subTitle}}</span>
              <span>{{item.subValue}}</span>
            </div>
          </template>
        </el-card>
      </el-skeleton>
    </div>
    <div class="mt16 block-statistics">
      <div class="echart mr16">
        <div v-permission="['getStatistics3,GET']">
          <el-skeleton :loading="loading">
            <el-card shadow="never">
              <template #header>
                <div class="card-header">
                  <span>订单统计</span>
                  <div class="tags">
                    <el-check-tag :checked="tag === 'month'" @change="() => onChange('month')">近一个月</el-check-tag>
                    <el-check-tag class="ml16 mr16" :checked="tag === 'week'" @change="() => onChange('week')">近一周</el-check-tag>
                    <el-check-tag :checked="tag === 'hour'" @change="() => onChange('hour')">近24小时</el-check-tag>
                  </div>
                </div>
              </template>
              <div style="width: 100%;height:300px;" ref="chartRef" id="admin_main"></div>
            </el-card>
          </el-skeleton>
        </div>
      </div>
      <div class="statistics">
        <div v-permission="['getStatistics2,GET']">
          <el-skeleton :loading="loading">
            <div class="goods-tip">
              <el-card shadow="never">
                <template #header>
                  <div class="card-header">
                    <span>店铺及商品提示</span>
                    <el-tag type="danger">店铺及商品提示</el-tag>
                  </div>
                </template>
                <div v-for="(item, idx) in data.tip.goods" :key="idx">
                  <span>{{item.value}}</span>
                  <span class="mt8">{{item.label}}</span>
                </div>
              </el-card>
            </div>
            <div class="money-tip mt16">
              <el-card shadow="never">
                <template #header>
                  <div class="card-header">
                    <span>交易提示</span>
                    <el-tag type="danger">需要立即处理的交易订单</el-tag>
                  </div>
                </template>
                <div v-for="(item, idx) in data.tip.order" :key="idx">
                  <span>{{item.value}}</span>
                  <span class="mt8">{{item.label}}</span>
                </div>
              </el-card>
            </div>
          </el-skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .block {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    .el-card {
      width: 25%;
      .card-header, .card-footer {
       display: flex;
       justify-content: space-between;
       align-items: center;
      }
    }
  }
  .block-statistics {
    display: flex;
    justify-content: space-between;
    > div {
      flex:1;
    }
    .echart {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .statistics {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .el-card__body {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        > div {
          display: flex;
          flex-direction: column;
          padding: 20px;
          align-items: center;
          background-color: rgba(246,246,246, 1);
        }
      }
    }
  }
</style>
