
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export const SubmitButton = ({ title, onPress }) => {
  return (
    <View style={styles.submitButtonWrapper}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <LinearGradient 
          colors={['#9333EA', '#DB2777', '#EA580C']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0 }} 
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
      <View style={styles.line} />
      <Text style={styles.separatorText}>OR CONTINUE WITH</Text>
      <View style={styles.line} />
    </View>
    </View>
  );
};
const styles=StyleSheet.create({
  submitButtonWrapper: { 
    width: '100%', 
    marginBottom: 12, 
    shadowColor: '#D8B4FE', 
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 15, 
    elevation: 6 
},
  submitButton: { 
    width: '100%', 
    height: 48, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center' 
},
  submitButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '600' 
},
separatorContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginVertical: 24,   
    gap: 16,              
    width: '100%',
  },
  line: {
    flex: 1,             
    height: 1,            
    backgroundColor: '#E5E7EB',
  },
  separatorText: {
    fontSize: 12,        
    color: '#6B7280',     
    fontWeight: '500',    
  },
})