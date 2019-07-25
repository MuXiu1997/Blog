<template>
  <div v-html="result" id="markdown">
  </div>
</template>

<script>
import MDI from 'markdown-it'
import anchor from 'markdown-it-anchor'
// noinspection JSFileReferences,NpmUsedModulesInstalled
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const uslug = require('uslug')

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MarkdownIt',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      result: null,
      uslugify: s => uslug(s)
    }
  },
  watch: {
    content () {
      this.initMarkdownIt()
    }
  },
  methods: {
    initMarkdownIt () {
      let md = new MDI({
        highlight: function (str, lang) {
          // 添加这两行才能正确显示 <>
          str = str.replace(/&lt;/g, '<')
          str = str.replace(/&gt;/g, '>')

          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="highlight"><code>' +
                  hljs.highlight(lang, str, true).value +
                  '</code></pre>'
            } catch (__) {
            }
          }

          return '<pre class="highlight"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
        }
      })
        // 锚点插件
        .use(anchor, {
          permalink: true,
          permalinkSymbol: '#',
          level: [1, 2, 3, 4, 5, 6],
          permalinkBefore: true,
          slugify: this.uslugify
        })
      // 用以渲染的html字符串
      this.result = md.render(this.content)
      // 所有token中符合h2,h3标签的，用于生成大纲
      let parsed = md.parse(this.content, {}).filter((o) => o.attrs !== null && ['h2', 'h3'].includes(o.tag))
      this.$nextTick(() => {
        this.$emit('parsed', parsed)
      })
    }
  }
}
</script>

<style scoped>
  @import 'MarkdownIt.css';
</style>
