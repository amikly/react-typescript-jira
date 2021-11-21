// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from "screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

// 本地存储（localStorage）中保存 token 的键名
const localStorageKey = "__auth_provider_token__";

/**
 * getToken: 取本地token的函数
 * @description:根据 键localStorageKey 获取 token值
 * @param {*}
 * @return {string | null} token
 */
export const getToken = () => window.localStorage.getItem(localStorageKey);

// 处理
/** 处理服务器成功返回的数据
 * @description: 设置本地存储中保存的token
 * @param {object} param1
 * @return {User} user
 */
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

/**
 * 登录
 * @description: 使用fetch发送登录请求，处理服务器返回的数据
 * @param {object} data
 * @return {Promise}
 */
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

/**
 * 注册
 * @description:使用fetch发送注册请求，处理服务器返回的数据
 * @param {object} data
 * @return {Promise}
 */
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

/**
 * 登出
 * @description: 清除本地存储中的token
 * @param {*}
 * @return {*}
 */
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
