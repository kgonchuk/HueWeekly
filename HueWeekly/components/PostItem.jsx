import { Feather, Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { generateWeeklyColor } from "../helpers/colorGenerator";

export function PostItem({ post }) {
  const authorId = post.author?.id || post.author?._id || "guest";
  const postData = post.createdAt ? new Date(post.createdAt) : new Date();
  const authorWeeklyColor = generateWeeklyColor(authorId, postData);
  const fallbackLetter = post.author?.displayname ? post.author.displayname[0].toUpperCase() : '?';

  return (
    <View style={[styles.card, { borderColor: authorWeeklyColor }]}>
      <View style={styles.header}>
        {post.author?.avatarUrl ? (
          <Image 
            source={{ uri: post.author.avatarUrl }} 
            style={[styles.avatar, { borderColor: authorWeeklyColor, borderWidth: 2 }]} 
          />
        ) : (
          <View style={[styles.avatarFallback, { backgroundColor: authorWeeklyColor }]}>
            <Text style={styles.avatarFallbackText}>{fallbackLetter}</Text>
          </View>
        )}

        <View style={styles.headerTextContainer}>
          <View style={styles.nameBadgeRow}>
            <Text style={styles.userName} numberOfLines={1}>
              {post.author?.displayname || "Anonymous"}
            </Text>

            <View style={[styles.badge, { backgroundColor: authorWeeklyColor }]}>
              <Text style={styles.badgeText}>Color of the day</Text>
            </View>
          </View>
        </View>
      </View>

      <View >
         <Text style={styles.title} numberOfLines={2}>
          {post.title}
        </Text>
 
        {post.image && (
  <View style={styles.imageWrapper}>
    <Image 
      source={{ uri: post.image }} 
      style={styles.postImage} 
    />
  </View>
)}
       
      </View>

      {/* ─── ACTIONS ─── */}
      <View style={styles.actionsBar}>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
          <Ionicons name="heart-outline" size={22} color="#4B5563" />
          <Text style={styles.actionText}>{post.likes || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
          <Ionicons name="chatbubble-outline" size={20} color="#4B5563" />
          <Text style={styles.actionText}>{post.comments || 0}</Text>
        </TouchableOpacity>

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
    borderRadius: 16, 
    borderWidth: 1.5, 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginHorizontal: 16, 
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, 
    gap: 12,     
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    backgroundColor: '#E5E7EB',
    borderWidth: 2,
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  nameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    gap: 8,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    flex: 1, 
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 8, 
    marginBottom: 12,
    marginLeft: 16,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
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
  imageWrapper: {
    width: '100%',
    height: 256, 
    overflow: 'hidden', 
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
});