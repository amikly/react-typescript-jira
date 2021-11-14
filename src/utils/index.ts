import { useEffect, useState } from "react";

// 除0外布尔值为false的情况
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的
// 删除对象中值为空的键值对
export const cleanObject = (object: Object) => {
  // Object.assign({},object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

// Custom(自定义) Hook
// 页面加载（初次渲染）时需执行的函数
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 把 value 延时转换成 debouncedValue (响应式)
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在 value/delay 变化后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个 userEffect 处理完后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
