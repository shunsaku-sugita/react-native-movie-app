import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { fetchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovies(category);
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [category]);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    return (
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('movie', { id: item.id })}
          />
        )}
        style={styles.listContainer}
      />
    );
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        items={[
          { label: 'Popular', value: 'popular' },
          { label: 'Now Playing', value: 'now_playing' },
          { label: 'Upcoming', value: 'upcoming' },
          { label: 'Top Rated', value: 'top_rated' },
        ]}
        style={pickerSelectStyles}
        value={category}
        placeholder={{}}
      />
      {renderContent()}
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    color: 'black',
    width: 250,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    color: 'black',
    width: 250,
    alignSelf: 'center',
    marginBottom: 20,
  },
  placeholder: {
    color: '#9EA0A4',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  listContainer: {
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default Movies;
