import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

// 🌟 Градієнтний маркер для активного стану
function GradientIcon({ name, size, label, isFocused }) {
  if (!isFocused) {
    return (
      <View style={styles.tabContent}>
        <Ionicons name={name} size={size} color="#212121CC" />
        <Text style={[styles.tabLabel, { color: '#212121CC' }]}>{label}</Text>
      </View>
    );
  }

  return (
    <MaskedView
      style={styles.maskedContainer}
      maskElement = {
        <View style={styles.tabContentMask}>
          <Ionicons name={name} size={size} color="black" />
          <Text style={styles.tabLabelMask}>{label}</Text>
        </View>
      }
    >
      <LinearGradient
        colors={['#9333EA', '#DB2777', '#EA580C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
    </MaskedView>
  );
}

export function CustomBottomNav({ state, descriptors, navigation }) {
  // 🌟 СТРОГИЙ СПИСОК ТАБІВ: Тепер ми не залежимо від багів Expo Router
  const tabs = [
    { id: 'posts', label: 'Feed', activeIcon: 'grid', inactiveIcon: 'grid-outline' },
    { id: 'create', label: 'Post', activeIcon: 'add-circle', inactiveIcon: 'add-circle-outline' },
    { id: 'profile', label: 'Profile', activeIcon: 'person', inactiveIcon: 'person-outline' },
  ];

  // Поточний активний маршрут за індексом системи
  const currentRouteName = state.routes[state.index]?.name;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navContainer}>
        {tabs.map((tab) => {
          // Шукаємо, чи є взагалі такий маршрут у системі Expo Router
          const targetRoute = state.routes.find(r => r.name === tab.id);
          const isFocused = currentRouteName === tab.id;

          const onPress = () => {
            if (targetRoute) {
              const event = navigation.emit({
                type: 'tabPress',
                target: targetRoute.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(tab.id);
              }
            } else {
              // Якщо Expo Router ще не проініціалізував екран, пробуємо прямий перехід
              navigation.navigate(tab.id);
            }
          };

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={onPress}
              activeOpacity={0.7}
              style={styles.tabButton}
            >
              <GradientIcon
                name={isFocused ? tab.activeIcon : tab.inactiveIcon}
                size={24}
                label={tab.label}
                isFocused={isFocused}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  navContainer: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskedContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabContentMask: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: '100%',
    width: '100%',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabLabelMask: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
  },
});