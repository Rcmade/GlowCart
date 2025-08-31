import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../components/loaders/Loading';
import { Product } from '../features/products/types';
import WishlistCard from '../features/wishlist/components/card/WishlistCard';
import useWishlist from '../features/wishlist/hooks/useWishlist';
import useWishlistProducts from '../features/wishlist/hooks/useWishlistProducts';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../providers/theme/ThemeProvider';
import { ThemeType } from '../providers/theme/themes';

type WishlistScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function WishlistScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<WishlistScreenNavigationProp>();
  const { toggle } = useWishlist();
  const {
    products: wishlistProducts,
    isLoading,
    isError,
  } = useWishlistProducts();

  const handleRemoveFromWishlist = (
    productId: number,
    productTitle: string,
  ) => {
    Alert.alert(
      'Remove from Wishlist',
      `Are you sure you want to remove "${productTitle}" from your wishlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => toggle(productId) },
      ],
    );
  };

  const handleAddToBag = (product: Product) => {
    Alert.alert('Added to Bag', `${product.title} has been added to your bag!`);
  };

  const renderWishlistItem = ({ item }: { item: Product }) => (
    <WishlistCard
      item={item}
      onRemove={handleRemoveFromWishlist}
      onAddToBag={() => handleAddToBag(item)}
      onPress={id =>
        navigation.navigate('ProductDetails', { id: id.toString() })
      }
    />
  );

  const renderEmptyWishlist = () => (
    <View style={styles.emptyContainer}>
      <Icon name="heart-outline" size={64} color={theme.colors.veryLightGray} />
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text>Failed to load wishlist</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
        <Text style={styles.itemCount}>
          {wishlistProducts.length}{' '}
          {wishlistProducts.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      <FlatList
        data={wishlistProducts}
        renderItem={renderWishlistItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyWishlist}
      />
    </SafeAreaView>
  );
}

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.backgroundWarm },

    header: {
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.textSecondary,
      marginBottom: 5,
    },
    itemCount: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    listContainer: {
      flexGrow: 1,
      padding: 20,
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
      color: theme.colors.textSecondary,
      marginTop: 20,
      marginBottom: 10,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 30,
    },

    shopNowButton: {
      backgroundColor: theme.colors.accent,
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 25,
    },
    shopNowText: {
      color: theme.colors.backgroundLight,
      fontSize: 16,
      fontWeight: '600',
    },
  });
