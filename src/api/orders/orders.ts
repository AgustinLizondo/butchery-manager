import { supabase } from "../../utils/supabase";
import {
  ICreateOrderParams,
  IDeleteOrderParams,
  IGetOrdersParams,
} from "./orders.types";

const getOrders = async (params: IGetOrdersParams = {}) => {
  const { successCallback = () => null, errorCallback = () => null } = params;

  try {
    const response = await supabase.from("orders").select("*");
    successCallback(response.data);
  } catch (error) {
    errorCallback(error);
  }
};

const createOrder = async (params: ICreateOrderParams) => {
  const {
    successCallback = () => null,
    errorCallback = () => null,
    order,
  } = params;

  try {
    const response = await supabase.from("orders").insert(order);
    successCallback(response.data);
  } catch (error) {
    errorCallback(error);
  }
};

const deleteOrder = async (params: IDeleteOrderParams) => {
  const {
    successCallback = () => null,
    errorCallback = () => null,
    orderId,
  } = params;

  try {
    const response = await supabase.from("orders").delete().eq("id", orderId);
    successCallback(response.data);
  } catch (error) {
    errorCallback(error);
  }
};

const OrdersApi = {
  getOrders,
  createOrder,
  deleteOrder,
};

export default OrdersApi;
