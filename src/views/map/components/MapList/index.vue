<template>
  <n-tree
    block-line
    :data="crossData"
    :default-expanded-keys="defaultExpandedKeys"
    :selectable="false"
  />
</template>

<script lang="ts">
  import { NButton, NIcon } from 'naive-ui';
  import { h, defineComponent, ref } from 'vue';
  import { AirportLocation } from '@vicons/carbon';

  export default defineComponent({
    name: 'MapList',
    props: {
      crossList: {
        type: Array,
        required: true,
      },
    },
    emits: ['jumpTo'],
    setup(props, context) {
      const crossListRef = ref(props.crossList);
      // map jump
      function jumpTo(lng: number, lat: number) {
        context.emit('jumpTo', lng, lat);
      }

      function createData() {
        const crossData = crossListRef.value.map((cross: any) => {
          const lng = Number(cross.longitude);
          const lat = Number(cross.latitude);
          const crossTreeOpt = {
            key: cross.crossing_id,
            label: cross.crossing_name,
            suffix: () =>
              h(
                NButton,
                {
                  text: true,
                  type: 'primary',
                  onClick: () => {
                    jumpTo(lng, lat);
                  },
                },
                {
                  default: () => h(NIcon, { component: AirportLocation }),
                }
              ),
          };
          return crossTreeOpt;
        });

        const mapListData = [
          {
            key: 'cross',
            label: '路口',
            children: crossData,
          },
        ];

        return mapListData;
      }
      return {
        crossData: createData(),
        defaultExpandedKeys: ref(['40', '41']),
      };
    },
  });
</script>
