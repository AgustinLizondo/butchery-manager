import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NotLoggedStackParamList } from "../../navigators/notlogged.types";

export type SignInScreenProps = NativeStackScreenProps<
  NotLoggedStackParamList,
  "SignIn"
>;
