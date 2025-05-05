import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const LandingScreen = () => {
  const { login, user, shouldRedirectToForm } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (shouldRedirectToForm) {
      navigation.navigate('RegistrationForm');
    }
  }, [shouldRedirectToForm]);

  const handleAssociatePress = async () => {
    try {
      if (!user) {
        console.log('Iniciando proceso de login...');
        await login();
      } else {
        console.log('Usuario autenticado, navegando al formulario...');
        navigation.navigate('RegistrationForm');
      }
    } catch (error) {
      console.error('Error en handleAssociatePress:', error);
      Alert.alert('Error', 'Hubo un problema al procesar tu solicitud');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={{
          uri: 'https://res.cloudinary.com/dqgjcfosx/image/upload/v1727005386/apidc-all_d15wow.jpg',
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView style={styles.scrollView}>
          {/* Hero Section */}
          <View style={styles.hero}>
            <View style={styles.titleContainer}>
              <Text style={styles.heroTitle}>APIDC</Text>
              <View style={styles.titleUnderline} />
            </View>
            <Text style={styles.heroSubtitle}>
              Cultivo Legal de Cannabis
            </Text>
            <Text style={styles.heroDescription}>
              Respaldado por REPROCAN y marco legal vigente
            </Text>
          </View>

          {/* Action Buttons Section */}
          <View style={styles.actionButtonsSection}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleAssociatePress}
            >
              <Text style={styles.actionButtonText}>
                ASOCIATE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>SOY SOCIO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>SOY GERENTE</Text>
            </TouchableOpacity>
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Comenzar Ahora</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Más Información</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  'rgba(0, 0, 0, 0.5)',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: 'rgba(26, 26, 26, 0.5)',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heroTitle: {
    fontSize: 64,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 6,
    marginBottom: 15,
  },
  titleUnderline: {
    display: 'none',
  },
  heroSubtitle: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '700',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  heroDescription: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.95,
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  actionButtonsSection: {
    padding: 20,
    paddingTop: 0,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginBottom: 20,
    width: width - 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  actionButtonText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2c3e50',
    letterSpacing: 1.5,
  },
  ctaSection: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 35,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#27ae60',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  secondaryButton: {
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 35,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#27ae60',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
  },
  secondaryButtonText: {
    color: '#27ae60',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
});

export default LandingScreen; 