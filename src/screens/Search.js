import { useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { searchMoviesOrTVShows } from '../services/api';
import Input from '../components/Input';
import MovieCard from '../components/MovieCard';
import TVShowCard from '../components/TVShowCard';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const [results, setResults] = useState([]);
  const [type, setType] = useState('movie');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const items = [
    { label: 'movie', value: 'movie' },
    { label: 'tv', value: 'tv' },
    { label: 'multi', value: 'multi' },
  ];

  const search = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchMoviesOrTVShows(query, type);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = ({ item }) => {
    const mediaType = type === 'multi' ? item.media_type : type;

    switch (mediaType) {
      case 'movie':
        return (
          <MovieCard
            movie={item}
          />
        );
      case 'tv':
        return (
          <TVShowCard
            tvShow={item}
          />
        );
      default:
        return null;
    }
  };


  const renderList = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    if (results.length === 0) {
      return <Text style={styles.messageText}>Please initiate a search</Text>;
    }

    return (
      <FlatList
        data={results}
        renderItem={renderContent}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Movie/TV Show Name*</Text>
      <Input onSearch={search} />
      <Text style={styles.text}>Choose Search Type*</Text>

      <RNPickerSelect
        onValueChange={(value) => setType(value)}
        items={items}
        style={pickerSelectStyles}
        value={type}
        placeholder={{}}
      />
      {renderList()}
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
    width: 150,
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
    width: 150,
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
  text: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  messageText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 200,
  },
});

export default Search;
