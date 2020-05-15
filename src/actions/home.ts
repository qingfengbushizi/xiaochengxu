import {
    GETPERSON
} from '../constants/home'

import api from '../services/api'


// 配置
export const getPerson = () => {
    return dispatch => {
        api.get('/person').then((res)=>{
            let person = res.data
            dispatch({
                type:GETPERSON,
                payload:{
                    person
                }
            })
        })
    }
}