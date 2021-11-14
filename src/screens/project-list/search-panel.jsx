import React from "react";
export const SearchPanel = ({ users, param, setParam }) => {
  return (
    <form>
      <div>
        {/* setParam(Object.assign({},param,{name:evt.targrt.value})) */}
        <input
          type="text"
          value={param.name}
          /* 输入框中值改变时，更新状态中param对象的值 */
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) => setParam({ ...param, personId: evt.target.value })}
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
