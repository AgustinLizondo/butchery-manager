import React from "react";
import PageContainer from "../../components/PageContainer";
import Button from "../../components/Button";
import { HomeScreenProps } from "./types";
import { supabase } from "../../utils/supabase";

const HomeScreen = (props: HomeScreenProps) => {
  const { navigation } = props;

  const onSignOutPress = async () => await supabase.auth.signOut();

  return (
    <PageContainer className="flex-col justify-evenly space-y-4">
      <Button
        className="py-8"
        textClassName="text-6xl"
        onPress={() => navigation.navigate("Orders")}
      >
        Ver órdenes
      </Button>
      <Button
        className="py-8"
        textClassName="text-6xl"
        onPress={() => navigation.navigate("ProductsHome")}
      >
        Nuevo pedido
      </Button>
      <Button
        className="py-8"
        textClassName="text-6xl"
        onPress={() => navigation.navigate("Cart")}
      >
        Ver carrito
      </Button>
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
