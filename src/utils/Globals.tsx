import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import { COLORS } from './Colors';

// Font Size
interface FontContextType {
  fontGlobalSize: number;
  updateFont: (fontCode: number | string, fontKey: string) => void;
  FONT_SIZE: Record<string, number>;
}

const FontContext = createContext<FontContextType | null>(null);

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [fontSizeGlobal, setFontSizeGlobal] = useState(0);

  const updateFont = async (fontCode: number | string, fontKey: string) => {
    try {
      await AsyncStorage.setItem(fontKey, fontCode.toString());
      setFontSizeGlobal(Number(fontCode));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getFontData = async () => {
      try {
        const headerFontData = await AsyncStorage.getItem('fontGlobalSize');

        if (headerFontData !== null) {
          setFontSizeGlobal(parseInt(headerFontData, 10));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getFontData();
  }, []);

  const absoluteFontSize = fontSizeGlobal;

  const FONT_SIZE = {
    F_10: hp(eval(`${1.0} + ${absoluteFontSize}`)),
    F_11: hp(eval(`${1.1} + ${absoluteFontSize}`)),
    F_12: hp(eval(`${1.2} + ${absoluteFontSize}`)),
    F_13: hp(eval(`${1.3} + ${absoluteFontSize}`)),
    F_14: hp(eval(`${1.4} + ${absoluteFontSize}`)),
    F_15: hp(eval(`${1.5} + ${absoluteFontSize}`)),
    F_16: hp(eval(`${1.6} + ${absoluteFontSize}`)),
    F_17: hp(eval(`${1.7} + ${absoluteFontSize}`)),
    F_18: hp(eval(`${1.8} + ${absoluteFontSize}`)),
    F_19: hp(eval(`${1.9} + ${absoluteFontSize}`)),
    F_20: hp(eval(`${2} + ${absoluteFontSize}`)),
    F_21: hp(eval(`${2.2} + ${absoluteFontSize}`)),
    F_22: hp(eval(`${2.4} + ${absoluteFontSize}`)),
    F_23: hp(eval(`${2.6} + ${absoluteFontSize}`)),
    F_24: hp(eval(`${2.8} + ${absoluteFontSize}`)),
    F_25: hp(eval(`${2.5} + ${absoluteFontSize}`)),
    F_26: hp(eval(`${2.6} + ${absoluteFontSize}`)),
    F_27: hp(eval(`${2.7} + ${absoluteFontSize}`)),
    F_28: hp(eval(`${2.8} + ${absoluteFontSize}`)),
    F_29: hp(eval(`${2.9} + ${absoluteFontSize}`)),
    F_30: hp(eval(`${3} + ${absoluteFontSize}`)),
  };

  return (
    <FontContext.Provider
      value={{ fontGlobalSize: fontSizeGlobal, updateFont, FONT_SIZE }}
    >
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};

// Theme
export interface ThemeContextType {
  themeColor: string;
  backGroundColor: string;
  primaryColor: string;
  headerTextColor: string;
  titleTextColor: string;
  subtitleTextColor: string;
  themeColors: themesColorsType;
  updateColor: (color: themesColorsType, colorKey: string) => void;
}

export type themesColorsType = {
  themeColor: string;
  backGroundColor: string;
  primaryColor: string;
  headerTextColor: string;
  titleTextColor: string;
  subtitleTextColor: string;
  textColor: string;
  isDarkMode: boolean;
  themeText: string;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const defaultThemes = {
    themeColor: '#B68A35',
    backGroundColor: '#EFEFEF',
    primaryColor: '#fff',
    headerTextColor: 'black',
    titleTextColor: '#000000',
    subtitleTextColor: '#EFEFEF',
    textColor: '#000000',
    isDarkMode: false,
    themeText: '#B68A35',
  };

  const [themeColors, setThemeColors] = useState(defaultThemes);

  useEffect(() => {
    const getColorData = async () => {
      try {
        const themeColorsData = await AsyncStorage.getItem('themeColorsGlobal');

        const newThemes =
          themeColorsData !== null
            ? JSON.parse(themeColorsData)
            : defaultThemes;

        setThemeColors(newThemes);
      } catch (error) {
        console.error(error);
      }
    };

    getColorData();
  }, []);

  const updateColor = async (color: themesColorsType, colorKey: string) => {
    try {
      const themeColorsStrigify = JSON.stringify(color);
      await AsyncStorage.setItem(colorKey, themeColorsStrigify);
      setThemeColors(color);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeColor: themeColors.themeColor,
        backGroundColor: themeColors.backGroundColor,
        primaryColor: themeColors.primaryColor,
        headerTextColor: themeColors.headerTextColor,
        titleTextColor: themeColors.titleTextColor,
        subtitleTextColor: themeColors.subtitleTextColor,
        themeColors: themeColors,
        updateColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Font Family
export const FONT = {
  SEMI_BOLD: 'Roboto-Medium',
  REGULAR: 'Roboto-Regular',
  EXTRA_BOLD: 'Roboto-Black',
  LIGHT: 'Roboto-Light',
  BOLD: 'Roboto-Bold',
  MEDIUM: 'Roboto-Medium',
  NORMAL: 'Roboto-Light',
};

export const showErrorMessage = ({
  message,
  duration,
}: {
  message: string;
  duration?: number;
}) => {
  setTimeout(() => {
    Snackbar.show({
      text: message,
      textColor: COLORS.White,
      duration: duration || Snackbar.LENGTH_SHORT,
      backgroundColor: COLORS.TomatoRed,
    });
  }, 500);
};

export const showSuccessMessage = ({
  message,
  duration,
}: {
  message: string;
  duration?: number;
}) => {
  setTimeout(() => {
    Snackbar.show({
      text: message,
      textColor: COLORS.White,
      duration: duration || Snackbar.LENGTH_SHORT,
      backgroundColor: COLORS.SuccessGreen,
    });
  }, 500);
};

export const showMessage = ({
  message,
  duration,
  bgColor,
  textColor,
}: {
  message: string;
  duration?: number;
  bgColor?: string;
  textColor?: string;
}) => {
  setTimeout(() => {
    Snackbar.show({
      text: message,
      textColor: textColor || 'black',
      duration: duration || Snackbar.LENGTH_SHORT,
      backgroundColor: bgColor || COLORS.AshGray,
    });
  }, 500);
};

//Shadow Effect
export const shadowEffect = {
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};
