import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthHeader } from "../components/AuthHeader"; 
import { useState } from "react";
import { SocialButtons } from "../components/SocialButtons";
import {SubmitButton} from "../components/SubmitButton";
import { useDispatch } from "react-redux";
import { login, register } from "../redux/auth/authOperation";

export const LoginScreen = () => {
    const dispatch=useDispatch();
    const router=useRouter();
    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const handleSubmit = () => {
          if (!email || !password) {
            Alert.alert("Помилка", "Будь ласка, заповніть всі поля!");
            return;
          }
          dispatch(login({email, password }))
            .unwrap()
            .then(() => {
              Alert.alert("Успіх");
            })
            .catch((error) => {
              Alert.alert("Помилка", typeof error === "string" ? error : "Щось пішло не так");
            });
        };
  return (
     <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
  <AuthHeader subtitle="Welcome back!" showAiBlock={false} />
<View style={styles.formContainer}>
   <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF" 
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"   
                autoCapitalize="none"          
                autoComplete="email"           
                textContentType="emailAddress" 
              />
            </View>
             <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter your password"
                          placeholderTextColor="#9CA3AF" 
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry={true}         
                          autoCapitalize="none"         
                          autoCorrect={false}            
                          textContentType="password"     
                        />
                      </View>
        </View>
        <View style={styles.buttonContainer}>
        <SubmitButton onPress={handleSubmit} title="Log In"/>
        <SocialButtons onGooglePress={() => console.log('Google pressed')}
    onApplePress={() => console.log('Apple pressed')}
    toggleText="Don't have an account?"
    toggleAuth="Sign Up"
    onAuthPress={() => router.push('/registration')}/>
    </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
scrollContainer: { 
    flexGrow: 1 
},
  container: { 
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center', 
  padding: 24, 
  backgroundColor: '#F5F3FF' 
},
 formContainer: { 
    width: '100%', 
    gap: 8, 
    marginBottom: 16 
},
  formContainer: { 
    width: '100%', 
    gap: 8,  
  },
  inputGroup: { 
    width: '100%', 
    gap: 8, 
    marginBottom: 8 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '500', 
    color: '#374151' 
  },
   input: { 
    width: '100%', 
    height: 48, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    paddingHorizontal: 16, 
    fontSize: 16, 
    color: '#1F2937'
   },
  buttonContainer: { 
    width: '100%' 
  },
})