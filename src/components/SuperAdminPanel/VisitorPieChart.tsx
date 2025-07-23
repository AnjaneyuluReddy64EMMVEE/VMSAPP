import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

// Assign colors to each purpose (you can expand this list if needed)
const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800'];

const VisitorPieChart = ({
  data,
}: {
  data: { count: number; purpose: string }[];
}) => {
  // console.log('📊 Raw purpose data:', data);
  // Transform backend data to chart data
  const chartData = data.map((item, index) => ({
    value: item.count,
    color: COLORS[index % COLORS.length],
    text: item.purpose,
  }));

  return (
    <View style={styles.container}>
      {/* Left side: Visitor Types */}
      <View style={styles.legends}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* Right side: Pie Chart */}
      <View style={styles.chartWrapper}>
        <PieChart
          data={chartData}
          donut
          showText
          textColor="white"
          radius={100}
          innerRadius={60}
          focusOnPress
          showValuesAsLabels
          strokeWidth={2}
          strokeColor="white"
        />
      </View>
    </View>
  );
};

export default VisitorPieChart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  legends: {
    flex: 1,
    paddingRight: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  chartWrapper: {
    flex: 1.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
