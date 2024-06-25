import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PrincipalScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.halfBackground}>
        <ImageBackground source={require('../Images/img_fondo.jpg')} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
          <View style={styles.overlay}>
            <Image source={require('../Images/logo_fruit.png')} style={styles.topRightImage} />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>Pantalla Principal</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterProduct')}>
          <LinearGradient
            colors={['#871F1F', '#837B7B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Registrar Producto</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
          <LinearGradient
            colors={['#871F1F', '#837B7B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Ver Productos</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LearnMore')}>
          <LinearGradient
            colors={['#871F1F', '#837B7B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Aprender+</Text>
          </LinearGradient>
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
  buttonContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente blanco
    borderRadius: 10,
    padding: 20,
    marginLeft:35,
    alignItems: 'center',
    justifyContent: 'center', // Centrar verticalmente
    marginTop:-120,
    bottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
    color: '#000',
    marginBottom: 20,
  },
  button: {
    borderRadius: 30,
    width: 219,
    height: 53,
    marginVertical: 10, // Espacio vertical entre los botones
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#D9D9D9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topRightImage: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 180, // Ajusta el tamaño según sea necesario
    height: 180, // Ajusta el tamaño según sea necesario
    resizeMode: 'contain',
  },
});
