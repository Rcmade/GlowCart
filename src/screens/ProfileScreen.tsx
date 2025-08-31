import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { menuItems, supportItems } from '../content/profileContent';
import MenuItems from '../features/auth/components/card/MenuItems';
import { useCurrentUser } from '../features/auth/hooks/useCurrentUser';

export default function ProfileScreen() {
  const { logout, currentUser } = useCurrentUser();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.ellipsisIcon}>
            <Icon name="ellipsis-horizontal" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>
                {currentUser?.name || 'N/A'}
              </Text>
              <Text style={styles.profileEmail}>
                {currentUser?.email || 'N/A'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="create-outline" size={26} color="#4B4B4B" />
          </TouchableOpacity>
        </View>

        <MenuItems items={menuItems} />
        <MenuItems items={supportItems} />
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <View style={styles.menuItemLeft}>
            <View style={[styles.iconContainer, styles.logoutIconContainer]}>
              <Icon name="log-out-outline" size={20} color="#E74C3C" />
            </View>
            <Text style={styles.logoutText}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDE8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#070707',
  },
  ellipsisIcon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 100,
  },
  profileSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    color: '#070707',
  },
  profileEmail: {
    fontSize: 14,
    color: '#070707',
  },
  editButton: {
    padding: 10,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  logoutButton: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutIconContainer: {
    backgroundColor: '#FFEEE9',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E74C3C',
  },
});
