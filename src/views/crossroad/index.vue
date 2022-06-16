<template>
  <div class="w-full h-full">
    <!-- header -->
    <n-card class="w-full h-full" segmented>
      <!-- header -->
      <template #header>
        <div class="w-full h-full flex flex-row justify-between items-center">
          <!-- left header -->
          <div class="flex items-center">
            <n-icon class="mr-2">
              <Crossroads />
            </n-icon>
            <h1 class="text-xl">路口列表</h1>
          </div>
          <!-- right header -->
          <span>
          <n-button type="success" @click="searchCrossMain">查询数据</n-button>
          
          <n-button type="success" @click="toAddCrossroad">新增路口</n-button>
          </span>
        </div>
        <br/>
        <div>
          <n-form class="px-2" label-placement="left" :model="crossInfo">
            <n-grid :cols="6" x-gap="8">
              <n-form-item-gi  label="路口名" path="crossing_name">
                <n-input type="text" v-model:value="crossInfo.crossing_name" placeholder="路口名" clearable />
              </n-form-item-gi>
              <n-form-item-gi  label="信控路口" path="issignalcross">
                <n-select
                  v-model:value="crossInfo.issignalcross"
                  placeholder="信控路口"
                  :options="yn"
                />
              </n-form-item-gi>
              <n-form-item-gi  label="交叉口类型" path="intersection">
                <n-select
                  v-model:value="crossInfo.intersection"
                  placeholder="交叉口类型"
                  :options="intersectionOpts"
                />
              </n-form-item-gi>
              <n-form-item-gi  label="道路展宽" path="broadening">
                <n-select
                  v-model:value="crossInfo.broadening"
                  placeholder="道路展宽"
                  :options="yn"
                />
              </n-form-item-gi>
              <n-form-item-gi  label="信号机品牌" path="signal_brand">
                <n-select
                  v-model:value="crossInfo.signal_brand"
                  placeholder="信号机品牌"
                  :options="signalBrandOpts"
                />
              </n-form-item-gi>
              <n-form-item-gi  label="路口渠化" path="Channel">
                <n-select
                  v-model:value="crossInfo.Channel"
                  placeholder="路口渠化"
                  :options="yn"
                />
              </n-form-item-gi>
            </n-grid>
          </n-form>
        </div>
      </template>
      <n-data-table
        ref="table"
        striped
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :loading="loading"
        :max-height="600"
      />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import crossInfo from './CrossroadInfo.vue';
  import { Crossroads } from '@vicons/carbon';
  import {  h, onMounted, ref } from 'vue';
  import { searchCrossInfo, getCrossroadList } from '@/api/crossroad';
  import TableAction from './components/TableAction.vue';
  import { useRouter } from 'vue-router';
  // interface crossInfo {
  //   Channel: string;
  //   crossing_name: string;
  //   intersection: string;
  //   signal_brand: string;
  //   broadening: string;
  //   issignalcross: string;
  // }
  // const crossInfo = {
  //   Channel: '',
  // crossing_name: '',
  // intersection: '',
  // signal_brand: '',
  // broadening: '',
  // issignalcross: ''
  // };
  
  
  
  // Table settings
  const pagination = ref({
    pageSize: 15,
  });
  const columns = [
    {
      title: 'ID',
      key: 'crossing_id',
      align: 'center',
    },
    {
      title: '路口名',
      key: 'crossing_name',
      align: 'center',
    },
    {
      title: '交叉口类型',
      key: 'intersection',
      align: 'center',
    },
    {
      title: '交通组织',
      key: 'organiz',
      align: 'center',
    },
    {
      title: '信号机品牌',
      key: 'signal_brand',
      align: 'center',
    },
    {
      title: '路面铺装',
      key: 'road_paving',
      align: 'center',
    },
    {
      title: '道路展宽',
      key: 'broadening',
      align: 'center',
    },
    {
      title: '信控路口',
      key: 'issignalcross',
      align: 'center',
    },
    {
      title: '路口渠化',
      key: 'Channel',
      align: 'center',
    },
    {
      title: '提交日期',
      key: 'submit_time',
      align: 'center',
    },
    {
      title: '操作人',
      key: 'operater',
      align: 'center',
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      render(data: { crossing_id: any; }) {
        return h(TableAction, { id: data.crossing_id, refresh: updateList });
      },
    },
  ];
  const loading = ref(false);

  // Table data
  const data = ref();

  async function updateList() {
    loading.value = true;
    const res = await getCrossroadList();
    data.value = res;
    console.log(data.value);
    loading.value = false;
    
  }

  // add
  const router = useRouter();
  function toAddCrossroad() {
    router.push({ name: 'crossroad_add' });
  }
  
  

  //查询路口主列表
  async function searchCrossMain() {
    console.log(crossInfo);
    loading.value = true;
    const res = await searchCrossInfo(crossInfo);
    
    data.value = res;
    loading.value = false;
    
  }
  
  
  onMounted(async () => {
    await updateList();
  });
  const yn = ['是', '否'].map((v) => {
    return {
      label: v,
      value: v,
    };
  });
  const intersectionOpts = ['T型', '十字型', '双十字型（一沟两路）', '路段', '其他'].map(
    (v) => {
      return {
        label: v,
        value: v,
      };
    }
  );
  const signalBrandOpts = ['海信', '海康', '西门子','其他','无'].map((v) => {
    return {
      label: v,
      value: v,
    };
  });
  
</script>
