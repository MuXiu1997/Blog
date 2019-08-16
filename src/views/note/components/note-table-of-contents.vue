<template>
  <div>
    <div class="anchor-wrapper">
      <div class="anchor">
        <div class="anchor-icon">
          <span class="anchor-icon-ball" :style="ballTop"><i class="el-icon-location-information"></i></span>
        </div>
        <div
          v-for="node in nodes"
          :class="{'active':node.id===currentID}"
          class="anchor-link"
          :key="node.id"
          :ref="node.id"
          @click.stop="(event)=>{scrollIntoAnchor(node.id, event)}"
        >
          <span
            class="anchor-link-title"
            :title="node.id"
          >
            {{node.id}}
          </span>
          <div
            v-for="cNode in node.children"
                        :class="{'active':cNode.id===currentID}"

            class="anchor-link"
            :key="cNode.id"
            :ref="cNode.id"
            @click.stop="(event)=>{scrollIntoAnchor(cNode.id, event)}"
          >
            <span
              class="anchor-link-title anchor-link-"
              :title="cNode.id"
              >
              {{cNode.id}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'note-table-of-contents',
  props: {
    container: {},
    tokens: Array
  },
  data () {
    return {
      ballTop: {
        top: '0px'
      },

      currentID: '',

      nodes: [],
      offsetTopArray: [],
      isReady: false
    }
  },
  watch: {
    tokens () {
      this.isReady = false
      let result = []
      let offsetTopArray = []
      let temp
      for (let token of this.tokens) {
        if (token.tag === 'h2') {
          offsetTopArray.push(token.attrs[0][1])
          temp = {
            id: token.attrs[0][1],
            children: []
          }
          result.push(temp)
        } else if (token.tag === 'h3') {
          offsetTopArray.push(token.attrs[0][1])
          temp.children.push({
            id: token.attrs[0][1]
          })
        }
      }
      this.nodes = result
      this.offsetTopArray = offsetTopArray
      this.$nextTick(() => {
        this.isReady = true
      })
    },
    container () {
      this.container.$el.onscroll = this.calcBallTop
    }
  },
  methods: {
    calcBallTop (e) {
      console.log(123)
      let scrollElement = e ? e.target : this.container.$el
      let s = null
      this.offsetTopArray.forEach((id) => {
        if (document.getElementById(id).offsetTop - 1 <= scrollElement.scrollTop + scrollElement.offsetTop) {
          s = this.$refs[id][0]
          this.currentID = id
          this.ballTop = {
            top: `${s.offsetTop}px`
          }
        }
      })
      if (s === null) {
        this.ballTop = {
          top: `0px`
        }
      }
    },
    scrollIntoAnchor (id) {
      document.getElementById(id).scrollIntoView(
        {
          behavior: 'smooth',
          block: 'start'
        }
      )
    }
  }
}
</script>
<style scoped>
  .anchor-wrapper {
    padding-left: 10px;
  }

  .anchor {
    position: relative;
    padding-left: 2px;
  }

  .anchor-icon {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
  }

  .anchor-icon-ball {
    display: inline-block;
    position: absolute;
    height: 8px;
    border-radius: 50%;
    font-size: 20px;
    color: #2d8cf0;
    left: 50%;
    transition: top 0.25s linear;
    transform: translate(-50%, 0px);
  }

  .anchor-icon:before {
    content: " ";
    position: relative;
    width: 2px;
    height: 100%;
    display: block;
    background-color: #e8eaec;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .anchor-link {
    padding: 8px 0 8px 16px;
    line-height: 1;
    cursor: pointer;
}

  .anchor-link-title {
    display: block;
    position: relative;
    transition: all .3s;
    color: #515a6e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
  }

  .anchor-link:hover > .anchor-link-title {
    color: #57a3f3;
  }

  .anchor-link.active > .anchor-link-title {
    color: #57a3f3;
  }

  .anchor-link-title:only-child {
    margin-bottom: 0;
  }
</style>
