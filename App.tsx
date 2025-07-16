// // App.tsx
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { StatusBar } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import RootNavigator from './src/navigation/RootNavigator';

// const App = () => {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <NavigationContainer>
//           {/* <StatusBar barStyle="light-content" backgroundColor="#003366" /> */}
//           <RootNavigator />
//         </NavigationContainer>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// export default App;



// App.tsx

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { StatusBar } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Provider } from 'react-redux';
// import { store } from './src/store';
// import RootNavigator from './src/navigation/RootNavigator';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <SafeAreaProvider>
//           <NavigationContainer>
//             <StatusBar barStyle="light-content" backgroundColor="#003366" />
//             <RootNavigator />
//           </NavigationContainer>
//         </SafeAreaProvider>
//       </GestureHandlerRootView>
//     </Provider>
//   );
// };

// export default App;



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/contexts/AuthContext'; // ✅ Import

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
            <NavigationContainer>
              <StatusBar barStyle="light-content" backgroundColor="#003366" />
              <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
