<template>
  <div
    v-html="markdownHTML"
    id="markdown"
    ref="markdown"
  >
  </div>
</template>

<script>
import 'prismjs/themes/prism.css'

import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'

import createMarkdownIt from './modules/markdown.js'
import './markdown.css'

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'note-markdown',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    let regex = new RegExp(/---\s+?typora-root-url:.*\s+?typora-copy-images-to:.*\s+?---\s+/)
    let markdownIt = createMarkdownIt()
    return {
      regex: regex,
      markdownHTML: null,
      Viewer: null,
      markdownIt: markdownIt
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
    content () {
      // 删除markdown文件的头部YAML信息
      let content = this.content.replace(this.regex, '')
      this.updateMarkdownItHTML(content)
      // 更新图片缩放
      this.$nextTick(() => {
        this.Viewer.update()
      })
    }
  },
  methods: {
    updateMarkdownItHTML (content) {
      // 用以渲染的html字符串
      this.markdownHTML = this.markdownIt.render(content)
      // 所有token中符合h2,h3标签的，用于生成大纲
      let parsed = this.markdownIt.parse(content, {})
      this.$nextTick(() => {
        this.$emit('parsed', parsed.filter((o) => o.attrs !== null && ['h2', 'h3'].includes(o.tag)))
      })
    }
  }
}
</script>

<style scoped>
</style>
