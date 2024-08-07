import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoggedStackParamList } from "../../navigators/logged.types";

export type OrdersScreenProps = NativeStackScreenProps<
  LoggedStackParamList,
  "Orders"
>;
