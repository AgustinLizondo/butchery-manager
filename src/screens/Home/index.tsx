import React from "react";
import PageContainer from "../../components/PageContainer";
import Button from "../../components/Button";
import { HomeScreenProps } from "./types";
import { supabase } from "../../utils/supabase";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const HomeScreen = (props: HomeScreenProps) => {
  const { navigation } = props;

  const onSignOutPress = async () => await supabase.auth.signOut();

  return (
    <PageContainer className="flex-col space-y-4">
      <View className="flex flex-1 flex-col space-y-4">
        <View className="flex flex-1 flex-row space-x-4">
          <Button
            className="flex flex-1 h-full rounded-2xl items-center justify-center"
            onPress={() => navigation.navigate("ProductsHome")}
          >
            <View className="w-64 h-64 flex-col space-y-4 items-center justify-center">
              <Feather name="package" size={48} color="white" />
              <Text className="text-white text-xl">Productos</Text>
            </View>
          </Button>
          <Button
            className="flex flex-1 h-full items-center justify-center rounded-2xl bg-neutral-200 border border-neutral-300"
            onPress={() => navigation.navigate("Cart")}
          >
            <View className="w-64 h-64 flex-col space-y-4 items-center justify-center">
              <Feather name="shopping-cart" size={48} color="black" />
              <Text className="text-black text-xl">Carrito</Text>
            </View>
          </Button>
        </View>
        <View className="flex flex-1 flex-row flex-wrap space-x-4">
          <Button
            className="flex flex-1 h-full items-center justify-center rounded-2xl bg-neutral-200 border border-neutral-300"
            onPress={() => navigation.navigate("Orders")}
          >
            <View className="w-64 h-64 flex-col space-y-4 items-center justify-center">
              <Feather name="list" size={48} color="black" />
              <Text className="text-black text-xl">Órdenes</Text>
            </View>
          </Button>
          <Button
            className="flex flex-1 h-full items-center justify-center rounded-2xl bg-neutral-200 border border-neutral-300"
            onPress={onSignOutPress}
          >
            <View className="w-64 h-64 flex-col space-y-4 items-center justify-center">
              <Feather name="log-out" size={48} color="black" />
              <Text className="text-black text-xl">Cerrar sesión</Text>
            </View>
          </Button>
        </View>
        <Button
          className="flex flex-1 h-full items-center justify-center rounded-2xl bg-neutral-200 border border-neutral-300"
          onPress={() => navigation.navigate("Statistics")}
        >
          <View className="w-64 h-64 flex-col space-y-4 items-center justify-center">
            <Feather name="bar-chart" size={48} color="black" />
            <Text className="text-black text-xl">Estadísticas</Text>
          </View>
        </Button>
      </View>
    </PageContainer>
  );
};

export default HomeScreen;
