<template>
  <p :style="fs">
    <code id="logo" >
      &nbsp;__&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;___&nbsp;&nbsp;___&nbsp;____<br>
      |&nbsp;&nbsp;\/&nbsp;&nbsp;|_&nbsp;&nbsp;_\&nbsp;\/&nbsp;(_)_&nbsp;&nbsp;_/&nbsp;/&nbsp;_&nbsp;\/&nbsp;_&nbsp;\__&nbsp;&nbsp;|<br>
      |&nbsp;|\/|&nbsp;|&nbsp;||&nbsp;|&gt;&nbsp;&nbsp;&lt;|&nbsp;|&nbsp;||&nbsp;|&nbsp;\_,&nbsp;/\_,&nbsp;/&nbsp;/&nbsp;/&nbsp;<br>
      |_|&nbsp;&nbsp;|_|\_,_/_/\_\_|\_,_|_|/_/&nbsp;&nbsp;/_/&nbsp;/_/&nbsp;&nbsp;<br>
      demo_v0.1
    </code>
  </p>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  props: {
    fontSize: {
      type: String,
      default: 'medium'
    }
  },
  name: 'Logo',
  data () {
    return {
      // 给p标签动态设置字体大小，从而影响子标签code的字体大小
      fs: {
        fontSize: this.fontSize,
        textAlign: 'center'
      }
    }
  }
}
</script>

<style scoped>
  #logo {
    font-style: italic;
    font-family: "Fira Code", sans-serif;
    color: #fe8bcb;
    background-image: linear-gradient(92deg, #fe8bcb 0%, #f4fea5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: hue 30s infinite linear;
  }

  @keyframes hue {
    from {
      filter: hue-rotate(0deg);
    }

    to {
      filter: hue-rotate(-360deg);
    }
  }
</style>
