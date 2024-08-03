import React from "react";
import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../utils/ProductsMock";

type Order = {
  products: Product[];
};

type OrdersContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
  removeOrder: (order: Order) => void;
};

export const OrdersContext = createContext<OrdersContextType>(
  {} as OrdersContextType
);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders([...orders, order]);
  };

  const removeOrder = (order: Order) => {
    const newOrders = orders.filter((o) => o !== order);
    setOrders(newOrders);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        removeOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export function useOrders() {
  return useContext(OrdersContext);
}
