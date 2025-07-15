import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WelcomeMessage = () => (
  <View>
    <Text style={styles.welcome}>Welcome back John</Text>
    <Text style={styles.subText}>
      You have 19 new visitor requests and other tasks to do today
    </Text>
  </View>
);

export default WelcomeMessage;

const styles = StyleSheet.create({
  welcome: { fontSize: 20, fontWeight: '700', marginTop: 20 },
  subText: { fontSize: 14, color: '#666', marginBottom: 20 },
});
