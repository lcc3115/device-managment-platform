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
  import { AirportLocation, Edit } from '@vicons/carbon';
  import { useRouter } from 'vue-router';

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
      // router to cross
      const router = useRouter();
      function goTo(id) {
        router.push({ name: 'crossroad_info', params: { id } });
      }

      function createData() {
        const crossData = crossListRef.value.map((cross: any) => {
          const lng = Number(cross.longitude);
          const lat = Number(cross.latitude);
          const crossTreeOpt = {
            key: cross.crossing_id,
            label: cross.crossing_name,
            suffix: () =>
              h('div', {}, [
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
                h(
                  NButton,
                  {
                    text: true,
                    type: 'primary',
                    onClick: () => {
                      goTo(cross.crossing_id);
                    },
                  },
                  {
                    default: () => h(NIcon, { component: Edit }),
                  }
                ),
              ]),
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
