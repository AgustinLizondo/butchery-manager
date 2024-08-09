import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import { Text, TextInput, View } from "react-native";
import Button from "../../components/Button";
import { supabase } from "../../utils/supabase";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email && password;

  const onSignUpButtonPress = async () => {
    if (!isValid) return;

    await supabase.auth.signUp({
      email,
      password,
    });
  };

  const onEmailChange = (text: string) => setEmail(text);
  const onPasswordChange = (text: string) => setPassword(text);

  return (
    <PageContainer horizontal={false}>
      <View className="flex h-1/3 gap-2 items-center justify-center">
        <Text className="font-bold text-6xl">Te damos la bienvenida!</Text>
        <Text className="font-normal text-2xl text-gray-500">
          Completa los siguientes campos para crear tu cuenta
        </Text>
      </View>
      <View className="flex h-2/3 gap-8 w-1/2 self-center">
        <TextInput
          className="w-full h-12 bg-neutral-200 rounded-lg p-4"
          placeholder="Correo electrónico"
          placeholderTextColor="gray"
          returnKeyType="done"
          onChangeText={onEmailChange}
        />
        <TextInput
          className="w-full h-12 bg-neutral-200 rounded-lg p-4"
          placeholder="Contraseña"
          placeholderTextColor="gray"
          returnKeyType="done"
          inputMode="numeric"
          onChangeText={onPasswordChange}
        />
        <Button
          className="w-full"
          disabled={!isValid}
          onPress={onSignUpButtonPress}
        >
          Crear cuenta
        </Button>
      </View>
    </PageContainer>
  );
};

export default SignUpScreen;
