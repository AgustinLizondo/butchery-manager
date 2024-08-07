import { ViewProps } from "react-native";
import { Product } from "../../utils/ProductsMock";

export interface ProductItemProps extends ViewProps {
  product: Product;
}
