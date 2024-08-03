import { supabase } from "../../utils/supabase";
import { IGetProductsParams } from "./products.types";

const getProducts = async (params: IGetProductsParams = {}) => {
  const { successCallback = () => null, errorCallback = () => null } = params;

  try {
    const response = await supabase.from("products").select("*");

    successCallback(response.data);
  } catch (error) {
    errorCallback(error);
  }
};

const ProductsApi = {
  getProducts,
};

export default ProductsApi;
