import { handleActions } from 'redux-actions';
import axios from 'axios';
import {
  login as loginApi,
  register as registerApi,
} from '../lib/api/userAuth';

// 액션 타입 정의

const LOGIN = 'auth/LOGIN';
const REGISTER = 'auth/RESIGER';

export function auth() {
  const request = axios.get('/users/auth').then(response => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}

// 액션 생성 함수 정의

export const login = formData => async dispatch => {
  const res = await loginApi(formData);

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

export const register = formData => async dispatch => {
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

// 초기상태

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

// 리듀서

const userAuth = handleActions(
  {
    [LOGIN]: (state, { payload: { isLoginSuccessful, userName } }) => ({
      ...state,
      user: {
        // ESLint rule : no-underscore-dangle
        // id: userData._id,
        userName,
        // 추가 데이터
      },
      login: {
        isLoginSuccessful,
      },
    }),
  },
  initialState,
);

export default userAuth;
