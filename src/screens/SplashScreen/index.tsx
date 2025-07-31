import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../utils/Images';

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={images.Logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>GATEVUE</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 100,
    marginBottom: 20,
  },
  textContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: heightPercentageToDP('5%'),
    fontWeight: 'bold',
  },
});

export default SplashScreen;
