import React from 'react'
import { Text } from 'react-native'
import PageContainer from '../../components/PageContainer'
import Button from '../../components/Button'

const HomeScreen = () => {
  return (
    <PageContainer
      className="justify-around p-12"
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
      >
        Ver productos
      </Button>
    </PageContainer>
  )
}

export default HomeScreen