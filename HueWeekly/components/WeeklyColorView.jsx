import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { getWeekDates, isSameDay, generateWeeklyColor, formatDayOfWeek, formatDayNumber } from "../helpers/colorGenerator"


export function WeeklyColorView({ userId }) {
  const today = new Date();
  const weekDates = getWeekDates(today);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your color this week</Text>
    
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {weekDates.map((date, index) => {
          const isToday = isSameDay(date, today);
        const color = generateWeeklyColor(userId, date);
          
          return (
            <View key={index} style={styles.dayColumn}>
              <Text style={styles.dayOfWeek}>
                {formatDayOfWeek(date)}
              </Text>
              
              <View
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  isToday && styles.todayCircle 
                ]}
              />
              
              <Text style={[styles.dayNumber, isToday && styles.todayText]}>
                {formatDayNumber(date)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16, 
    paddingVertical: 24,  
    backgroundColor: '#FFFFFF', 
  },
  title: {
    fontSize: 14,          
    color: '#4B5563',      
    marginBottom: 16,     
  },
  scrollContent: {
    flexDirection: 'row',
    gap: 8,                
    alignItems: 'center',
    paddingVertical: 4,   
  },
  dayColumn: {
    alignItems: 'center',
    gap: 8,               
    width: 56,             
  },
  dayOfWeek: {
    fontSize: 12,          
    color: '#6B7280',      
  },
  colorCircle: {
    width: 48,             
    height: 48,            
    borderRadius: 24,     
  },
  todayCircle: {
    borderWidth: 4,       
    borderColor: '#111827', 
    transform: [{ scale: 1.1 }], 

  },
  dayNumber: {
    fontSize: 14,         
    color: '#6B7280',      
  },
  todayText: {
    fontWeight: '600',    
    color: '#111827',    
  },
});