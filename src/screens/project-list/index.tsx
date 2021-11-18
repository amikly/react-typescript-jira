import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

export const ProjectListScreen = () => {
  // 下拉框中值的状态
  const [users, setUsers] = useState([]);

  // 输入框中值的状态
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 200);

  // 表格中值的状态
  const [list, setList] = useState([]);
  const client = useHttp();

  // 当param改变时请求数据
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  // 初始化users 页面初次渲染（render）时执行
  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
