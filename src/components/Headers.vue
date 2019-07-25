<template>
  <el-row style="width: 100%;height: 100%; border-bottom: 1px rgba(0,0,0,0.25) solid;font-family: 'Fira Code',sans-serif">
    <el-col :span="4" class="centerText">
      <router-link
        tag="el-link"
        :to="{ name: 'home' }"
        style="font-size: large"
      >
        MuXiu1997
      </router-link>
    </el-col>
    <el-col :span="20" style="text-align: right;line-height: 60px;padding: 0 20px 0 0">
      <router-link tag="el-link" :to="{ name: 'home' }">
        Home
      </router-link>
      <el-divider direction="vertical"></el-divider>
      <router-link tag="el-link" :to="{ name: 'jotting' }">
        Jotting
      </router-link>
      <el-divider direction="vertical"></el-divider>
      <router-link tag="el-link" :to="{ name: 'note' }">
        Note
      </router-link>
    </el-col>
  </el-row>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
export default {
  name: 'Headers'
}
</script>

<style scoped>
  .centerText {
    text-align: center;
    line-height: 60px;
  }
</style>
