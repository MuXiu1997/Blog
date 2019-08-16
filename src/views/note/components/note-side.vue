<template>
  <el-tabs v-model="activeName" stretch style="margin-top: 10px">
    <el-tab-pane label="文件" name="List">
      <note-tree
        :tree="tree"
        :isDetail="isDetail"
      />
    </el-tab-pane>
    <el-tab-pane v-if="isDetail" label="大纲" name="TOC">
        <note-toc
          :container="container"
          :tokens="tokens"
          ref="TOC"
        />
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
    tree: Array,
    isDetail: Boolean
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
  watch: {
    activeName (now) {
      if (now === 'TOC') {
        this.$nextTick(() => {
          this.$refs['TOC'].calcBallTop()
        })
      }
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
