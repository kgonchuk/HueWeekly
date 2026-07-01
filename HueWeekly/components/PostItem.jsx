import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export function FeedCard({ post }) {
  const fallbackLetter = post.userName ? post.userName[0].toUpperCase() : '?';

  return (
    <View style={[styles.card, { borderColor: post.userColor }]}>
      <View style={styles.header}>
        {post.userAvatar ? (
          <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarFallbackText}>{fallbackLetter}</Text>
          </View>
        )}

        <View style={styles.headerTextContainer}>
          <View style={styles.nameBadgeRow}>
            <Text style={styles.userName} numberOfLines={1}>{post.userName}</Text>
            
            {/* Нативний аналог Badge */}
            <View style={[styles.badge, { backgroundColor: post.userColor }]}>
              <Text style={styles.badgeText}>Color of the day</Text>
            </View>
          </View>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
      </View>

      {/* ─── IMAGE ─── */}
      {post.image && (
        <View style={styles.imageWrapper}>
          <Image 
            source={{ uri: post.image }} 
            style={styles.postImage} 
            resizeMode="cover"
          />
        </View>
      )}

      {/* ─── ACTIONS (Кнопки лайків, коментарів) ─── */}
      <View style={styles.actionsBar}>
        
        {/* Лайк */}
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
          <Ionicons name="heart-outline" size={22} color="#4B5563" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>

        {/* Коментар */}
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
          <Ionicons name="chatbubble-outline" size={20} color="#4B5563" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        {/* Поділитись (Send) */}
        <TouchableOpacity style={[styles.actionButton, styles.shareButton]} activeOpacity={0.6}>
          <Feather name="send" size={20} color="#4B5563" />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 16, // rounded-2xl
    borderWidth: 2,  // border-2
    overflow: 'hidden',
    // Тіні для картки у стилі iOS/Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, // p-4
    gap: 12,     // gap-3
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // rounded-full
    backgroundColor: '#E5E7EB',
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  nameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap', // Захист від довгого імені користувача
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
  },
  badgeText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280', // text-gray-500
    marginTop: 2,
  },
  contentContainer: {
    paddingHorizontal: 16,
    pb: 12, // pb-3
    marginBottom: 12,
  },
  contentText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  imageWrapper: {
    width: '100%',
    height: 256,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24, 
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB', 
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  shareButton: {
    marginLeft: 'auto',
  },
});