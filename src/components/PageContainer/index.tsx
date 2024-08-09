import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageContainerProps } from "./types";
import { twMerge } from "tailwind-merge";
import { ScrollView } from "react-native";

const PageContainer = (props: PageContainerProps) => {
  const {
    children,
    className,
    scrollEnabled = false,
    horizontal = true,
    ...rest
  } = props;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      horizontal={horizontal}
      scrollEnabled={scrollEnabled}
    >
      <SafeAreaView
        className={twMerge("flex flex-1 h-screen w-full p-6", className)}
        {...rest}
      >
        {children}
      </SafeAreaView>
    </ScrollView>
  );
};

export default PageContainer;
