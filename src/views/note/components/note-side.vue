<template>
  <el-tabs v-model="activeName" stretch style="margin-top: 10px">
    <el-tab-pane label="文章" name="List">
      <note-tree
        :tree="tree"
      />
    </el-tab-pane>
    <el-tab-pane v-if="this.$route.name === 'markdown'" label="大纲" name="TOC">
      <keep-alive>
        <note-toc
          :container="container"
          :tokens="tokens"
        />
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
import { Tabs, TabPane } from 'element-ui'
import NoteTree from './note-tree'
import NoteToc from './note-table-of-contents'

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'note-side',
  props: {
    container: {},
    tokens: Array,
    tree: Array
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
  },
  methods: {
    reSetActiveName () {
      this.activeName = 'List'
    }
  }
}
</script>

<style scoped>

</style>
