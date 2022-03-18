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
          <n-button type="success" @click="toAddCrossroad">新增路口</n-button>
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
  import { Crossroads } from '@vicons/carbon';
  import { h, onMounted, ref } from 'vue';
  import { getCrossroadList } from '@/api/crossroad';
  import TableAction from './components/TableAction.vue';
  import { useRouter } from 'vue-router';

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
      render(data) {
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
    loading.value = false;
  }

  // add
  const router = useRouter();
  function toAddCrossroad() {
    router.push({ name: 'crossroad_add' });
  }

  onMounted(async () => {
    await updateList();
  });
</script>
