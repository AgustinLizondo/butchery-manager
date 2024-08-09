import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
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
      <PageContainer>
        <View className="flex flex-1 space-y-4">
          <View className="flex flex-row items-center justify-between pb-4 border-b">
            <View className="flex flex-row space-x-4 items-center">
              <TouchableOpacity onPress={onBackPress}>
                <Feather name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <Text className="font-bold text-xl">Órdenes</Text>
            </View>
            <Text className="text-gray-600">
              Mostrando {orders.length} órdenes
            </Text>
          </View>
          {orders.length === 0 ? (
            <View className="flex flex-1 justify-center items-center max-w-sm self-center">
              <Text className="font-semibold text-xl text-gray-600">
                No tienes órdenes para mostrar, las órdenes que crees se
                mostrarán aquí.
              </Text>
              <TouchableOpacity onPress={onBackPress}>
                <Text className="text-blue-500 font-semibold text-lg">
                  Volver al inicio.
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            orders.map((order: Order) => (
              <TouchableOpacity
                key={order.id}
                onPress={() => {
                  setSelectedOrder(order);
                  onDeleteOrder();
                }}
                className="flex flex-row items-center justify-between p-4 bg-gray-200 rounded-lg"
              >
                <View className="flex flex-col space-y-2 w-1/3">
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
                <View className="flex flex-row space-x-4 items-center">
                  <Text className="font-semibold text-lg">
                    {CurrencyFormatter.format(
                      order.products.reduce(
                        (acc, product) =>
                          acc + product.productPrice * (product.weight / 1000),
                        0
                      )
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </PageContainer>
    </>
  );
};

export default Orders;
