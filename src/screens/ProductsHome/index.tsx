import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import PageContainer from "../../components/PageContainer";
import Container from "../../components/Container";
import { Product, ProductsMock } from "../../utils/ProductsMock";
import { CurrencyFormatter } from "../../utils/Formatters";
import ProductsApi from "../../api/products/products";
import { ProductsHomeScreenProps } from "./types";
import Button from "../../components/Button";
import { useCart } from "../../contexts/CartContext";
import { Feather } from "@expo/vector-icons";

const ProductsHomeScreen = ({ navigation }: ProductsHomeScreenProps) => {
  type ProductWithoutWeight = Omit<Product, "weight">;
  const emptyProduct: ProductWithoutWeight = {
    id: 0,
    product_name: "",
    product_price: 0,
    created_at: "",
    created_by: "",
  };

  const { addToCart } = useCart();

  const [products, setProducts] =
    useState<ProductWithoutWeight[]>(ProductsMock);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithoutWeight>(emptyProduct);
  const [weight, setWeight] = useState<string>("0");

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

  const onBackPress = () => navigation.goBack();
  const onChangeText = (text: string) => setWeight(text);
  const closeModalAndResetForm = () => {
    setSelectedProduct(emptyProduct);
    setWeight("0");
    setIsModalVisible(false);
  };
  const onCancelButtonPress = () => closeModalAndResetForm();
  const onAddButtonPress = () => {
    addToCart({
      ...selectedProduct,
      weight: Number(weight),
    });
    closeModalAndResetForm();
  };
  const onAddAndGoToCartPress = () => {
    onAddButtonPress();
    closeModalAndResetForm();
    navigation.navigate("Cart");
  };

  const totalAmount = CurrencyFormatter.format(
    Number(selectedProduct?.product_price) * (Number(weight) / 1000)
  ).toString();

  return (
    <KeyboardAvoidingView>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        presentationStyle="pageSheet"
      >
        <View className="h-full p-8 justify-between">
          <View className="space-y-4">
            <Text className="text-gray-600 font-semibold text-lg">
              Estás agregando
              <Text className="text-black font-bold text-lg">
                {` ${selectedProduct?.product_name.toLowerCase()} `}
              </Text>
            </Text>
            <View className="space-y-2">
              <Text className="text-gray-500 text-md font-bold">Gramos</Text>
              <TextInput
                className="w-full h-12 bg-neutral-200 rounded-lg p-4"
                placeholder="Ingrese el peso del producto en gramos"
                placeholderTextColor="gray"
                returnKeyType="done"
                inputMode="numeric"
                autoFocus
                onChangeText={onChangeText}
              />
            </View>
            <View className="space-y-2">
              <Text className="text-gray-500 text-md font-bold">Total</Text>
              <TextInput
                className="w-full h-12 bg-neutral-200 rounded-lg p-4 text-gray-500"
                inputMode="numeric"
                editable={false}
                defaultValue={totalAmount}
              />
            </View>
          </View>
          <View className="flex flex-row w-full space-x-4">
            <Button
              className="flex-1 justify-center"
              onPress={onCancelButtonPress}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 justify-center"
              disabled={!weight}
              onPress={onAddButtonPress}
            >
              Seguir agregando
            </Button>
            <Button
              className="flex-1 justify-center"
              disabled={!weight}
              onPress={onAddAndGoToCartPress}
            >
              Agregar e ir al carrito
            </Button>
          </View>
        </View>
      </Modal>
      <PageContainer scrollEnabled>
        <View className="flex flex-row pb-4 border-b items-center">
          <Pressable onPress={onBackPress}>
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text className="font-bold text-xl ml-4">Productos</Text>
        </View>
        <View className="flex flex-wrap gap-8 mt-0">
          {products.map((product: ProductWithoutWeight) => {
            const onProductItemPress = () => {
              setSelectedProduct(product);
              setIsModalVisible(true);
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
        </View>
      </PageContainer>
    </KeyboardAvoidingView>
  );
};

export default ProductsHomeScreen;
