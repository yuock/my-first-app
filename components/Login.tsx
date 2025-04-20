import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { useUser } from '../context/UserContext';
import { useAdmin } from '../context/AdminContext';
import { router } from 'expo-router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  const { login: userLogin } = useUser();
  const { login: adminLogin } = useAdmin();

  const showNotification = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowError(false);
    });
  };

  const handleLogin = async () => {
    if (!username || !password) {
      showNotification('Please enter both username and password');
      return;
    }

    try {
      let success = false;
      
      if (isAdmin) {
        success = await adminLogin(username, password);
        if (!success) {
          showNotification('Invalid admin credentials. Please check your username and password.');
          return;
        }
      } else {
        success = await userLogin(username, password);
        if (!success) {
          showNotification('Invalid user credentials. Please check your username and password.');
          return;
        }
      }

      if (success) {
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      showNotification('An unexpected error occurred during login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Park Guide System</Text>
      
      {showError && (
        <Animated.View 
          style={[
            styles.notification,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.notificationText}>{errorMessage}</Text>
        </Animated.View>
      )}
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, !isAdmin && styles.activeToggle]}
          onPress={() => {
            setIsAdmin(false);
            setUsername('');
            setPassword('');
          }}
        >
          <Text style={[styles.toggleText, !isAdmin && styles.activeToggleText]}>
            User Login
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.toggleButton, isAdmin && styles.activeToggle]}
          onPress={() => {
            setIsAdmin(true);
            setUsername('');
            setPassword('');
          }}
        >
          <Text style={[styles.toggleText, isAdmin && styles.activeToggleText]}>
            Admin Login
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {!isAdmin && (
        <TouchableOpacity 
          style={styles.registerLink} 
          onPress={() => {
            setUsername('');
            setPassword('');
            router.push('/registration');
          }}
        >
          <Text style={styles.registerLinkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  notification: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FF5252',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  notificationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#2196F3',
  },
  toggleText: {
    fontSize: 16,
    color: '#666',
  },
  activeToggleText: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 15,
  },
  registerLinkText: {
    color: '#2196F3',
    fontSize: 16,
  },
});

export default Login; 