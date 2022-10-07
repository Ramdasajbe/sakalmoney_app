import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import {TextInput} from 'react-native-paper';

const ForgotPassword = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSubmitPress();
  }, []);

  //post form data
  const handleSubmitPress = async () => {
    //handle validation for mobile number
    const mobilePattern = new RegExp(/^[0-9\b]+$/);
    if (!mobile) {
      setMobileError('Please Enter Mobile Number');
    } else if (mobile.length != 10) {
      setMobileError('Invalid mobile number');
    } else if (!mobilePattern.test(mobile)) {
      setMobileError('Invalid mobile number');
    } else {
      setMobileError('');
      setLoading(true);
      const user = {
        mobile: mobile,
      };
      await axios
        .post(
          'https://server.sps.foxberry.link/v1/user/forgot-password',
          user,
          {
            headers: {
              //Header Defination
              'Content-Type': 'application/json;charset=utf-8',
            },
          },
        )
        .then(response => {
          setLoading(false);
          if (response.data.success === '404') {
            Snackbar.show({
              text: 'Oops!! Mobile number not registered...',
              duration: Snackbar.LENGTH_SHORT,
              textColor: 'white',
              backgroundColor: 'green',
            });
            // alert("Wrong mobile number")
          } else if (response.status === 200) {
            Snackbar.show({
              text: 'Password is sent to your Registered Mobile Number',
              duration: Snackbar.LENGTH_SHORT,
              textColor: 'white',
              backgroundColor: 'green',
            });
            navigation.navigate('Login');
            // alert("Password is sent to your Registered Mobile Number");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const backArrowPress = () => {
    navigation.reset({
      index: 1,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <ScrollView
            style={{paddingTop: 20}}
            keyboardShouldPersistTaps={'handled'}>
            <TouchableOpacity
              style={{padding: 20, backgroundColor: 'white'}}
              onPress={backArrowPress}>
              <FontAwesome name="arrow-left" size={14} color={'black'} />
            </TouchableOpacity>
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 30,
                marginVertical: 50,
                //fontWeight: 'bold',
                color: '#180A0A',
                fontFamily: 'Montserrat-Light',
              }}>
              Forgot Password ?
            </Text>
            {/* <Text style={styles.label}>Mobile No.</Text> */}
            <View style={styles.cardOne}>
              <TextInput
                style={{borderColor: '#fff', color: '#fff'}}
                value={mobile}
                onChangeText={mobile => setMobile(mobile)}
                mode="outlined"
                label="Enter Mobile No."
                //placeholder="Mobile No."
                placeholderTextColor="#180A0A"
                returnKeyType="next"
                keyboardType={'number-pad'}
                maxLength={10}
                theme={{
                  colors: {primary: 'black', underlineColor: 'transparent'},
                }}
                left={<TextInput.Icon name="phone" />}
              />
            </View>
            <View style={styles.carderror}>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
                {<Text>{mobileError}</Text>}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={handleSubmitPress}>
              <Text
                style={{
                  margin: 10,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default ForgotPassword;

const {height, width} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  label: {
    marginLeft: 25,
    color: '#fff',
    marginTop: 0,
    fontSize: 20,
  },
  header: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  card: {
    height: 'auto',
    elevation: 0,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
  },
  cardOne: {
    height: 'auto',
    marginTop: 20,
    elevation: 0,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
  },
  // cardOne: {
  //   height: 'auto',
  //   borderWidth: 1,
  //   borderColor: '#180A0A',
  //   marginTop: 10,
  //   borderRadius: 15,
  //   marginLeft: 25,
  //   marginRight: 25,
  //   marginBottom: 10,
  //   paddingLeft: 10,
  // },
  carderror: {
    height: 'auto',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    paddingLeft: 10,
  },
  cardButton: {
    height: 'auto',
    elevation: 5,
    borderRadius: 25,
    margin: 20,
    backgroundColor: '#ff8c14',
    marginBottom: 10,
    fontFamily: 'Montserrat-Thin',
  },
  cardButtonone: {
    height: 'auto',
    elevation: 5,
    borderRadius: 25,
    margin: 10,
    backgroundColor: '#00618a',
    marginBottom: 5,
    fontFamily: 'Montserrat-Thin',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  icon: {
    position: 'absolute',
    top: 25,
    right: 10,
    color: '#413F42',
    fontSize: 20,
  },
});
