import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // adjust if using different icon lib
import {
  MenuItemsType,
  SupportItemsType,
} from '../../../../content/profileContent';
import { useTheme } from '../../../../providers/theme/ThemeProvider';
import { ThemeType } from '../../../../providers/theme/themes';

type Props = {
  items: (MenuItemsType | SupportItemsType)[];
  showSubtitle?: boolean;
};

const MenuItems: React.FC<Props> = ({ items, showSubtitle = true }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const renderMenuItem = (item: MenuItemsType | SupportItemsType) => (
    <TouchableOpacity
      key={item.title}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Icon
            name={item.icon}
            size={20}
            color={theme.colors.mediumDarkGray}
          />
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          {showSubtitle && 'subtitle' in item ? (
            <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
          ) : null}
        </View>
      </View>
      <Icon
        name="chevron-forward"
        size={20}
        color={theme.colors.mediumDarkGray}
      />
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
const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    menuSection: {
      backgroundColor: theme.colors.backgroundLight,
      borderRadius: 16,
      marginBottom: 20,
      shadowColor: theme.colors.black,
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
      borderBottomColor: theme.colors.surfaceLight,
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
      backgroundColor: theme.colors.backgroundOffWhite,
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
      color: theme.colors.textSecondary,
      marginBottom: 2,
    },
    menuItemSubtitle: {
      fontSize: 12,
      color: theme.colors.mediumGray,
    },
  });
