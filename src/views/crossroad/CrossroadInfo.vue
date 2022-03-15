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
        <n-tab-pane name="road" tab="渠化">
          <n-form ref="roadForm" :model="res">
            <n-grid cols="4">
              <!-- 渠化 -->
              <n-gi :span="3" class="p-1">
                <n-card :bordered="false" content-style="padding: 0;">
                  <RoadList :road-list="res.roadList" />
                </n-card>
              </n-gi>
            </n-grid>
          </n-form>
        </n-tab-pane>

        <!-- 设施 -->
        <n-tab-pane name="device" tab="设施">
          <n-form class="w-2/3">
            <n-grid :cols="4" :x-gap="32">
              <!-- 信号机品牌 -->
              <n-form-item-gi :span="4" label="信号机品牌" path="intersection">
                <n-select
                  v-model:value="res.signal_brand"
                  placeholder="信号机品牌"
                  :options="signalBrandOpts"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="2" v-for="(device, deviceIndex) in subList" :key="deviceIndex">
                <n-card :title="getDeviceName(device.attribute)">
                  <n-grid :cols="4" :x-gap="8">
                    <n-form-item-gi :span="2" label="经度">
                      <n-input
                        v-model:value="device.longitude"
                        type="text"
                        placeholder="经度"
                        size="medium"
                        clearable
                      />
                    </n-form-item-gi>
                    <n-form-item-gi :span="2" label="纬度">
                      <n-input
                        v-model:value="device.latitude"
                        type="text"
                        placeholder="纬度"
                        size="medium"
                        clearable
                      />
                    </n-form-item-gi>
                    <n-form-item-gi label="东">
                      <n-switch
                        v-model:value="device.east"
                        checked-value="有"
                        unchecked-value="无"
                      />
                    </n-form-item-gi>
                    <n-form-item-gi label="南">
                      <n-switch
                        v-model:value="device.south"
                        checked-value="有"
                        unchecked-value="无"
                      />
                    </n-form-item-gi>
                    <n-form-item-gi label="西">
                      <n-switch
                        v-model:value="device.west"
                        checked-value="有"
                        unchecked-value="无"
                      />
                    </n-form-item-gi>
                    <n-form-item-gi label="北">
                      <n-switch
                        v-model:value="device.north"
                        checked-value="有"
                        unchecked-value="无"
                      />
                    </n-form-item-gi>
                  </n-grid>
                </n-card>
              </n-form-item-gi>
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
  import RoadList from './components/RoadList.vue';
  export default defineComponent({
    components: {
      RoadList,
    },
    setup() {
      // get crossinfo
      const res = ref({
        crossing_id: 42010001,
        intersection: 'T型',
        Channel: '无',
        width_Sections_road: '3',
        width_interse_road: '3',
        crossing_name: '插入测试路口',
        longitude: '114.89745',
        latitude: '30.56789',
        organiz: '可变车道',
        signal_brand: '西门子',
        road_paving: '水泥',
        submit_time: '2022-03-09 10:33:41',
        operater: '0',
        roadList: [
          {
            direction: '东',
            export_numb: '4',
            import_numb: '5',
            straight: '2',
            left: '1',
            right: '1',
            turnaround: '0',
            left_turn: '0',
            straight_left: '0',
            straight_right: '1',
            left_straight_right: '0',
            variation: '0',
          },
          {
            direction: '南',
            export_numb: '4',
            import_numb: '5',
            straight: '2',
            left: '1',
            right: '1',
            turnaround: '0',
            left_turn: '0',
            straight_left: '0',
            straight_right: '1',
            left_straight_right: '0',
            variation: '0',
          },
          {
            direction: '西',
            export_numb: '4',
            import_numb: '5',
            straight: '2',
            left: '1',
            right: '1',
            turnaround: '0',
            left_turn: '0',
            straight_left: '0',
            straight_right: '1',
            left_straight_right: '0',
            variation: '0',
          },
          {
            direction: '北',
            export_numb: '4',
            import_numb: '5',
            straight: '2',
            left: '1',
            right: '1',
            turnaround: '0',
            left_turn: '0',
            straight_left: '0',
            straight_right: '1',
            left_straight_right: '0',
            variation: '0',
          },
        ],
        subList: [
          {
            attribute: 'signs',
            longitude: '114.89745',
            latitude: '30.56789',
            east: '无',
            south: '无',
            west: '无',
            north: '有',
          },
          {
            attribute: 'guide',
            longitude: '114.89745',
            latitude: '30.56789',
            east: '无',
            south: '无',
            west: '无',
            north: '有',
          },
          {
            attribute: 'isolation',
            longitude: '114.89745',
            latitude: '30.56789',
            east: '无',
            south: '无',
            west: '无',
            north: '有',
          },
          {
            attribute: 'vehicleSignal',
            longitude: '114.89745',
            latitude: '30.56789',
            east: '无',
            south: '无',
            west: '无',
            north: '有',
          },
          {
            attribute: 'pedeSignal',
            longitude: '114.89745',
            latitude: '30.56789',
            east: '无',
            south: '无',
            west: '无',
            north: '有',
          },
          {
            attribute: 'EPMonitor',
            longitude: '114.89745',
            latitude: '30.56789',
            east: '无',
            south: '无',
            west: '无',
            north: '有',
          },
          {
            attribute: 'videoMonitor',
            longitude: '114.89745',
            latitude: '30.56789',
            east: '无 ',
            south: '无',
            west: '无',
            north: '有',
          },
        ],
      });
      const subList = res.value.subList;
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
        subList,
      };
    },
    methods: {
      getDeviceName(attrName) {
        switch (attrName) {
          case 'signs':
            return '指路标志';
          case 'guide':
            return '导向信息';
          case 'isolation':
            return '隔离栏';
          case 'vehicleSignal':
            return '机动车信号灯';
          case 'pedeSignal':
            return '行人信号灯';
          case 'EPMonitor':
            return '电子警察';
          case 'videoMonitor':
            return '视频监控';
          default:
            return '未命名设备';
        }
      },
    },
  });
</script>
