<template>
  <el-container :style="$store.getters.containerStyle">
    <el-main class="scrollStyle">
      <div style="" class="center-text">
        <div class="logo"></div>
        <div id="title">
          Welcome to MuXiu's personal website
        </div>
      </div>
      <the-logo/>
    </el-main>
  </el-container>
</template>

<script>
import TheLogo from '../../components/the-logo'

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Home',
  components: {
    TheLogo
  }
}
</script>

<style scoped>
  .logo {
    width: 800px;
    height: 310px;
    margin: 0 auto;
    background-image: url("../../assets/logo.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }

  #title {
    padding: 20px;
    font-family: Fira Code, sans-serif;
    font-size: 36px;
  }

  .center-text {
    text-align: center;
  }
</style>
