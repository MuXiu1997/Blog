<template>
  <el-container style="padding: 0 20px;" :style="$store.state.containerStyle">
    <el-aside style="overflow: auto" width="200px" class="scrollStyle">
      <Side
        :container="$refs['noteMain']"
        :tokens="tokens"
      />
    </el-aside>
    <el-main style="padding: 0" class="scrollStyle" ref="noteMain">
      <el-container>
        <el-main style="padding: 10px">
          <router-view :content="content" @parsed="setTokens"/>
        </el-main>
        <el-footer height="100px">
          <Logo fontSize="small"/>
        </el-footer>
      </el-container>
    </el-main>
  </el-container>
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
import Side from '@/components/Side'
import Logo from '@/components/Logo'

import axios from 'axios'

const dateFormat = () => {
  // 将当前日期格式化为YYYYMMDD
  let date = new Date()
  let Y = date.getFullYear()
  let M = ('0' + (date.getMonth() + 1)).slice(-2)
  let D = ('0' + date.getDate()).slice(-2)
  return `${Y}${M}${D}`
}

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Note',
  components: {
    Side,
    Logo
  },
  data () {
    return {
      content: null,
      tokens: null
    }
  },
  created () {
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
      }
    }
  },
  methods: {
    getMarkdownFile (path) {
      this.$Loading.start()
      axios.get(`/markdown/${path}?t=${dateFormat()}`)
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
