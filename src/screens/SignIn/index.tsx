import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import { Text, TextInput, View } from "react-native";
import Button from "../../components/Button";
import { supabase } from "../../utils/supabase";
import { SignInScreenProps } from "./types";

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email && password;

  const onSignInButtonPress = async () => {
    if (!isValid) return;

    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const onSignUpPress = async () => navigation.navigate("SignUp");

  const onEmailChange = (text: string) => setEmail(text);
  const onPasswordChange = (text: string) => setPassword(text);

  return (
    <PageContainer horizontal={false}>
      <View className="flex h-1/3 space-y-2 items-center justify-center">
        <Text className="font-bold text-6xl text-center">Hola de nuevo!</Text>
        <Text className="font-normal text-2xl text-gray-500 text-center">
          Inicia sesión con tu correo electrónico
        </Text>
      </View>
      <View className="flex h-2/3 space-y-8 w-full self-center">
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
          onChangeText={onPasswordChange}
        />
        <Button
          className="w-full"
          disabled={!isValid}
          onPress={onSignInButtonPress}
        >
          Iniciar sesión
        </Button>
        <Button
          onPress={onSignUpPress}
          className="bg-transparent p-0"
          textClassName="text-black"
        >
          <Text>¿No tienes una cuenta? </Text>
          Crear una
        </Button>
      </View>
    </PageContainer>
  );
};

export default SignInScreen;
