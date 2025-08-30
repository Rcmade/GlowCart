import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useProductStore } from '../stores/useProductStore';
import { RootStackParamList } from '../navigation/AppNavigator';
import ProductCard from '../components/cards/ProductCard';
import { Product } from '../types';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { products, loading, fetchProducts, toggleWishlist, wishlist } =
    useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : products;

  const onProductClick = (productId: string) => {
    navigation.navigate('ProductDetails', { id: productId });
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onProductClick={() => onProductClick(item.id.toString())}
      toggleWishlist={toggleWishlist}
      wishlist={wishlist}
    />
  );

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView
          style={styles.container}
          edges={['left', 'right', 'bottom']}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>Viorra</Text>
              <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton}>
                  <Icon
                    name="notifications-outline"
                    size={24}
                    color="#4B4B4B"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Icon name="bag-outline" size={24} color="#4B4B4B" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Icon
                  name="search"
                  size={20}
                  color="#4B4B4B"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for all products"
                  placeholderTextColor={'#4B4B4B'}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.sectionHeaderContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Best Products</Text>
                <Text style={styles.productCount}>
                  {filteredProducts.length} products
                </Text>
              </View>

              <TouchableOpacity
                // onPress={handleLogin}
                style={styles.applyButton}
              >
                <Text style={styles.applyText}>Apply</Text>
                <MaterialDesignIcons name="menu-down" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={filteredProducts}
              renderItem={renderProductCard}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              contentContainerStyle={{ paddingBottom: tabBarHeight + 60 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#B84953"
                  colors={['#B84953']}
                />
              }
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    {loading ? 'Loading products...' : 'No products found'}
                  </Text>
                </View>
              }
            />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFEDE8' },

  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#FFF',
    gap: 6,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B84953',
    letterSpacing: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#8F8F8F',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },

  content: {
    paddingTop: 6,
    paddingHorizontal: 20,
    gap: 6,
    // paddingBottom:80,
  },

  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  productCount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#636363',
  },

  applyButton: {
    backgroundColor: '#fff',
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E8F',
    textAlign: 'center',
  },
});
