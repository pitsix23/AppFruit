import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function RegisterForm({ navigation }) {
  const handleSubmit = () => {
    // Aquí puedes agregar la lógica para enviar el formulario de registro
    // Una vez que el registro sea exitoso, puedes navegar a la pantalla deseada
    // Por ahora, simplemente navegaremos de regreso a la pantalla principal
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Registro</Text>
      <TextInput placeholder="Nombre" style={{ borderWidth: 1, marginVertical: 10, padding: 10, width: 200 }} />
      <TextInput placeholder="Correo electrónico" style={{ borderWidth: 1, marginVertical: 10, padding: 10, width: 200 }} />
      <TextInput placeholder="Contraseña" secureTextEntry style={{ borderWidth: 1, marginVertical: 10, padding: 10, width: 200 }} />
      <Button title="Registrarse" onPress={handleSubmit} />
    </View>
  );
}

export default RegisterForm;
