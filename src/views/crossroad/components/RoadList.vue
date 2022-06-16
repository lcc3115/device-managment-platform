<template>
  <div class="w-full h-full">
    <n-tabs
      v-model:value="value"
      type="card"
      :addable="addable"
      :closable="closable"
      tab-style="min-width: 80px;"
      @close="handleDeleteDirection"
      @add="addDirection"
    >
      <n-tab-pane
        v-for="(road, roadIndex) in roads"
        :key="roadIndex"
        :name="roadIndex"
        :tab="road.direction"
      >
        <n-form class="px-2" label-placement="left" :model="road">
          <n-grid :cols="2" x-gap="8">
            <n-form-item-gi :span="2" label="方向名" path="direction">
              <n-select
                  v-model:value="road.direction"
                  placeholder="方向名"
                  :options="direction"
              />
              <!-- <n-input v-model:value="road.direction" type="text" placeholder="方向名" clearable /> -->
            </n-form-item-gi>

            <n-form-item-gi label="出口车道数" path="export_numb">
              <n-select
                  v-model:value="road.export_numb"
                  placeholder="出口车道数"
                  :options="roadnumb"
              />
              <!-- <n-input v-model:value="road.export_numb" placeholder="出口车道数" clearable /> -->
            </n-form-item-gi>

            <n-form-item-gi label="进口车道数" path="import_numb">
              <n-select
                  v-model:value="road.import_numb"
                  placeholder="进口车道数"
                  :options="roadnumb"
              />
              <!-- <n-input v-model:value="road.import_numb" placeholder="进口车道数" clearable /> -->
            </n-form-item-gi>
          </n-grid>

          <n-grid :cols="4" x-gap="8">
            <n-form-item-gi label-placement="top" label="直行" path="straight">
              <n-select
                  v-model:value="road.straight"
                  placeholder="直行"
                  :options="roadnumb"
              />
              <!-- <n-input v-model:value="road.straight" placeholder="直行" clearable /> -->
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="左转" path="left">
              <n-select
                  v-model:value="road.left"
                  placeholder="左转"
                  :options="roadnumb"
              />
              <!-- <n-input v-model:value="road.left" placeholder="左转" clearable /> -->
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="右转" path="right">
              <n-select
                  v-model:value="road.right"
                  placeholder="右转"
                  :options="roadnumb"
              />
              <!-- <n-input v-model:value="road.right" placeholder="右转" clearable /> -->
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="左右转" path="left_right">
              <n-select
                  v-model:value="road.left_right"
                  placeholder="左右转"
                  :options="roadnumb"
              />
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="调头" path="turnaround">
              <n-select
                  v-model:value="road.turnaround"
                  placeholder="调头"
                  :options="roadnumb"
              />
              <!-- <n-input v-model:value="road.turnaround" placeholder="调头" clearable /> -->
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="左调" path="left_turn">
              <n-select
                  v-model:value="road.left_turn"
                  placeholder="左调"
                  :options="roadnumb"
              />
              <!-- <n-input v-model:value="road.left_turn" placeholder="左调" clearable /> -->
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="直左" path="straight_left">
              <n-select
                  v-model:value="road.straight_left"
                  placeholder="直左"
                  :options="roadnumb"
              />
              <!-- <n-input v-model:value="road.straight_left" placeholder="直左" clearable /> -->
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="直右" path="straight_right">
              <n-select
                  v-model:value="road.straight_right"
                  placeholder="直右"
                  :options="roadnumb"
              />
              <!-- <n-input v-model:value="road.straight_right" placeholder="直右" clearable /> -->
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="左直右" path="left_straight_right">
              <n-select
                  v-model:value="road.left_straight_right"
                  placeholder="左直右"
                  :options="roadnumb"
              />
              <!-- <n-input v-model:value="road.left_straight_right" placeholder="左直右" clearable /> -->
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="可变车道" path="variation">
              <n-select
                  v-model:value="road.variation"
                  placeholder="可变车道"
                  :options="roadnumb"
              />
              <!-- <n-input v-model:value="road.variation" placeholder="可变车道" clearable /> -->
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-tab-pane>
    </n-tabs>

    <!-- modal -->

    <!-- direction add modal -->
    <n-modal v-model:show="directionAddModal">
      <n-card>
        <template #header>
          <div> 方向 </div>
        </template>
        <n-form>
          <!-- 方向名 -->
          <n-form-item>
            <n-input />
          </n-form-item>
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>

<script lang="ts">
  import { useDialog } from 'naive-ui';
  import { defineComponent, toRefs, ref, computed, PropType } from 'vue';

  interface Road {
    direction: string;
    export_numb: string;
    import_numb: string;
    straight: string;
    left: string;
    right: string;
    left_right: string;
    turnaround: string;
    left_turn: string;
    straight_left: string;
    straight_right: string;
    left_straight_right: string;
    variation: string;
  }
  
  export default defineComponent({
    name: 'RoadList',
    props: {
      roadList: {
        type: Array as PropType<Road[]>,
        required: true,
      },
    },
    setup(props) {
      const { roadList } = toRefs(props);
      const roads = ref(roadList);
      const valueRef = ref(0);
      const addableRef = computed(() => {
        return {
          disabled: roads.value.length >= 10,
        };
      });
      const closableRef = computed(() => {
        return roads.value.length > 1;
      });
      const direction = ['东', '南', '西','北'].map((v) => {
        return {
          label: v,
          value: v,
        };
      });
      const roadnumb = ['0', '1', '2','3','4','5','6'].map((v) => {
        return {
          label: v,
          value: v,
        };
      });
      // direction model
      const directionAddModal = ref(false);
      // direction add
      function addDirection() {
        const directionNew = {
          direction: '东',
          export_numb: '0',
          import_numb: '0',
          straight: '0',
          left: '0',
          right: '0',
          left_right: '0',
          turnaround: '0',
          left_turn: '0',
          straight_left: '0',
          straight_right: '0',
          left_straight_right: '0',
          variation: '0'
        };
        roads.value.push(directionNew);
        valueRef.value = roads.value.length - 1;
      }
      // direction delete
      const dialog = useDialog();
      function deleteDirection(index: number) {
        roads.value.splice(index, 1);
      }
      function handleDeleteDirection(id) {
        dialog.warning({
          title: '确认删除',
          content: '确认删除此方向吗？',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            deleteDirection(id);
            valueRef.value = roads.value.length - 1;
          },
        });
      }
      
      return {
        value: valueRef,
        roads,
        addable: addableRef,
        closable: closableRef,
        handleAdd() {},
        handleClose() {},
        directionAddModal,
        addDirection,
        handleDeleteDirection,
        direction,
        roadnumb
      };
      
    },
  });
</script>
