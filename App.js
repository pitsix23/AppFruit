import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function HomeScreen() {
  return (
    <View style={styles.homeScreen}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('./Images/img_fondo.jpg')} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.txtTitulo}>Bienvenidos!</Text>
        <Text style={styles.txtSubtitulo}>Ingresar con tu cuenta</Text>
        <TextInput placeholder='correoelectronico@gmail.com' style={styles.txtInput} />
        <TextInput placeholder='contraseña' secureTextEntry={true} style={styles.txtInput} />
        <TouchableOpacity>
          <Text style={styles.txtPass}>¿Has olvidado su contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient
            colors={['#871F1F', '#837B7B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btnLogin}
          >
            <Text style={styles.txtLogin}>Iniciar sesión</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.txtCuenta}>No tiene cuenta?</Text>
        <TouchableOpacity>
          <Text style={styles.txtRegistrarse}>Registrarse</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Opcional: para dar un efecto de superposición
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  txtTitulo: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#34434D',
    textAlign: 'center',
    marginBottom: 10,
  },
  txtSubtitulo: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  txtInput: {
    width: '100%',
    height: 50,
    borderRadius: 30,
    paddingLeft: 30,
    marginTop: 10,
    borderColor: 'gray',
    backgroundColor: '#F5F5F5',
    shadowColor: '#837B7B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  txtPass: {
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingTop: 10,
    color: '#837B7B',
    fontSize: 15,
    marginBottom: 20,
  },
  btnLogin: {
    borderRadius: 30,
    width: 219,
    height: 53,
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLogin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  txtCuenta: {
    textAlign: 'center',
    paddingTop: 10,
    color: '#837B7B',
    fontSize: 15,
    marginTop: 20,
  },
  txtRegistrarse: {
    textAlign: 'center',
    color: '#837B7B',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  homeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
