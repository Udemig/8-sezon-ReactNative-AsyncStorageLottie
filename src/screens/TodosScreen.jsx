import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TodosScreen = () => {
  return (
    <LinearGradient
      colors={['#578FCA', '#A9B5DF']}
      style={{flex: 1}}></LinearGradient>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  container: {},
});
