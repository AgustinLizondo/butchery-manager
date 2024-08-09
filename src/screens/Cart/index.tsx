import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useCart } from "../../contexts/CartContext";
import { Product } from "../../utils/ProductsMock";
import { CurrencyFormatter } from "../../utils/Formatters";
import Button from "../../components/Button";
import PageContainer from "../../components/PageContainer";
import { Feather } from "@expo/vector-icons";
import { CartScreenProps } from "./typex";
import ProductItem from "../../components/ProductItem";
import OrdersApi from "../../api/orders/orders";

const Cart = ({ navigation }: CartScreenProps) => {
  const { cart, clearCart } = useCart();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onBackPress = () => navigation.goBack();
  const onFinishPress = () => setIsModalVisible(true);
  const onCancelButtonPress = () => setIsModalVisible(false);
  const onAddProductsPress = () => navigation.navigate("ProductsHome");
  const onFinishConfirmed = async () => {
    setIsModalVisible(false);
    try {
      await OrdersApi.createOrder({
        order: { products: cart },
      });
    } catch (error) {
      return console.error(error);
    }
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
      <PageContainer className="flex flex-1" scrollEnabled horizontal={false}>
        <View className="flex flex-1 gap-4">
          <View className="flex flex-row justify-between pb-4 border-b">
            <View className="flex flex-row gap-4 items-center">
              <TouchableOpacity onPress={onBackPress}>
                <Feather name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <Text className="font-bold text-xl">Carrito</Text>
            </View>
            <Text className="text-gray-600">{cart.length} productos</Text>
          </View>
          {cart.length === 0 ? (
            <View className="flex flex-1 justify-center items-center">
              <Text className="font-semibold text-xl text-gray-600">
                No tienes nada en el carrito, los productos que agregues se
                mostrarán aquí.
              </Text>
              <TouchableOpacity onPress={onAddProductsPress}>
                <Text className="text-blue-500 font-semibold text-lg">
                  Agregar productos
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {cart.map((product: Product) => (
                <ProductItem key={product.id} product={product} />
              ))}
              <Text className="font-semibold text-xl p-4 self-end">
                Total:{" "}
                {CurrencyFormatter.format(
                  cart.reduce(
                    (acc, product) =>
                      acc + product.productPrice * (product.weight / 1000),
                    0
                  )
                )}
              </Text>
            </>
          )}
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
