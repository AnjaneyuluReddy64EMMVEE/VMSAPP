// import React from 'react';
// import { View, Text } from 'react-native';
// import { PieChart } from 'react-native-gifted-charts';

// const VisitorPieChart = ({ data }: { data: any[] }) => (
//   <View style={{ alignItems: 'center' }}>
//     <PieChart
//       data={data}
//       donut
//       showText
//       textColor="white"
//       radius={100}
//       innerRadius={60}
//       focusOnPress
//       showValuesAsLabels
//     />
//     <View style={{ alignItems: 'flex-start', marginVertical: 20 }}>
//       {data.map((item, index) => (
//         <View
//           key={index}
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 8,
//           }}
//         >
//           <View
//             style={{
//               width: 100,
//               height: 26,
//               backgroundColor: item.color,
//               marginRight: 8,
//               borderRadius: 4,
//             }}
//           >
//             <Text style={{ fontSize: 16, textAlign: 'center' }}>
//               {item.text}
//             </Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   </View>
// );

// export default VisitorPieChart;


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const VisitorPieChart = ({ data }: { data: any[] }) => (
  <View style={styles.container}>
    {/* Left side: Visitor Types */}
    <View style={styles.legends}>
      {data.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.text}</Text>
        </View>
      ))}
    </View>

    {/* Right side: Pie Chart */}
    <View style={styles.chartWrapper}>
      <PieChart
        data={data}
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
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
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
