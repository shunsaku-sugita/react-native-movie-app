import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchTVShowDetails } from '../services/api';

const TVShowDetails = ({ route }) => {
  const { id } = route.params;

  const [tvShow, setTVShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTVShowDetails = async () => {
      try {
        const data = await fetchTVShowDetails(id);
        setTVShow(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTVShowDetails();
  }, [id]);

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tvShow.name}</Text>
      <Image
        source={{ uri: `${imageBaseUrl}${tvShow.poster_path}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.overview}>{tvShow.overview}</Text>
      <Text style={styles.text}>Popularity: {tvShow.popularity} | Release Date: {tvShow.release_date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingRight: 30,
    paddingLeft: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  overview: {
    marginBottom: 16,
    textAlign: 'left',
  },
  text: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
});

export default TVShowDetails;
