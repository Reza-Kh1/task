import axios from "axios";

const getProduct = async (id = 1) => {
  const { data } = await axios.get(`/products/${id}`);
  return data;
};

export { getProduct };
