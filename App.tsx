// 리액트

// 라우트
import RouteNames from './routes';
import { RootStackParamList } from "./routes"
// 리액트네비게이터
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

// 스크린
import HomeScreen from './screens/HomeScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import BrowserScreen from './screens/BrowserScreen';



const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeIcon = ({ focused, color}: {focused: boolean; color: string}) => {
  const iconName = focused ? "home" : "home-outline"
  return <MaterialCommunityIcons name={iconName} color={color} size={26} />
}

const ShoppingIcon = ({ focused, color}: {focused: boolean; color: string}) => {
  const iconName = focused ? "shopping" : "shopping-outline"
  return <MaterialCommunityIcons name={iconName} color={color} size={26} />
}

const HomeTab = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarStyle: {
          backgroundColor : 'black'
    },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false

    }}>
    <Tab.Screen 
    name={RouteNames.HOME} 
    component={HomeScreen}
    options={{tabBarLabel: '홈', tabBarIcon: HomeIcon}}
    />
    <Tab.Screen  
    name={RouteNames.SHOPPING} 
    component={ShoppingScreen}
    options={{tabBarLabel: '쇼핑', tabBarIcon: ShoppingIcon}}
    />
  </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name={RouteNames.HOME_TAB}
        component={HomeTab}
        options={{headerShown: false}}
        />
      <Stack.Screen 
      name={RouteNames.BROWSER} 
      component={BrowserScreen} 
      options={{headerShown: false}}
      />
      </Stack.Navigator>
      </NavigationContainer>
  );
}