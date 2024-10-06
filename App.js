import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/components/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigation />
        <StatusBar style='auto' />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
