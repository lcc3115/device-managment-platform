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
        <map-list v-if="crossList" :cross-list="crossList" @jump-to="jumpToPoint" />
      </div>
    </div>

    <!-- map -->
    <div class="w-full h-full" ref="mapDom"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch } from 'vue';
  import * as Maptalks from 'maptalks';
  import { Marker, Layer } from 'maptalks';
  import MapList from './components/MapList/index.vue';
  import { getCrossroadList } from '@/api/crossroad';
  import crossroadSvg from '@/assets/markers/crossroad.svg';

  const mapDom = ref();
  const map = ref();
  // const deviceList = ref();

  // cross point
  const crossList = ref();
  const crossLayer = ref<Layer>();

  async function getCrossList() {
    const res = await getCrossroadList();
    crossList.value = res;
  }

  function drawPoint(markers: Marker[]) {
    // clean Layer
    if (crossLayer.value) {
      crossLayer.value.remove();
    }
    // set new Layer
    crossLayer.value = new Maptalks.VectorLayer('cross').addTo(map.value);
    markers.forEach((m) => {
      m.addTo(crossLayer.value);
    });
  }

  // jump to point
  function jumpToPoint(lng: number, lat: number) {
    map.value.animateTo(
      {
        center: [lng, lat],
        pitch: 0,
        bearing: 0,
      },
      {
        duration: 2000,
      }
    );
  }

  // 监听列表改变
  watch(crossList, (v) => {
    console.log(v);
    // cross marker list
    const markers = v.map((cross) => {
      const lng = Number(cross.longitude);
      const lat = Number(cross.latitude);
      console.log([lng, lat]);
      const center = new Maptalks.Coordinate([lng, lat]);
      const marker = new Maptalks.Marker(center, {
        id: cross.crossing_id,
        symbol: [
          {
            markerFile: crossroadSvg,
            markerWidth: 40,
            markerHeight: 40,
          },
          {
            textName: cross.crossing_name || '未知路口',
            textSize: 14,
            textDy: 24,
          },
        ],
      });
      return marker;
    });
    // draw to map
    drawPoint(markers);
  });

  onMounted(async () => {
    // create map
    map.value = new Maptalks.Map(mapDom.value, {
      center: [114.30404, 30.614381],
      zoom: 14,
      baseLayer: new Maptalks.TileLayer('base', {
        // urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        urlTemplate:
          'http://wprd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        subdomains: ['1', '2', '3', '4'],
        attribution: {
          show: false,
        },
      }),
    });

    // get cross
    await getCrossList();
  });
</script>

<style scoped>
  .full-page {
    width: 100%;
    height: calc(100vh - 118px);
  }
</style>
