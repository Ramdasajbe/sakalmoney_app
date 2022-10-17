import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}></View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginTop: 100,
    height: '75%',
    marginRight: 20,
    marginLeft: 20,

    // width: '100%',
    backgroundColor: '#d0e5ff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});
