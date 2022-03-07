<template>
  <div class="w-full h-full">
    <n-card>
      <!-- crossroad name -->
      <template #header> 路口信息</template>
      <!-- crossroad info -->
      <n-tabs type="line">
        <!-- basic info -->
        <n-tab-pane name="basic" tab="基本信息">
          <n-form ref="basicInfoForm" :model="res">
            <n-grid cols="2">
              <n-gi class="p-1">
                <!-- 路口ID -->
                <n-form-item-gi label="路口ID" path="crossing_id">
                  <n-input-number
                    v-model:value="res.crossing_id"
                    placeholder="路口ID（不可修改）"
                    disabled
                    :show-button="false"
                  />
                </n-form-item-gi>
                <!-- 路口名 -->
                <n-form-item-gi label="路口名" path="crossing_name">
                  <n-input v-model:value="res.crossing_name" placeholder="路口名" />
                </n-form-item-gi>
                <!-- 交叉口类型 -->
                <n-form-item-gi label="交叉口类型" path="intersection">
                  <n-select
                    v-model:value="res.intersection"
                    placeholder="交叉口类型"
                    :options="intersectionOpts"
                  />
                </n-form-item-gi>
                <!-- 交通组织 -->
                <n-form-item-gi label="交通组织" path="organiz">
                  <n-select
                    v-model:value="res.organiz"
                    placeholder="交通组织"
                    :options="organizOpts"
                    multiple
                  />
                </n-form-item-gi>
                <!-- 路面铺装 -->
                <n-form-item-gi label="路面铺装" path="road_paving">
                  <n-select
                    v-model:value="res.road_paving"
                    placeholder="路面铺装"
                    :options="roadPavingOpts"
                  />
                </n-form-item-gi>
              </n-gi>
              <n-gi class="p-1" />
            </n-grid>
          </n-form>
        </n-tab-pane>

        <!-- 渠化和设施 -->
        <n-tab-pane name="road" tab="渠化和设施">
          <n-form ref="roadForm" :model="res">
            <n-grid cols="2">
              <!-- 设施 -->
              <n-gi class="p-1">
                <!-- 信号机品牌 -->
                <n-form-item-gi label="信号机品牌" path="intersection">
                  <n-select
                    v-model:value="res.signal_brand"
                    placeholder="信号机品牌"
                    :options="signalBrandOpts"
                  />
                </n-form-item-gi>
              </n-gi>

              <!-- 渠化 -->
              <n-gi class="p-1">
                <n-card :bordered="false" content-style="padding: 0;">
                  <RoadList :road-list="res.roadList" />
                </n-card>
              </n-gi>
            </n-grid>
          </n-form>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import RoadList from './components/roadList.vue';
  export default defineComponent({
    components: {
      RoadList,
    },
    setup() {
      // get crossinfo
      const res = ref({
        crossing_id: 42010001,
        intersection: '十字型',
        Channel: '有',
        width_Sections_road: '4',
        width_interse_road: '3',
        crossing_name: '测试路口',
        longitude: '30.1234',
        latitude: '114.1234',
        organiz: '借道左转',
        signal_brand: '海信',
        road_paving: '沥青',
        submit_time: '2022-02-1 15:00:00',
        operater: '0',
        roadList: [
          {
            direction: '东',
            export_numb: '3',
            import_numb: '4',
            straight: '0',
            left: '1',
            right: '1',
            turnaround: '0',
            left_turn: '1',
            straight_left: '1',
            straight_right: '0',
            left_straight_right: '0',
            variation: '0',
          },
          {
            direction: '西',
            export_numb: '2',
            import_numb: '4',
            straight: '0',
            left: '1',
            right: '0',
            turnaround: '1',
            left_turn: '1',
            straight_left: '0',
            straight_right: '0',
            left_straight_right: '1',
            variation: '0',
          },
          {
            direction: '南',
            export_numb: '3',
            import_numb: '4',
            straight: '0',
            left: '1',
            right: '1',
            turnaround: '0',
            left_turn: '0',
            straight_left: '1',
            straight_right: '0',
            left_straight_right: '0',
            variation: '1',
          },
          {
            direction: '北',
            export_numb: '4',
            import_numb: '4',
            straight: '0',
            left: '1',
            right: '1',
            turnaround: '0',
            left_turn: '1',
            straight_left: '0',
            straight_right: '0',
            left_straight_right: '1',
            variation: '0',
          },
        ],
        subList: [
          {
            attribute: 'signs',
            longitude: '30.1234',
            latitude: '114.1234',
            east: '有',
            south: '有',
            west: '有',
            north: '有',
          },
          {
            attribute: 'guide',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '有',
            south: '有',
            west: '有',
            north: '有',
          },
          {
            attribute: 'isolation',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '有',
            south: '无',
            west: '有',
            north: '无',
          },
          {
            attribute: 'vehicleSignal',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '有',
            south: '有',
            west: '有',
            north: '有',
          },
          {
            attribute: 'pedeSignal',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '有',
            south: '有',
            west: '有',
            north: '有',
          },
          {
            attribute: 'EPMonitor',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '有',
            south: '有',
            west: '有',
            north: '有',
          },
          {
            attribute: 'videoMonitor',
            longitude: '30.2345',
            latitude: '114.2345',
            east: '有',
            south: '有',
            west: '有',
            north: '有',
          },
        ],
      });
      const basicInfoForm = ref<FormInst | null>(null);
      const roadForm = ref<FormInst | null>(null);

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
      return {
        res,
        basicInfoForm,
        roadForm,
        intersectionOpts,
        organizOpts,
        roadPavingOpts,
        signalBrandOpts,
      };
    },
  });
</script>
