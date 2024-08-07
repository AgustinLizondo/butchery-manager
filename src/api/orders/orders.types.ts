import { Order } from "../../contexts/OrdersContext";
import { ICallbacksApi } from "../types";

export interface IGetOrdersParams extends ICallbacksApi {}

export interface ICreateOrderParams extends ICallbacksApi {
  order: Omit<Order, "id">;
}

export interface IDeleteOrderParams extends ICallbacksApi {
  orderId: Order["id"];
}
