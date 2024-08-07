import React from "react";
import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../utils/ProductsMock";

export type Order = {
  id: number;
  products: Product[];
};

type OrdersContextType = {
  orders: Order[];
  addOrders: (order: Order[]) => void;
  removeOrder: (order: Order) => void;
  setOrders: (orders: Order[]) => void;
};

export const OrdersContext = createContext<OrdersContextType>(
  {} as OrdersContextType
);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrders = (orders: Order[]) => {
    setOrders([...orders, ...orders]);
  };

  const removeOrder = (order: Order) => {
    const newOrders = orders.filter((o) => o !== order);
    setOrders(newOrders);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrders,
        removeOrder,
        setOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export function useOrders() {
  return useContext(OrdersContext);
}
