import React from 'react'
import { Text } from 'react-native'
import PageContainer from '../../components/PageContainer'
import Container from '../../components/Container'
import { ProductsMock } from '../../utils/ProductsMock'
import { CurrencyFormatter } from '../../utils/Formatters'

const ProductsHomeScreen = () => {
  return (
    <PageContainer
      className="flex-wrap flex-col justify-evenly gap-8"
      scrollEnabled
    >
      {ProductsMock.map((product) => (
        <Container
          className="bg-neutral-800 rounded-xl p-12"
        >
          <Text
            className="text-white font-bold text-2xl"
          >
            {product.name}
          </Text>
          <Text
            className="text-white font-bold text-2xl"
          >
            {CurrencyFormatter.format(product.price)}
          </Text>
        </Container>
      ))}
    </PageContainer>
  )
}

export default ProductsHomeScreen