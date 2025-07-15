// import React from 'react';
// import { LineChart } from 'react-native-gifted-charts';
// import { Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// const VisitorInsightsChart = ({ data }: { data: any[] }) => (
//   <LineChart
//     data={data}
//     areaChart
//     curved
//     thickness={3}
//     hideDataPoints={false}
//     color="#3B82F6"
//     startFillColor="#3B82F6"
//     endFillColor="white"
//     startOpacity={0.4}
//     endOpacity={0.1}
//     noOfSections={4}
//     animateOnDataChange
//     animationDuration={1200}
//     isAnimated
//     yAxisColor="#CBD5E1"
//     xAxisColor="#CBD5E1"
//     yAxisTextStyle={{ color: '#64748B' }}
//     xAxisLabelTextStyle={{ color: '#64748B' }}
//     rulesColor="#E2E8F0"
//     backgroundColor="#F8FAFC"
//     spacing={width / 10}
//     initialSpacing={20}
//     maxValue={120}
//   />
// );

// export default VisitorInsightsChart;
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');

const VisitorInsightsChart = ({ data }: { data: any[] }) => (
  <View style={styles.chartContainer}>
    <LineChart
      data={data}
      areaChart
      curved
      thickness={3}
      hideDataPoints={false}
      color="#3B82F6"
      startFillColor="#3B82F6"
      endFillColor="white"
      startOpacity={0.4}
      endOpacity={0.1}
      noOfSections={4}
      animateOnDataChange
      animationDuration={1200}
      isAnimated
      yAxisColor="#CBD5E1"
      xAxisColor="#CBD5E1"
      yAxisTextStyle={{ color: '#64748B' }}
      xAxisLabelTextStyle={{ color: '#64748B' }}
      rulesColor="#E2E8F0"
      backgroundColor="#F8FAFC"
      spacing={width / 10}
      initialSpacing={20}
      maxValue={120}
    />
  </View>
);

export default VisitorInsightsChart;

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginVertical: 20,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: width - 32,
    alignSelf: 'center',
  },
});
