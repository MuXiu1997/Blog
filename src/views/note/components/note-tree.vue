<template>
  <el-tree
    v-loading="!tree"
    :data="tree"
    :props="defaultProps"
    @node-click="handleNodeClick"
    icon-class="el-icon-arrow-right"
    :indent="8"
    :highlight-current="false"
    :check-on-click-node="true"
    empty-text=""
  >
    <template slot-scope="scope" :node-key="scope.data.l" class="gray">
      <span :class="{'currentTreeNode': scope.node===currentNode && $route.name==='markdown'}">
        <i
          v-if="scope.data.c"
          :class="scope.node.expanded?'el-icon-folder-opened':'el-icon-folder'"
        >
        </i>
        {{ removeSuffix(scope) }}
      </span>
    </template>
  </el-tree>
</template>

<script>
import { Tree } from 'element-ui'

export default {
  name: 'note-tree',
  props: {
    tree: Array
  },
  components: {
    'el-tree': Tree
  },
  data () {
    return {
      defaultProps: {
        children: 'c',
        label: 'l'
      },
      currentNode: null
    }
  },
  methods: {
    handleNodeClick (data, node) {
      if (data.p) {
        this.$router.push(data.p.replace('/app/markdown', '/note'))
        this.$nextTick(() => {
          this.currentNode = node
        })
      }
    },
    removeSuffix (scope) {
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

  .gray {
    color: gray;
  }
</style>
