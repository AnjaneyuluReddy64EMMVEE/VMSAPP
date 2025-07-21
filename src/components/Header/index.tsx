import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showMenuButton = false,
}) => {
  const navigation = useNavigation();

  const handleBack = () => navigation.goBack();
  const handleMenu = () => navigation.openDrawer?.();

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity onPress={handleBack} style={styles.iconWrapper}>
          <Icon name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
      )}

      {showMenuButton && (
        <TouchableOpacity onPress={handleMenu} style={styles.iconWrapper}>
          <Icon name="menu" size={28} color="#003366" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
    // backgroundColor: '#f0f6ff',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconWrapper: {
    padding: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // Adjusted to leave space for icons
  },
});
