import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // or MaterialIcons depending on what you're using

type RatingCardProps = {
  rating: number;
  size?: number;
  color?: string;
};

const RatingCard: React.FC<RatingCardProps> = ({
  rating,
  size = 24,
  color = '#000000',
}) => {
  const renderStars = (ratingNum: number) => {
    const stars = [];
    const fullStars = Math.floor(ratingNum);
    const hasHalfStar = ratingNum % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={`full-${i}`} name="star" size={size} color={color} />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={size} color={color} />,
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <Icon
          key={`empty-${i}`}
          name="star-outline"
          size={size}
          color={color}
        />,
      );
    }

    return stars;
  };

  return <View style={styles.stars}>{renderStars(rating)}</View>;
};

export default RatingCard;

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  stars: {
    flexDirection: 'row',
    marginRight: 10,
  },
});
