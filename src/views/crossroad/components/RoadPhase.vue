<template>
  <div class="w-full h-full">
    <div v-if="id" class="relative w-full h-full">
      <div class="flex flex-row justify-between">
        <div></div>
        <n-button type="success" @click="handleSubmitPhase" :loading="submitPhaseLoading"
          >更新相位信息</n-button
        >
      </div>
      <n-tabs
        v-if="phaseData"
        v-model:value="schemaTab"
        type="card"
        closable
        addable
        @close="handleSchemaDelete"
        @add="handleSchemaAdd"
      >
        <n-tab-pane
          v-for="(schema, schemaIndex) in schemaList"
          :key="schemaIndex"
          :name="schemaIndex"
          :tab="schema.schema_name"
        >
          <n-form :model="schema">
            <n-form-item label="计划名称" path="schema.schema_name">
              <n-input v-model:value="schema.schema_name" placeholder="计划名称" />
            </n-form-item>

            <n-form-item label="计划周期" path="schema.cycle">
              <n-input v-model:value="schema.cycle" placeholder="计划周期" />
            </n-form-item>

            <n-tabs
              v-model:value="phaseTab"
              type="card"
              closable
              addable
              @close="handlePhaseDelete"
              @add="handlePhaseAdd"
            >
              <n-tab-pane
                v-for="(phase, phaseIndex) in schema.phaseList"
                :key="phaseIndex"
                :name="phaseIndex"
                :tab="phase.timing_name"
              >
                <n-form :model="phase">
                  <n-form-item label="相位" path="phase.timing_name">
                    <n-input v-model:value="phase.timing_name" placeholder="相位名称" />
                  </n-form-item>

                  <n-form-item label="绿灯" path="phase.phase_green">
                    <n-input v-model:value="phase.phase_green" placeholder="绿灯周期" />
                  </n-form-item>

                  <n-form-item label="黄灯" path="phase.phase_yellow">
                    <n-input v-model:value="phase.phase_yellow" placeholder="黄灯周期" />
                  </n-form-item>

                  <n-form-item label="红灯" path="phase.phase_red">
                    <n-input v-model:value="phase.phase_red" placeholder="红灯周期" />
                  </n-form-item>
                </n-form>
              </n-tab-pane>
            </n-tabs>
          </n-form>
        </n-tab-pane>
      </n-tabs>
    </div>

    <div v-else> 请在创建路口完成后，从路口列表进入此路口完成此路口相位编辑。 </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { getCrossroadPhase, changeCrossroadPhase } from '@/api/crossroad';
  import { useDialog } from 'naive-ui';

  export default defineComponent({
    name: 'RoadPhase',
    props: {
      id: {
        type: [String, Number],
        required: true,
      },
    },
    setup(props) {
      const schemaTabRef = ref(0);
      const phaseTabRef = ref(0);
      const schemaList = ref();
      const phaseData = ref();
      const dialog = useDialog();

      onMounted(async () => {
        if (props.id) {
          const res = await getCrossroadPhase(props.id);
          console.log(res);
          phaseData.value = res;
          schemaList.value = res.schemaList;
        }
      });

      // handle schema add
      function handleSchemaAdd() {
        const schema_id = schemaList.value.length + 1;
        const newSchema = {
          schema_id: String(schema_id),
          schema_name: '未命名计划',
          cycle: '0',
          submit_time: '',
          operater: '0',
          phaseList: [
            {
              timing_id: '1',
              timing_name: '未命名相位',
              phase_green: '0',
              phase_yellow: '0',
              phase_red: '0',
            },
          ],
        };
        schemaList.value.push(newSchema);
      }
      // handle schema delete
      function handleSchemaDelete(schema_id) {
        dialog.create({
          title: '确认删除',
          content: '确认删除该计划吗？',
          type: 'warning',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            schemaList.value.splice(schema_id, 1);
          },
        });
      }

      // handle phase add
      function handlePhaseAdd() {
        const phaseList = schemaList.value[schemaTabRef.value].phaseList;
        const timing_id = phaseList.length + 1;
        const newSchema = {
          timing_id: String(timing_id),
          timing_name: '未命名相位',
          phase_green: '0',
          phase_yellow: '0',
          phase_red: '0',
        };
        phaseList.push(newSchema);
      }
      // handle schema delete
      function handlePhaseDelete(phaseIndex) {
        const phaseList = schemaList.value[schemaTabRef.value].phaseList;
        dialog.create({
          title: '确认删除',
          content: '确认删除该相位吗？',
          type: 'warning',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            phaseList.splice(phaseIndex, 1);
          },
        });
      }

      // submit phase
      const submitPhaseLoading = ref(false);
      async function handleSubmitPhase() {
        submitPhaseLoading.value = true;
        const res = await changeCrossroadPhase(phaseData.value);
        console.log(res);
        submitPhaseLoading.value = false;
      }

      return {
        schemaTab: schemaTabRef,
        phaseTab: phaseTabRef,
        phaseData,
        schemaList,
        handleSchemaAdd,
        handleSchemaDelete,
        handlePhaseAdd,
        handlePhaseDelete,
        handleSubmitPhase,
        submitPhaseLoading,
      };
    },
  });
</script>
