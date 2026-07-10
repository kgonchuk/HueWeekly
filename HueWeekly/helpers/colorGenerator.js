import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';




// Generate a deterministic color based on user ID and date
export function generateWeeklyColor(userId, date) {
  // 1. Отримуємо рік та номер тижня (ISO-8601, де тиждень завжди починається з понеділка)
  const weekString = getYearAndWeekString(date); // Результат буде на кшталт "2026-W27"
  
  // 2. Створюємо унікальний seed для користувача на цей конкретний тиждень
  const seed = hashString(userId + weekString);
  
  // 3. Генеруємо HSL колір (твоя логіка залишається незмінною)
  const hue = seed % 360;
  const saturation = 65 + (seed % 20); // 65-85%
  const lightness = 50 + (seed % 15);  // 50-65%
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// 🌟 Допоміжна функція, яка вираховує номер тижня за стандартом ISO (понеділок — перший день)
function getYearAndWeekString(date) {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7; // Робимо так, щоб 0 був понеділком, а 6 — неділею
  
  // Встановлюємо дату на найближчий четвер поточного тижня
  target.setDate(target.getDate() - dayNr + 3);
  
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  
  // Вираховуємо кількість тижнів між першим четвергом року та поточним четвергом
  const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  const year = new Date(firstThursday).getFullYear();
  
  return `${year}-W${weekNumber}`;
}
// Simple hash function for strings
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

export function getWeekDates(centerDate = new Date()) {
  const dates = [];
  const today = new Date(centerDate);
  today.setHours(0, 0, 0, 0);
  
  for (let i = -3; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
}

export function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function formatDayOfWeek(date) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

// Format day number
export function formatDayNumber(date) {
  return date.getDate().toString();
}

export default function WeekDatesList({ onDatePress }) {
  const today = new Date();
  const weekDates = getWeekDates(today);

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {weekDates.map((date, index) => {
          const isToday = isSameDay(date, today);

          return (
            <TouchableOpacity 
              key={index} 
              style={[styles.dayColumn, isToday && styles.todayColumn]}
              activeOpacity={0.7}
              onPress={() => onDatePress?.(date)}
            >
              {/* Назва дня (напр., Mon) */}
              <Text style={[styles.dayOfWeek, isToday && styles.todayText]}>
                {formatDayOfWeek(date)}
              </Text>
              
              {/* Число місяця (напр., 30) */}
              <View style={[styles.dateCircle, isToday && styles.todayCircle]}>
                <Text style={[styles.dateNumber, isToday && styles.todayCircleText]}>
                  {date.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}


export function getColorArtisticName(hslString) {
  const matches = hslString.match(/\d+/);
  if (!matches) return "MYSTUS COLOR";
  
  const hue = parseInt(matches[0], 10);

  // 24 художні відтінки (кожні 15 градусів кола)
  if (hue >= 0 && hue < 15)     return "BURNT SIENNA";     // Насичений теракот
  if (hue >= 15 && hue < 30)    return "CHILI PEPPER";     // Вогняний червоно-помаранчевий
  if (hue >= 30 && hue < 45)    return "DESERT CORAL";     // Ніжний кораловий
  if (hue >= 45 && hue < 60)    return "AMBER GLOW";       // Янтарний
  if (hue >= 60 && hue < 75)    return "SAFFRON GOLD";     // Шафрановий жовтий
  if (hue >= 75 && hue < 90)    return "MATCHA LATTE";     // Світлий оливково-жовтий
  if (hue >= 90 && hue < 105)   return "LIME SHADOW";      // Яскравий лайм
  if (hue >= 105 && hue < 120)  return "PISTACHIO MIST";   // Ніжна фісташка
  if (hue >= 120 && hue < 135)  return "EMERALD CRUSH";    // Смарагдовий
  if (hue >= 135 && hue < 150)  return "FOREST WHISPER";   // Глибокий зелений
  if (hue >= 150 && hue < 165)  return "MINT FRESCO";      // Освіжаюча м'ята
  if (hue >= 165 && hue < 180)  return "SAGE GARDEN";      // Шавлієвий зелено-блакитний
  if (hue >= 180 && hue < 195)  return "CYAN BREEZE";      // Морська хвиля
  if (hue >= 195 && hue < 210)  return "GLACIER BLUE";     // Крижаний блакитний
  if (hue >= 210 && hue < 225)  return "CELESTIAL SKY";    // Небесна лазур
  if (hue >= 225 && hue < 240)  return "OCEAN DEPTHS";     // Глибокий синій
  if (hue >= 240 && hue < 255)  return "MIDNIGHT INDIGO";  // Нічний індиго
  if (hue >= 255 && hue < 270)  return "COSMIC IRIS";      // Насичений фіолетовий
  if (hue >= 270 && hue < 285)  return "AMETHYST GLOW";    // Аметистовий
  if (hue >= 285 && hue < 300)  return "WISTERIA BLOOM";   // Магічний бузковий
  if (hue >= 300 && hue < 315)  return "ORCHID FANTASY";   // Орхідея
  if (hue >= 315 && hue < 330)  return "MAGENTA VELVET";   // Оксамитова маджента
  if (hue >= 330 && hue < 345)  return "ROSE QUARTZ";      // Рожевий кварц
  return "CRIMSON HEART";                                  // Малиново-червоний (345-360)
}





const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  dayColumn: {
    alignItems: 'center',
    gap: 6,
    padding: 6,
    borderRadius: 12,
  },
  todayColumn: {
    backgroundColor: '#F3E8FF', 
  },
  dayOfWeek: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayCircle: {
    backgroundColor: '#9333EA',
  },
  dateNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  todayCircleText: {
    color: '#FFFFFF', 
  },
  todayText: {
    color: '#9333EA',
    fontWeight: '700',
  },
});