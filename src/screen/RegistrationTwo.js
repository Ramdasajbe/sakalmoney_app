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
  Alert,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';

import {TextInput} from 'react-native-paper';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import IconHeader from 'react-native-vector-icons/FontAwesome';

const RegistrationTwo = ({navigation}) => {
  const [userDetails, setuserDetails] = useState({
    BankName: 'BankName',
    AccountNumber: 'AccountNumber',

    BranchName: 'BranchName',
    IFSCCode: 'IFSCCode',
  });

  const [BankNameError, setBankNameError] = useState('');
  const [AccountNumberError, setAccountNumberError] = useState('');

  const [IFSCCodeError, setIFSCCodeError] = useState('');
  const [BranchNameError, setBranchNameError] = useState('');

  //post form data
  //   const handleSubmitPress = async () => {
  //     const regForBranchName = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //     const regForBankNameAndAccountNumber = /^[A-Za-z]+$/;
  //     if (userDetails.BankName === '') {
  //       setBankNameError('Please enter first name');
  //     } else if (!regForBankNameAndAccountNumber.test(userDetails.BankName)) {
  //       setBankNameError('Invalid First Name');
  //     } else if (userDetails.AccountNumber === '') {
  //       setBankNameError('');
  //       setAccountNumberError('Please enter last name');
  //     } else if (
  //       !regForBankNameAndAccountNumber.test(userDetails.AccountNumber)
  //     ) {
  //       setBankNameError('');
  //       setAccountNumberError('Invalid Last Name');
  //     } else if (userDetails.BranchName === '') {
  //       setBankNameError('');
  //       setAccountNumberError('');
  //       setBranchNameError('Please enter BranchName Id');
  //     } else if (!regForBranchName.test(userDetails.BranchName)) {
  //       setBankNameError('');
  //       setAccountNumberError('');

  //       setBranchNameError('Invalid BranchName');
  //     } else if (userDetails.YearOfBirth === '') {
  //       setBankNameError('');
  //       setAccountNumberError('');

  //       setBranchNameError('');
  //     } else {
  //       setBankNameError('');
  //       setAccountNumberError('');

  //       setBranchNameError('');

  //       setLoading(true);
  //       let userData = JSON.parse(await AsyncStorage.getItem('userData'));
  //       if (userData) {
  //         const user = {
  //           BankName: userDetails.BankName,
  //           AccountNumber: userDetails.AccountNumber,
  //           BranchName: userDetails.BranchName,

  //           gender: userDetails.gender,
  //           blood_group: userDetails.blood_group,
  //           updatedBy: userDetails.updatedBy,
  //           policeStationUserId: userDetails.policeStationUserId,
  //           policeRole: userDetails.policeRole,
  //           contactNo: userDetails.contactNo,
  //         };
  //         console.log('-------user---------', user);
  //         await axios
  //           .put(
  //             'https://server.sps.foxberry.link/v1/policestationuser/updatepolicestationuser',
  //             user,
  //             {
  //               headers: {
  //                 //Header Defination
  //                 'Content-Type': 'application/json;charset=utf-8',
  //               },
  //             },
  //           )
  //           .then(response => {
  //             console.log('--------response-edit profile -------', response.data);
  //             // AsyncStorage.setItem('userData',response.data);
  //             setLoading(false);
  //             Snackbar.show({
  //               text: 'Profile Updated Successfully',
  //               duration: Snackbar.LENGTH_SHORT,
  //               textColor: 'white',
  //               backgroundColor: 'green',
  //             });
  //             navigation.reset({
  //               index: 1,
  //               routes: [{name: 'Profile'}],
  //             });
  //           })
  //           .catch(error => {});
  //       }
  //     }
  //   };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={{paddingTop: 0}}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.header}>
            <View style={styles.iconHeader}>
              <IconHeader
                onPress={() => navigation.goBack()}
                name="angle-left"
                size={30}
                color="white"
              />
            </View>
            {/* <Text style={styles.title1}>Registration</Text> */}
          </View>
          <View style={styles.title}>
            <Text style={styles.title1}>Registration Form</Text>
          </View>
          <View style={styles.cardOne}>
            <TextInput
              style={{borderColor: '#fff', color: '#fff'}}
              value={userDetails.BankName}
              onChangeText={BankName =>
                setuserDetails({...userDetails, BankName})
              }
              mode="outlined"
              label="Bank Name"
              placeholderTextColor="#180A0A"
              returnKeyType="next"
              theme={{
                colors: {primary: 'black', underlineColor: 'transparent'},
              }}
              left={
                <TextInput.Icon
                  name={() => <Feather name={'user'} size={20} />}
                />
              }
            />
          </View>
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {<Text>{BankNameError}</Text>}
            </Text>
          </View>

          <View style={styles.cardOne}>
            <TextInput
              style={{borderColor: '#fff', color: '#fff'}}
              placeholderTextColor="#180A0A"
              value={userDetails.AccountNumber}
              onChangeText={AccountNumber =>
                setuserDetails({...userDetails, AccountNumber})
              }
              mode="outlined"
              label="Account Number"
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              theme={{
                colors: {primary: 'black', underlineColor: 'transparent'},
              }}
              left={
                <TextInput.Icon
                  name={() => <Feather name={'user'} size={20} />}
                />
              }
            />
          </View>
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {AccountNumberError.length > 0 && (
                <Text>{AccountNumberError}</Text>
              )}
            </Text>
          </View>

          <View style={styles.cardOne}>
            <TextInput
              placeholderTextColor="#180A0A"
              value={userDetails.IFSCCode}
              onChangeText={IFSCCode =>
                setuserDetails({...userDetails, IFSCCode})
              }
              mode="outlined"
              label="IFSC Code"
              placeholder="Enter IFSC Code"
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType="next"
              theme={{
                colors: {primary: 'black', underlineColor: 'transparent'},
              }}
              left={
                <TextInput.Icon
                  name={() => (
                    <MaterialCommunityIcons
                      name={'email-edit-outline'}
                      size={20}
                    />
                  )}
                />
              }
            />
          </View>
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {IFSCCodeError.length > 0 && <Text>{IFSCCodeError}</Text>}
            </Text>
          </View>
          <View style={styles.cardOne}>
            <TextInput
              placeholderTextColor="#180A0A"
              value={userDetails.BranchName}
              onChangeText={BranchName =>
                setuserDetails({...userDetails, BranchName})
              }
              mode="outlined"
              label="Branch Name"
              placeholder="Enter Branch Name"
              keyboardType={'BranchName-address'}
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType="next"
              theme={{
                colors: {primary: 'black', underlineColor: 'transparent'},
              }}
              left={
                <TextInput.Icon
                  name={() => (
                    <MaterialCommunityIcons
                      name={'email-edit-outline'}
                      size={20}
                    />
                  )}
                />
              }
            />
          </View>
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {BranchNameError.length > 0 && <Text>{BranchNameError}</Text>}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => {
              navigation.navigate('RegistrationThree');
            }}>
            <Text
              style={{
                margin: 10,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Next
            </Text>
          </TouchableOpacity>
          <View style={{paddingTop: 40}}></View>
        </ScrollView>
      </View>
    </>
  );
};

export default RegistrationTwo;

const {height, width} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },

  header: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10,
  },

  cardOne: {
    height: 'auto',
    marginTop: 0,
    elevation: 0,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 0,
  },

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
    backgroundColor: '#7DC383',
    marginBottom: 10,
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
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'orange',
    marginVertical: 10,
    width: '80%',
    marginLeft: 30,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  textStyleGreen: {
    padding: 10,
    color: 'green',
  },
  textStyleWhite: {
    padding: 10,
    color: 'white',
  },
  buttonStyleGreen: {
    alignItems: 'center',
    backgroundColor: 'green',
    marginVertical: 10,
    width: '80%',
    marginLeft: 30,
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#2c2d3a',
    paddingVertical: 10,
    marginBottom: 20,
  },
  iconHeader: {
    marginLeft: 25,
    alignSelf: 'center',
    borderColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  title1: {
    color: 'black',
    fontWeight: '800',
    fontSize: 30,
    margin: 15,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
