import { createAction, handleActions } from "redux-actions";
import {login as loginApi, register as registerApi} from '../lib/api/userAuth';

const LOGIN = 'auth/LOGIN';
const REGISTER = 'auth/register';

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
            registerFailure: res.data.registerFailure
        }
        return data;
    }else{
        data = { userData: res.data.user };
    }
    dispatch({
        type: REGISTER,
        payload: data
    })
    return data;
}

export const login = formData => async dispatch => {
    let data;
    const res = await loginApi(formData);
    if(res.status!==200){
        data = { loginFailure: res.data.loginFailure }
        return data;
    }else{
        data =  { userData: res.data.user };
    }
    dispatch({
        type: LOGIN,
        payload: data
    })
    return data;
}

/*
    user: {
        id: ,
        userName,
        ...
    }
*/
const initialState = {
    user: null
}


const userAuth = handleActions({
        [LOGIN]: (state, {payload:{userData}}) => {
            return {
                ...state,
                user: userData
            }
        },
        [REGISTER]: (state, {payload:{userData}}) => {
            return {
                ...state,
                user: userData
            }
        },
    },
    initialState,
);

export default userAuth;