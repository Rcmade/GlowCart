import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductCard from '../features/products/components/cards/ProductCard';
import FilterDialog from '../features/products/components/dialog/FilterDialog';
import { useProductFilters } from '../features/products/hooks/useProductFilters';
import { useProducts } from '../features/products/hooks/useProducts';
import { Product } from '../features/products/types';
import useWishlist from '../features/wishlist/hooks/useWishlist';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  // const { products, loading, fetchProducts, toggleWishlist, wishlist } =
  //   useProductStore();

  const tabBarHeight = useBottomTabBarHeight();

  const onProductClick = (productId: string) => {
    navigation.navigate('ProductDetails', { id: productId });
  };

  // filter state manager
  const {
    filters,
    setSearch,
    setCategory,
    setTags,
    setSort,
    setLimit,
    appliedCount,
  } = useProductFilters({ limit: 20 });

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const { wishlist, toggle } = useWishlist();

  // main query hook
  const {
    products,
    fetchNextPage,
    hasNextPage,
    isLoading,
    refetch,
    isFetchingNextPage,
  } = useProducts({ filters, searchDebounceMs: 400 });

  const onRefresh = async () => {
    await refetch();
  };
  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onProductClick={() => onProductClick(item.id.toString())}
      toggleWishlist={toggle}
      // toggleWishlist={() => {}}
      wishlist={wishlist}
      // wishlist={[]}
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
                  value={filters.search}
                  onChangeText={setSearch}
                />
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.sectionHeaderContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Best Products</Text>
                <Text style={styles.productCount}>
                  {products.length} products
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setFilterModalVisible(true)}
                style={styles.filterButton}
              >
                <Text style={styles.filterText}>
                  Filters {appliedCount > 0 ? `(${appliedCount})` : ''}
                </Text>
                <MaterialDesignIcons name="menu-down" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={products}
              renderItem={renderProductCard}
              keyExtractor={item => item.id?.toString()}
              numColumns={2}
              contentContainerStyle={{ paddingBottom: tabBarHeight + 60 }}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) fetchNextPage();
              }}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={onRefresh}
                  tintColor="#B84953"
                  colors={['#B84953']}
                />
              }
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    {isLoading ? 'Loading products...' : 'No products found'}
                  </Text>
                </View>
              }
              ListFooterComponent={
                isFetchingNextPage ? (
                  <View>
                    <ActivityIndicator size="small" color="#B84953" />
                  </View>
                ) : null
              }
            />
          </View>

          {/* Filter modal */}
          <FilterDialog
            visible={isFilterModalVisible}
            initialFilters={filters}
            onClose={() => setFilterModalVisible(false)}
            onApply={({ category, tags, sort, limit }) => {
              // commit the selected filters
              setCategory(category);
              setTags(tags);
              setSort(sort);
              setLimit(limit);
              // close modal
              setFilterModalVisible(false);
            }}
          />
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

  filterSummary: {
    marginLeft: 8,
    backgroundColor: '#C4767C',
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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

  filterButton: {
    backgroundColor: '#fff',
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
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
