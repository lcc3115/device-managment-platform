<template>
  <div class="w-full h-full">
    <n-tabs
      v-model:value="value"
      type="card"
      :addable="addable"
      :closable="closable"
      tab-style="min-width: 80px;"
      @close="handleClose"
      @add="handleAdd"
    >
      <n-tab-pane v-for="(road, roadIndex) in roads" :key="roadIndex" :name="roadIndex">
        <n-form class="px-2" label-placement="left" :model="road">
          <n-grid :cols="2" x-gap="8">
            <n-form-item-gi :span="2" label="方向名" path="direction">
              <n-input v-model:value="road.direction" type="text" placeholder="方向名" clearable />
            </n-form-item-gi>

            <n-form-item-gi label="出口车道数" path="export_numb">
              <n-input v-model:value="road.export_numb" placeholder="出口车道数" clearable />
            </n-form-item-gi>

            <n-form-item-gi label="进口车道数" path="import_numb">
              <n-input v-model:value="road.import_numb" placeholder="进口车道数" clearable />
            </n-form-item-gi>
          </n-grid>

          <n-grid :cols="4" x-gap="8">
            <n-form-item-gi label-placement="top" label="直行" path="straight">
              <n-input v-model:value="road.straight" placeholder="直行" clearable />
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="左转" path="left">
              <n-input v-model:value="road.left" placeholder="左转" clearable />
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="右转" path="right">
              <n-input v-model:value="road.right" placeholder="右转" clearable />
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="调头" path="turnaround">
              <n-input v-model:value="road.turnaround" placeholder="调头" clearable />
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="左调" path="left_turn">
              <n-input v-model:value="road.left_turn" placeholder="左调" clearable />
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="直左" path="straight_left">
              <n-input v-model:value="road.straight_left" placeholder="直左" clearable />
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="直右" path="straight_right">
              <n-input v-model:value="road.straight_right" placeholder="直右" clearable />
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="左直右" path="left_straight_right">
              <n-input v-model:value="road.left_straight_right" placeholder="左直右" clearable />
            </n-form-item-gi>
            <n-form-item-gi label-placement="top" label="可变车道" path="import_numb">
              <n-input v-model:value="road.import_numb" placeholder="可变车道" clearable />
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, ref, computed, PropType } from 'vue';

  interface Road {
    direction: string;
    export_numb: string;
    import_numb: string;
    straight: string;
    left: string;
    right: string;
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
      return {
        value: valueRef,
        roads,
        addable: addableRef,
        closable: closableRef,
        handleAdd() {},
        handleClose() {},
      };
    },
  });
</script>
