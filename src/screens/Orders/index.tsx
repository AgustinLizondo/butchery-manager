import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import { CurrencyFormatter } from "../../utils/Formatters";
import Button from "../../components/Button";
import PageContainer from "../../components/PageContainer";
import { Feather } from "@expo/vector-icons";
import { Order, useOrders } from "../../contexts/OrdersContext";
import { OrdersScreenProps } from "./types";
import ProductItem from "../../components/ProductItem";
import OrdersApi from "../../api/orders/orders";

const Orders = ({ navigation }: OrdersScreenProps) => {
  const { orders, removeOrder, setOrders } = useOrders();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>({} as Order);

  const onBackPress = () => navigation.goBack();
  const onDeleteOrder = () => setIsModalVisible(true);
  const onDeleteConfirmed = async () => {
    await OrdersApi.deleteOrder({
      orderId: selectedOrder.id,
      successCallback: () => {
        removeOrder(selectedOrder);
      },
    });
    setIsModalVisible(false);
  };
  const onCancelButtonPress = () => setIsModalVisible(false);

  const getOrders = async () => {
    await OrdersApi.getOrders({
      successCallback: (data) => {
        setOrders(data);
      },
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        presentationStyle="pageSheet"
      >
        <View className="h-full p-8 gap-4">
          <Text className="font-semibold text-lg">
            Se borrará la orden #{selectedOrder.id} con los siguientes
            productos:
          </Text>
          <ScrollView className="flex flex-col h-full overflow-y-scroll">
            {selectedOrder?.products?.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ScrollView>
          <View className="flex flex-row w-full space-x-4 mt-auto">
            <Button
              className="flex-1 justify-center bg-red-500"
              onPress={onCancelButtonPress}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 justify-center"
              onPress={onDeleteConfirmed}
            >
              Eliminar
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
              <Text className="font-bold text-xl">Órdenes</Text>
            </View>
            <Text className="text-gray-600">
              Mostrando {orders.length} órdenes
            </Text>
          </View>
          {orders.length === 0 ? (
            <View className="flex flex-1 justify-center items-center">
              <Text className="font-semibold text-xl text-gray-600">
                No tienes órdenes para mostrar, las órdenes que crees se
                mostrarán aquí.
              </Text>
              <Pressable
                onPress={onBackPress}
                className="flex flex-row gap-2 items-center"
              >
                <Text className="text-blue-500 font-semibold text-lg">
                  Volver al inicio.
                </Text>
              </Pressable>
            </View>
          ) : (
            orders.map((order: Order) => (
              <View
                key={order.id}
                className="flex flex-col p-4 rounded-xl bg-gray-200"
              >
                <View className="flex flex-row items-center justify-between">
                  <View className="flex flex-col gap-2">
                    <Text className="font-semibold text-xl text-gray-600">
                      #{order.id}
                    </Text>
                    <Text className="text-gray-600">
                      {order.products
                        .slice(0, 3)
                        .map((product) => product.productName)
                        .join(", ")}
                      .{order.products.length > 3 && ".."}
                    </Text>
                  </View>
                  <View className="flex flex-row gap-4 items-center">
                    <Text className="font-semibold text-xl">
                      Total:{" "}
                      {CurrencyFormatter.format(
                        order.products.reduce(
                          (acc, product) =>
                            acc +
                            product.productPrice * (product.weight / 1000),
                          0
                        )
                      )}
                    </Text>
                    <Pressable
                      onPress={() => {
                        setSelectedOrder(order);
                        onDeleteOrder();
                      }}
                      className="w-12 h-12 active:opacity-50 rounded-full bg-gray-300 items-center justify-center"
                    >
                      <Feather name="trash-2" size={24} color="red" />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </PageContainer>
    </>
  );
};

export default Orders;
