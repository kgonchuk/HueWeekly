import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { WeeklyColorView } from '../components/WeeklyColorView'; 

export const PostScreen = () => {
  const userId = useSelector((state) => state.auth?.userId) || "guest_user";
  const [posts, setPosts] = useState([
    { id: '1', title: 'Мій перший кольоровий пост', location: 'Київ, Україна', likes: 12 },
    { id: '2', title: 'Прогулянка в парку', location: 'Львів, Україна', likes: 24 },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          
          ListHeaderComponent={() => (
            <View style={styles.headerComponentWrapper}>
              <WeeklyColorView userId={userId} />
              <Text style={styles.sectionTitle}>Recent Stories</Text>
            </View>
          )}

          // Рендеринг кожного окремого поста
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <View style={styles.postFooter}>
                <Text style={styles.postLocation}>📍 {item.location}</Text>
                <Text style={styles.postLikes}>❤️ {item.likes}</Text>
              </View>
            </View>
          )}

          // Якщо постів немає взагалі
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No posts yet. Share your first color day!</Text>
            </View>
          )}
          
          contentContainerStyle={styles.listContent}
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Легкий сірий фон для всього екрану
  },
  headerComponentWrapper: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    // Тіні для картки поста
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postLocation: {
    fontSize: 13,
    color: '#6B7280',
  },
  postLikes: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});