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
        {{ road }}
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, ref, computed } from 'vue';

  export default defineComponent({
    name: 'RoadList',
    props: {
      roadList: Array,
    },
    setup(props) {
      const { roadList } = toRefs(props);
      const valueRef = ref(0);
      const roadsRef = ref(roadList);
      const addableRef = computed(() => {
        return {
          disabled: roadsRef.value.length >= 10,
        };
      });
      const closableRef = computed(() => {
        return roadsRef.value.length > 1;
      });
      return {
        value: valueRef,
        roads: roadsRef,
        addable: addableRef,
        closable: closableRef,
        handleAdd() {},
        handleClose() {},
      };
    },
  });
</script>
