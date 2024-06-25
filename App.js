import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FavoritesScreen from './Navigation/FavoritesScreen';
import RegisterScreen from './Navigation/RegisterScreen';
import ResetPasswordScreen from './Navigation/ResetPasswordScreen';
import PrincipalScreen from './Navigation/PrincipalScreen';
import RegisterProductScreen from './Navigation/RegisterProductScreen';
import LearnMoreScreen from './Navigation/LearnMoreScreen';
import ProductsScreen from './Navigation/ProductsScreen';
import EditProductScreen from './Navigation/EditProductScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true, // Hace que el encabezado sea transparente
          headerTintColor: '#D9D9D9', // Color de texto del encabezado en blanco
          headerTitleStyle: {
            fontWeight: 'bold', // Estilo del título del encabezado
          },
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Principal" component={PrincipalScreen} />
        <Stack.Screen name="RegisterProduct" component={RegisterProductScreen} />
        <Stack.Screen name="LearnMore" component={LearnMoreScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./Images/img_fondo.jpg')} style={styles.backgroundImage} />
      <Image source={require('./Images/logo_fruit.png')} style={styles.topRightImage} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Image source={require('./Images/email.png')} style={styles.icon} />
          <TextInput
            placeholder='correo@example.com'
            style={styles.txtInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('./Images/lock.png')} style={styles.icon} />
          <TextInput
            placeholder='contraseña'
            secureTextEntry={true}
            style={styles.txtInput}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Principal')}>
          <LinearGradient
            colors={['#871F1F', '#837B7B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btnLogin}
          >
            <Text style={styles.txtLogin}>Iniciar sesión</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.txtCuenta}>
          Crear cuenta nueva{' '}
          <Text
            style={styles.txtRegistrarse}
            onPress={() => navigation.navigate('Register')}
          >
            Registrarse
          </Text>
        </Text>
        <Text style={styles.txtCuenta}>
          <Text
            style={styles.txtOlvidar}
            onPress={() => navigation.navigate('ResetPassword')}
          >
            ¿Olvidó su contraseña?
          </Text>
        </Text>
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
  topRightImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 180, // Ajusta el tamaño según sea necesario
    height: 180, // Ajusta el tamaño según sea necesario
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
  },
  txtInput: {
    width: '100%',
    height: 50,
    borderRadius: 30,
    paddingLeft: 40, // Ajusta el padding para que el ícono esté alineado con el texto
    marginTop: 10,
    borderColor: 'gray',
    backgroundColor: '#F5F5F5',
    shadowColor: '#837B7B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    color: '#FFFF',
    fontSize: 15,
    marginTop: 10,
  },
  txtRegistrarse: {
    textAlign: 'center',
    color: '#FFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  txtOlvidar: {
    textAlign: 'center',
    color: '#FFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 24,
    width: 20,
    height: 20,
    zIndex: 1,
  },
});
