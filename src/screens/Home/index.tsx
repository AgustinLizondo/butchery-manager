import React from "react";
import PageContainer from "../../components/PageContainer";
import Button from "../../components/Button";
import { HomeScreenProps } from "./types";
import { supabase } from "../../utils/supabase";
import { View } from "react-native";

const HomeScreen = (props: HomeScreenProps) => {
  const { navigation } = props;

  const onSignOutPress = async () => await supabase.auth.signOut();

  return (
    <PageContainer className="flex-col space-y-4">
      <View className="flex flex-1 flex-col space-y-4">
        <View className="flex flex-1 flex-row flex-wrap space-x-4">
          <Button
            className="flex flex-1 h-full items-center justify-center rounded-2xl bg-neutral-400"
            onPress={() => navigation.navigate("Orders")}
          >
            Ver órdenes
          </Button>
          <Button
            className="flex flex-1 h-full items-center justify-center rounded-2xl bg-neutral-600"
            onPress={() => navigation.navigate("Cart")}
          >
            Ver carrito
          </Button>
        </View>
        <Button
          className="flex flex-1 h-full items-center justify-center rounded-2xl bg-neutral-900"
          onPress={() => navigation.navigate("ProductsHome")}
        >
          Nuevo pedido
        </Button>
      </View>
      <Button
        className="bg-transparent p-0"
        textClassName="text-black"
        onPress={onSignOutPress}
      >
        Cerrar sesión
      </Button>
    </PageContainer>
  );
};

export default HomeScreen;
