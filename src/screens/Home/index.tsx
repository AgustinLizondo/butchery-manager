import React from 'react'
import PageContainer from '../../components/PageContainer'
import Button from '../../components/Button'
import { HomeScreenProps } from './types'

const HomeScreen = (props: HomeScreenProps) => {
  const {
    navigation,
  } = props;

  return (
    <PageContainer
      className="flex-col justify-evenly"
    >
      <Button
        className="py-8"
        textClassName="text-6xl"
      >
        Nuevo pedido
      </Button>
      <Button
        className="py-8"
        textClassName="text-6xl"
      >
        Ver pedidos
      </Button>
      <Button
        className="py-8"
        textClassName="text-6xl"
        onPress={() => navigation.navigate("ProductsHome")}
      >
        Ver productos
      </Button>
    </PageContainer>
  )
}

export default HomeScreen