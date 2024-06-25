import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function EjemploApi() {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  const getPlanetsData = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const json = await response.json();
      setData(json.results);
      setFilteredData(json.results); // Mostrar todos los datos inicialmente
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCharactersData = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/people');
      const json = await response.json();
      setData(json.results);
      setFilteredData(json.results); // Mostrar todos los datos inicialmente
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim().length === 0) {
      setFilteredData(data); // Mostrar todos los datos si la búsqueda está vacía
    } else {
      const filtered = data.filter(item =>
        (item.name && item.name.toLowerCase().includes(text.toLowerCase())) ||
        (item.title && item.title.toLowerCase().includes(text.toLowerCase())) ||
        (item.height && item.height.toLowerCase().includes(text.toLowerCase())) ||
        (item.mass && item.mass.toLowerCase().includes(text.toLowerCase())) ||
        (item.hair_color && item.hair_color.toLowerCase().includes(text.toLowerCase())) ||
        (item.skin_color && item.skin_color.toLowerCase().includes(text.toLowerCase())) ||
        (item.eye_color && item.eye_color.toLowerCase().includes(text.toLowerCase())) ||
        (item.birth_year && item.birth_year.toLowerCase().includes(text.toLowerCase())) ||
        (item.gender && item.gender.toLowerCase().includes(text.toLowerCase())) ||
        (item.rotation_period && item.rotation_period.toLowerCase().includes(text.toLowerCase())) ||
        (item.orbital_period && item.orbital_period.toLowerCase().includes(text.toLowerCase())) ||
        (item.diameter && item.diameter.toLowerCase().includes(text.toLowerCase())) ||
        (item.climate && item.climate.toLowerCase().includes(text.toLowerCase())) ||
        (item.gravity && item.gravity.toLowerCase().includes(text.toLowerCase())) ||
        (item.terrain && item.terrain.toLowerCase().includes(text.toLowerCase())) ||
        (item.surface_water && item.surface_water.toLowerCase().includes(text.toLowerCase())) ||
        (item.population && item.population.toLowerCase().includes(text.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  };

  const toggleFavorite = async (item) => {
    const index = favorites.findIndex(fav => fav.url === item.url);
    if (index === -1) {
      const updatedFavorites = [...favorites, item];
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = favorites.filter(fav => fav.url !== item.url);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.dataBox}>
      <Text style={styles.dataTitle}>{item.name || item.title}</Text>
      {item.height && <Text style={styles.dataText}>Height: {item.height}</Text>}
      {item.mass && <Text style={styles.dataText}>Mass: {item.mass}</Text>}
      {item.hair_color && <Text style={styles.dataText}>Hair Color: {item.hair_color}</Text>}
      {item.skin_color && <Text style={styles.dataText}>Skin Color: {item.skin_color}</Text>}
      {item.eye_color && <Text style={styles.dataText}>Eye Color: {item.eye_color}</Text>}
      {item.birth_year && <Text style={styles.dataText}>Birth Year: {item.birth_year}</Text>}
      {item.gender && <Text style={styles.dataText}>Gender: {item.gender}</Text>}
      {item.rotation_period && <Text style={styles.dataText}>Rotation Period: {item.rotation_period}</Text>}
      {item.orbital_period && <Text style={styles.dataText}>Orbital Period: {item.orbital_period}</Text>}
      {item.diameter && <Text style={styles.dataText}>Diameter: {item.diameter}</Text>}
      {item.climate && <Text style={styles.dataText}>Climate: {item.climate}</Text>}
      {item.gravity && <Text style={styles.dataText}>Gravity: {item.gravity}</Text>}
      {item.terrain && <Text style={styles.dataText}>Terrain: {item.terrain}</Text>}
      {item.surface_water && <Text style={styles.dataText}>Surface Water: {item.surface_water}</Text>}
      {item.population && <Text style={styles.dataText}>Population: {item.population}</Text>}
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Text style={styles.favoriteButton}>
          {favorites.findIndex(fav => fav.url === item.url) === -1 ? 'Add to Favorites' : 'Remove from Favorites'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const loadFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem('favorites');
      if (favs !== null) {
        setFavorites(JSON.parse(favs));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlanetsData();
    loadFavorites();
  }, []);

  const navigateToFavorites = () => {
    navigation.navigate('Favorites'); // Navegar a la pantalla de Favoritos
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.url}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
      <TouchableOpacity style={styles.favoritesButton} onPress={navigateToFavorites}>
        <Text style={styles.buttonText}>Ver Favoritos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  list: {
    alignItems: 'left',
  },
  dataBox: {
    width: '100%',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  dataText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  favoriteButton: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  favoritesButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#0C2250',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

