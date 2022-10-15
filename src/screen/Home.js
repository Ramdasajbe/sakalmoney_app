// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// const Home = () => {
//   return (
//     <View>
//       <Text>Home</Text>
//       <View style={styles.bottamstayle}>
//         <MaterialIcons name="money" color={'red'} size={26} />
//       </View>
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   bottamstayle: {

//   },
// });
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.TabBarMainContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => {
            navigation.navigate('DashboardScreen');
          }}>
          <MaterialCommunityIcons
            name="monitor-dashboard"
            style={styles.iconStyle}
          />
          <Text style={styles.TextStyle}> Dashboard </Text>
        </TouchableOpacity>

        <View style={{height: 50, backgroundColor: '#fff', width: 2}} />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => {
            {
              navigation.navigate('List');
            }
          }}>
          <MaterialCommunityIcons
            name="clipboard-list-outline"
            style={styles.iconStyle}
          />
          <Text style={styles.TextStyle}> List </Text>
        </TouchableOpacity>

        <View style={{height: 50, backgroundColor: '#fff', width: 2}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TabBarMainContainer: {
    justifyContent: 'space-around',
    height: 50,

    flexDirection: 'row',
    width: '100%',
  },

  button: {
    flex: 1,
    marginTop: 500,
    height: 60,
    width: '45%',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#00BCD4',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  iconStyle: {
    color: 'white',
    fontSize: 30,
  },
});

export default Home;
