import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./types";

const Button = (props: ButtonProps) => {
  const { className, textClassName, children, disabled, ...rest } = props;

  return (
    <TouchableOpacity
      className={twMerge(
        "bg-neutral-900 rounded-lg p-3 hover:shadow-lg",
        disabled && "opacity-50",
        className
      )}
      {...rest}
    >
      <Text
        className={twMerge("text-white text-center text-xl", textClassName)}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
