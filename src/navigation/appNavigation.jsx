import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import TodosScreen from '../screens/TodosScreen';
import SCREENS from '../utils/router';
import {useState, useEffect} from 'react';
import {getItem} from '../utils/asyncStorage';

const {HOME, ONBOARDING, TODOS} = SCREENS;
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);

  const checkIfAlreadyBoarded = async () => {
    let onboarded = await getItem('onboarded');
    if (onboarded == '1') {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  useEffect(() => {
    checkIfAlreadyBoarded();
  }, []);

  if (showOnboarding == null) {
    return null;
  }
  if (showOnboarding) {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={ONBOARDING}>
        <Stack.Screen name={ONBOARDING} component={OnboardingScreen} />
        <Stack.Screen name={HOME} component={HomeScreen} />
        <Stack.Screen name={TODOS} component={TodosScreen} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={HOME}>
        <Stack.Screen name={HOME} component={HomeScreen} />
        <Stack.Screen name={ONBOARDING} component={OnboardingScreen} />
        <Stack.Screen name={TODOS} component={TodosScreen} />
      </Stack.Navigator>
    );
  }
};

export default AppNavigation;
