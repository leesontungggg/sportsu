import * as React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import SettingsScreen from './components/screens/Settings';
import FavoriteScreen from './components/screens/Favorites';
import PredictsScreen from './components/screens/Predicts';
import NewsScreen from './components/screens/News';
import {
  MenuFavoriteSvg,
  MenuHomeSvg,
  MenuNewsSvg,
  MenuPredictSvg,
  MenuProfileSvg,
} from './components/vectors';
import HomeScreen from './components/screens/Home';

const Tab = createBottomTabNavigator();

const CustomStatusBar = ({
  backgroundColor,
  barStyle = 'dark-content',
}: //add more props StatusBar
any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{height: insets.top, backgroundColor}}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor="white" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#F97700',
          }}>
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused}) => (
                <MenuHomeSvg fill={color} focused={focused} />
              ),
            }}
            name="Giải đấu"
            component={HomeScreen}
          />
          {/* <Tab.Screen
            name="Theo dõi"
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused}) => (
                <MenuFavoriteSvg fill={color} focused={focused} />
              ),
            }}
            component={FavoriteScreen}
          />
          <Tab.Screen
            name="Dự đoán"
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused}) => (
                <MenuPredictSvg fill={color} focused={focused} />
              ),
            }}
            component={PredictsScreen}
          />
          <Tab.Screen
            name="Tin tức"
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused}) => (
                <MenuNewsSvg fill={color} focused={focused} />
              ),
            }}
            component={NewsScreen}
          />
          <Tab.Screen
            name="Tài khoản"
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused}) => (
                <MenuProfileSvg fill={color} focused={focused} />
              ),
            }}
            component={SettingsScreen}
          /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
