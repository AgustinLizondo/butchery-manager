import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoggedStackParamList } from "../../navigators/logged.types";

export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type StatisticsScreenProps = NativeStackScreenProps<
  LoggedStackParamList,
  "Statistics"
>;
