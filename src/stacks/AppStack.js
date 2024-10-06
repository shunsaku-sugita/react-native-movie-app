import { createStackNavigator } from '@react-navigation/stack';
import Movies from '../screens/Movies';
import MovieDetails from '../screens/MovieDetails';
import TVShows from '../screens/TVShows';
import TVShowDetails from '../screens/TVShowDetails';

const Stack = createStackNavigator();

export const MoviesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name=" Back to List"
        component={Movies}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="movie"
        component={MovieDetails}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};


export const TVShowsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name=" Back to List"
        component={TVShows}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tvshow"
        component={TVShowDetails}
        options={{
          headerTitle: '',

        }}
      />
    </Stack.Navigator>
  );
};
