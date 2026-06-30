import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native"; 
import { LinearGradient } from 'expo-linear-gradient'; 
import { useState } from "react";
import Svg, { Path } from "react-native-svg";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/authOperation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { AuthHeader } from "../components/AuthHeader"; 
import {SubmitButton} from "../components/SubmitButton";
import {SocialButtons} from "../components/SocialButtons"

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [displayname, setDisplayname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!displayname || !email || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля!");
      return;
    }
    dispatch(register({ displayname, email, password }))
      .unwrap()
      .then(() => {
        Alert.alert("Успіх", "Реєстрація пройшла успішно!");
      })
      .catch((error) => {
        Alert.alert("Помилка", typeof error === "string" ? error : "Щось пішло не так");
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <AuthHeader subtitle="Join the colorful community" showAiBlock={true} />

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>User name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#9CA3AF"
              value={displayname}
              onChangeText={setDisplayname}
              autoCapitalize="none" 
            />
          </View>
          
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

          <View style={styles.buttonContainer}>
            <SubmitButton onPress={handleSubmit} title="Generate My Palette & Sign Up"/>
            <SocialButtons onGooglePress={() => console.log('Google pressed')}
    onApplePress={() => console.log('Apple pressed')}
    toggleText="Already have an account?"
    toggleAuth=" Log In"
  onAuthPress={() => router.push('/login')}
    />

    
              <Text style={styles.disclaimerText}>
                By continuing, you agree to Color Week's{' '}
                <Text style={styles.disclaimerLink} onPress={()=>console.log('Terms pressed')}>Terms of Service</Text>
                {' '}<Text style={styles.disclaimerLink}>Privacy Policy</Text>
              </Text>
          </View>
          
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
   disclaimerText: { 
    textAlign: 'center', 
    fontSize: 12, 
    color: '#6B7280',
    marginTop: 24, 
    lineHeight: 16 
},
  disclaimerLink: { 
    textDecorationLine: 'underline', 
    color: '#4B5563' 
},

  
});