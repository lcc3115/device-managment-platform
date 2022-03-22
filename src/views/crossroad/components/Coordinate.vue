<template>
  <div class="relative w-full h-full">
    <div class="w-full h-full" ref="coordMap"></div>
    <n-button-group size="small" class="absolute top-4 left-4 z-10">
      <n-button type="success" @click="jumpTo(lng, lat)"> 跳转当前 </n-button>
      <n-button type="success" @click="reMarker"> 重新选点 </n-button>
      <n-button type="success" @click="jumpTo(114.30438, 30.59295)"> 返回武汉 </n-button>
    </n-button-group>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import * as Maptalks from 'maptalks';
  import crossroadSvg from '@/assets/markers/crossroad.svg';

  export default defineComponent({
    name: 'Coordinate',
    props: {
      coord: {
        type: Object,
        required: true,
      },
    },
    emits: ['setNewCoord'],
    setup(props, context) {
      // const lng = props.coord.lng;
      // const lat = props.coord.lat;
      const map = ref();
      const coordMap = ref();
      const markerLayer = ref();
      const crossMarker = ref();
      const lng = ref(props.coord.lng);
      const lat = ref(props.coord.lat);

      onMounted(() => {
        // create map
        map.value = new Maptalks.Map(coordMap.value, {
          center: [lng.value, lat.value],
          zoom: 14,
          baseLayer: new Maptalks.TileLayer('base', {
            // urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            // subdomains: ['a', 'b', 'c', 'd'],
            urlTemplate:
              'http://wprd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
            subdomains: ['1', '2', '3', '4'],
          }),
          attribution: false,
        });
        // set marker
        markerLayer.value = new Maptalks.VectorLayer('cross').addTo(map.value);

        crossMarker.value = new Maptalks.Marker([lng.value, lat.value], {
          symbol: [
            {
              markerFile: crossroadSvg,
              markerWidth: 40,
              markerHeight: 40,
              markerDy: 20,
            },
            {
              textName: '当前位置',
              textSize: 14,
              textDy: 34,
            },
          ],
        });
        crossMarker.value.addTo(markerLayer.value);
      });

      // jump to point
      function jumpTo(lng, lat) {
        map.value.animateTo(
          {
            center: [lng, lat],
            zoom: 17,
            pitch: 0,
            bearing: 0,
          },
          {
            duration: 2000,
          }
        );
      }

      // reMarker
      function reMarker() {
        map.value.once('click', (param) => {
          const newCoord = param.coordinate;
          // move crossMarker to new coord
          crossMarker.value.setCoordinates(newCoord);
          context.emit('setNewCoord', newCoord);
        });
      }

      return {
        coordMap,
        map,
        lng,
        lat,
        jumpTo,
        reMarker,
      };
    },
  });
</script>
