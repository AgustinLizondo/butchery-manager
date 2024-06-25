import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import PageContainer from "../../components/PageContainer";
import Container from "../../components/Container";
import { Product, ProductsMock } from "../../utils/ProductsMock";
import { CurrencyFormatter } from "../../utils/Formatters";
import ProductsApi from "../../api/products/products";
import { ProductsHomeScreenProps } from "./types";

const ProductsHomeScreen = ({ navigation }: ProductsHomeScreenProps) => {
  const [products, setProducts] = useState<Product[]>(ProductsMock);

  useEffect(() => {
    ProductsApi.getProducts({
      successCallback: (products: Product[]) => {
        if (products.length === 0) {
          return;
        }
        setProducts(products);
      },
    });
  }, []);

  return (
    <PageContainer
      className="flex-wrap flex-col justify-evenly gap-8"
      scrollEnabled
    >
      {products.map((product: Product) => {
        const onProductItemPress = () => {
          // open modal to set the weight of the product
        };

        return (
          <Container
            onPress={onProductItemPress}
            key={product.id}
            className="bg-neutral-800 rounded-xl p-12"
          >
            <Text className="text-white font-bold text-2xl">
              {product.product_name}
            </Text>
            <Text className="text-white font-bold text-2xl">
              {CurrencyFormatter.format(product.product_price)}
            </Text>
          </Container>
        );
      })}
    </PageContainer>
  );
};

export default ProductsHomeScreen;
