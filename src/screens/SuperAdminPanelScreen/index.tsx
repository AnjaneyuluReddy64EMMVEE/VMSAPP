import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-gifted-charts';
const { width } = Dimensions.get('window');
// const screenWidth = Dimensions.get('window').width;

const SuperAdminPanelScreen = () => {
  const totalVisitors = 12000;
  const todayVisitors = 50;
  const totalIn = 12;

  // Dummy Data
  // const lineData = [
  //   { value: 50, label: '24' },
  //   { value: 60, label: '25' },
  //   { value: 55, label: '26' },
  //   { value: 80, label: '27' },
  //   { value: 40, label: '28' },
  //   { value: 70, label: '29' },
  //   { value: 65, label: '30' },
  // ];
  const lineData = [
    { value: 40, label: 'Mon' },
    { value: 65, label: 'Tue' },
    { value: 55, label: 'Wed' },
    { value: 80, label: 'Thu' },
    { value: 70, label: 'Fri' },
    { value: 90, label: 'Sat' },
    { value: 100, label: 'Sun' },
  ];

  // const pieData = [
  //   { value: 80, label: 'Interview', color: '#ffa726' },
  //   { value: 30, label: 'Maintenance', color: '#ef5350' },
  //   { value: 60, label: 'Meeting', color: '#42a5f5' },
  //   { value: 40, label: 'Site Visit', color: '#66bb6a' },
  // ];
  const pieData = [
    { value: 40, color: '#FF6384', text: 'Visitors' },
    { value: 30, color: '#36A2EB', text: 'Security' },
    { value: 20, color: '#FFCE56', text: 'Hosts' },
    { value: 10, color: '#4BC0C0', text: 'Others' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} />
        <View style={styles.userInfo}>
          <Text style={styles.office}>Airport Office</Text>
          <Text style={styles.user}>John</Text>
        </View>
      </View>

      {/* Welcome Message */}
      <Text style={styles.welcome}>Welcome back John</Text>
      <Text style={styles.subText}>You have 19 new visitor requests and other tasks to do today</Text>

      {/* Stat Cards */}
      <View style={styles.cardRow}>
        <Card title="Total Count" value={totalVisitors.toString()} />
        <Card title="Today's Visitor" value={todayVisitors.toString()} />
        <Card title="Total In" value={totalIn.toString()} />
        <Card title="Today's Visitor" value="12" />
      </View>

      <Text style={styles.title}>Weekly Visitor Insights</Text>

      <LineChart
        data={lineData}
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

      <Text style={[styles.title, { marginTop: 40 }]}>Visitor Type Breakdown</Text>
      <View style={{ alignItems: 'center' }}>
        <PieChart
          data={pieData}
          donut
          showText
          textColor="white"
          radius={100}
          innerRadius={60}
          focusOnPress
          showValuesAsLabels
        />
        
      </View>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        {pieData.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <View
              style={{
                width: 160,
                height: 26,
                backgroundColor: item.color,
                marginRight: 8,
                borderRadius: 4,
              }}
              
            >
              <Text style={{ fontSize: 16,textAlign:'center' }}>{item.text}</Text>
              </View>
            
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const Card = ({ title, value }: { title: string; value: string }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);





export default SuperAdminPanelScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logo: { width: 100, height: 40, resizeMode: 'contain' },
  userInfo: { alignItems: 'flex-end' },
  office: { fontSize: 14, color: '#555' },
  user: { fontSize: 16, fontWeight: 'bold' },
  welcome: { fontSize: 20, fontWeight: '700', marginTop: 20 },
  subText: { fontSize: 14, color: '#666', marginBottom: 20 },
  cardRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 14, color: '#666' },
  cardValue: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  chartTitle: { fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 8 },
  chartBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 16,
    elevation: 2,
    marginBottom: 20,
  },title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#1E293B',
      textAlign: 'center',
    },
});

// import React from 'react';
// import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
// import { LineChart, PieChart } from 'react-native-gifted-charts';

// const { width } = Dimensions.get('window');

// const SuperAdminPanelScreen = () => {
//   const lineData = [
//     { value: 40, label: 'Mon' },
//     { value: 65, label: 'Tue' },
//     { value: 55, label: 'Wed' },
//     { value: 80, label: 'Thu' },
//     { value: 70, label: 'Fri' },
//     { value: 90, label: 'Sat' },
//     { value: 100, label: 'Sun' },
//   ];

//   // const pieData = [
//   //   { value: 40, color: '#3B82F6', text: '40%' },
//   //   { value: 30, color: '#10B981', text: '30%' },
//   //   { value: 20, color: '#F59E0B', text: '20%' },
//   //   { value: 10, color: '#EF4444', text: '10%' },
//   // ];
//   const pieData = [
//     { value: 40, color: '#FF6384', text: 'Visitors' },
//     { value: 30, color: '#36A2EB', text: 'Security' },
//     { value: 20, color: '#FFCE56', text: 'Hosts' },
//     { value: 10, color: '#4BC0C0', text: 'Others' },
//   ];
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Weekly Visitor Insights</Text>

//       <LineChart
//         data={lineData}
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
//         maxValue={120}
//       />

//       <Text style={[styles.title, { marginTop: 40 }]}>Visitor Type Breakdown</Text>
//       <View style={{ alignItems: 'center' }}>
//         <PieChart
//           data={pieData}
//           donut
//           showText
//           textColor="white"
//           radius={100}
//           innerRadius={60}
//           focusOnPress
//           showValuesAsLabels
//         />
        
//       </View>
//       <View style={{ alignItems: 'center', marginVertical: 20 }}>
//         {pieData.map((item, index) => (
//           <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
//             <View
//               style={{
//                 width: 16,
//                 height: 16,
//                 backgroundColor: item.color,
//                 marginRight: 8,
//                 borderRadius: 4,
//               }}
//             />
//             <Text style={{ fontSize: 16 }}>{item.text}</Text>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// export default SuperAdminPanelScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingTop: 60,
//     backgroundColor: '#F8FAFC',
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#1E293B',
//     textAlign: 'center',
//   },
// });
