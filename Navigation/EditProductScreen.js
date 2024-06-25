import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../accesoFirebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function EditProductScreen({ route, navigation }) {
  const { product } = route.params;
  const [productName, setProductName] = useState(product.nombre);
  const [productCode, setProductCode] = useState(product.codigo);
  const [quantity, setQuantity] = useState(product.cantidad);
  const [expiryDate, setExpiryDate] = useState(product.fechaCaducidad);

  const handleUpdate = async () => {
    try {
      const productRef = doc(db, 'productos', product.id);
      await updateDoc(productRef, {
        nombre: productName,
        codigo: productCode,
        cantidad: quantity,
        fechaCaducidad: expiryDate,
      });
      Alert.alert('Alerta', 'El producto se actualizó con éxito');
      navigation.navigate('Products');
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar el producto.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.halfBackground}>
        <ImageBackground source={require('../Images/img_fondo.jpg')} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
          <View style={styles.overlay}>
            <Image source={require('../Images/logo_fruit.png')} style={styles.topRightImage} />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Editar Producto</Text>
        <TextInput
          placeholder="Nombre Producto"
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          placeholder="Código Producto"
          style={styles.input}
          value={productCode}
          onChangeText={setProductCode}
        />
        <TextInput
          placeholder="Cantidad"
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Fecha Caducidad"
          style={styles.input}
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
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
  formContainer: {
    flex: 1,
    marginTop:-200,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente blanco
    borderTopLeftRadius: 30, // Borde redondeado superior izquierdo
    borderTopRightRadius: 30, // Borde redondeado superior derecho
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    paddingLeft: 40,
    borderRadius: 30,
    shadowColor: '#837B7B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    color: '#333',
  },
  button: {
    borderRadius: 30,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#871F1F',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topRightImage: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100, // Ajusta el tamaño según sea necesario
    height: 100, // Ajusta el tamaño según sea necesario
    resizeMode: 'contain',
  },
});
