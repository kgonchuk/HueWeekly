import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native"; 
import { LinearGradient } from 'expo-linear-gradient'; 
import { Sparkles } from 'lucide-react-native';
import { useState } from "react";
import Svg, { Path } from "react-native-svg";

export const LoginScreen = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    return (
       <View style={styles.container}>

          <View style={styles.absoluteContainer}>
              <LinearGradient
                  colors={['rgba(216, 180, 254, 0.3)', 'rgba(249, 168, 212, 0.2)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.aura, styles.topLeft]}
              />
              <LinearGradient
                  colors={['rgba(41, 92, 149, 0.3)', 'rgba(103, 232, 249, 0.2)', 'transparent']}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={[styles.aura, styles.bottomRight]}
              />
              <LinearGradient
                  colors={['rgba(253, 186, 116, 0.2)', 'rgba(253, 224, 71, 0.2)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.aura, styles.centerBlur]}
              />
          </View>

          <View style={styles.headerContainer}>
              <LinearGradient
                  colors={['#A855F7', '#EC4899', '#F97316']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.logoBadge}
              >
                  <Sparkles size={32} color="#FFFFFF" />
              </LinearGradient>

              <Text style={styles.title}>Color Week</Text>

              <Text style={styles.subtitle}>
                  {isSignUp ? 'Join the colorful community' : 'Welcome back!'}
              </Text>
          </View>

{isSignUp &&(
    <View style={styles.gradientBlock}>
        <Text style={styles.gradientText}>Every week, our AI generates your personal 7-day color palette</Text>
    </View>
)}
<View style={styles.formContainer}>
    {isSignUp && (
        <View>
            <Text style={styles.label}>Email Address</Text>
      
      <TextInput
      style={styles.input}
      placeholder="Enter your username"
      placeholderTextColor="#9CA3AF"
    //   value={username}
      onChangeText={(text) => setUsername(text)}
      autoCapitalize="none" 
    />
        </View>
    )}

    <View style={styles.inputGroup}>

  <Text style={styles.label}>Email</Text>


  <TextInput
    style={styles.input}
    placeholder="Enter your email"
    placeholderTextColor="#9CA3AF" 
    // value={email}
    // onChangeText={(text) => setEmail(text)}
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
    // value={password}
    // onChangeText={(text) => setPassword(text)}
    secureTextEntry={true}         
    autoCapitalize="none"         
    autoCorrect={false}            
    textContentType="password"     
  />
</View>

<View style={styles.buttonContainer}>
<TouchableOpacity 
      style={styles.googleButton}
      activeOpacity={0.7} 
      onPress={() => console.log('Google login pressed')}
    >
      <Svg style={styles.icon} viewBox="0 0 24 24">
        <Path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <Path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <Path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <Path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </Svg>
      <Text style={styles.buttonText}>Continue with Google</Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={styles.appleButton}
      activeOpacity={0.7} 
      onPress={() => console.log('Apple login pressed')}
    >
      <Svg style={styles.icon} viewBox="0 0 24 24">
        <Path 
          fill="#000000" 
          d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" 
        />
      </Svg>
      <Text style={styles.buttonText}>Continue with Apple</Text>
    </TouchableOpacity>
</View>

<View style={styles.toggleContainer}>
  <TouchableOpacity 
    activeOpacity={0.7} 
    onPress={() => setIsSignUp(!isSignUp)}
  >
    {isSignUp ? (
      <Text style={styles.toggleText}>
        Already have an account?{' '}
        <Text style={styles.toggleLink}>Log In</Text>
      </Text>
    ) : (
      <Text style={styles.toggleText}>
        Don't have an account?{' '}
        <Text style={styles.toggleLink}>Sign Up</Text>
      </Text>
    )}
  </TouchableOpacity>
</View>

<Text style={styles.disclaimerText}>
  By continuing, you agree to Color Week's{' '}
  <Text style={styles.disclaimerLink}>Terms of Service</Text> and{' '}
  <Text style={styles.disclaimerLink}>Privacy Policy</Text>
</Text>
</View>
       </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,                  
        alignItems: 'center',    
        justifyContent: 'center',  
        padding: 24,              
        backgroundColor: '#F5F3FF', 
    },
    absoluteContainer: {
        ...StyleSheet.absoluteFillObject, 
        overflow: 'hidden',
    },
    aura: {
        position: 'absolute',
        width: 384,          
        height: 384,         
        borderRadius: 192,   
        shadowOpacity: 0.1,
        shadowRadius: 50,
    },
    topLeft: {
        top: -160,           
        left: -160,          
    },
    bottomRight: {
        bottom: -160,       
        right: -160,        
    },
    centerBlur: {
        width: 320,          
        height: 320,         
        borderRadius: 160,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoBadge: {
        width: 64,
        height: 64,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#A855F7',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#4B5563',
        textAlign: 'center',
    },
    gradientBlock:{
        marginBottom: 24,        
    padding: 16,              
    borderRadius: 16,        
    borderWidth: 1,
    borderColor: 'rgba(233, 213, 255, 0.5)',
    },
    gradientText: {
    textAlign: 'center',       
    fontSize: 14,              
    fontWeight: '500',         
    color: '#BE185D',          
  },
  formContainer:{
    width: '100%',
    gap: 8, 
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500', 
    color: '#374151',  
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
    color: '#1F2937', 
  },
  inputGroup: {
    width: '100%',
    gap: 8,             
    marginBottom: 16,    
  },
  label: {
    fontSize: 14,
    fontWeight: '500',  
    color: '#374151',   
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
    color: '#1F2937',   
  },
  buttonContainer:{
    gap:3,
  },
  googleButton: {
    width: '100%',
    height: 48,                
    borderRadius: 12,            
    borderWidth: 1,
    borderColor: '#E5E7EB',       
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    flexDirection: 'row',        
    alignItems: 'center',        
    justifyContent: 'center',     
    marginBottom: 12,            
  },
  icon: {
    width: 20,                   
    height: 20,                  
    marginRight: 12,             
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',           
    color: '#374151',            
  },
  appleButton: {
    width: '100%',
    height: 48,                  
    borderRadius: 12,            
    borderWidth: 1,
    borderColor: '#E5E7EB',       
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    flexDirection: 'row',        
    alignItems: 'center',        
    justifyContent: 'center',     
    marginBottom: 16,            
  },
  icon: {
    width: 20,                  
    height: 20,                  
    marginRight: 12,            
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',           
    color: '#374151',            
  },
  toggleContainer: {
    marginTop: 24,            
    alignItems: 'center',     
  },
  toggleText: {
    fontSize: 14,            
    color: '#4B5563',        
    fontWeight: '500',        
    textAlign: 'center',
  },
  toggleLink: {
    color: '#A855F7',         
    fontWeight: '600',        
  },
  disclaimerText: {
    textAlign: 'center',       
    fontSize: 12,              
    color: '#6B7280',          
    marginTop: 24,            
    lineHeight: 16,            
  },
  disclaimerLink: {
    textDecorationLine: 'underline', 
    color: '#4B5563',          
  },
});