import { createAction, handleActions } from "redux-actions";
import {login as loginApi, register as registerApi} from '../lib/api/userAuth';

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

export const register = formData => async dispatch => {
    let data;
    const res = await registerApi(formData);
    if(res.status!==200){
        data = {
            success: false,
            registerFailure: res.data.registerFailure
        }
        return data;
    }else{
        data =  {
            success: true,
            loginFailure: null,
            userData: res.data.user
        };
    }
    dispatch({
        type: LOGIN,
        payload: data
    })
    return data;
}


export const login = formData => async dispatch => {
    let data;
    const res = await loginApi(formData);
    if(res.status!==200){
        data = {
            success: false,
            loginFailure: res.data.loginFailure
        }
        return data;
    }else{
        data =  {
            success: true,
            loginFailure: null,
            userData: res.data.user
        };
    }
    dispatch({
        type: LOGIN,
        payload: data
    })
    return data;
}

const initialState = {
    userData: null,
    status:{
        success: false,
        loginFailure: null
    }
}

const userAuth = handleActions({
        [LOGIN]: (state, {payload:{userData,loginFailure, success}}) => {
            return {
                ...state,
                user: userData,
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