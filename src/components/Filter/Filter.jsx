import { colors } from "../../constants/colors";
import { Actions } from "../../constants/actions";

export const Filter = ({ data, dispatch }) => {
  const avatarColors = [
    ...new Set(data.map(({ avatar_color }) => avatar_color)),
  ];

  return (
    <div>
      <label htmlFor="closed-select">Тип группы:</label>
      <select
        id="closed-select"
        onChange={(e) => {
          dispatch({
            type: Actions.setFilters,
            payload: {
              closed: e.target.value,
            },
          });

          dispatch({ type: Actions.filterData });
        }}
      >
        <option value="">Все</option>
        <option value="closed">Закрытые</option>
        <option value="open">Открытые</option>
      </select>

      <label htmlFor="avatar-color-select">Цвет аватара:</label>
      <select
        id="avatar-color-select"
        onChange={(e) => {
          dispatch({
            type: Actions.setFilters,
            payload: { avatarColor: e.target.value },
          });

          dispatch({ type: Actions.filterData });
        }}
      >
        <option value=""></option>
        {avatarColors.length > 0 &&
          avatarColors.map((avatar_color) => {
            if (!avatar_color) {
              return (
                <option key="no-avatar" value="no-avatar">
                  без аватара
                </option>
              );
            }
            return (
              <option key={avatar_color} value={avatar_color}>
                {colors[avatar_color]}
              </option>
            );
          })}
      </select>

      <label htmlFor="friends-in-select">Тип группы:</label>
      <select
        id="friends-in-select"
        onChange={(e) => {
          dispatch({
            type: Actions.setFilters,
            payload: { friends: e.target.value },
          });

          dispatch({ type: Actions.filterData });
        }}
      >
        <option value=""></option>
        <option value="friends-in">Есть друзья в группе</option>
        <option value="friends-not-in">Нет друзей в группе</option>
      </select>
    </div>
  );
};
