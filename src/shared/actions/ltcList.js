
import { LtcActionTypes } from '../types';
import { LTCLIST_URL } from 'shared-modules/config';
import qs from "qs"
import axios from "axios"
export const setList = (list) => {
    return ({
        type: LtcActionTypes.GET_DATA,
        list: list
    })
}

export const getData = (listQuery, isLoadMore) => {
    return async (dispatch, getState) => {
        // 获取数据
        // const url = 'http://mock.poorman.top/mock/5fe3f9135847b3001cd1e4f5/lp/getlist'
        const url = LTCLIST_URL
        const res = await axios({
            method: "POST", 
            url: url, 
            data: qs.stringify(listQuery), 
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        console.log(res);
        let list = res.data.data.content;
        if (isLoadMore) {
            let o = Array.from(getState().ltcList.list)
            list = list.concat(o)
        }
        dispatch(setList(list))
    }
}