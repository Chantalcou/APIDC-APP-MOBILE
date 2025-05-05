import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LandingScreen from '../screens/LandingScreen';
import RegistrationForm from '../screens/RegistrationForm';
import Navbar from '../components/Navbar';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, isLoading, shouldRedirectToForm, clearRedirectFlag } = useAuth();

  useEffect(() => {
    if (shouldRedirectToForm) {
      // La redirección se manejará en el LandingScreen
      clearRedirectFlag();
    }
  }, [shouldRedirectToForm]);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <Navbar />,
        }}
      >
        <Stack.Screen 
          name="Landing" 
          component={LandingScreen}
          options={{ headerShown: true }}
        />
        {user && (
          <Stack.Screen 
            name="RegistrationForm" 
            component={RegistrationForm}
            options={{ headerShown: true }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 