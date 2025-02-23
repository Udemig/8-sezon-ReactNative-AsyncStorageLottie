import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation/appNavigation';
const App = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default App;
