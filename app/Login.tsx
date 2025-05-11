import React, { useState } from 'react';
import { Text, TextInput, Pressable, StyleSheet,  } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/theme/useThemeColors';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const buttonColor = useThemeColor({}, 'button');



  const handleSubmit = () => {
    if (!email) {
      setError("Något gick fel. Ange din e-post.");
    } else {
      console.log("Inloggad med e-post:", email);
    }
  };

  return (
    <ThemedView style={styles.overlay}>
      <ThemedView style={styles.container} accessible accessibilityLabel='Inloggningsformular'>
        <Text style={styles.label} accessibilityLabel='header'>
          Logga in
        </Text>

        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          style={styles.input}
          placeholder='Skriv in ditt användarnamn'
          placeholderTextColor="#888" 
          accessibilityLabel='Användarnamn'
          accessibilityHint='Fält där du kan skriva in ditt användarnamn'
          keyboardType='default'
          returnKeyType='done'
        />


        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError(''); 
          }}
          style={styles.input}
          placeholder='Skriv in ditt lösenord'
          placeholderTextColor="#888" 
          accessibilityLabel='Lösenord'
          accessibilityHint='Fält där du kan skriva in ditt lösenord'
          secureTextEntry={true}
          returnKeyType='done'
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

          

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [styles.button, { backgroundColor: buttonColor }, pressed && styles.pressed]}
          accessibilityRole='button'
          accessibilityLabel='Logga in knapp'
          accessibilityHint='Tryck här för att logga in med det angivna namnet'
        >
          <Text>Logga in</Text>

        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  errorText: {
    marginBottom: 10,
  },
});
