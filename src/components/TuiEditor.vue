<template>
  <div :id="el" ref="markdown" class="markdownBody"></div>
</template>

<script>
import Viewer from 'tui-editor/dist/tui-editor-Viewer'
import 'tui-editor/dist/tui-editor-contents.css'
import 'highlight.js/styles/github.css'

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TuiEditor',
  props: {
    el: {
      type: String,
      default: 'viewerSection'
    },
    height: {
      type: String,
      default: '500px'
    },
    content: {
      type: String,
      default: '# content to be rendered'
    }
  },
  data () {
    return {
      markdown: null
    }
  },
  created () {
    this.initMarkdown()
  },
  watch: {
    content () {
      this.emptyInnerHTML()
      this.initMarkdown()
      this.$emit('contentChange')
    }
  },

  methods: {
    initMarkdown () {
      this.markdown = new Viewer({
        el: document.querySelector('#' + this.el),
        height: this.height,
        initialValue: this.content
      })
    },
    emptyInnerHTML () {
      let md = this.$refs['markdown']
      if (md) {
        md.innerHTML = ''
      }
    }
  }
}
</script>

<style scoped>
  @import 'TuiEditor.css';
  /*@import '~tui-editor/dist/tui-editor-contents.css';*/
  /*@import '~highlight.js/styles/github.css';*/
</style>
