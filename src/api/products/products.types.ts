import { Product } from "../../utils/ProductsMock";
import { ICallbacksApi } from "../types";

export interface IGetProductsParams extends ICallbacksApi {}

export interface ICreateProduct extends ICallbacksApi {
  product: Pick<Product, "productName" | "productPrice">;
}
