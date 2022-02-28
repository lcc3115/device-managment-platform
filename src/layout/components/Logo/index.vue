<template>
  <div class="logo">
    <h2 v-show="!collapsed" class="text-lg">交通设备管理平台</h2>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    props: {
      collapsed: {
        type: Boolean,
      },
    },
  };
</script>

<style lang="less" scoped>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    white-space: nowrap;

    img {
      width: auto;
      height: 32px;
    }

    .title {
      margin-bottom: 0;
    }
  }
</style>
