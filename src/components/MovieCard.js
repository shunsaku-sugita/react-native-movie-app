import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MovieCard = ({ movie, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.detailsText}>Popularity: {movie.popularity}</Text>
        <Text style={styles.detailsText}>Release Date: {movie.release_date}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    width: '90%',
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MovieCard;
