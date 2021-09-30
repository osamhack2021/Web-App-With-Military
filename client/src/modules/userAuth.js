import { createAction, handleActions } from "redux-actions";
import {login as loginApi} from '../lib/api/userAuth';

const LOGIN = 'auth/LOGIN'

/*
export const login = createAction(LOGIN, async formData => {
    //  api호출
    const  res = await loginApi(formData);
    console.log(res.data.user._id);
    if(res.status!==200){
        return {
            success: false,
            loginFailure: res.data.loginFailure
        }
    }
    return {
        success: true,
        userData: res.data.user
    };
});
*/

export const login = formData => async dispatch => {
    const res = await loginApi(formData);
    if(res.status!==200){
        const data = {
            success: false,
            loginFailure: res.data.loginFailure
        }
    }
    const data =  {
        success: true,
        userData: res.data.user
    };
    dispatch({
        type: LOGIN,
        payload: data
    })
    return data;
}

const initialState = {
    userData:{
        id: null,
        userName: null,
        //소속 등 추가 예정
    },
    status:{
        success: false,
        loginFailure: null
    }
}

const userAuth = handleActions({
        [LOGIN]: (state, {payload:{userData,loginFailure, success}}) => {
            return {
                ...state,
                user: {
                    id: userData._id,
                    userName: userData.userName,
                    //추가 데이터
                },
                login:{
                    success,
                    loginFailure
                }
            }
        }
    },
    initialState,
);

export default userAuth;