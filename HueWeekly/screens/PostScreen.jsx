import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { WeeklyColorView } from '../components/WeeklyColorView'; 
import { selectAllPosts } from '../redux/post/postSelector';
import { fetchPosts } from '../redux/post/postOperation';

export const PostScreen = () => {
   const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const baseUrl= "http://192.168.0.108:5001";
 const avatarUrl = user.avatarUrl
   const token = useSelector((state) => state.auth.accessToken);
  const allPosts = useSelector(selectAllPosts)

  useEffect(()=>{
    dispatch(fetchPosts(token))// Тут можна додати логіку для завантаження постів, якщо потрібно
  }, [dispatch, token])

  return (
   
console.log("=== Всі пости ===", allPosts),
console.log("=== Аватар користувача ===", avatarUrl),
    <View style={styles.container}>
      <FlatList
  data={allPosts}
  keyExtractor={(item) => item._id}
  contentContainerStyle={{ paddingBottom: 20 }} 
  
  ListHeaderComponent={
    <View style={styles.headerContainer}>
      <View style={styles.userContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.userPhoto} />
        <View>
          <Text style={styles.userName}>{user.displayname}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
    </View>
  }

 renderItem={({ item }) => {
    return (
      <>
        <PostItem post={item} />
      </>
    );
  }}
/>

    </View>
  );
};

const styles = StyleSheet.create({
     headerContainer: {
    marginBottom: 32,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
   userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    fontSize: 13,
    fontWeight: 700,
  },
  userEmail: {
    fontSize: 11,
    fontWeight: 400,
  },
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