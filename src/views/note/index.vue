<template>
  <el-container style="padding: 0 20px;" :style="$store.getters.containerStyle">
    <el-aside style="overflow: auto" width="200px" class="scrollStyle">
      <note-side
        :container="$refs['noteMain']"
        :tokens="tokens"
        :tree="tree"
        ref="note-side"
      />
    </el-aside>
    <el-main style="padding: 0" class="scrollStyle" ref="noteMain">
      <el-container>
        <el-main style="padding: 10px">
          <router-view :content="content" @parsed="setTokens"/>
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

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Note',
  components: {
    NoteSide,
    TheLogo
  },
  data () {
    return {
      content: null,
      tokens: null,
      tree: null
    }
  },
  created () {
    getSideData()
      .then((response) => {
        this.tree = response.data.c
      })
    if (this.$route.name === 'markdown') {
      this.getMarkdownFile(this.$route.params.pathMatch)
    }
  },
  watch: {
    $route (to, from) {
      // noinspection JSUnresolvedVariable
      if (to.name === 'markdown' && to.params.pathMatch !== from.params.pathMatch) {
        // noinspection JSUnresolvedVariable
        this.getMarkdownFile(to.params.pathMatch)
      } else if (to.name === 'note') {
        this.content = null
        this.$refs['note-side'].reSetActiveName()
      }
    }
  },
  methods: {
    getMarkdownFile (path) {
      this.$Loading.start()
      getMarkdownFile(path)
        .then((res) => {
          this.content = res.data
          this.$Loading.finish()
        })
        .catch(() => {
          this.$Loading.error()
        })
      this.toTop()
    },
    toTop () {
      let timer = setInterval(() => {
        if (this.$refs['noteMain'].$el.scrollTop === 0) {
          clearInterval(timer)
        } else {
          this.$refs['noteMain'].$el.scrollTop = 0
        }
      }, 20)
    },
    setTokens (tokens) {
      this.tokens = tokens
    }
  }
}
</script>

<style scoped>
</style>
