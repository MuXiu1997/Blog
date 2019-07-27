<template>
  <div v-html="result" id="markdown">
  </div>
</template>

<script>
import MDI from 'markdown-it'
import anchor from 'markdown-it-anchor'

import prism from 'prismjs'
import loadLanguages from 'prismjs/components'

import 'prismjs/themes/prism.css'

import escapeHtml from 'escape-html'
import uslug from 'uslug'

const wrap = (code, lang) => {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`
}

const uslugify = (s) => {
  return uslug(s)
}

const highlight = (str, lang) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (lang === 'py') {
    lang = 'python'
  }
  if (lang === 'mysql') {
    lang = 'sql'
  }
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch (e) {
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}

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
      result: null
    }
  },
  watch: {
    content () {
      this.initMarkdownIt()
    }
  },
  computed: {
    contentReplaced () {
      // 删除markdown文件的头部YAML信息
      let regex = new RegExp(/---\s+?typora-root-url:.*\s+?typora-copy-images-to:.*\s+?---\s+/)
      return this.content.replace(regex, '')
    }
  },
  methods: {
    initMarkdownIt () {
      let md = new MDI({
        highlight: highlight
      })
      // 锚点插件
        .use(anchor, {
          permalink: true,
          permalinkSymbol: '#',
          level: [1, 2, 3, 4, 5, 6],
          permalinkBefore: true,
          slugify: uslugify
        })
        // 用以渲染的html字符串
      this.result = md.render(this.contentReplaced)
      // 所有token中符合h2,h3标签的，用于生成大纲
      let parsed = md.parse(this.contentReplaced, {})
      this.$nextTick(() => {
        this.$emit('parsed', parsed.filter((o) => o.attrs !== null && ['h2', 'h3'].includes(o.tag)))
      })
    }
  }
}
</script>

<style scoped>
  @import 'MarkdownIt.css';
</style>
