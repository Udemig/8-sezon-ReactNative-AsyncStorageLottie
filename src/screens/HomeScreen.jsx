import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import SCREENS from '../utils/router';
import {removeItem} from '../utils/asyncStorage';

const {HOME, ONBOARDING, TODOS} = SCREENS;

const {width, heigth} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleReset = async () => {
    await removeItem('onboarded');
    navigation.push(ONBOARDING);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottie}>
        <Lottie
          style={{flex: 1}}
          source={require('../assets/animations/confetti.json')}
          autoPlay
          loop
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate(TODOS)}
        style={styles.addTaskButton}>
        <LinearGradient
          style={styles.addTaskButton}
          colors={['#a78bfa', '#fef3c7']}>
          <Text style={styles.addTaskText}>New Task, Who's In?</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <LinearGradient
          style={styles.resetButton}
          colors={['#a7f3d0', '#ff6347']}>
          <Text style={styles.resetText}>Reset</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fef3c7',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  addTaskButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.85,
    elevation: 5,
  },
  addTaskText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.85,
    elevation: 5,
    marginTop: 10,
  },
});
