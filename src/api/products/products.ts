import { supabase } from "../../utils/supabase";
import { ICreateProduct, IGetProductsParams } from "./products.types";

const getProducts = async (params: IGetProductsParams = {}) => {
  const { successCallback = () => null, errorCallback = () => null } = params;

  try {
    const response = await supabase.from("products").select("*");

    successCallback(response.data);
  } catch (error) {
    errorCallback(error);
  }
};

const createProduct = async (params: ICreateProduct) => {
  const {
    product,
    successCallback = () => null,
    errorCallback = () => null,
  } = params;

  try {
    const response = await supabase.from("products").insert(product);
    successCallback(response.data);
  } catch (error) {
    errorCallback(error);
  }
};

const ProductsApi = {
  getProducts,
  createProduct,
};

export default ProductsApi;
