import React, { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { OrdersProvider } from "./OrdersContext";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartProvider>
      <OrdersProvider>{children}</OrdersProvider>
    </CartProvider>
  );
};

export default ContextProvider;
