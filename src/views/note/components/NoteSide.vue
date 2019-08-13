<template>
  <el-tabs v-model="activeName" stretch style="margin-top: 10px">
    <el-tab-pane label="文章" name="List">
      <note-tree/>
    </el-tab-pane>
    <el-tab-pane v-if="this.$route.name === 'markdown'" label="大纲" name="TOC">
      <note-toc
        :container="container"
        :tokens="tokens"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
import { Tabs, TabPane } from 'element-ui'
import NoteTree from './NoteTree'
import NoteToc from './NoteToc'

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Side',
  props: {
    container: {
      // type: HTMLElement || String
    },
    tokens: {
      type: Array
    }
  },
  components: {
    'el-tabs': Tabs,
    'el-tab-pane': TabPane,
    NoteTree,
    NoteToc
  },
  data () {
    return {
      activeName: 'List'
    }
  }
}
</script>

<style scoped>

</style>
