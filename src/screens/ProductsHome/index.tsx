import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import PageContainer from "../../components/PageContainer";
import Container from "../../components/Container";
import { Product } from "../../utils/ProductsMock";
import { CurrencyFormatter } from "../../utils/Formatters";
import ProductsApi from "../../api/products/products";
import { ProductsHomeScreenProps } from "./types";
import Button from "../../components/Button";
import { useCart } from "../../contexts/CartContext";
import { Feather } from "@expo/vector-icons";

const ProductsHomeScreen = ({ navigation }: ProductsHomeScreenProps) => {
  type ProductWithoutWeight = Omit<Product, "weight">;
  const emptyProduct: ProductWithoutWeight = {
    id: 0,
    productName: "",
    productPrice: 0,
    createdAt: "",
    createdBy: "",
  };

  const { addToCart } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductWithoutWeight[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithoutWeight>(emptyProduct);
  const [weight, setWeight] = useState("0");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const getProducts = async () => {
    await ProductsApi.getProducts({
      successCallback: (products: Product[]) => {
        setProducts(products);
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const createProduct = async () => {
    setIsLoading(true);
    await ProductsApi.createProduct({
      product: {
        productPrice: Number(price),
        productName: name,
      },
      successCallback: () => {
        getProducts();
        setIsProductModalVisible(false);
        setName("");
        setPrice("");
      },
    });
  };

  const onBackPress = () => navigation.goBack();
  const onChangeText = (text: string) => setWeight(text);
  const onNameChange = (text: string) => setName(text);
  const onPriceChange = (text: string) => setPrice(text);

  const closeModalAndResetForm = () => {
    setSelectedProduct(emptyProduct);
    setWeight("0");
    setIsModalVisible(false);
  };
  const onCancelButtonPress = () => closeModalAndResetForm();
  const onCancelProductButtonPress = () => setIsProductModalVisible(false);
  const onAddButtonPress = () => {
    addToCart({
      ...selectedProduct,
      weight: Number(weight),
    });
    closeModalAndResetForm();
  };
  const onAddProductButtonPress = () => setIsProductModalVisible(true);
  const onConfirmProductButtonPress = () => createProduct();
  const onAddAndGoToCartPress = () => {
    onAddButtonPress();
    closeModalAndResetForm();
    navigation.navigate("Cart");
  };

  const totalAmount = CurrencyFormatter.format(
    Number(selectedProduct?.productPrice) * (Number(weight) / 1000)
  ).toString();

  return (
    <KeyboardAvoidingView>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        presentationStyle="pageSheet"
      >
        <View className="h-full p-8 justify-between">
          <View className="space-y-4">
            <Text className="text-gray-600 font-semibold text-lg">
              Estás agregando
              <Text className="text-black font-bold text-lg">
                {` ${selectedProduct?.productName.toLowerCase()} `}
              </Text>
            </Text>
            <View className="space-y-2">
              <Text className="text-gray-500 text-md font-bold">Gramos</Text>
              <TextInput
                className="w-full h-12 bg-neutral-200 rounded-lg p-4"
                placeholder="Ingrese el peso del producto en gramos"
                placeholderTextColor="gray"
                returnKeyType="done"
                inputMode="numeric"
                autoFocus
                onChangeText={onChangeText}
              />
            </View>
            <View className="space-y-2">
              <Text className="text-gray-500 text-md font-bold">Total</Text>
              <TextInput
                className="w-full h-12 bg-neutral-200 rounded-lg p-4 text-gray-500"
                inputMode="numeric"
                editable={false}
                defaultValue={totalAmount}
              />
            </View>
          </View>
          <View className="flex flex-row w-full space-x-4">
            <Button
              className="flex-1 justify-center"
              onPress={onCancelButtonPress}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 justify-center"
              disabled={!weight}
              onPress={onAddButtonPress}
            >
              Seguir agregando
            </Button>
            <Button
              className="flex-1 justify-center"
              disabled={!weight}
              onPress={onAddAndGoToCartPress}
            >
              Agregar e ir al carrito
            </Button>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={isProductModalVisible}
        presentationStyle="pageSheet"
      >
        <View className="h-full p-8 justify-between">
          <View className="space-y-4">
            <Text className="text-gray-600 font-semibold text-lg">
              Agregar nuevo producto
            </Text>
            <View className="space-y-2">
              <Text className="text-gray-500 text-md font-bold">Nombre</Text>
              <TextInput
                className="w-full h-12 bg-neutral-200 rounded-lg p-4"
                placeholder="Ingrese el nombre del producto"
                placeholderTextColor="gray"
                returnKeyType="done"
                onChangeText={onNameChange}
                autoFocus
              />
            </View>
            <View className="space-y-2">
              <Text className="text-gray-500 text-md font-bold">Precio</Text>
              <TextInput
                className="w-full h-12 bg-neutral-200 rounded-lg p-4"
                placeholder="Ingrese el precio del producto"
                placeholderTextColor="gray"
                returnKeyType="done"
                inputMode="numeric"
                onChangeText={onPriceChange}
              />
            </View>
          </View>
          <View className="flex flex-row w-full space-x-4">
            <Button
              className="flex-1 justify-center bg-red-500"
              onPress={onCancelProductButtonPress}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 justify-center"
              disabled={!name || !price || isLoading}
              onPress={onConfirmProductButtonPress}
            >
              Agregar producto
            </Button>
          </View>
        </View>
      </Modal>
      <PageContainer scrollEnabled>
        <View className="flex flex-row pb-4 border-b items-center mb-4">
          <Pressable onPress={onBackPress}>
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text className="font-bold text-xl ml-4">Productos</Text>
        </View>
        {products.length === 0 ? (
          <View className="flex justify-center items-center h-full w-full">
            <Text className="font-semibold text-xl text-gray-600">
              No tienes productos para mostrar, los productos que crees se
              mostrarán aquí.
            </Text>
            <Pressable
              onPress={onAddProductButtonPress}
              className="flex flex-row gap-2 items-center"
            >
              <Text className="text-blue-500 font-semibold text-lg">
                Agregar un producto
              </Text>
            </Pressable>
          </View>
        ) : (
          <View className="flex flex-wrap mt-0 mb-4 gap-4">
            {products.map((product: ProductWithoutWeight) => {
              const onProductItemPress = () => {
                setSelectedProduct(product);
                setIsModalVisible(true);
              };

              return (
                <Container
                  onPress={onProductItemPress}
                  key={product.id}
                  className="bg-neutral-800 rounded-xl p-12 shadow-lg w-1/3 h-1/4"
                >
                  <Text className="text-white font-bold text-2xl">
                    {product.productName}
                  </Text>
                  <Text className="text-white font-bold text-2xl">
                    {CurrencyFormatter.format(product.productPrice)}
                  </Text>
                </Container>
              );
            })}
            <Container
              className="bg-gray-100 border border-dashed rounded-xl p-12 shadow-lg"
              onPress={onAddProductButtonPress}
            >
              <Text className="text-gray-600 font-bold text-2xl">
                Agregar un producto
              </Text>
            </Container>
          </View>
        )}
      </PageContainer>
    </KeyboardAvoidingView>
  );
};

export default ProductsHomeScreen;
