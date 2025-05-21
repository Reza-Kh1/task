import axios from "axios";

const getAllData = async (query: string) => {
  let url
  if (!query) {
    url = '?limit=10&skip=1'
  } else {
    url = query
  }
  const { data } = await axios.get(`/products${url}`);
  return data;
};

export { getAllData };
