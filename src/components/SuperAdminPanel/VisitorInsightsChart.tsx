// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { LineChart } from 'react-native-gifted-charts';

// const screenWidth = Dimensions.get('window').width;

// interface DataPoint {
//   label: string;
//   count: number;
// }

// interface Props {
//   data: DataPoint[];
//   title?: string;
// }

// const VisitorLineChart: React.FC<Props> = ({
//   data,
//   title = 'Visitor Trends',
// }) => {
//   const chartData = data.map(item => ({
//     value: item.count,
//     label: item.label,
//   }));

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.title}>{title}</Text> */}
//       <LineChart
//         data={chartData}
//         curved
//         thickness={2}
//         color="#4a90e2"
//         areaChart
//         startFillColor="#4a90e2"
//         endFillColor="#ffffff00"
//         initialSpacing={10}
//         spacing={screenWidth / data.length}
//         hideDataPoints={false}
//         dataPointsColor="#4a90e2"
//         yAxisTextStyle={{ color: '#555' }}
//         xAxisLabelTextStyle={{ color: '#555', fontSize: 10 }}
//         rulesColor="#e0e0e0"
//         noOfSections={4}
//         maxValue={Math.max(...data.map(d => d.count)) || 1}
//         yAxisThickness={0}
//         xAxisThickness={0}
//         isAnimated
//       />
//     </View>
//   );
// };

// export default VisitorLineChart;

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 16,
//     marginVertical: 12,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 16,
//     elevation: 2,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
// });

// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { LineChart } from 'react-native-gifted-charts';

// const screenWidth = Dimensions.get('window').width;

// interface DataPoint {
//   label: string;
//   count: number;
// }

// interface Props {
//   data: DataPoint[];
//   title?: string;
// }

// const VisitorLineChart: React.FC<Props> = ({
//   data,
//   title = 'Visitor Trends',
// }) => {
//   const chartData = data.map(item => ({
//     value: item.count,
//     label: item.label,
//   }));

//   return (
//     <View style={styles.container}>
//       <LineChart
//         data={chartData}
//         curved
//         thickness={2}
//         color="#4a90e2"
//         areaChart
//         startFillColor="#4a90e2"
//         endFillColor="#ffffff00"
//         initialSpacing={10}
//         spacing={screenWidth / data.length}
//         hideDataPoints={false}
//         dataPointsColor="#4a90e2"
//         yAxisTextStyle={{ color: '#555' }}
//         xAxisLabelTextStyle={{ color: '#555', fontSize: 10 }}
//         rulesColor="#e0e0e0"
//         noOfSections={4}
//         maxValue={Math.max(...data.map(d => d.count)) || 1}
//         yAxisThickness={0}
//         xAxisThickness={0}
//         isAnimated
//         // showPointerOnHover={true} // shows label only on tap/hover
//         pointerConfig={{
//           pointerStripUptoDataPoint: true,
//           pointerColor: '#4a90e2',
//           radius: 6,
//           pointerStripColor: '#4a90e2',
//           pointerLabelComponent: (item: any) => {
//             // console.log('Pointer tapped item:', item[0]); // <-- LOG added
//             return (
//               <View style={styles.pointerLabel}>
//                 <Text style={styles.pointerText}>
//                   {item[0].label}: {item[0].value}
//                 </Text>
//               </View>
//             );
//           },
//         }}
//       />
//     </View>
//   );
// };

// export default VisitorLineChart;

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 16,
//     marginVertical: 12,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 16,
//     elevation: 2,
//   },
//   pointerLabel: {
//     position: 'absolute',
//     top: -40,
//     left: -20,
//     backgroundColor: '#4a90e2',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//     zIndex: 9999,
//     width: 80,
//   },
//   pointerText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600',
//   },
// });
import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
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

  const spacing = 80; // px between points
  const chartWidth = data.length * spacing + 40; // chart total width

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <LineChart
          data={chartData}
          width={chartWidth} // required for scroll to work
          curved
          thickness={2}
          color="#4a90e2"
          areaChart
          startFillColor="#4a90e2"
          endFillColor="#ffffff00"
          initialSpacing={10}
          spacing={spacing}
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
          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerColor: '#4a90e2',
            radius: 6,
            pointerStripColor: '#4a90e2',
            pointerLabelComponent: (item: any) => (
              <View style={styles.pointerLabel}>
                <Text style={styles.pointerText}>
                  {item[0].label}: {item[0].value}
                </Text>
              </View>
            ),
          }}
        />
      </ScrollView>
    </View>
  );
};

export default VisitorLineChart;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 16,
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
  pointerLabel: {
    position: 'absolute',
    top: -40,
    left: -20,
    backgroundColor: '#4a90e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 9999,
    width: 80,
  },
  pointerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
