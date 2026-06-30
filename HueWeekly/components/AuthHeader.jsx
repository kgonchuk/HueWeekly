import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; 
import { Sparkles } from 'lucide-react-native';

export const AuthHeader = ({ subtitle, showAiBlock = false }) => {
  return (
    <View style={styles.widthFull}>

      <View style={styles.absoluteContainer}>
        <LinearGradient colors={['rgba(216, 180, 254, 0.3)', 'rgba(249, 168, 212, 0.2)', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.aura, styles.topLeft]} />
        <LinearGradient colors={['rgba(41, 92, 149, 0.3)', 'rgba(103, 232, 249, 0.2)', 'transparent']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} style={[styles.aura, styles.bottomRight]} />
        <LinearGradient colors={['rgba(253, 186, 116, 0.2)', 'rgba(253, 224, 71, 0.2)', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.aura, styles.centerBlur]} />
      </View>

      <View style={styles.headerContainer}>
        <LinearGradient colors={['#A855F7', '#EC4899', '#F97316']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.logoBadge}>
          <Sparkles size={32} color="#FFFFFF" />
        </LinearGradient>
        <Text style={styles.title}>Color Week</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {showAiBlock && (
        <View style={styles.gradientBlock}>
          <Text style={styles.gradientText}>Every week, our AI generates your personal 7-day color palette</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  widthFull: { 
 width: '100%',
  alignItems: 'center' 
},
  absoluteContainer: {
  ...StyleSheet.absoluteFillObject, 
  overflow: 'hidden', 
  zIndex: -1 
},
  aura: {   
  position: 'absolute', 
  width: 384, 
  height: 384, 
  borderRadius: 192, 
  opacity: 0.5 
},
  topLeft: { 
  top: -160, 
  left: -160 
},
  bottomRight: { 
  bottom: -160, 
  right: -160 
},
  centerBlur: { 
  width: 320, 
  height: 320, 
  borderRadius: 160 
},
  headerContainer: { 
  alignItems: 'center', 
  marginBottom: 32, 
  marginTop: 40 
},
  logoBadge: { 
   width: 64, 
   height: 64, 
   borderRadius: 16, 
   alignItems: 'center', 
   justifyContent: 'center', 
   marginBottom: 16 
},
  title: { fontSize: 30, fontWeight: 'bold', color: '#A855F7', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#4B5563', textAlign: 'center' }, 
  gradientBlock: { marginBottom: 24, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(233, 213, 255, 0.5)', width: '100%' },
  gradientText: { textAlign: 'center', fontSize: 14, fontWeight: '500', color: '#BE185D' },
});