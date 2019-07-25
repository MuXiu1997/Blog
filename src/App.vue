<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  /*#app {*/
  /*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*  -webkit-font-smoothing: antialiased;*/
  /*  -moz-osx-font-smoothing: grayscale;*/
  /*  text-align: center;*/
  /*  color: #2c3e50;*/
  /*}*/
  /*#nav {*/
  /*  padding: 30px;*/
  /*  a {*/
  /*    font-weight: bold;*/
  /*    color: #2c3e50;*/
  /*    &.router-link-exact-active {*/
  /*      color: #42b983;*/
  /*    }*/
  /*  }*/
  /*}*/
  @import 'assets/css/font.css';

  #app {
    height: 100%;
  }

  body {
    display: block;
  }

  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-y: hidden;
  }

  .scrollStyle::-webkit-scrollbar {
    width: 6px;
  }

  .scrollStyle::-webkit-scrollbar-button, .scrollStyle::-webkit-scrollbar-track {
    display: none;
  }

  .scrollStyle::-webkit-scrollbar-button {
    display: none;
  }

  .scrollStyle::-webkit-scrollbar-track-piece {
    background: rgba(255, 255, 255, 0.7);
 }

  .scrollStyle::-webkit-scrollbar-thumb {
    background: rgba(140, 140, 140, 0.25);
    border-radius: 4px;
  }
</style>
