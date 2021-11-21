import { useEffect } from "react";
import { User } from "screens/project-list/search-panel";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  // 表格中值的状态
  const client = useHttp();

  const { run, ...result } = useAsync<User[]>();

  // 当param改变时请求数据
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
