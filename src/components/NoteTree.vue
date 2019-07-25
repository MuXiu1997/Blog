<template>
  <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick" icon-class="el-icon-arrow-right">
    <template slot-scope="scope">
      {{ removeSuffix(scope) }}
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
      }
    }
  },
  created () {
    axios.get('/api/side')
      .then((res) => {
        console.log(res.data)
        this.tree = res.data.c
      })
  },
  methods: {
    handleNodeClick (data) {
      if (data.p) {
        this.$router.push(data.p.replace('/app/markdown', '/note'))
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

<style scoped>

</style>
