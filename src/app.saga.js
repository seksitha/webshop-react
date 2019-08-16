
import { call, put, all, takeLatest, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import {
    dispatcher
} from './app.utils'
// const setData = (id, data) => localStorage.setItem(id, JSON.stringify(data))

export function* getDataAsync(action) {                                            // function get call is here

    const { payload: { url, typeOnSuccess, relayData } } = action
    try {
        const { data } = yield call(axios.get, url) // getInfo/sale/saleType/saleTable
        yield put(dispatcher(typeOnSuccess, { data, relayData }))
        //if(sales.data.length)yield put(dispatcher('$$ui-SET_PAGE', data.length,'saga'));

    } catch (e) {
        try {
            if (e.response.status === 401) {

            }
        } catch (e) {

        }
    }
}
export function* addDataAsync(action) {     // function get call is here
    const { url, data, typeOnSuccess, maxPage, page } = action.payload
    console.log(data)
    try {
        const res = yield call(axios, {
            method: 'post',
            url: url,
            data: data,
        })
        yield put(dispatcher(typeOnSuccess, { data, reData: res.data[0], maxPage, page }))
    } catch (e) {
        console.log(e)
        try {
            if (e.response.status === 401) {
                yield put(dispatcher('$$ui-TOGGLE_LOGIN_STATE', false))
                yield put(dispatcher('$$ui-TOGGLE_INIT_INFO_STATE', false));
                //setData('isLogout', false);
            }
        } catch (e) {

        }
    }
}

export function* updateDataAsync(action) {                                            // function get call is here
    const { url, data, typeOnSuccess } = action.payload
    try {
        yield call(axios, {
            method: 'post',
            url: url,
            data: data,
        })
        console.log(data)
        yield put(dispatcher(typeOnSuccess, { data: data }))
    } catch (e) {
        console.log(e)
        try {
            if (e.response.status === 401) {
                yield put(dispatcher('$$ui-TOGGLE_LOGIN_STATE', false))
                yield put(dispatcher('$$ui-TOGGLE_INIT_INFO_STATE', false));
            }
        } catch (e) {

        }

    }
}



export function* loginAsync(action) {                                            // function get call is here
    try {
        const res = yield call(axios, {
            method: 'post',
            url: 'https://backendapi.turing.com/customer/login',
            data: action.payload,
        })
        //console.log(res.data)
        yield put(dispatcher('$$mw-LOGIN_SUCCESS', { status: true, data: res.data[0] }))
    } catch (e) {
        //yield put(dispatcher('LOGIN_SUCCESS', { status: false, token: null }))
        console.log(e)
    }
}

export function* isLoginAsync(action) {                                            // function get call is here
    // console.log(action.payload)
    try {
        yield call(axios, {
            method: 'get',
            url: 'https://backendapi.turing.com/customer',
            headers: {
                "user-key": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6NCwibmFtZSI6InNla3NpdGhhIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNTY1NDE5Mjk3LCJleHAiOjE1NjU1MDU2OTd9.-zDC1CkgoosiWRcBwwhPpqCW1nfP53AOqDI1Ute915E",
            },
        })

        //const status = (res.status)
        yield put(dispatcher('$$mw-USER_IS_LOGED_IN', true))
    } catch (e) {
        try {

            yield put(dispatcher('$$mw-USER_IS_LOGGED_OUT', false))
        } catch (e) {
            console.log(e)
        }
    }
}

export function* logoutAsync(action) {                                            // function get call is here
    try {
        yield call(axios, {
            method: 'get',
            url: '/apipdc/logout',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': 'abc',
            },
        })
        // console.log(res)
        //const status = (res.status)
        yield put(dispatcher('$$mw-LOGOUT_SUCCESS', { logInstatus: false, token: null }))
    } catch (e) {
        //console.log(e)
    }
}

export function* watchLoadData() {

    yield takeEvery('$$api-GET_DATA_ASYNC', getDataAsync)                              // React get call here
    yield takeLatest('$$api-UPDATE_DATA_ASYNC', updateDataAsync)                              // React get call here
    yield takeLatest('$$api-ADD_DATA_ASYNC', addDataAsync)                              // React get call here

    yield takeLatest('$$api-POST_LOGIN_ASYNC', loginAsync)                              // React get call here
    yield takeLatest('$$api-IS_LOGIN_ASYNC', isLoginAsync)                              // React get call here
    yield takeLatest('$$api-LOGOUT_ASYNC', logoutAsync)                              // React get call here

}

export default function* rootSaga() {                                         // saga root assignment
    yield all([watchLoadData()])
}