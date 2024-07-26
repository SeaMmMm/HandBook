<template>
  <div class="hello">
    {{ msg }}
    {{ addMsg }}
    <!-- 面试题 -->
    <!-- 计算类型 -->
    number: {{ number }}
    number2: {{ number2 }}
    <div>
      1. 绑定数据计算可以直接写在花括号里么？ - 数字运算OK
      <h3>number + 1: {{ number + 1 }}</h3>
    </div>
    <div>
      2. 截断 - 简单的字符串处理？ - 字符串处理OK
      <h3>{{ msg.slice(0, -1) }}</h3>
    </div>
    <div>
      3. 浮点数操作？ - OK
      <h3>{{ number.toFixed(2) }}</h3>
    </div>
    <div>
      4. 转整形？ - OK
      <h3>{{ parseInt(number, 10) }}</h3>
    </div>

    <!-- 加工类型 -->
    <div>
      5. 函数加工？ - OK
      <h3>{{ calcNumber(number) }}</h3>
    </div>

    <!-- 条件类型 -->
    <div>
      6. 三元运算？ - OK
      <h3>100 > 99:{{ 100 > 99 ? '对' : '错' }}</h3>
    </div>
    <div>
      7. 逻辑运算？ - OK
      <h3>100 > 99 && 100 > 98:{{ 100 > 99 && 100 > 98 }}</h3>
    </div>

    <div @click="handleAdd">加油</div>

    <!-- vueTemplateCompiler -->
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'welcome to zhaowa',
      number: 0,
      number2: 0
    }
  },
  methods: {
    calcNumber(num) {
      return num + 2
    },
    handleAdd() {
      this.number ++
    }
  },
  watch:  {
    number() {
      this.number2 = this.number2 + 2
    }
  },
  computed: {
    addMsg() {
      return this.msg + this.number
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
