import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => onProductClick(String(product.id))}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() => toggleWishlist(product.id)}
      >
        <Icon
          name={wishlist.includes(product.id) ? 'heart' : 'heart-outline'}
          size={16}
          color={wishlist.includes(product.id) ? '#C4767C' : '#8E8E8F'}
        />
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    flex: 0.48,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    marginHorizontal: '1%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },

  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C4767C',
  },
});
