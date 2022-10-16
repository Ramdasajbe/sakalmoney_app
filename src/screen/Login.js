import React, {useState} from 'react';
import {LoginAction} from '../Redux/Action/LoginAction';

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
import {useDispatch} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {TextInput} from 'react-native-paper';
import {useEffect} from 'react';
import Snackbar from 'react-native-snackbar';
import {useSelector} from 'react-redux';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  //for mobile and password validation
  const [mobileError, setMobileError] = useState();
  const [passwordError, setPasswordError] = useState();
  // const statevalue = useSelector(state => state);
  // console.log('statevalue', statevalue);
  const handleSubmitPress = async () => {
    setLoading(true);
    setErrortext('');

    const mobilePattern = new RegExp(/^[0-9\b]+$/);
    if (!mobile) {
      setMobileError('Please Enter Mobile Number');
    } else if (mobile.length !== 10) {
      setMobileError('Invalid Mobile Number');
    } else if (!mobilePattern.test(mobile)) {
      setMobileError('Invalid mobile number');
    } else if (!password) {
      setMobileError('');
      setPasswordError('Please Enter Password');
    } else {
      setMobileError('');
      setPasswordError('');

      const user = {
        contact: mobile,
        password: password,
      };

      dispatch(LoginAction(user))
        .then(response => {
          console.log('----responce from login---', response.payload.data);
          if (response.status === 400) {
            setLoading(false);
            alert('Please enter correct credentials');
          } else if (response.payload.data) {
            setLoading(false);
            // console.log('--response in login page--', response.data);
            Snackbar.show({
              text: 'Login Successfully',
              duration: Snackbar.LENGTH_SHORT,
              textColor: 'white',
              backgroundColor: 'green',
            });

            navigation.reset({
              index: 0,
              routes: [{name: 'BottamStack'}],
            });
          }
        })
        .catch(error => {
          setLoading(false);
          Snackbar.show({
            text: 'Please enter correct credentials',
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          });
        });

      // await axios
      //   .post('http://43.204.38.56:4004/v1/user/login', user, {
      //     headers: {
      //       'Content-Type': 'application/json;charset=utf-8',
      //     },
      //   })
      //   .then(response => {
      //     if (response.status === 400) {
      //       setLoading(false);
      //       alert('Please enter correct credentials');
      //     } else if (response.status === 200) {
      //       setLoading(false);
      //       // console.log('--response in login page--', response.data);
      //       Snackbar.show({
      //         text: 'Login Successfully',
      //         duration: Snackbar.LENGTH_SHORT,
      //         textColor: 'white',
      //         backgroundColor: 'green',
      //       });

      //       navigation.reset({
      //         index: 0,
      //         routes: [{name: 'SideMenuStack'}],
      //       });
      //     }
      //   })
      //   .catch(error => {
      //     setLoading(false);
      //     Snackbar.show({
      //       text: 'Please enter correct credentials',
      //       duration: Snackbar.LENGTH_SHORT,
      //       textColor: 'white',
      //       backgroundColor: 'red',
      //     });
      //   });
    }
  };

  return (
    <>
      {/* {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={60} />
        </View>
      ) : ( */}
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <Image
            source={require('../assets/images/sakal-money-logo.png')}
            style={{
              // width: '90%',

              height: 100,

              marginBottom: 35,
              resizeMode: 'contain',
              alignSelf: 'center',
              borderWidth: 1,
              borderRadius: 20,
              marginTop: '15%',
            }}
            // resizeMode="stretch"
          />
          <Text
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              fontSize: 30,

              fontWeight: 'bold',
              color: '#180A0A',
              fontFamily: 'Montserrat-Light',
            }}>
            <Text>login</Text>
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
            />
          </View>
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {<Text>{mobileError}</Text>}
            </Text>
          </View>

          <View style={styles.cardOne}>
            <TextInput
              // style={{ borderColor: '#fff', color: '#180A0A' }}
              value={password}
              onChangeText={password => setPassword(password)}
              mode="outlined"
              label="Enter Password"
              //placeholder="Password"
              placeholderTextColor="#180A0A"
              returnKeyType="next"
              secureTextEntry={secureTextEntry}
              autoCompleteType="password"
              maxLength={10}
              theme={{
                colors: {primary: 'black', underlineColor: 'transparent'},
              }}
              right={
                <TextInput.Icon
                  name={() => <FontAwesome5 name="unlock-alt" size={20} />}
                  onPress={() => setsecureTextEntry(!secureTextEntry)}
                />
              }
            />
          </View>

          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {<Text>{passwordError}</Text>}
            </Text>
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={{
                textAlign: 'right',

                marginRight: 20,
                color: '#180A0A',
                fontSize: 17,
              }}>
              Forgot Password ?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => {
              handleSubmitPress();
            }}>
            <Text
              style={{
                margin: 10,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Login
            </Text>
          </TouchableOpacity>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '900'}}>OR</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegistrationOne');
            }}>
            <Text
              style={{
                margin: 10,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                color: '#063B7B',
              }}>
              Create New Accout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* ) */}
      {/* } */}
    </>
  );
};

export default Login;

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
    marginTop: 5,
    elevation: 0,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
  },

  carderror: {
    height: 'auto',
    marginLeft: 10,
    marginRight: 25,
    marginBottom: 10,
    paddingLeft: 10,
  },
  cardButton: {
    height: 'auto',
    width: '85%',
    elevation: 5,
    borderRadius: 25,
    marginTop: 15,
    backgroundColor: '#EAE86F',
    marginBottom: 10,
    marginLeft: 30,
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
