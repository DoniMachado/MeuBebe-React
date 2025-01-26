const genUUID = () => {
  return "uid-" + Math.random().toString(36).substr(2, 18);
};

const list = () => {
  const items = localStorage.getItem("items");
  if (items) return JSON.parse(items);
  return [];
};

const save = (item) => {
  const totalList = list();
  const i = {
    id: genUUID(),
    ...item,
  };
  totalList.push(i);
  updateList(totalList);
};

const updateList = (list) => {
  localStorage.setItem("items", JSON.stringify(list));
};

const get = (id) => {
  const totalList = list();
  return totalList.find((i) => i.id === id);
};

const remove = (id) => {
  const totalList = list();
  const idx = totalList.findIndex((i) => i.id === id);
  totalList.splice(idx, 1);
  updateList(totalList);
};

const update = (id, item) => {
  const totalList = list();
  const idx = totalList.findIndex((i) => i.id === id);
  totalList[idx] = item;
  updateList(totalList);
};

export { list, save, get, remove, update };
