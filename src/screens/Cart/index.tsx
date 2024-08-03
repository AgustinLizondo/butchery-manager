import React, { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { useCart } from "../../contexts/CartContext";
import { Product } from "../../utils/ProductsMock";
import { CurrencyFormatter } from "../../utils/Formatters";
import Button from "../../components/Button";
import PageContainer from "../../components/PageContainer";
import { Feather } from "@expo/vector-icons";
import { CartScreenProps } from "./typex";
import { useOrders } from "../../contexts/OrdersContext";

const Cart = ({ navigation }: CartScreenProps) => {
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onBackPress = () => navigation.goBack();
  const onFinishPress = () => setIsModalVisible(true);
  const onCancelButtonPress = () => setIsModalVisible(false);
  const onFinishConfirmed = () => {
    setIsModalVisible(false);
    addOrder({ products: cart });
    clearCart();
    navigation.navigate("Home");
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        presentationStyle="pageSheet"
      >
        <View className="h-full p-8 justify-between">
          <Text className="text-gray-600 font-semibold text-lg">
            Esta acción vaciará el carrito y agregará este pedido al historial,
            ¿estás seguro?
          </Text>
          <View className="flex flex-row w-full space-x-4">
            <Button
              className="flex-1 justify-center bg-red-500"
              onPress={onCancelButtonPress}
            >
              Seguir editando
            </Button>
            <Button
              className="flex-1 justify-center"
              onPress={onFinishConfirmed}
            >
              Finalizar
            </Button>
          </View>
        </View>
      </Modal>
      <PageContainer className="flex flex-1">
        <View className="flex flex-1 gap-4">
          <View className="flex flex-row justify-between pb-4 border-b">
            <View className="flex flex-row gap-4 items-center">
              <Pressable onPress={onBackPress}>
                <Feather name="arrow-left" size={24} color="black" />
              </Pressable>
              <Text className="font-bold text-xl">Carrito</Text>
            </View>
            <Text className="text-gray-600">{cart.length} productos</Text>
          </View>
          {cart.map((product: Product) => (
            <View key={product.id} className="flex flex-col p-4">
              <View className="flex flex-row justify-between">
                <Text className="font-semibold text-xl">
                  {product.product_name}
                </Text>
                <Text className="font-semibold text-xl">
                  {CurrencyFormatter.format(
                    product.product_price * (product.weight / 1000)
                  )}
                </Text>
              </View>
              <Text>
                {CurrencyFormatter.format(product.product_price)} x{" "}
                {product.weight / 1000}kg
              </Text>
            </View>
          ))}
        </View>
        <View className="flex flex-row w-full gap-4">
          <Button
            onPress={clearCart}
            disabled={cart.length === 0}
            className="flex-1 bg-red-500"
          >
            Vaciar Carrito
          </Button>
          <Button
            onPress={onFinishPress}
            disabled={cart.length === 0}
            className="flex-1"
          >
            Finalizar
          </Button>
        </View>
      </PageContainer>
    </>
  );
};

export default Cart;
