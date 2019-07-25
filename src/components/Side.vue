<template>
  <el-tabs v-model="activeName" stretch style="margin-top: 10px">
    <el-tab-pane label="文章" name="List">
      <NoteTree/>
    </el-tab-pane>
    <el-tab-pane v-if="this.$route.name === 'markdown'" label="大纲" name="TOC">
      <TOC
        :container="container"
        :tokens="tokens"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<!--suppress NpmUsedModulesInstalled -->
<script>
import { Tabs, TabPane } from 'element-ui'
import NoteTree from '@/components/NoteTree'
import TOC from '@/components/TOC'

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
    TOC
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
