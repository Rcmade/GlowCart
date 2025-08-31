import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../../providers/theme/ThemeProvider';
import { ThemeType } from '../../../../providers/theme/themes';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
  toggleWishlist: (productId: number) => void;
  wishlist: number[];
}
const ProductCard = ({
  product,
  onProductClick,
  toggleWishlist,
  wishlist,
}: ProductCardProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => onProductClick(String(product.id))}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() => toggleWishlist(product.id)}
          >
            <Icon
              name={wishlist.includes(product.id) ? 'heart' : 'heart-outline'}
              size={24}
              color={
                wishlist.includes(product.id)
                  ? theme.colors.accent
                  : theme.colors.textDisabled
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    productCard: {
      flex: 0.48,
      backgroundColor: theme.colors.backgroundLight,
      borderRadius: 12,
      marginBottom: 15,
      marginHorizontal: '1%',
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      position: 'relative',
      justifyContent: 'space-between',
    },

    productImage: {
      width: '100%',
      height: 150,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      resizeMode: 'cover',
    },
    wishlistButton: {
      backgroundColor: theme.colors.backgroundLight,
      padding: 8,
      borderRadius: 20,
    },

    productInfo: {
      padding: 12,
    },
    productName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.darkGray,
      marginBottom: 5,
      lineHeight: 18,
    },

    productFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.accent,
    },
  });
