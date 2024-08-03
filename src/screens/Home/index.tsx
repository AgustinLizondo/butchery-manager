import React from "react";
import PageContainer from "../../components/PageContainer";
import Button from "../../components/Button";
import { HomeScreenProps } from "./types";

const HomeScreen = (props: HomeScreenProps) => {
  const { navigation } = props;

  return (
    <PageContainer className="flex-col justify-evenly space-y-4">
      <Button className="py-8" textClassName="text-6xl">
        Ver pedidos
      </Button>
      <Button
        className="py-8"
        textClassName="text-6xl"
        onPress={() => navigation.navigate("ProductsHome")}
      >
        Nuevo pedido
      </Button>
    </PageContainer>
  );
};

export default HomeScreen;
