import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge';
import { ButtonProps } from './types';

const Button = (props: ButtonProps) => {
  const {
    className,
    textClassName,
    children,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      className={twMerge("bg-neutral-900 rounded-xl p-4 hover:shadow-lg", className)}
      {...rest}
    >
      <Text
        className={twMerge("text-white text-center text-xl", textClassName)}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}

export default Button