import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AddCircle,
  TickCircle,
  CloseCircle,
  BagTick,
  Edit2,
} from 'iconsax-react-native';
import {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import uuid from 'react-native-uuid';

const TodosScreen = () => {
  //kullanıcı tarafından girilen todo ögesini saklamak için state
  const [todo, setTodo] = useState(' ');

  // todo listesini saklamak için state
  const [todos, setTodos] = useState([]);

  // todo listesini asyncstorage kaydetme fonskiyonu
  const saveTodos = async saveTodo => {
    try {
      //todos verisini async storage kaydediyoruz
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      console.log('error', error);
    }
  };

  // yeni bir todo eklemek için kullanılan fonksiyon

  const addTodo = () => {
    //eğer kullanıcı bir metin girdiyse
    if (todo) {
      //yeni todo nesnesini oluştur
      const updateTodos = [...todos, {id: uuid.v4(), text: todo}];
      //todo listesini güncelliyoruz
      setTodos(updateTodos);

      //yeni todoyu asyncstorage kaydediyoruz
      saveTodos(updateTodos);

      //girdi alanını temizliyoruz
      setTodo('');
    }
  };

  //async storage den todos listesini yükleme fonksiyonu
  const loadTodos = async () => {
    try {
      // todos verisini async storageden alıyoruz
      const storedData = await AsyncStorage.getItem('todos');
      //eğer veri varssa json olarak parse edip todos statine aktarıyoruz
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //bir todo ögesinin tamamlanma durumunu değiştiren fonksiyon
  const completeTodo = id => {
    // todos listeini mapleyerek idsi eşleşen ögeyi buluruz
    const updatedTodos = todos.map(item =>
      item.id === id ? {...item, completed: !item.completed} : item,
    );

    //todo listesini güncelliyoruz
    setTodos(updatedTodos);

    //yeni listeyi asyncstorage kaydediyoruz
    saveTodos(updatedTodos);
  };

  //delete butonu
  const deleteTodo = id => {
    //silinecek todoyu filtreliyoruz
    const updatedTodos = todos.filter(item => item.id !== id);

    //todo listesini güncelle
    setTodos(updatedTodos);

    //yeni listeyi asyncstorage kaydet
    saveTodos(updatedTodos);
  };

  //update butonu
  const updateTodos = id => {
    const exitingTodo = todos.find(x => x.id === id);
    if (!exitingTodo) return;

    //kullanıcıdan yeni todometnini almak için alert prompt açıypruz
    Alert.prompt(
      'Edit Todo', //başlık
      'Update', //update
      newUpdateText => {
        if (newUpdateText) {
          const updatedTodos = todos.map(item =>
            item.id === id ? {...item, text: newUpdateText} : item,
          );
          setTodos(updatedTodos);
          saveTodos(updatedTodos);
        }
      },
      'plain-text', //alertin tipi (sadece düz metin)
      exitingTodo.text, //varsayılan metin olark mevcut todoya ekledim
    );
  };

  //uygulama ilk açıldığında todos listesini yüklemek için usEffect kullanıyoruz.
  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <LinearGradient colors={['#fef3c7', '#a78bfa']} style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>TO-DO LIST</Text>

        {/* todo ekleme inputu */}
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={text => setTodo(text)}
            value={todo}
            placeholder="Type a Todo"
            style={styles.input}
          />

          {/* todo ekleme butonu */}
          <TouchableOpacity
            onPress={addTodo}
            style={[styles.button, styles.addButton]}>
            <Text style={styles.buttonText}>
              <AddCircle size="32" color="#FF8A65" variant="Broken" />
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completedTex,
                ]}>
                {' '}
                {item?.text}{' '}
              </Text>

              {/* todo ögesine ait butonlar */}
              <View style={{flexDirection: 'row'}}>
                {/* tamamlama butonu */}
                <View>
                  <TouchableOpacity
                    style={[styles.button, styles.completeButton]}
                    onPress={() => completeTodo(item?.id)}>
                    <Text>
                      {/* tamamlanmışsa bir x ikonu, tamamlanmamışsa onay işareti */}
                      {item.completed ? (
                        <CloseCircle
                          size="24"
                          color="#FF8A65"
                          variant="Broken"
                        />
                      ) : (
                        <TickCircle
                          size="27"
                          color="#FF8A65"
                          variant="Broken"
                        />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* silme butonu */}
                <View>
                  <TouchableOpacity
                    onPress={() => deleteTodo(item?.id)}
                    style={[styles.button, styles.deleteButton]}>
                    <Text>
                      <BagTick size="27" color="#FF8A65" variant="Broken" />
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* düzenleme butonu */}
                <View>
                  <TouchableOpacity
                    onPress={() => updateTodos(item?.id)}
                    style={[styles.button, styles.updateButton]}>
                    <Text>
                      <Edit2 size="27" color="#FF8A65" variant="Broken" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray',
    flex: 1,
  },
  button: {
    marginLeft: 10,
    borderRadius: 5,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  todoText: {
    color: '#000',
    textDecorationLine: 'none',
    fontSize: 18,
    fontWeight: 'bold',
  },

  completeButton: {
    padding: 10,
  },
  deleteButton: {
    padding: 10,
  },
  completedTex: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  updateButton: {
    padding: 10,
  },
});
