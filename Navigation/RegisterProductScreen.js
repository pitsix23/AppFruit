import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../accesoFirebase';
import { LinearGradient } from 'expo-linear-gradient';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function RegisterProductScreen({ navigation }) {
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleRegister = async () => {
    try {
      const docRef = await addDoc(collection(db, 'productos'), {
        nombre: productName,
        codigo: productCode,
        cantidad: quantity,
        fechaCaducidad: expiryDate
      });
      Alert.alert('Alerta', 'El producto se registró con éxito');
      setProductName('');
      setProductCode('');
      setQuantity('');
      setExpiryDate('');
      navigation.navigate('Principal');
    } catch (error) {
      console.error('Error registrando el producto:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el producto.');
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
        <Text style={styles.title}>Registrar Producto</Text>
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
        <TouchableOpacity onPress={handleRegister}>
          <LinearGradient
            colors={['#871F1F', '#837B7B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#D9D9D9',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente blanco
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: -125, // Ajuste para compensar el borde redondeado
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
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
    width: 219,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topRightImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 180, // Ajusta el tamaño según sea necesario
    height: 180, // Ajusta el tamaño según sea necesario
    resizeMode: 'contain',
  },
});
