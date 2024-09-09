import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

const BarPairWithLine = ({ averageLow, averageMedium, averageHigh }) => {
  const data = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: [averageLow, averageMedium, averageHigh],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#8c60a1",
    backgroundGradientFrom: "#8c60a1",
    backgroundGradientTo: "#8c60a1",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForLabels: {
      fontSize: 14,
      fontWeight: "bold",
    },
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      strokeWidth: 0.2,
      stroke: "#ffffff",
    },
    yAxisTextStyle: {
      color: "#ffffff",
    },
  };

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <BarChart
        data={data}
        width={310}
        height={390}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero={true}
        yAxisInterval={0.5}
        chartConfig={chartConfig}
        style={{
          borderRadius: 16,
          padding: 10,
        }}
        verticalLabelRotation={0}
        yAxisMin={0}
        yAxisMax={10}
        showValuesOnTopOfBars={true}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 310,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Low: {averageLow}
        </Text>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Medium: {averageMedium}
        </Text>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          High: {averageHigh}
        </Text>
      </View>
    </View>
  );
};

export default BarPairWithLine;
