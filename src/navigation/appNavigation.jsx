import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import TodosScreen from '../screens/TodosScreen';
import SCREENS from '../utils/router';

const {HOME, ONBOARDING, TODOS} = SCREENS;

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={HOME}>
      <Stack.Screen name={HOME} component={HomeScreen} />
      <Stack.Screen name={ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen
        options={{headerShown: false}}
        name={TODOS}
        component={TodosScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
