import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from 'react-native';

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

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

function MainScreen() {
  const navigation = useNavigation(); // Accede al objeto de navegación

  const handleRegisterPress = () => {
    navigation.navigate('SignUp'); // Navega a la pantalla de registro
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main Screen</Text>
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}
