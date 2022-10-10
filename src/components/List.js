import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import React from 'react';

import {useDispatch} from 'react-redux';

const List = ({navigation}) => {
  const disptach = useDispatch();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            width: '35%',
            marginTop: 20,
            marginLeft: '50%',
          }}>
          <Button
            onPress={() => {
              navigation.navigate('Form');
            }}
            title="add new"
            color="#00618a"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <View style={styles.container1}></View>
      </ScrollView>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  cardButtonUpload: {
    marginTop: 20,
    width: '30%',
    alignItems: 'center',
    padding: 10,
    height: 'auto',
    elevation: 5,
    borderRadius: 25,
    margin: 20,
    backgroundColor: '#00618a',
    marginBottom: 10,
    fontFamily: 'Montserrat-Thin',
  },
  container1: {
    paddingTop: 20,
    paddingHorizontal: 30,
  },
});
