import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageContainerProps } from './types'
import { twMerge } from 'tailwind-merge';

const PageContainer = (props: PageContainerProps) => {
  const {
    children,
    className,
    ...rest
  } = props;

  return (
    <SafeAreaView
      className={twMerge("flex flex-1", className)}
      {...rest}
    >
      {children}
    </SafeAreaView>
  )
}

export default PageContainer