import React from "react";

export const Friends = ({ friends, isOpen }) => {
  if (!isOpen) {
    return;
  }

  return (
    <div>
      {friends.length > 0 &&
        friends.map(({ first_name, last_name }) => (
          <div key={`${first_name} ${last_name}`}>
            <span>{`${first_name} ${last_name}`}</span>
          </div>
        ))}
    </div>
  );
};
