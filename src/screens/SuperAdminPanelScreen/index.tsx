import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-gifted-charts';
import { Modal, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
const { width } = Dimensions.get('window');

const SuperAdminPanelScreen = () => {
  const branches = ['All', 'Airport Office', 'Dabaspet', 'Head Office'];
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [branchModalVisible, setBranchModalVisible] = useState(false);

  const totalVisitors = 12000;
  const todayVisitors = 50;
  const totalIn = 12;
  const totalOut = 10;

  const lineData = [
    { value: 40, label: 'Mon' },
    { value: 65, label: 'Tue' },
    { value: 55, label: 'Wed' },
    { value: 80, label: 'Thu' },
    { value: 70, label: 'Fri' },
    { value: 90, label: 'Sat' },
    { value: 100, label: 'Sun' },
  ];

  const pieData = [
    { value: 40, color: '#FF6384', text: 'Visitors' },
    { value: 30, color: '#36A2EB', text: 'Security' },
    { value: 20, color: '#FFCE56', text: 'Hosts' },
    { value: 10, color: '#4BC0C0', text: 'Others' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <Header mainScreenName={'Home'} showCorousal />
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://emmvee.com/wp-content/uploads/2019/08/emvlogo.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => setBranchModalVisible(true)}
            style={styles.branchDropdown}
          >
            <Text style={styles.branchText}>{selectedBranch}</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={branchModalVisible} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setBranchModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={branches}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedBranch(item);
                      setBranchModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Welcome Message */}
        <Text style={styles.welcome}>Welcome back John</Text>
        <Text style={styles.subText}>
          You have 19 new visitor requests and other tasks to do today
        </Text>

        {/* Stat Cards */}
        <View style={styles.cardRow}>
          <Card title="Total Count" value={totalVisitors.toString()} />
          <Card title="Pending" value={todayVisitors.toString()} />
          <Card title="Total In" value={totalIn.toString()} />
          <Card title="Total Out" value={totalOut.toString()} />
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

        <Text style={[styles.title, { marginTop: 40 }]}>
          Visitor Type Breakdown
        </Text>
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
        <View style={{ alignItems: 'flex-start', marginVertical: 20 }}>
          {pieData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 26,
                  backgroundColor: item.color,
                  marginRight: 8,
                  borderRadius: 4,
                }}
              >
                <Text style={{ fontSize: 16, textAlign: 'center' }}>
                  {item.text}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  branchDropdown: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  branchText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  modalItemText: {
    fontSize: 16,
    color: '#1e293b',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { width: 100, height: 40, resizeMode: 'contain' },
  userInfo: { alignItems: 'flex-end' },
  office: { fontSize: 14, color: '#555' },
  user: { fontSize: 16, fontWeight: 'bold' },
  welcome: { fontSize: 20, fontWeight: '700', marginTop: 20 },
  subText: { fontSize: 14, color: '#666', marginBottom: 20 },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 14, color: '#666' },
  cardValue: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  chartBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 16,
    elevation: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E293B',
    textAlign: 'center',
  },
});
