import React, { useState } from "react";
import { Friends } from "../Friends/Friends";

export const Group = ({ group }) => {
  const { name, closed, avatar_color, members_count, friends } = group;

  const [open, setOpen] = useState(false);

  return (
    <div className="group">
      {Object.hasOwn(group, "name") && (
        <h2>{name === "" ? "Нет названия" : name}</h2>
      )}
      {Object.hasOwn(group, "closed") && (
        <div>{closed ? "closed" : "open"}</div>
      )}
      {Object.hasOwn(group, "avatar_color") && (
        <div className="avatar" style={{ backgroundColor: avatar_color }}></div>
      )}
      {Object.hasOwn(group, "members_count") && <div>{members_count}</div>}
      {group?.friends?.length > 0 && (
        <div onClick={() => setOpen(!open)} className="friends__wrapper">
          <h3>Мои друзья</h3>
          <Friends friends={friends} isOpen={open} />
        </div>
      )}
    </div>
  );
};
