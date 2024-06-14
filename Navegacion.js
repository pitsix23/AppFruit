import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from 'react-native';
import RegisterForm from './RegisterForm'; // Importa la pantalla de registro

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SignUpScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Create Account Screen</Text>
    </View>
  );
}

function AddProductScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Product Screen</Text>
    </View>
  );
}

function Home1Stack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} /> {/* Agrega la pantalla de formulario de registro */}
    </Stack.Navigator>
  );
}

function Home2Stack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="SignUp" component={Home1Stack} />
      <Tab.Screen name="AddProduct" component={Home2Stack} />
    </Tab.Navigator>
  );
}

export default function Navegacion() {
  const navigation = useNavigation(); // Accede al objeto de navegación

  const handleRegisterPress = () => {
    navigation.navigate('RegisterForm'); // Navega a la pantalla de formulario de registro
  };

  return (
    <NavigationContainer>
      <Tabs />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Main Screen</Text>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </NavigationContainer>
  );
}
