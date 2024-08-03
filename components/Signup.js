import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {
    // Add your authentication logic here
    // If successful, navigate to the Home screen
    navigation.navigate('articals');
  };

  const handleSignupNavigation = () => {
    navigation.navigate('Login');
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hello!</Text>
      <Text style={styles.welcomeText}>Signup to get Started</Text>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <Icon name={passwordVisible ? "visibility" : "visibility-off"} size={20} color="grey" />
          </TouchableOpacity>
        </View>
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity onPress={toggleRememberMe} style={styles.checkboxContainer}>
            <Icon
              name={rememberMe ? "check-box" : "check-box-outline-blank"}
              size={24}
              color={rememberMe ? "#1E90FF" : "grey"}
            />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </TouchableOpacity>
          
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or continue with</Text>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <View style={styles.socialContent}>
              <FontAwesome name="facebook" size={20} color="#3b5998" />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <View style={styles.socialContent}>
              <FontAwesome name="google" size={20} color="#DB4437" />
              <Text style={styles.socialButtonText}>Google</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account ? </Text>
          <TouchableOpacity onPress={handleSignupNavigation}>
            <Text style={styles.signupLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  welcomeText: {
    fontSize: 20,
    color: 'grey',
    marginVertical: 10,
  },
  formContainer: {
    flex: 1,
    paddingTop: 50,

  },
  input: {
    height: 45,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
    color: 'grey',
  },
  
  loginButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
  },
  orText: {
    textAlign: 'center',
    color: 'grey',
    marginVertical: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    alignItems: 'center',
  },
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'grey',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  signupText: {
    color: 'grey',
  },
  signupLink: {
    color: '#1E90FF',
  },
});

