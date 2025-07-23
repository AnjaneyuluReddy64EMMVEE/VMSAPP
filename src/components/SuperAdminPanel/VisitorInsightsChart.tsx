import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

interface DataPoint {
  label: string;
  count: number;
}

interface Props {
  data: DataPoint[];
  title?: string;
}

const VisitorLineChart: React.FC<Props> = ({
  data,
  title = 'Visitor Trends',
}) => {
  const chartData = data.map(item => ({
    value: item.count,
    label: item.label,
  }));

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{title}</Text> */}
      <LineChart
        data={chartData}
        curved
        thickness={2}
        color="#4a90e2"
        areaChart
        startFillColor="#4a90e2"
        endFillColor="#ffffff00"
        initialSpacing={10}
        spacing={screenWidth / data.length}
        hideDataPoints={false}
        dataPointsColor="#4a90e2"
        yAxisTextStyle={{ color: '#555' }}
        xAxisLabelTextStyle={{ color: '#555', fontSize: 10 }}
        rulesColor="#e0e0e0"
        noOfSections={4}
        maxValue={Math.max(...data.map(d => d.count)) || 1}
        yAxisThickness={0}
        xAxisThickness={0}
        isAnimated
      />
    </View>
  );
};

export default VisitorLineChart;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
});
