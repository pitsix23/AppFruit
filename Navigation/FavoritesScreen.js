import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem('favorites');
      if (favs !== null) {
        // Parse and filter duplicates
        const parsedFavorites = JSON.parse(favs);
        const uniqueFavorites = parsedFavorites.filter((item, index, self) =>
          index === self.findIndex((t) => t.id === item.id)
        );
        setFavorites(uniqueFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderFavoriteItem = ({ item }) => {
    if (!item || !item.id) {
      return null; // Ignorar elementos sin id
    }

    return (
      <View style={styles.favoriteItem}>
        <Text style={styles.favoriteItemName}>{item.name}</Text>
        <Text style={styles.favoriteItemFamily}>Familia: {item.family}</Text>
        <Text style={styles.favoriteItemNutritions}>
          Nutrientes: {Object.entries(item.nutritions).map(([key, value]) => `${key}: ${value}`).join(', ')}
        </Text>
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
          <Text style={styles.loadingText}>Cargando favoritos...</Text>
        </View>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.halfBackground}>
          <ImageBackground source={require('../Images/img_fondo.jpg')} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
            <View style={styles.overlay}>
              <Image source={require('../Images/logo_fruit.png')} style={styles.topRightImage} />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay productos favoritos guardados.</Text>
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
      <View style={styles.favoriteListContainer}>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={renderFavoriteItem}
          contentContainerStyle={styles.favoriteList}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#000',
  },
  favoriteListContainer: {
    flex: 1,
    marginTop: -320, // Ajuste para compensar el borde redondeado
    paddingHorizontal: 20,
  },
  favoriteList: {
    paddingBottom: 20,
  },
  favoriteItem: {
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
  favoriteItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoriteItemFamily: {
    fontSize: 14,
    color: 'gray',
  },
  favoriteItemNutritions: {
    fontSize: 12,
    color: 'gray',
  },
});
