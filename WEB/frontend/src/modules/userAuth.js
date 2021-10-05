import { handleActions } from 'redux-actions';
import axios from 'axios';
import { login as loginApi, register as registerApi } from '../lib/api/userAuth';

// hoc 사용시 사용할 코드?
import {
  // LOGIN_USER,
  // REGISTER_USER,
  AUTH_USER,
} from './types';

export function auth() {
  const request = axios.get('/users/auth')
    .then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
//------------------------

const LOGIN = 'auth/LOGIN';
const REGISTER = 'auth/RESIGER';

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

export const login = (formData) => async (dispatch) => {
  const res = await loginApi(formData);
  if (res.status !== 200) {
    // 이렇게 쓰면 ESLint 에러나옴
    // const data = {
    //   success: false,
    //   loginFailure: res.data.loginFailure,
    // };
  }
  const data = {
    success: true,
    userData: res.data.user,
  };
  dispatch({
    type: LOGIN,
    payload: data,
  });
  return data;
};

export const register = (formData) => async (dispatch) => {
  const res = await registerApi(formData);
  if (res.status !== 200) {
    // 이렇게 쓰면 ESLint 에러나옴
    // const data = {
    //   success: false,
    //   registerFailure: res.data.registerFailure,
    // };
  }
  const data = {
    success: true,
    userData: res.data.user,
  };
  dispatch({
    type: REGISTER,
    payload: data,
  });
  return data;
};

const initialState = {
  userData: {
    id: null,
    userName: null,
    // 소속 등 추가 예정
  },
  status: {
    success: false,
    loginFailure: null,
  },
};

const userAuth = handleActions({
  [LOGIN]: (state, { payload: { userData, loginFailure, success } }) => ({
    ...state,
    user: {
      // ESLint rule : no-underscore-dangle
      // id: userData._id,
      userName: userData.userName,
      // 추가 데이터
    },
    login: {
      success,
      loginFailure,
    },
  }),
},
initialState);

export default userAuth;
