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

// import React from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import { LineChart } from 'react-native-gifted-charts';

// const { width } = Dimensions.get('window');

// const VisitorInsightsChart = ({ data }: { data: any[] }) => (

//   <View style={styles.chartContainer}>
//     <LineChart
//       data={data}
//       areaChart
//       curved
//       thickness={3}
//       hideDataPoints={false}
//       color="#3B82F6"
//       startFillColor="#3B82F6"
//       endFillColor="white"
//       startOpacity={0.4}
//       endOpacity={0.1}
//       noOfSections={4}
//       animateOnDataChange
//       animationDuration={1200}
//       isAnimated
//       yAxisColor="#CBD5E1"
//       xAxisColor="#CBD5E1"
//       yAxisTextStyle={{ color: '#64748B' }}
//       xAxisLabelTextStyle={{ color: '#64748B' }}
//       rulesColor="#E2E8F0"
//       backgroundColor="#F8FAFC"
//       spacing={width / 10}
//       initialSpacing={20}
//       maxValue={120}
//     />
//   </View>
// );

// export default VisitorInsightsChart;

// const styles = StyleSheet.create({
//   chartContainer: {
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     marginVertical: 20,
//     paddingVertical: 16,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     elevation: 4, // Android shadow
//     shadowColor: '#000', // iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     width: width - 32,
//     alignSelf: 'center',
//   },
// });

// import React from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import { LineChart } from 'react-native-gifted-charts';

// const { width } = Dimensions.get('window');

// const VisitorInsightsChart = ({ data }: { data: any[] }) => {
//   // Transform backend data to chart format
//   const chartData = data.map((item: any) => ({
//     value: item.count,
//     label: item.date.slice(5), // Show 'MM-DD'
//     dataPointText: `${item.count}`, // Optional text above each point
//   }));

//   console.log('📊 Formatted chartData:', chartData);

//   return (
//     <View style={styles.chartContainer}>
//       <LineChart
//         data={chartData}
//         areaChart
//         curved
//         thickness={3}
//         hideDataPoints={false}
//         color="#3B82F6"
//         startFillColor="#3B82F6"
//         endFillColor="white"
//         startOpacity={0.4}
//         endOpacity={0.1}
//         noOfSections={4}
//         animateOnDataChange
//         animationDuration={1200}
//         isAnimated
//         yAxisColor="#CBD5E1"
//         xAxisColor="#CBD5E1"
//         yAxisTextStyle={{ color: '#64748B' }}
//         xAxisLabelTextStyle={{ color: '#64748B' }}
//         rulesColor="#E2E8F0"
//         backgroundColor="#F8FAFC"
//         spacing={width / 10}
//         initialSpacing={20}
//         maxValue={Math.max(...chartData.map(d => d.value)) + 5 || 10}
//       />
//     </View>
//   );
// };

// export default VisitorInsightsChart;

// const styles = StyleSheet.create({
//   chartContainer: {
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     marginVertical: 20,
//     paddingVertical: 16,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     width: width - 32,
//     alignSelf: 'center',
//   },
// });
// components/VisitorPieChart.tsx

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { PieChart } from 'react-native-gifted-charts';
// import { Text as SvgText } from 'react-native-svg';

// interface DataItem {
//   label: string;
//   count: number;
// }

// interface VisitorPieChartProps {
//   data: DataItem[];
//   title?: string;
// }

// const VisitorPieChart: React.FC<VisitorPieChartProps> = ({
//   data,
//   title = 'Visitor Distribution',
// }) => {
//   const filteredData = data.filter(item => item.count > 0);

//   const pieData = filteredData.map((item, index) => ({
//     key: `pie-${item.label}-${index}`,
//     value: item.count,
//     svg: { fill: getColor(index) },
//     arc: { outerRadius: '100%', cornerRadius: 5 },
//     label: item.label,
//   }));

//   const Labels = ({ slices }: any) => {
//     return slices.map((slice: any, index: number) => {
//       const { pieCentroid, data } = slice;
//       return (
//         <SvgText
//           key={`label-${index}`}
//           x={pieCentroid[0]}
//           y={pieCentroid[1]}
//           fill="white"
//           textAnchor="middle"
//           alignmentBaseline="middle"
//           fontSize={10}
//           stroke="black"
//           strokeWidth={0.2}
//         >
//           {data.label}
//         </SvgText>
//       );
//     });
//   };

//   if (filteredData.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.noDataText}>No data available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{title}</Text>
//       <PieChart
//         style={{ height: 200 }}
//         data={pieData}
//         outerRadius={'90%'}
//         innerRadius={'40%'}
//         labelRadius={60}
//       >
//         <Labels />
//       </PieChart>
//     </View>
//   );
// };

// const getColor = (index: number) => {
//   const colors = [
//     '#FF6384',
//     '#36A2EB',
//     '#FFCE56',
//     '#4BC0C0',
//     '#9966FF',
//     '#FF9F40',
//     '#8BC34A',
//     '#00ACC1',
//     '#FF6F00',
//     '#C2185B',
//     '#7B1FA2',
//     '#388E3C',
//   ];
//   return colors[index % colors.length];
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 12,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 10,
//     color: '#003366',
//   },
//   noDataText: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 20,
//   },
// });

// export default VisitorPieChart;
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
