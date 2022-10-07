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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PickerImageSourceModal} from '../components/PickerImageSourceModal';
const RegistrationOne = ({navigation}) => {
  //states for upload profile image

  const [userDetails, setuserDetails] = useState({
    // firstname: PoliceData.firstName,
    // lastName: PoliceData.lastName,
    // gender: PoliceData.gender,
    // emailId: PoliceData.emailId,
    // blood_group: PoliceData.blood_group,
    // rank: PoliceData.rank,
    // status: PoliceData.status,
    // unit: PoliceData.unit,
    // updatedBy: PoliceData.updatedBy,
    // policeStationUserId: PoliceData._id,
    // policeRole: PoliceData.policeRole,
  });

  const [firstnameError, setfirstnameError] = useState('');
  const [lastNameError, setlastNameError] = useState('');

  const [mobileNumberError, setmobileNumberError] = useState('');
  const [emailIdError, setemailIdError] = useState('');
  const [uploadImage, setUploadImage] = useState(false);
  const [imageURI, setImageURI] = useState('');
  const [loading, setLoading] = useState(false);

  //post form data
  const handleSubmitPress = async () => {
    const regForemailId = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const regForfirstnameAndlastName = /^[A-Za-z]+$/;
    if (userDetails.firstname === '') {
      setfirstnameError('Please enter first name');
    } else if (!regForfirstnameAndlastName.test(userDetails.firstname)) {
      setfirstnameError('Invalid First Name');
    } else if (userDetails.lastName === '') {
      setfirstnameError('');
      setlastNameError('Please enter last name');
    } else if (!regForfirstnameAndlastName.test(userDetails.lastName)) {
      setfirstnameError('');
      setlastNameError('Invalid Last Name');
    } else if (userDetails.emailId === '') {
      setfirstnameError('');
      setlastNameError('');
      setemailIdError('Please enter emailId Id');
    } else if (!regForemailId.test(userDetails.emailId)) {
      setfirstnameError('');
      setlastNameError('');

      setemailIdError('Invalid emailId');
    } else if (userDetails.YearOfBirth === '') {
      setfirstnameError('');
      setlastNameError('');

      setemailIdError('');
    } else {
      setfirstnameError('');
      setlastNameError('');

      setemailIdError('');

      setLoading(true);
      let userData = JSON.parse(await AsyncStorage.getItem('userData'));
      if (userData) {
        const user = {
          firstName: userDetails.firstname,
          lastName: userDetails.lastName,
          emailId: userDetails.emailId,

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

  if (loading) {
    return <ActivityIndicator />;
  }
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
              value={userDetails.firstname}
              onChangeText={first_name =>
                setuserDetails({...userDetails, first_name})
              }
              mode="outlined"
              label="First Name"
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
              {<Text>{firstnameError}</Text>}
            </Text>
          </View>

          <View style={styles.cardOne}>
            <TextInput
              style={{borderColor: '#fff', color: '#fff'}}
              placeholderTextColor="#180A0A"
              value={userDetails.lastName}
              onChangeText={lastName =>
                setuserDetails({...userDetails, lastName})
              }
              mode="outlined"
              label="lastName"
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
              {lastNameError.length > 0 && <Text>{lastNameError}</Text>}
            </Text>
          </View>

          <View style={styles.cardOne}>
            <TextInput
              placeholderTextColor="#180A0A"
              value={userDetails.mobileNumber}
              onChangeText={mobileNumber =>
                setuserDetails({...userDetails, mobileNumber})
              }
              mode="outlined"
              label="mobile Number"
              placeholder="Enter mobile Number"
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType="next"
              theme={{
                colors: {primary: 'black', underlineColor: 'transparent'},
              }}
              left={
                <TextInput.Icon
                  name={() => <IconHeader name={'mobile-phone'} size={25} />}
                />
              }
            />
          </View>
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {mobileNumberError.length > 0 && <Text>{mobileNumberError}</Text>}
            </Text>
          </View>
          <View style={styles.cardOne}>
            <TextInput
              placeholderTextColor="#180A0A"
              value={userDetails.emailId}
              onChangeText={emailId =>
                setuserDetails({...userDetails, emailId})
              }
              mode="outlined"
              label="emailId"
              placeholder="Enter emailId"
              keyboardType={'emailId-address'}
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
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {emailIdError.length > 0 && <Text>{emailIdError}</Text>}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setUploadImage(!uploadImage)}
              style={styles.cardButtonUpload}>
              <Text
                style={{
                  margin: 10,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Upload Profile Photo
              </Text>
            </TouchableOpacity>
          </View>
          <PickerImageSourceModal
            source="adharCardImg"
            imageType="adharCardImage"
            show={uploadImage}
            hide={() => setUploadImage(!uploadImage)}
            loading={_loadingState => {
              setLoading(_loadingState);
            }}
            setImage={returnImageUri => setImageURI(returnImageUri)}
          />
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
                color: 'white',
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

export default RegistrationOne;

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
    backgroundColor: '#063B7B',
    marginBottom: 10,
    fontFamily: 'Montserrat-Thin',
  },
  cardButtonUpload: {
    height: 'auto',
    elevation: 5,
    borderRadius: 25,
    margin: 20,
    backgroundColor: '#F7EE78',
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
