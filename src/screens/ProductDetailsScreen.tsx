import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../components/loaders/Loading';
import RatingCard from '../features/products/components/cards/RatingCard';
import useProductDetails from '../features/products/hooks/useProductDetails';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../providers/theme/ThemeProvider';
import { ThemeType } from '../providers/theme/themes';

type ProductDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;
type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetails'
>;

export default function ProductDetailsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<ProductDetailsScreenNavigationProp>();
  const route = useRoute<ProductDetailsScreenRouteProp>();
  const { id } = route.params;

  const { product, isLoading } = useProductDetails(id);

  const handleAddToBag = () => {
    Alert.alert(
      'Added to Bag',
      `${product?.title} has been added to your bag!`,
    );
  };

  if (isLoading) {
    return <Loading />;
  }
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={24}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.imageButtons}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={30} color={theme.colors.black} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButtons}>
              <Icon name="bag-outline" size={30} color={theme.colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.viewSimilarButton}>
              <Text style={styles.viewSimilarText}>View Similar</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="share-social-sharp"
                size={24}
                color={theme.colors.mediumDarkGray}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <View style={styles.ratingContainer}>
            <RatingCard rating={product.rating.rate} />
            <Text style={styles.ratingText}>
              {product.rating.rate.toFixed(1)}/5
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.soldBy}>
            Sold by : <Text style={styles.soldByText}>{product.brand}</Text>
          </Text>

          <View style={styles.priceCartContainer}>
            <View>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              {product.discountPercentage && (
                <Text style={styles.originalPrice}>
                  ${(product.price * 1.2).toFixed(2)}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.addToBagButton}
              onPress={handleAddToBag}
            >
              <Text style={styles.addToBagText}>Add to Bag</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.highlightsContainer}>
            <Text style={styles.sectionTitle}>Highlights</Text>

            <View style={styles.highlightGrid}>
              <View>
                <View style={styles.highlightItem}>
                  <Text style={styles.highlightLabel}>Width</Text>
                  <Text style={styles.highlightValue}>
                    {product?.dimensions?.width || 'N/A'}
                  </Text>
                </View>
                <View style={styles.highlightItem}>
                  <Text style={styles.highlightLabel}>Warranty</Text>
                  <Text style={styles.highlightValue}>
                    {product.warrantyInformation || '1 week'}
                  </Text>
                </View>
              </View>
              <View style={styles.verticalDivider} />
              <View>
                <View style={styles.highlightItem}>
                  <Text style={styles.highlightLabel}>Height</Text>
                  <Text style={styles.highlightValue}>
                    {product?.dimensions?.height || 'N/A'}
                  </Text>
                </View>

                <View style={styles.highlightItem}>
                  <Text style={styles.highlightLabel}>Shipping</Text>
                  <Text style={styles.highlightValue}>
                    {product.shippingInformation || 'In 3-5 business days'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.reviewsContainer}>
            <Text style={styles.sectionTitle}>Ratings & Reviews</Text>

            {(product?.reviews || []).map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Icon
                    name="person-outline"
                    size={40}
                    style={styles.reviewerImage}
                  />
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>
                      {review?.reviewerName || 'Unknown'}
                    </Text>
                    <Text style={styles.reviewerEmail}>
                      {review?.reviewerEmail || 'N/A'}
                    </Text>
                  </View>

                  <RatingCard rating={product.rating.rate} size={20} />
                </View>
                <Text style={styles.reviewText}>
                  {review?.comment || 'N/A'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundWarm,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    imageContainer: {
      backgroundColor: theme.colors.backgroundWarm2,
      borderRadius: 30,
      paddingVertical: 30,
      alignItems: 'center',
      position: 'relative',
    },
    header: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      width: '100%',
    },
    imageButtons: {
      backgroundColor: theme.colors.backgroundWarm,
      padding: 2,
      borderRadius: 12,
    },
    productImage: {
      width: '100%',
      height: 300,
      resizeMode: 'contain',
    },
    detailsContainer: {
      paddingVertical: 10,
      gap: 8,
    },
    actions: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    viewSimilarButton: {
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    viewSimilarText: {
      color: theme.colors.primary,
      fontSize: 12,
      fontWeight: '500',
    },
    productTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
    productDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      lineHeight: 20,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    ratingText: {
      fontSize: 18,
      color: theme.colors.textPrimary,
    },

    divider: {
      height: 1,
      backgroundColor: theme.colors.overlayDark38,
      marginVertical: 8,
    },

    soldBy: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },

    soldByText: {
      fontWeight: '500',
    },

    priceCartContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
    },

    price: {
      fontSize: 32,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginRight: 24,
    },
    originalPrice: {
      fontSize: 24,
      color: theme.colors.mediumGray2,
      textDecorationLine: 'line-through',
    },

    addToBagButton: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
    },
    addToBagText: {
      color: theme.colors.backgroundLight,
      fontSize: 24,
      fontWeight: '600',
    },

    highlightsContainer: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.textPrimary,
      marginBottom: 15,
    },
    highlightGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    verticalDivider: {
      borderRightColor: theme.colors.overlayDark19,
      borderRightWidth: 0.2,
    },
    highlightItem: {
      marginBottom: 8,
    },
    highlightLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },

    highlightValue: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },

    reviewsContainer: {
      marginBottom: 20,
    },
    reviewItem: {
      backgroundColor: theme.colors.backgroundLight,
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
    },
    reviewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    reviewerImage: {
      borderRadius: 20,
      marginRight: 12,
    },
    reviewerInfo: {
      flex: 1,
    },
    reviewerName: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },
    reviewerEmail: {
      fontSize: 10,
      color: theme.colors.textSecondary,
    },

    reviewText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
  });
