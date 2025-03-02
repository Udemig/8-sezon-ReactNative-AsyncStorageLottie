import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Lottie from 'lottie-react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View style={{flex: 1}}>
        <Lottie source={require('../assets/animations/confetti.json')} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
