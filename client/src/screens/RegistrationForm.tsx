import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';

interface FormData {
  nombre: string;
  apellido: string;
  direccion: string;
  reprocanImage: string | null;
}

const RegistrationForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    direccion: '',
    reprocanImage: null,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Error', 'Se necesitan permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData(prev => ({
        ...prev,
        reprocanImage: result.assets[0].uri,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido';
    }
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    }
    if (!formData.reprocanImage) {
      newErrors.reprocanImage = 'La foto del REPROCAN es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Aquí implementarías la lógica para guardar en la base de datos
      const userData = {
        ...formData,
        email: user?.email,
        fecha_registro: new Date().toISOString(),
        contrato_firmado: false,
        activo: true,
      };

      // Simulación de guardado en base de datos
      console.log('Datos a guardar:', userData);
      Alert.alert('Éxito', 'Registro completado correctamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      Alert.alert('Error', 'Hubo un error al guardar los datos');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Formulario de Registro</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={formData.nombre}
          onChangeText={(text) => setFormData(prev => ({ ...prev, nombre: text }))}
          placeholder="Ingrese su nombre"
        />
        {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          value={formData.apellido}
          onChangeText={(text) => setFormData(prev => ({ ...prev, apellido: text }))}
          placeholder="Ingrese su apellido"
        />
        {errors.apellido && <Text style={styles.errorText}>{errors.apellido}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={formData.direccion}
          onChangeText={(text) => setFormData(prev => ({ ...prev, direccion: text }))}
          placeholder="Ingrese su dirección"
          multiline
        />
        {errors.direccion && <Text style={styles.errorText}>{errors.direccion}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Foto del REPROCAN</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>
            {formData.reprocanImage ? 'Cambiar imagen' : 'Seleccionar imagen'}
          </Text>
        </TouchableOpacity>
        {formData.reprocanImage && (
          <Image
            source={{ uri: formData.reprocanImage }}
            style={styles.previewImage}
          />
        )}
        {errors.reprocanImage && (
          <Text style={styles.errorText}>{errors.reprocanImage}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Registrarse</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  imageButton: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RegistrationForm; 