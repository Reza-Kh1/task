import axios from "axios";

const getAllData = async (query: string) => {  
  const { data } = await axios.get(`/products${query}`);
  return data;
};

export { getAllData };
