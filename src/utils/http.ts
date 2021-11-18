import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  // 不同请求方法携带参数方式不同
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2XX的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // restful规范 状态码401：未登录或者token失效
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }

      // 状态码不为401，判断登录是否成功
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();

  /* 
    Utility Types：充当工具的类型
      用法: 用泛型给它传入一个其它类型，然后它对这个类型进行某种操作
  */
  // JS中的typeof，是在runtime时运行的
  // TS中的typeof，是在静态环境运行的，把变量类型提取出来
  // Parameters 以tuple的形式提取出<函数类型>的参数类型
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user ? user.token : "" });
};
