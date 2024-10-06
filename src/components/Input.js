import { useReducer } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

const Input = ({ onSearch }) => {
  const [state, dispatch] = useReducer(inputReducer, { query: '' });

  const handleSearch = () => {
    if (state.query.trim()) {
      onSearch(state.query);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          value={state.query}
          onChangeText={(text) => dispatch({ type: 'SET_QUERY', payload: text })}
          placeholder="i.e. James Bond, CSI"
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Icon name="search" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Input;
