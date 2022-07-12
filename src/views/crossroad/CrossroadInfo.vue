<template>
  <n-spin :show="!crossInfo">
    <div class="w-full h-full min-h-600px">
      <n-card v-if="crossInfo">
        <!-- crossroad name -->
        <template #header>
          <div class="flex flex-row items-center justify-between">
            <h1>路口信息</h1>
            <div>
              <n-button type="success" @click="submitInfo" :loading="submitLoading"
                >提交信息</n-button
              >
            </div>
          </div>
        </template>
        <!-- crossroad info -->
        <n-tabs type="line">
          <!-- basic info -->
          <n-tab-pane name="basic" tab="基本信息">
            <n-form ref="basicInfoForm" :model="crossInfo">
              <n-grid cols="0:1 1080:2">
                <n-gi class="p-1">
                  <!-- 路口ID -->
                  <n-form-item-gi label="路口ID" path="crossing_id">
                    <n-input
                      v-model:value="crossInfo.crossing_id"
                      placeholder="路口ID（不可修改）"
                      disabled
                      :show-button="false"
                    />
                  </n-form-item-gi>
                  <!-- 路口名 -->
                  <n-form-item-gi label="路口名" path="crossing_name">
                    <n-input v-model:value="crossInfo.crossing_name" placeholder="路口名" />
                  </n-form-item-gi>
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
                  <!-- 交叉口类型 -->
                  <n-form-item-gi label="交叉口类型" path="intersection">
                    <n-select
                      v-model:value="crossInfo.intersection"
                      placeholder="交叉口类型"
                      :options="intersectionOpts"
                    />
                  </n-form-item-gi>
                  <!-- 交通组织 -->
                  <n-form-item-gi label="交通组织" path="organiz">
                    <n-select
                      v-model:value="crossInfo.organiz"
                      placeholder="交通组织"
                      :options="organizOpts"
                    />
                  </n-form-item-gi>
                  <!-- 路面铺装 -->
                  <n-form-item-gi label="路面铺装" path="road_paving">
                    <n-select
                      v-model:value="crossInfo.road_paving"
                      placeholder="路面铺装"
                      :options="roadPavingOpts"
                    />
                  </n-form-item-gi>
                  <!-- 道路展宽 -->
                  <n-form-item-gi label="道路展宽" path="broadening">
                    <n-select
                      v-model:value="crossInfo.broadening"
                      placeholder="道路展宽"
                      :options="yn"
                    />
                  </n-form-item-gi>
                  <!-- 信控路口 -->
                  <n-form-item-gi label="信控路口" path="issignalcross">
                    <n-select
                      v-model:value="crossInfo.issignalcross"
                      placeholder="信控路口"
                      :options="yn"
                    />
                  </n-form-item-gi>
                  <!-- 路口渠化 -->
                  <n-form-item-gi label="路口渠化" path="Channel">
                    <n-select
                      v-model:value="crossInfo.Channel"
                      placeholder="路口渠化"
                      :options="yn"
                    />
                  </n-form-item-gi>
                </n-gi>

                <!-- map coordinate -->
                <n-gi class="w-full h-full min-h-500px bg-gray-500">
                  <Coordinate :coord="crossCoord" @set-new-coord="setNewCoord" />
                </n-gi>
              </n-grid>
            </n-form>
          </n-tab-pane>

          <!-- 渠化和设施 -->
          <n-tab-pane name="road" tab="渠化">
            <n-form ref="roadForm" :model="crossInfo">
              <!-- 渠化 -->
              <n-card :bordered="false" content-style="padding: 0;">
                <RoadList :road-list="crossInfo.roadList" />
              </n-card>
            </n-form>
          </n-tab-pane>

          <!-- 设施 -->
          <n-tab-pane name="device" tab="设施">
            <n-form>
              <n-grid cols="0:1 1080:2" :x-gap="32">
                <!-- 信号机品牌 -->
                <n-form-item-gi :span="4" label="信号机品牌" path="intersection">
                  <n-select
                    v-model:value="crossInfo.signal_brand"
                    placeholder="信号机品牌"
                    :options="signalBrandOpts"
                  />
                </n-form-item-gi>

                <n-form-item-gi v-for="(device, deviceIndex) in subList" :key="deviceIndex">
                  <n-card :title="getDeviceName(device.attribute)">
                    <n-grid :cols="4" :x-gap="8">
                      <!-- <n-form-item-gi :span="2" label="经度(GCJ02)">
                        <n-input
                          v-model:value="device.longitude"
                          type="text"
                          placeholder="经度"
                          size="medium"
                          clearable
                        />
                      </n-form-item-gi>
                      <n-form-item-gi :span="2" label="纬度(GCJ02)">
                        <n-input
                          v-model:value="device.latitude"
                          type="text"
                          placeholder="纬度"
                          size="medium"
                          clearable
                        />
                      </n-form-item-gi> -->
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
                      <n-form-item-gi :span="4" v-if="device.attribute === 'vehicleSignal'">
                        <n-tabs type="line" size="medium">
                          <n-tab-pane
                            v-for="(light, index) in trafficLightList"
                            :key="index"
                            :name="index"
                            :tab="light.direction"
                          >
                            <n-select
                              :value="renderLabel(light)"
                              multiple
                              :options="options"
                              @update:value="updateLabel($event, index)"
                            />
                          </n-tab-pane>
                        </n-tabs>
                      </n-form-item-gi>
                    </n-grid>
                  </n-card>
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </n-tab-pane>

          <!-- 相位 -->
          <n-tab-pane name="phase" tab="相位">
            <RoadPhase :id="crossInfo.crossing_id" />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </n-spin>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import { FormInst, useMessage } from 'naive-ui';
  import RoadList from './components/RoadList.vue';
  import RoadPhase from './components/RoadPhase.vue';
  import Coordinate from './components/Coordinate.vue';
  import { getCrossroadInfo, changeCrossroadInfo, addCrossroad } from '@/api/crossroad';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    components: {
      RoadList,
      RoadPhase,
      Coordinate,
    },
    setup() {
      const crossInfo = ref();
      const subList = ref();
      const route = useRoute();
      const isAdd = ref(false);
      const message = useMessage();
      const crossCoord = computed({
        get() {
          return {
            lng: Number(crossInfo.value.longitude),
            lat: Number(crossInfo.value.latitude),
          };
        },
        set(coord: any) {
          const lng = coord.x.toFixed(5);
          const lat = coord.y.toFixed(5);
          crossInfo.value.longitude = `${lng}`;
          crossInfo.value.latitude = `${lat}`;
        },
      });

      const trafficLightList = ref();

      function renderLabel(light) {
        const list: any[] = [];
        for (const key in light) {
          const e = light[key];
          if (e === '1') {
            list.push(key);
          }
        }
        console.log(list);
        return list;
      }

      function updateLabel(value, index) {
        trafficLightList.value[index] = {
          direction: trafficLightList.value[index].direction,
          left: '0',
          right: '0',
          round: '0',
          straight: '0',
          turnaround: '0',
        };
        value.forEach((key) => {
          trafficLightList.value[index][key] = '1';
        });
      }

      const options = [
        {
          label: '直行灯',
          value: 'straight',
        },
        {
          label: '左转灯',
          value: 'left',
        },
        {
          label: '右转灯',
          value: 'right',
        },
        {
          label: '掉头灯',
          value: 'turnaround',
        },
        {
          label: '圆盘灯',
          value: 'round',
        },
      ];

      // get cross info
      async function getCrossInfo() {
        const res = await getCrossroadInfo(route.params.id);
        crossInfo.value = res;
        subList.value = crossInfo.value.subList;
        trafficLightList.value = crossInfo.value.phaseList;
      }

      // submit cross info
      const submitLoadingRef = ref(false);
      
      async function submitInfo() {
        submitLoadingRef.value = true;
        const submitData = crossInfo.value;
        if (isAdd.value) {
          // submit add
          const res = await addCrossroad(submitData);
          message.success(`创建${res.d}路口成功`);
          console.log(res);
        } else {
          // submit change
          const res = await changeCrossroadInfo(submitData);
          console.log(res);
        }
        submitLoadingRef.value = false;
      }

      onMounted(() => {
        if (route.params.id) {
          getCrossInfo();
        } else {
          // no id,use add crossroad
          isAdd.value = true;
          crossInfo.value = {
            crossing_id: '',
            intersection: '十字型',
            Channel: '是',
            width_Sections_road: '0',
            width_interse_road: '0',
            crossing_name: '未命名路口',
            longitude: '114.1234',
            latitude: '30.1234',
            organiz: '借道左转',
            signal_brand: '海信',
            road_paving: '沥青',
            broadening: '否',
            issignalcross: '是',
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
            phaseList: [
              {
                direction: '东',
                straight: '0',
                left: '0',
                right: '0',
                turnaround: '0',
                round: '0',
              },
              {
                direction: '南',
                straight: '0',
                left: '0',
                right: '0',
                turnaround: '0',
                round: '0',
              },
              {
                direction: '西',
                straight: '0',
                left: '0',
                right: '0',
                turnaround: '0',
                round: '0',
              },
              {
                direction: '北',
                straight: '0',
                left: '0',
                right: '0',
                turnaround: '0',
                round: '0',
              },
            ],
          };
          subList.value = crossInfo.value.subList;
          trafficLightList.value = crossInfo.value.phaseList;
        }
      });

      // set form
      const basicInfoForm = ref<FormInst | null>(null);
      const roadForm = ref<FormInst | null>(null);

      // options
      const intersectionOpts = ['T型', '十字型', '双十字型一沟两路', '路段', '其他'].map(
        (v) => {
          return {
            label: v,
            value: v,
          };
        }
      );
      const organizOpts = ['借道左转', '可变车道','无'].map((v) => {
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
      const signalBrandOpts = ['海信', '海康', '西门子','其他','无'].map((v) => {
        return {
          label: v,
          value: v,
        };
      });
      const yn = ['是', '否'].map((v) => {
        return {
          label: v,
          value: v,
        };
      });
      return {
        crossInfo,
        basicInfoForm,
        roadForm,
        intersectionOpts,
        organizOpts,
        roadPavingOpts,
        signalBrandOpts,
        subList,
        submitInfo,
        submitLoading: submitLoadingRef,
        crossCoord,
        trafficLightList,
        options,
        renderLabel,
        updateLabel,
        yn
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
      setNewCoord(coord) {
        this.crossCoord = coord;
      },
    },
  });
</script>
