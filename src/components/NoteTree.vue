<template>
  <el-tree :data="tree"
           :props="defaultProps"
           @node-click="handleNodeClick"
           icon-class="el-icon-arrow-right"
           :indent="8"
           :highlight-current="false"
           :check-on-click-node="true">
    <template slot-scope="scope" :node-key="scope.data.l" style="color:gray;">
      <span :class="{'currentTreeNode': scope.node===currentNode }">
      <span v-if="scope.data.c && scope.node.expanded">
        <i class="el-icon-folder-opened"></i>
        {{ removeSuffix(scope) }}
      </span>
      <span v-else-if="scope.data.c && !scope.node.expanded">
        <i class="el-icon-folder"></i>
        {{ removeSuffix(scope) }}
      </span>
      <span v-else>
        {{ removeSuffix(scope) }}
      </span>
        </span>
    </template>
  </el-tree>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
import { Tree } from 'element-ui'
import axios from 'axios'

export default {
  name: 'NoteTree',
  components: {
    'el-tree': Tree
  },
  data () {
    return {
      tree: null,
      defaultProps: {
        children: 'c',
        label: 'l'
      },
      currentNode: null
    }
  },
  created () {
    axios.get('/api/side')
      .then((res) => {
        this.tree = res.data.c
      })
  },
  methods: {
    handleNodeClick (data, node) {
      if (data.p) {
        this.$router.push(data.p.replace('/app/markdown', '/note'))
        console.log(node)
        this.$nextTick(() => {
          this.currentNode = node
        })
      }
    },
    removeSuffix (scope) {
      // console.log(scope)
      if (scope.data.l) {
        return scope.data.l.replace('.md', '')
      }
      return ''
    }
  }
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
  .currentTreeNode {
    color: #2d8cf0;
    font-size: 105%;
  }
</style>
