import React from "react";
import { useEffect, useReducer } from "react";
import { Group } from "../components/Group/Group";
import { getGroupResponse } from "../utils/getGroupResponse";
import { Filter } from "../components/Filter/Filter";
import { Actions } from "../constants/actions";

const filterData = ({ initialData, filters }) => {
  const { closed, avatarColor, friends } = filters;

  const closedBoolValue = closed === "closed" ? true : false;
  const friendsBoolValue = friends === "friends-in" ? true : false;

  const filtered = initialData.filter((group) => {
    if (closed !== "" && group.closed !== closedBoolValue) {
      return false;
    }
    if (
      avatarColor !== "" &&
      avatarColor !== "no-avatar" &&
      group.avatar_color !== avatarColor
    ) {
      return false;
    }
    if (avatarColor === "no-avatar" && group.avatar_color) {
      return false;
    }
    if (friends !== "" && Boolean(group.friends) !== friendsBoolValue) {
      return false;
    }
    return true;
  });
  return filtered;
};

const initialState = {
  result: 1,
  initialData: [],
  data: [],
  filters: {
    closed: "",
    avatarColor: "",
    friends: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case Actions.fetchData: {
      return {
        ...state,
        result: action.payload.result,
        initialData: action.payload.data,
        dataToShow: action.payload.data,
      };
    }
    case Actions.setFilters: {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    }
    case Actions.filterData: {
      return {
        ...state,
        dataToShow: filterData(state),
      };
    }
    default: {
      return state;
    }
  }
};

export const Main = () => {
  const [dataState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getGroupResponseWrapper() {
      const { result, data } = await getGroupResponse();

      dispatch({
        type: Actions.fetchData,
        payload: { result, data },
      });
    }

    getGroupResponseWrapper();
  }, []);

  if (dataState.result === 0) {
    return <div>Что-то пошло не так. Пожалуйста, повторите попытку позже.</div>;
  }

  if (dataState.initialData.length === 0) {
    return <div>...Загрузка</div>;
  }

  return (
    <div>
      <Filter data={dataState.initialData} dispatch={dispatch} />
      <div>
        {dataState?.dataToShow?.length > 0 &&
          dataState.dataToShow.map((group) => (
            <Group key={group.id} group={group} />
          ))}
      </div>
    </div>
  );
};
