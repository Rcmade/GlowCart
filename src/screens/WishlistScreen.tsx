import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useProductStore, Product } from '../stores/useProductStore';
import { RootStackParamList } from '../navigation/AppNavigator';

type WishlistScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function WishlistScreen() {
  const navigation = useNavigation<WishlistScreenNavigationProp>();
  const { products, wishlist, toggleWishlist } = useProductStore();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filteredProducts = products.filter(product => 
      wishlist.includes(product.id)
    );
    setWishlistProducts(filteredProducts);
  }, [products, wishlist]);

  const handleRemoveFromWishlist = (productId: number, productTitle: string) => {
    Alert.alert(
      'Remove from Wishlist',
      `Are you sure you want to remove "${productTitle}" from your wishlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => toggleWishlist(productId) }
      ]
    );
  };

  const handleAddToBag = (product: Product) => {
    Alert.alert('Added to Bag', `${product.title} has been added to your bag!`);
  };

  const renderWishlistItem = ({ item }: { item: Product }) => (
    <View style={styles.wishlistItem}>
      <TouchableOpacity
        style={styles.productInfo}
        onPress={() => navigation.navigate('ProductDetails', { id: item.id.toString() })}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>★ {item.rating.rate.toFixed(1)}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFromWishlist(item.id, item.title)}
        >
          <Icon name="trash-outline" size={18} color="#E74C3C" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToBagButton}
          onPress={() => handleAddToBag(item)}
        >
          <Icon name="bag-outline" size={18} color="#FFF" />
          <Text style={styles.addToBagText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyWishlist = () => (
    <View style={styles.emptyContainer}>
      <Icon name="heart-outline" size={64} color="#E0E0E0" />
      <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Start adding products you love to see them here!
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
        <Text style={styles.itemCount}>
          {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      <FlatList
        data={wishlistProducts}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyWishlist}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2EF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    flexGrow: 1,
    padding: 20,
  },
  wishlistItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
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
    color: '#333',
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C4767C',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#FFD700',
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
    backgroundColor: '#FFEEE9',
  },
  addToBagButton: {
    backgroundColor: '#C4767C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  addToBagText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  shopNowButton: {
    backgroundColor: '#C4767C',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  shopNowText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});