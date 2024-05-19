import axios from 'axios'

import * as type from './mutation-types'

export default {
    // 请求新列表
    getList({
        commit
    }, pay) {
        if (pay.kind && pay.flag) {
            let url = '/api/article/list'
            let params = {
                tag: pay.kind
            }

            axios.get(url, { params }).then(res => {
                res = res.data;
                commit(type.GET_NEWSLIST, {
                    data: res.data,
                    kind: pay.kind
                });
                commit(type.CHANGE_LOADING_STATE, false);
                if (res.return_count) {
                    commit(type.RETURN, true);
                } else {
                    commit(type.RETURN, false);
                }
            })
        }
    },
    // 点击下拉加载更多数据
    loadMore({
        commit
    }, pay) {
        if (pay.kind && pay.flag) {
            commit(type.PULLDOWNBTN, false);
            let url = '/api/article/list';
            let params = {
                tag: pay.kind
            }

            axios.get(url, { params }).then(res => {
                res = res.data;
                commit(type.GET_NEWSLIST, {
                    data: res.data,
                    kind: pay.kind
                })
            })
        }
    }
}