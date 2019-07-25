<template>
  <el-container style="height: 100%;width: 1140px;margin: auto">
    <el-header style="padding: 0">
      <Headers/>
    </el-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </el-container>
</template>

<script>
// @ is an alias to /src
import Headers from '@/components/Headers'

export default {
  name: 'Layout',
  components: {
    Headers
  }
}
</script>
