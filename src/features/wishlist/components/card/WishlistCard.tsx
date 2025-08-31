import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../../providers/theme/ThemeProvider';
import { ThemeType } from '../../../../providers/theme/themes';
import RatingCard from '../../../products/components/cards/RatingCard';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

type WishlistCardProps = {
  item: Product;
  onPress: (id: number) => void;
  onRemove: (id: number, title: string) => void;
  onAddToBag: (item: Product) => void;
};

const WishlistCard: React.FC<WishlistCardProps> = ({
  item,
  onPress,
  onRemove,
  onAddToBag,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.wishlistCard}>
      {/* Product Info */}
      <TouchableOpacity
        style={styles.productInfo}
        onPress={() => onPress(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>

          {/* Rating */}
          {item.rating && (
            <View style={styles.rating}>
              <RatingCard rating={item.rating.rate} size={14} />
              <Text style={styles.ratingText}>
                {item.rating.rate.toFixed(1)} ({item.rating.count})
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(item.id, item.title)}
        >
          <Icon name="trash-outline" size={18} color={theme.colors.error} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addToBagButton}
          onPress={() => onAddToBag(item)}
        >
          <Icon name="bag-outline" size={18} color={theme.colors.white} />
          <Text style={styles.addToBagText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistCard;
const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    wishlistCard: {
      backgroundColor: theme.colors.backgroundLight,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      flexDirection: 'row',
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    productInfo: {
      flex: 1,
      flexDirection: 'row',
    },
    productImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 15,
    },
    productDetails: {
      flex: 1,
      justifyContent: 'space-between',
    },
    productName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.darkGray,
      lineHeight: 20,
    },
    productPrice: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.accent,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      fontSize: 14,
      color: theme.colors.black,
      fontWeight: '500',
    },
    actions: {
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 10,
    },
    removeButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: theme.colors.backgroundOffWhite,
    },
    addToBagButton: {
      backgroundColor: theme.colors.accent,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      gap: 5,
    },
    addToBagText: {
      color: theme.colors.backgroundLight,
      fontSize: 12,
      fontWeight: '600',
    },
  });
