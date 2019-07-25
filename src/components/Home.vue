<template>
  <el-container :style="$store.state.containerStyle">
    <el-main class="scrollStyle">
      <div style="text-align: center">
        <img src="../assets/logo.png" alt="">
        <div style="" id="title">
          Welcome to MuXiu's personal website
        </div>
      </div>
      <Logo/>
    </el-main>
  </el-container>
</template>

<script>
// noinspection NpmUsedModulesInstalled
import Logo from '@/components/Logo'

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Home',
  components: {
    Logo
  },
}
</script>

<!--suppress CssInvalidHtmlTagReference -->
<style scoped>
  img {
    width: 800px;
    padding: 20px;
  }

  #title {
    padding: 20px;
    font-family: Fira Code, sans-serif;
    font-size: 36px;
  }
</style>
