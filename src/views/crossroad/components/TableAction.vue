<template>
  <div class="flex flex-row justify-center children:mx-1">
    <n-tooltip trigger="hover">
      编辑路口
      <template #trigger>
        <n-button circle type="info" @click="toInfoPage">
          <n-icon>
            <Edit />
          </n-icon>
        </n-button>
      </template>
    </n-tooltip>

    <n-popconfirm @positive-click="handleDeleteCrossroad(id)">
      确认删除该路口吗
      <template #trigger>
        <n-tooltip trigger="hover">
          删除路口
          <template #trigger>
            <n-button circle type="warning">
              <n-icon>
                <Delete />
              </n-icon>
            </n-button>
          </template>
        </n-tooltip>
      </template>
    </n-popconfirm>
  </div>
</template>

<script lang="ts">
  import { Edit, Delete } from '@vicons/carbon';
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { deleteCrossroad } from '@/api/crossroad';
  export default defineComponent({
    name: 'TableACtion',
    components: {
      Edit,
      Delete,
    },
    props: {
      id: {
        type: [Number, String],
        required: true,
      },
      refresh: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const router = useRouter();
      function toInfoPage() {
        router.push({ name: `crossroad_info`, params: { id: props.id } });
      }
      // handle delete crossroad in table row.
      async function handleDeleteCrossroad(id) {
        await deleteCrossroad(id);
        props.refresh();
      }

      return {
        toInfoPage,
        handleDeleteCrossroad,
      };
    },
  });
</script>
