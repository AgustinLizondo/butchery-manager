import React from 'react'
import { TouchableOpacity } from 'react-native'
import { IContainerProps } from './types';
import { twMerge } from 'tailwind-merge';

const Container = (props: IContainerProps) => {
  const {
    children,
    className,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      className={twMerge("flex rounded-sm p-4", className)}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}

export default Container