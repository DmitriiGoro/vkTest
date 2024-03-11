export const getGroupResponse = async () => {
  const response = await fetch("groups.json");

  const json = await response.json();

  await new Promise((res) => {
    setTimeout(() => {}, 1000);
    res();
  });

  if (json.result === 0) {
    return { result: 0, data: [] };
  }

  return { result: 1, data: json };
};
