import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LearnMoreScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.fruityvice.com/api/fruit/all')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });

    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem('favorites');
      if (favs !== null) {
        const parsedFavorites = JSON.parse(favs).filter(item => item && item.id);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (favorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (product) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(product)
        ? prevFavorites.filter(fav => fav !== product)
        : [...prevFavorites, product];
      
      saveFavorites(newFavorites);  // Save to AsyncStorage
      return newFavorites;
    });
  };

  const renderProduct = ({ item }) => {
    const isFavorite = favorites.includes(item);
    return (
      <View style={styles.productContainer}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productFamily}>Familia: {item.family}</Text>
          <Text style={styles.productNutritions}>
            Nutrientes: {Object.entries(item.nutritions).map(([key, value]) => `${key}: ${value}`).join(', ')}
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "red" : "gray"} />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.halfBackground}>
          <ImageBackground source={require('../Images/img_fondo.jpg')} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
            <View style={styles.overlay}>
              <Image source={require('../Images/logo_fruit.png')} style={styles.topRightImage} />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Cargando productos...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.halfBackground}>
        <ImageBackground source={require('../Images/img_fondo.jpg')} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
          <View style={styles.overlay}>
            <Image source={require('../Images/logo_fruit.png')} style={styles.topRightImage} />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.favoriteButton}>
          <Ionicons name="heart" size={24} color="red" />
          <Text style={styles.favoriteButtonText}>Ver Favoritos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productListContainer}>
        <TextInput
          placeholder="Buscar producto por nombre"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.productList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9', // Cambia el color de fondo si es necesario
  },
  halfBackground: {
    height: '50%', // Mostrar solo la mitad
    overflow: 'hidden', // Ocultar el resto de la imagen
    borderBottomLeftRadius: 30, // Borde redondeado inferior izquierdo
    borderBottomRightRadius: 30, // Borde redondeado inferior derecho
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageStyle: {
    borderBottomLeftRadius: 30, // Borde redondeado inferior izquierdo
    borderBottomRightRadius: 30, // Borde redondeado inferior derecho
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semi-transparente
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop:-700,
  },
  favoriteButtonText: {
    marginLeft: 5,
    color: 'red',
    fontSize: 16,
    marginTop:-600,
  },
  productListContainer: {
    flex: 1,
    marginTop: -320, // Ajuste para compensar el borde redondeado
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#D9D9D9',
  },
  productList: {
    paddingBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productFamily: {
    fontSize: 14,
    color: 'gray',
  },
  productNutritions: {
    fontSize: 12,
    color: 'gray',
  },
  topRightImage: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100, // Ajusta el tamaño según sea necesario
    height: 100, // Ajusta el tamaño según sea necesario
    resizeMode: 'contain',
  },
  loadingContainer: {
    flex: 1,
    marginTop: -400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
  },
});
