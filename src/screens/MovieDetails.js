import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchMovieDetails } from '../services/api';

const MovieDetails = ({ route }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
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
      <Text style={styles.title}>{movie.title}</Text>
      <Image
        source={{ uri: `${imageBaseUrl}${movie.poster_path}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.text}>Popularity: {movie.popularity} | Release Date: {movie.release_date}</Text>
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

export default MovieDetails;
