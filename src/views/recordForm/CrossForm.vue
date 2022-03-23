<template>
  <div class="max-w-3xl">
    <n-form ref="basicInfoForm" :model="crossInfo">
      <!-- 路口ID -->
      <n-form-item label="路口ID" path="crossing_id">
        <n-input
          v-model:value="crossInfo.crossing_id"
          placeholder="路口ID（不可修改）"
          disabled
          :show-button="false"
        />
      </n-form-item>
      <!-- 路口名 -->
      <n-form-item label="路口名" path="crossing_name">
        <n-input v-model:value="crossInfo.crossing_name" placeholder="路口名" />
      </n-form-item>
      <!-- 经纬度 -->
      <n-grid cols="2">
        <!-- lng -->
        <n-gi class="p-1">
          <n-form-item-gi label="经度(GCJ02)" path="longitude">
            <n-input v-model:value="crossInfo.longitude" placeholder="经度" />
          </n-form-item-gi>
        </n-gi>
        <!-- lat -->
        <n-gi class="p-1">
          <n-form-item-gi label="纬度(GCJ02)" path="latitude">
            <n-input v-model:value="crossInfo.latitude" placeholder="纬度" />
          </n-form-item-gi>
        </n-gi>
      </n-grid>
      <n-form-item class="w-full h-500px">
        <Coordinate :coord="coord" />
      </n-form-item>
      <!-- 交叉口类型 -->
      <n-form-item label="交叉口类型" path="intersection">
        <n-select
          v-model:value="crossInfo.intersection"
          placeholder="交叉口类型"
          :options="intersectionOpts"
        />
      </n-form-item>
      <!-- 交通组织 -->
      <n-form-item label="交通组织" path="organiz">
        <n-select
          v-model:value="crossInfo.organiz"
          placeholder="交通组织"
          :options="organizOpts"
          multiple
        />
      </n-form-item>
      <!-- 路面铺装 -->
      <n-form-item label="路面铺装" path="road_paving">
        <n-select
          v-model:value="crossInfo.road_paving"
          placeholder="路面铺装"
          :options="roadPavingOpts"
        />
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import Coordinate from '../crossroad/components/Coordinate.vue';

  export default defineComponent({
    name: 'CrossForm',
    components: {
      Coordinate,
    },
    setup() {
      const crossInfo = ref({
        crossing_id: '',
        intersection: '十字型',
        Channel: '无',
        width_Sections_road: '0',
        width_interse_road: '0',
        crossing_name: '未命名路口',
        longitude: '114.1234',
        latitude: '30.1234',
        organiz: '借道左转',
        signal_brand: '海信',
        road_paving: '沥青',
        submit_time: '',
        operater: '0',
        roadList: [],
        subList: [
          {
            attribute: 'signs',
            longitude: '30.1234',
            latitude: '114.1234',
            east: '无',
            south: '无',
            west: '无',
            north: '无',
          },
          {
            attribute: 'guide',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '无',
            south: '无',
            west: '无',
            north: '无',
          },
          {
            attribute: 'isolation',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '无',
            south: '无',
            west: '无',
            north: '无',
          },
          {
            attribute: 'vehicleSignal',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '无',
            south: '无',
            west: '无',
            north: '无',
          },
          {
            attribute: 'pedeSignal',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '无',
            south: '无',
            west: '无',
            north: '无',
          },
          {
            attribute: 'EPMonitor',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '无',
            south: '无',
            west: '无',
            north: '无',
          },
          {
            attribute: 'videoMonitor',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '无',
            south: '无',
            west: '无',
            north: '无',
          },
        ],
      });

      // options
      const intersectionOpts = ['T型', '十字型', '双十字型（一沟两路）', '路段', '其他'].map(
        (v) => {
          return {
            label: v,
            value: v,
          };
        }
      );
      const organizOpts = ['借道左转', '可变车道'].map((v) => {
        return {
          label: v,
          value: v,
        };
      });
      const roadPavingOpts = ['沥青', '水泥', '其他'].map((v) => {
        return {
          label: v,
          value: v,
        };
      });
      const signalBrandOpts = ['海信', '海康', '西门子'].map((v) => {
        return {
          label: v,
          value: v,
        };
      });

      // coord map
      const coord = computed({
        get() {
          return {
            lng: Number(crossInfo.value.longitude),
            lat: Number(crossInfo.value.latitude),
          };
        },
        set(coord: any) {
          crossInfo.value.longitude = `${coord.lng.toFixed(5)}`;
          crossInfo.value.latitude = `${coord.lat.toFixed(5)}`;
        },
      });

      return {
        crossInfo,
        intersectionOpts,
        organizOpts,
        roadPavingOpts,
        signalBrandOpts,
        coord,
      };
    },
  });
</script>
