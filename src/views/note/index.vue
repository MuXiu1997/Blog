<template>
  <el-container class="note-root" :style="$store.getters.containerStyle">
    <el-aside width="200px" class="scrollStyle scroll-auto">
      <note-side
        :container="$refs['noteMain']"
        :tokens="tokens"
        :tree="tree"
        :isDetail="isDetail"
        ref="note-side"
      />
    </el-aside>
    <el-main class="scrollStyle padding-none" ref="noteMain" v-loading="markdownLoading">
      <el-container>
        <el-main class="padding-10px">
          <router-view :html="markdownHTML"/>
<!--          <note-markdown v-if="isDetail" :content="content" @parsed="setTokens"/>-->
        </el-main>
        <el-footer height="100px">
          <the-logo font-size="small"/>
        </el-footer>
      </el-container>
    </el-main>
  </el-container>
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
import NoteSide from './components/note-side'
import TheLogo from '../../components/the-logo'

import { getSideData, getMarkdownFile } from '../../api'

import createMarkdownIt from './modules/markdown'

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Note',
  // props: {
  //   filePath: String
  // },
  components: {
    NoteSide,
    TheLogo
  },
  data () {
    let regex = new RegExp(/---\s+?typora-root-url:.*\s+?typora-copy-images-to:.*\s+?---\s+/)
    let markdownIt = createMarkdownIt()
    return {
      regex: regex,
      markdownIt: markdownIt,

      markdownHTML: '',
      markdownLoading: false,

      tokens: null,
      tree: null
    }
  },
  created () {
    getSideData()
      .then((response) => {
        this.tree = response.data.c
      })

    if (this.isDetail) {
      this.getMarkdownFile(this.$route.params.pathMatch)
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.pathMatch === from.params.pathMatch) {
      next()
      return
    }
    if (to.name === 'note-markdown') {
      this.getMarkdownFile(to.params.pathMatch)
    } else {
      this.$refs['note-side'].reSetActiveName()
    }
    next()
  },
  // watch: {
  //   $route (now) {
  //     // noinspection JSUnresolvedVariable
  //     // replace('/app/markdown', '/note')
  //     if (now.params.pathMatch && ) {
  //       // noinspection JSUnresolvedVariable
  //
  //     }
  //   }
  // },
  computed: {
    isDetail () {
      return this.$route.name === 'note-markdown'
    }
  },
  methods: {
    getMarkdownFile (path) {
      this.$Loading.start()
      this.markdownHTML = ''
      this.markdownLoading = true
      this.toTop()
      let content = ''
      getMarkdownFile(path)
        .then((res) => {
          content = res.data
          this.updateMarkdownItHTML(content)
          this.$Loading.finish()
          this.markdownLoading = false
        })
        .catch(() => {
          this.$Loading.error()
        })
    },
    updateMarkdownItHTML (content) {
      // 删除markdown文件的头部YAML信息
      content = content.replace(this.regex, '')

      // 用以渲染的html字符串
      this.markdownHTML = this.markdownIt.render(content)

      // 所有token中符合h2,h3标签的，用于生成大纲
      let parsed = this.markdownIt.parse(content, {})
      this.tokens = parsed.filter((o) => o.attrs !== null && ['h2', 'h3'].includes(o.tag))
    },
    toTop () {
      if (this.$refs['noteMain']) {
        this.$refs['noteMain'].$el.scrollTop = 0
      }
    }
  }
}
</script>

<style scoped>
  /*.scrollStyle {*/
  /*  scroll-behavior: smooth;*/
  /*}*/
  .note-root {
    padding: 0 20px;
  }

  .scroll-auto {
    overflow: auto;
  }

  .padding-none {
    padding: 0;
  }

  .padding-10px {
    padding: 10px
  }
</style>
