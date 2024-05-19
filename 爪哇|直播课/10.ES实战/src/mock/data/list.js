const utils = require('../utils')
const Mock = require("mockjs")

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    abstract: "爪哇教育-为了教育终将创造的所有美好",
    media_name: "央视网",
    title: "绘学习 | 爪哇教育-为了教育终将创造的所有美好",
    comment_count: 6355,
    datetime: "2022-06-19 18:17"
  }))
}

function getList(config) {
    // 接口逻辑 - 业务逻辑 or 排序 or 翻页
    return {
        total: List.length,
        data: List,
        has_more: false,
        html: null,
        page_id: "/__all__/",
        return_count: 8
    }
}



exports.getList = getList;