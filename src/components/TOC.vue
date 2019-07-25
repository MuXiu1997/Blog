<template>
  <div style="padding: 0 0 0 10px;overflow: hidden">
    <Anchor :affix="false" show-ink
            :container="container.$el"
            @on-select="scrollIntoAnchor"
            v-if="isReady && nodes.length"
            style="overflow: hidden"
    >
      <AnchorLink v-for="node in nodes" :href="'#'+node.id" :title="node.id" :key="node.id">
        <AnchorLink v-for="cNode in node.children" :href="'#'+cNode.id" :title="cNode.id" :key="cNode.id">
        </AnchorLink>
      </AnchorLink>
    </Anchor>
    </div>
</template>

<script>
import { AnchorLink } from 'iview'

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TOC',
  props: {
    container: {
    },
    tokens: {
      type: Array
    }
  },
  components: {
    AnchorLink
  },
  data () {
    return {
      nodes: null,
      isReady: false
    }
  },
  watch: {
    tokens () {
      this.isReady = false
      let result = []
      let temp
      for (let token of this.tokens) {
        if (token.tag === 'h2') {
          temp = {
            id: token.attrs[0][1],
            children: []
          }
          result.push(temp)
        } else if (token.tag === 'h3') {
          temp.children.push({
            id: token.attrs[0][1]
          })
        }
      }
      this.nodes = result
      this.$nextTick(() => {
        this.isReady = true
      })
    }
  },
  methods: {
    scrollIntoAnchor (id) {
      // console.log(id)
      document.getElementById(id.replace('#', '')).scrollIntoView(true)
    }
  }
}
</script>

<style scoped>
  /*noinspection CssUnusedSymbol*/
  div /deep/ .ivu-anchor-wrapper {
    overflow: hidden;
    margin-left: 0;
  }
</style>
