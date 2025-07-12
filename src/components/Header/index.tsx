import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import IconA from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export const Header = ({
  mainScreenName,
  showCorousal,
  showGoBack = false,
  screenName,
}: {
  mainScreenName?: string;
  showCorousal?: boolean;
  showGoBack?: boolean;
  screenName?: string;
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <>
        {showGoBack && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginRight: 10 }}
            >
              <Text style={{ fontSize: 25 }}>{`<`}</Text>
            </TouchableOpacity>

            <>
              {screenName && (
                <Text
                  style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}
                >
                  {screenName || ''}
                </Text>
              )}
            </>
          </View>
        )}
      </>

      <>
        {showCorousal && (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Text>Menu</Text>
          </TouchableOpacity>
        )}
      </>

      <>
        {mainScreenName && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: -50,
            }}
          >
            <Text>{mainScreenName}</Text>
          </View>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({});
