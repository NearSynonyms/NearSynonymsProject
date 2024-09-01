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
    decimalPlaces: 0, // No decimal places

    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White text color
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForLabels: {
      fontSize: 14,
      fontWeight: "bold",
    },
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: "", // Solid lines
      strokeWidth: 0.2,
      stroke: "#ffffff", // Slightly darker line for contrast
    },
    yAxisTextStyle: {
      color: "#ffffff", // White color for Y axis labels
    },
  };

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <BarChart
        data={data}
        width={310} // Adjust this to fit your screen size
        height={390} // Adjust this to fit your screen size
        yAxisLabel=""
        chartConfig={chartConfig}
        style={{
          borderRadius: 16,
          padding: 10,
        }}
      />
    </View>
  );
};

export default BarPairWithLine;
