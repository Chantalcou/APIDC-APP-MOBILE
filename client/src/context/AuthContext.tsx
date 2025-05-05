import React, { createContext, useContext, useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';

// Configuración de Auth0
const AUTH0_DOMAIN = 'dev-kr0cimyo8srf0uor.us.auth0.com';
const AUTH0_CLIENT_ID = 'TZlbu5aWKAtl0lXoQ2Kum0SBZoGXc8oi';

// Configurar el esquema de URL para la redirección
const redirectUri = makeRedirectUri({
  scheme: 'http',
  host: 'localhost:8081',
  path: '',
  preferLocalhost: true,
});

console.log('Redirect URI configurada:', redirectUri); // Log para ver la URL exacta

// Configurar el discovery endpoint de Auth0
const discovery = {
  authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
  tokenEndpoint: `https://${AUTH0_DOMAIN}/oauth/token`,
  revocationEndpoint: `https://${AUTH0_DOMAIN}/oauth/revoke`,
};

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: any;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  shouldRedirectToForm: boolean;
  clearRedirectFlag: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirectToForm, setShouldRedirectToForm] = useState(false);

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: AUTH0_CLIENT_ID,
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
    },
    discovery
  );

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      // Aquí obtendrías la información del usuario usando el token
      setUser({
        access_token,
        sub: 'google-oauth2|109505858357049807205',
        given_name: 'chanti',
        family_name: 'cou',
        nickname: 'chantiicou',
        name: 'chanti cou',
        picture: 'https://lh3.googleusercontent.com/a/ACg8ocLenUGtyV_P4TdSRy6z72L1aEX2p-i8tZci3ya5L2G1bU5jyWE=s96-c',
        updated_at: '2025-05-05T15:33:50.862Z'
      });
      console.log('Login exitoso');
      setShouldRedirectToForm(true);
    }
  }, [response]);

  const checkSession = async () => {
    try {
      // Aquí implementarías la lógica para verificar la sesión
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking session:', error);
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      console.log('Iniciando proceso de login...');
      console.log('Redirect URI que se está usando:', redirectUri);
      const result = await promptAsync();
      console.log('Resultado de autenticación:', result);
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const clearRedirectFlag = () => {
    setShouldRedirectToForm(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      shouldRedirectToForm,
      clearRedirectFlag 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 