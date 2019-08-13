<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <layout-headers/>
    </el-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </el-container>
</template>

<script>
import LayoutHeaders from './components/LayoutHeaders'

export default {
  name: 'Layout',
  components: {
    LayoutHeaders
  }
}
</script>

<style scoped>
  .layout-container {
    height: 100%;
    width: 1140px;
    margin: auto;
  }

  .layout-header {
    padding: 0;
  }
</style>
