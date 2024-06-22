import React from 'react'
import { View } from 'react-native'
import { IContainerProps } from './types';

const Container = (props: IContainerProps) => {
  const {
    children,
    ...rest
  } = props;

  return (
    <View
      className="flex flex-1 rounded-sm p-4 hover:shadow-lg"
      {...rest}
    >
      {children}
    </View>
  )
}

export default Container