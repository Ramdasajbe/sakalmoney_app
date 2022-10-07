// import React, {useState} from 'react';

// import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

// import DateTimePicker from '@react-native-community/datetimepicker';

// export default function App() {
//   const [datePicker, setDatePicker] = useState(false);

//   const [date, setDate] = useState(new Date());

//   function showDatePicker() {
//     setDatePicker(true);
//   }

//   function onDateSelected(event, value) {
//     setDate(value);
//     setDatePicker(false);
//   }

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styleSheet.MainContainer}>
//         <Text style={styleSheet.text}>Date = {date.toDateString()}</Text>

//         {datePicker && (
//           <DateTimePicker
//             value={date}
//             mode={'date'}
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             is24Hour={true}
//             onChange={onDateSelected}
//             style={styleSheet.datePicker}
//           />
//         )}

//         {!datePicker && (
//           <View style={{margin: 10}}>
//             <Button
//               title="Show Date Picker"
//               color="green"
//               onPress={showDatePicker}
//             />
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styleSheet = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     padding: 6,
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },

//   text: {
//     fontSize: 25,
//     color: 'red',
//     padding: 3,
//     marginBottom: 10,
//     textAlign: 'center',
//   },

//   // Style for iOS ONLY...
//   datePicker: {
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     width: 320,
//     height: 260,
//     display: 'flex',
//   },
// });

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
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import IconHeader from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Form = ({navigation}) => {
  //states for upload profile image
  const [Disbersment, setDisbersment] = useState(new Date());
  const [userDetails, setuserDetails] = useState({
    // Date: Disbersment,
    // LoanAcNumber: PoliceData.LoanAcNumber,
    // CBSACNumber: PoliceData.CBSACNumber,
    // gender: PoliceData.gender,
    // Date: PoliceData.Date,
    // blood_group: PoliceData.blood_group,
    // rank: PoliceData.rank,
    // status: PoliceData.status,
    // unit: PoliceData.unit,
    // updatedBy: PoliceData.updatedBy,
    // policeStationUserId: PoliceData._id,
    // policeRole: PoliceData.policeRole,
  });

  const [datePicker, setDatePicker] = useState(false);

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDatePicker(false);
    setDisbersment(value);
  }
  const [LoanAcNumberError, setLoanAcNumberError] = useState('');
  const [CBSACNumberError, setCBSACNumberError] = useState('');

  const [Sourcing_DateError, setSourcing_DateError] = useState('');
  const [DateError, setDateError] = useState('');

  //post form data
  const handleSubmitPress = async () => {
    const regForDate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const regForLoanAcNumberAndCBSACNumber = /^[A-Za-z]+$/;
    if (userDetails.LoanAcNumber === '') {
      setLoanAcNumberError('Please enter first name');
    } else if (
      !regForLoanAcNumberAndCBSACNumber.test(userDetails.LoanAcNumber)
    ) {
      setLoanAcNumberError('Invalid First Name');
    } else if (userDetails.CBSACNumber === '') {
      setLoanAcNumberError('');
      setCBSACNumberError('Please enter last name');
    } else if (
      !regForLoanAcNumberAndCBSACNumber.test(userDetails.CBSACNumber)
    ) {
      setLoanAcNumberError('');
      setCBSACNumberError('Invalid Last Name');
    } else if (userDetails.Date === '') {
      setLoanAcNumberError('');
      setCBSACNumberError('');
      setDateError('Please enter Date Id');
    } else if (!regForDate.test(userDetails.Date)) {
      setLoanAcNumberError('');
      setCBSACNumberError('');

      setDateError('Invalid Date');
    } else if (userDetails.YearOfBirth === '') {
      setLoanAcNumberError('');
      setCBSACNumberError('');

      setDateError('');
    } else {
      setLoanAcNumberError('');
      setCBSACNumberError('');

      setDateError('');

      setLoading(true);
      let userData = JSON.parse(await AsyncStorage.getItem('userData'));
      if (userData) {
        const user = {
          LoanAcNumber: userDetails.LoanAcNumber,
          CBSACNumber: userDetails.CBSACNumber,
          Date: userDetails.Date,

          gender: userDetails.gender,
          blood_group: userDetails.blood_group,
          updatedBy: userDetails.updatedBy,
          policeStationUserId: userDetails.policeStationUserId,
          policeRole: userDetails.policeRole,
          contactNo: userDetails.contactNo,
        };
        console.log('-------user---------', user);
        await axios
          .put(
            'https://server.sps.foxberry.link/v1/policestationuser/updatepolicestationuser',
            user,
            {
              headers: {
                //Header Defination
                'Content-Type': 'application/json;charset=utf-8',
              },
            },
          )
          .then(response => {
            console.log('--------response-edit profile -------', response.data);
            // AsyncStorage.setItem('userData',response.data);
            setLoading(false);
            Snackbar.show({
              text: 'Profile Updated Successfully',
              duration: Snackbar.LENGTH_SHORT,
              textColor: 'white',
              backgroundColor: 'green',
            });
            navigation.reset({
              index: 1,
              routes: [{name: 'Profile'}],
            });
          })
          .catch(error => {});
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={{paddingTop: 0}}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.cardOne}>
            <TextInput
              style={{borderColor: '#fff', color: '#fff'}}
              value={userDetails.LoanAcNumber}
              onChangeText={LoanAcNumber =>
                setuserDetails({...userDetails, LoanAcNumber})
              }
              mode="outlined"
              label="Loan A.C. Number"
              placeholderTextColor="#180A0A"
              returnKeyType="next"
              theme={{
                colors: {primary: 'black', underlineColor: 'transparent'},
              }}
              left={
                <TextInput.Icon
                  name={() => <FontAwesome5 name="unlock-alt" size={20} />}
                />
              }
            />
          </View>
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {<Text>{LoanAcNumberError}</Text>}
            </Text>
          </View>

          <View style={styles.cardOne}>
            <TextInput
              style={{borderColor: '#fff', color: '#fff'}}
              placeholderTextColor="#180A0A"
              value={userDetails.CBSACNumber}
              onChangeText={CBSACNumber =>
                setuserDetails({...userDetails, CBSACNumber})
              }
              mode="outlined"
              label="CBS A.C. Number"
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
              {CBSACNumberError.length > 0 && <Text>{CBSACNumberError}</Text>}
            </Text>
          </View>

          <View style={styles.cardOne}>
            <TextInput
              placeholderTextColor="#180A0A"
              value={userDetails.Sourcing_Date}
              onChangeText={Sourcing_Date =>
                setuserDetails({...userDetails, Sourcing_Date})
              }
              mode="outlined"
              label="Sourceing Date"
              placeholder="select Sourceing Date"
              onSubmitEditing={Keyboard.dismiss}
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
          {/* {datePicker && (
            <DateTimePicker
              value={Disbersment}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onDateSelected}
              style={StyleSheet.datePicker}
            />
          )}

          {!datePicker && (
            <View style={{margin: 10}}>
              <Button
                title="Select disbersment date"
                color="green"
                onPress={showDatePicker}
              />
            </View>
          )} */}
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {Sourcing_DateError.length > 0 && (
                <Text>{Sourcing_DateError}</Text>
              )}
            </Text>
          </View>
          <View style={styles.cardOne}>
            <TextInput
              placeholderTextColor="#180A0A"
              value={Disbersment.toDateString()}
              onChangeText={Sourcing =>
                setuserDetails({...userDetails, Sourcing})
              }
              mode="outlined"
              label="Sourcing Date"
              placeholder="Select Sourcing Date"
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType="next"
              theme={{
                colors: {primary: 'black', underlineColor: 'transparent'},
              }}
              left={
                <TextInput.Icon
                  name={() => (
                    <MaterialCommunityIcons
                      name="email-edit-outline"
                      size={20}
                    />
                  )}
                />
              }
            />
          </View>

          {datePicker && (
            <DateTimePicker
              value={Disbersment}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onDateSelected}
              style={StyleSheet.datePicker}
            />
          )}

          {!datePicker && (
            <View style={{margin: 10}}>
              <Button
                title="Select disbersment date"
                color="green"
                onPress={showDatePicker}
              />
            </View>
          )}

          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {DateError.length > 0 && <Text>{DateError}</Text>}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.cardButton}
            // onPress={handleSubmitPress}
            onPress={() => {
              navigation.navigate('RegistrationTwo');
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

export default Form;

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
    marginBottom: 10,
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
    marginBottom: 0,
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
  genderStyle: {
    height: 'auto',
    marginTop: 5,
    elevation: 0,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
    borderWidth: 0.8,
    borderColor: 'gray',
    color: 'black',
  },
  bloodgroupStyle: {
    height: 'auto',
    marginTop: 5,
    elevation: 0,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
    borderWidth: 0.8,
    borderColor: 'gray',
    color: 'black',
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
  imageStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    margin: 5,
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
    color: 'white',
    fontWeight: '400',
    fontSize: 20,
    margin: 15,
  },

  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center',
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});
