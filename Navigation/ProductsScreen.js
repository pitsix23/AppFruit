import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../accesoFirebase';
import { useNavigation } from '@react-navigation/native';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'productos', id));
      Alert.alert('Alerta', 'El producto se eliminó con éxito');
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el producto.');
    }
  };

  const handleEdit = (product) => {
    navigation.navigate('EditProduct', { product });
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
      <View style={styles.productContainer}>
        <Text style={styles.title}>Productos Registrados</Text>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text style={styles.productText}>Nombre: {item.nombre}</Text>
              <Text style={styles.productText}>Código: {item.codigo}</Text>
              <Text style={styles.productText}>Cantidad: {item.cantidad}</Text>
              <Text style={styles.productText}>Fecha de Caducidad: {item.fechaCaducidad}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  productContainer: {
    flex: 1,
    marginTop: -350, // Ajuste para compensar el borde redondeado
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#fff',
  },
  productItem: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  productText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#871F1F',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
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
    marginTop:-400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
  },
});
