import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
