import actionTypes from './actionTypes';

export const userLoginSuccess = (userInfo, token) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
    token: token
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})