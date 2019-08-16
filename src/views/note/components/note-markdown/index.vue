<template>
  <div
    v-html="html"
    id="markdown"
    ref="markdown"
  >
  </div>
</template>

<script>
import 'prismjs/themes/prism.css'

import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'

import './markdown.css'

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'note-markdown',
  props: {
    html: {
      type: String,
      default: ''
    }
  },
  mounted () {
    // 添加图片缩放功能
    const ViewerDom = this.$refs['markdown']
    this.Viewer = new Viewer(ViewerDom, {
      title: 0,
      fullscreen: false,
      navbar: 0,
      toolbar: 0
    })
  },
  watch: {
    html () {
      this.$nextTick(() => {
        this.Viewer.update()
      })
    }
  }
}
</script>

<style scoped>
</style>
