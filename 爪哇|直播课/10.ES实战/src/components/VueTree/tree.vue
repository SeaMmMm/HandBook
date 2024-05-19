<script>
import refs from './refs'
import itemNode from './item.vue'

let count = 0
export default {
  name: 'treeNode',

  // 传递参数
  props: {
    // 选中节点
    value: Array,
    // 树形结构
    options: {
      type: Array,
      default: function () {
        return []
      },
    },
  },

  data() {
    let name = 'v_tree_' + ++count
    return {
      name,
    }
  },

  created() {
    let name = this.name
    refs.init(
      {
        name,
      },
      this
    )
  },

  destroyed() {
    let name = this.name
    refs.destroy(name)
  },

  components: {
    itemNode,
  },

  render() {
    return (
      <div class='tree'>
        <ul class='vue-tree'>
          {this.options.map((itemData, index) => {
            return (
              <item-node
                name={this.name}
                option={itemData}
                key={`${this.name}${itemData['value']}${index}`}
              ></item-node>
            )
          })}
        </ul>
      </div>
    )
  },
}
</script>
