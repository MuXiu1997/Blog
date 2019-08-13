<template>
  <el-row class="headers-row">
    <el-col :span="4" class="center-text">
      <router-link
        tag="el-link"
        :to="{ name: 'home' }"
        class="font-size-large"
      >
        MuXiu1997
      </router-link>
    </el-col>
    <el-col :span="20" class="headers-links">
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

<script>
export default {
  name: 'LayoutHeaders'
}
</script>

<style scoped>
  .center-text {
    text-align: center;
    line-height: 60px;
  }

  .headers-row {
    width: 100%;
    height: 100%;
    border-bottom: 1px rgba(0, 0, 0, 0.25) solid;
    font-family: 'Fira Code', sans-serif;
  }

  .font-size-large {
    font-size: large;
  }

  .headers-links {
    text-align: right;
    line-height: 60px;
    padding: 0 20px 0 0;
  }
</style>
