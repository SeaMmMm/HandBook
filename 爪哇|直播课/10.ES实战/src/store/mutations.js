import * as type from './mutation-types'

export default {
    // 获取新闻列表
    [type.GET_NEWSLIST](state, payload) {
        for(var item in payload.data) {
            state.list[payload.kind].push(payload.data[item]);
        }
        state.downLoadMore = true;
    },
    [type.RETURN](state, flag) {
        state.ifReturnMsg = flag;
    },
    [type.ROUTERCHANGE](state, sign) {
        state.routerChange = sign;
    },
    [type.PULLDOWNBTN](state, sign) {
        state.downLoadMore = sign;
    },
    [type.CHANGE_LOADING_STATE](state, flag) {
        state.loading = flag;
    },
}