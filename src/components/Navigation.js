import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../screens/Search';
import { MoviesStack, TVShowsStack } from '../stacks/AppStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getTabScreenOptions = (title) => ({
  tabBarLabelStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 30,
  },
});

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarIcon: () => null,
      tabBarStyle: {
        backgroundColor: '#00378a',
        paddingBottom: 10,
        height: 90,
      },
      headerShown: false,
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: '#b0c4de',
    }}
  >
    <Tab.Screen
      name="Movies"
      component={MoviesStack}
      options={getTabScreenOptions('Movies')}
    />
    <Tab.Screen
      name="Search Results"
      component={Search}
      options={getTabScreenOptions('Search Results')}
    />
    <Tab.Screen
      name="TV Shows"
      component={TVShowsStack}
      options={getTabScreenOptions('TV Shows')}
    />
  </Tab.Navigator>
);

const Navigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainTabs"
      component={TabNavigator}
      options={{
        headerTitle: 'Movies App',
        headerStyle: {
          backgroundColor: '#00378a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  </Stack.Navigator>
);

export default Navigation;
