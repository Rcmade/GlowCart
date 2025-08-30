import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // adjust if using different icon lib
import {
  MenuItemsType,
  SupportItemsType,
} from '../../../../content/profileContent';

type Props = {
  items: (MenuItemsType | SupportItemsType)[];
  showSubtitle?: boolean;
};

const MenuItems: React.FC<Props> = ({ items, showSubtitle = true }) => {
  const renderMenuItem = (item: MenuItemsType | SupportItemsType) => (
    <TouchableOpacity
      key={item.title}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Icon name={item.icon} size={20} color="#4B4B4B" />
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          {showSubtitle && 'subtitle' in item ? (
            <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
          ) : null}
        </View>
      </View>
      <Icon name="chevron-forward" size={20} color="#4B4B4B" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.menuSection}>
      <FlatList
        data={items}
        keyExtractor={item => item.title}
        renderItem={({ item }) => renderMenuItem(item)}
        scrollEnabled={false}
      />
    </View>
  );
};

export default MenuItems;

const styles = StyleSheet.create({
  menuSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
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
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});
