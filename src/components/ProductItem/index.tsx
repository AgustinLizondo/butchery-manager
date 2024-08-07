import React from "react";
import { View, Text } from "react-native";
import { CurrencyFormatter } from "../../utils/Formatters";
import { ProductItemProps } from "./types";

const ProductItem = (props: ProductItemProps) => {
  const { product, ...rest } = props;
  return (
    <View className="flex flex-col p-4 border-b border-b-gray-300" {...rest}>
      <View className="flex flex-row justify-between">
        <Text className="font-semibold text-xl">{product.productName}</Text>
        <Text className="font-semibold text-xl">
          {CurrencyFormatter.format(
            product.productPrice * (product.weight / 1000)
          )}
        </Text>
      </View>
      <Text>
        {CurrencyFormatter.format(product.productPrice)} x{" "}
        {product.weight / 1000}kg
      </Text>
    </View>
  );
};

export default ProductItem;
