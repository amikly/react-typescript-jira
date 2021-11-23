import { useEffect, useState } from "react";

const test = () => {
  let num = 0;

  const effect = () => {
    num += 1;
    const message = `现在的num值:${num}`;
    return function unmount() {
      console.log(message);
    };
  };

  return effect;
};

// 执行test，返回effect函数
const add = test();
// 执行effect函数，返回引用了message1的unmount函数
const unmount = add();
// 执行effect函数，返回引用了message2的unmount函数
add();
// 执行effect函数，返回引用了message3的unmount函数
add();
unmount(); // 直觉是3，实际是1

// react hook 与 闭包，hook 与 闭包经典的坑
export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("num in setInterval: ", num);
    }, 1000);
    return () => clearInterval(id);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log("卸载值：", num);
    };
  }, [num]);

  return (
    <div>
      {num}
      <button onClick={add}>+1</button>
    </div>
  );
};
