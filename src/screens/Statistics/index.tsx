import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import { BarChart } from "react-native-gifted-charts";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { StatisticsScreenProps, WeekDay } from "./types";
import { Product } from "../../utils/ProductsMock";
import { useOrders } from "../../contexts/OrdersContext";

const StatisticsScreen = ({ navigation }: StatisticsScreenProps) => {
  const { width, height } = Dimensions.get("window");
  const barWidth = (width - 40) / 11;

  type Data = {
    label: string;
    value: number;
  };

  const [data, setData] = useState<Data[]>([
    {
      label: "Mon",
      value: 0,
    },
    {
      label: "Tue",
      value: 0,
    },
    {
      label: "Wed",
      value: 0,
    },
    {
      label: "Thu",
      value: 0,
    },
    {
      label: "Fri",
      value: 0,
    },
    {
      label: "Sat",
      value: 0,
    },
    {
      label: "Sun",
      value: 0,
    },
  ]);
  const { orders } = useOrders();

  const getWeek = (date: Date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(
      ((date.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7
    );
  };

  const getWeeklyIncome = async () => {
    const incomePerDay = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    orders.forEach((order) => {
      // Get number of the week and compare to the current week, if the order was created in the current week, we must use it
      const week = getWeek(new Date(order.createdAt));
      if (week === getWeek(new Date())) {
        // Get the day of the week from the createdAt date
        const day = new Date(order.createdAt)
          .toDateString()
          .split(" ")[0] as WeekDay;

        // Calculate the total income from the order
        const dailyTotal = order.products.reduce(
          (sum: number, product: Product) =>
            sum + product.productPrice * (product.weight / 1000),
          0
        );

        // Add the daily total to the incomePerDay object
        incomePerDay[day] += dailyTotal / 1000;
      }
    });

    const data = Object.entries(incomePerDay).map(([label, value]) => ({
      label,
      value,
    }));

    setData(data);
  };

  useEffect(() => {
    getWeeklyIncome();
  }, []);

  return (
    <PageContainer>
      <View className="flex flex-row space-x-4 items-center border-b pb-4 mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="font-bold text-xl ml-4">Estadísticas</Text>
      </View>
      <View className="px-2" style={{ width: width - 40 }}>
        <BarChart
          height={height - 230}
          width={width}
          data={data}
          frontColor="#171717"
          barBorderRadius={10}
          barWidth={barWidth}
          noOfSections={3}
          spacing={barWidth / 2}
          initialSpacing={20}
          yAxisThickness={0}
          yAxisLabelWidth={64}
          yAxisTextStyle={{
            color: "#171717",
            fontWeight: "bold",
            fontSize: 16,
          }}
          yAxisLabelPrefix="$"
          yAxisLabelSuffix="k"
          xAxisThickness={0}
          xAxisLabelsHeight={24}
          xAxisLabelTextStyle={{
            color: "#171717",
            fontWeight: "bold",
            fontSize: 16,
            marginTop: 4,
          }}
          xAxisColor="#000"
          hideRules
          isAnimated
        />
      </View>
    </PageContainer>
  );
};

export default StatisticsScreen;
