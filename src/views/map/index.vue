<template>
  <div class="relative full-page">
    <!-- left container -->
    <div
      class="absolute left-2 top-1/2 transform -translate-y-1/2 w-360px h-780px bg-light-50 rounded-md z-1 flex flex-col justify-around items-center"
    >
      <!-- tools -->
      <div class="w-[90%] h-[10%] bg-gray-100"></div>
      <!-- list -->
      <div class="w-[90%] h-[85%] bg-gray-100 rounded-md overflow-auto py-2">
        <map-list />
      </div>
    </div>

    <!-- map -->
    <div class="w-full h-full" ref="mapDom"></div>
  </div>
</template>

<script lang="ts" setup>
  import * as Maptalks from 'maptalks';
  import { ref, onMounted } from 'vue';

  import MapList from './components/MapList/index.vue';

  const mapDom = ref();
  const map = ref();

  onMounted(() => {
    map.value = new Maptalks.Map(mapDom.value, {
      center: [114.30404, 30.614381],
      zoom: 14,
      baseLayer: new Maptalks.TileLayer('base', {
        // urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        urlTemplate:
          'http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        attribution: '',
      }),
    });
  });
</script>

<style scoped>
  .full-page {
    width: 100%;
    height: calc(100vh - 118px);
  }
</style>
