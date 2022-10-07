import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Keyboard,
} from 'react-native';

import {TextInput} from 'react-native-paper';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import IconHeader from 'react-native-vector-icons/FontAwesome';
import {PickerImageSourceModal} from '../components/PickerImageSourceModal';

const RegistrationThree = ({navigation}) => {
  const [userDetails, setuserDetails] = useState({
    // PanCardNumber: PoliceData.PanCardNumber,
    // AdharCard: PoliceData.AdharCard,
    // gender: PoliceData.gender,
    // BranchName: PoliceData.BranchName,
  });

  const [PanCardNumberError, setPanCardNumberError] = useState('');
  const [AdharCardError, setAdharCardError] = useState('');

  const [CheckNumberError, setCheckNumberError] = useState('');
  const [BranchNameError, setBranchNameError] = useState('');
  const [PanCardImage, setPanCardImage] = useState(false);
  const [PanCardimageURI, SetPanCardimageURI] = useState('');
  const [AdharCardImage, setAdharCardImage] = useState(false);
  const [AdharimageURI, setAdharimageURI] = useState('');
  const [CheckImage, setCheckImage] = useState(false);
  const [CheckimageURI, setCheckimageURI] = useState('');
  const [loading, setLoading] = useState(false);
  //post form data
  //   const handleSubmitPress = async () => {
  //     const regForBranchName = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //     const regForPanCardNumberAndAdharCard = /^[A-Za-z]+$/;
  //     if (userDetails.PanCardNumber === '') {
  //       setPanCardNumberError('Please enter first name');
  //     } else if (!regForPanCardNumberAndAdharCard.test(userDetails.PanCardNumber)) {
  //       setPanCardNumberError('Invalid First Name');
  //     } else if (userDetails.AdharCard === '') {
  //       setPanCardNumberError('');
  //       setAdharCardError('Please enter last name');
  //     } else if (
  //       !regForPanCardNumberAndAdharCard.test(userDetails.AdharCard)
  //     ) {
  //       setPanCardNumberError('');
  //       setAdharCardError('Invalid Last Name');
  //     } else if (userDetails.BranchName === '') {
  //       setPanCardNumberError('');
  //       setAdharCardError('');
  //       setBranchNameError('Please enter BranchName Id');
  //     } else if (!regForBranchName.test(userDetails.BranchName)) {
  //       setPanCardNumberError('');
  //       setAdharCardError('');

  //       setBranchNameError('Invalid BranchName');
  //     } else if (userDetails.YearOfBirth === '') {
  //       setPanCardNumberError('');
  //       setAdharCardError('');

  //       setBranchNameError('');
  //     } else {
  //       setPanCardNumberError('');
  //       setAdharCardError('');

  //       setBranchNameError('');

  //       setLoading(true);
  //       let userData = JSON.parse(await AsyncStorage.getItem('userData'));
  //       if (userData) {
  //         const user = {
  //           PanCardNumber: userDetails.PanCardNumber,
  //           AdharCard: userDetails.AdharCard,
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
              value={userDetails.PanCardNumber}
              onChangeText={PanCardNumber =>
                setuserDetails({...userDetails, PanCardNumber})
              }
              mode="outlined"
              label="Pan Card Number"
              placeholderTextColor="#180A0A"
              returnKeyType="next"
              theme={{
                colors: {primary: 'black', underlineColor: 'transparent'},
              }}
              left={
                <TextInput.Icon
                  name={() => <IconHeader name={'credit-card'} size={20} />}
                />
              }
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setPanCardImage(!PanCardImage)}
              style={styles.cardButtonUpload}>
              <Text
                style={{
                  margin: 10,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Upload Pan Card
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {<Text>{PanCardNumberError}</Text>}
            </Text>
          </View>

          <View style={styles.cardOne}>
            <TextInput
              style={{borderColor: '#fff', color: '#fff'}}
              placeholderTextColor="#180A0A"
              value={userDetails.AdharCard}
              onChangeText={AdharCard =>
                setuserDetails({...userDetails, AdharCard})
              }
              mode="outlined"
              label="Adhar Card"
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              theme={{
                colors: {primary: 'black', underlineColor: 'transparent'},
              }}
              left={
                <TextInput.Icon
                  name={() => <IconHeader name={'vcard'} size={20} />}
                />
              }
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setAdharCardImage(!AdharCardImage)}
              style={styles.cardButtonUpload}>
              <Text
                style={{
                  margin: 10,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Upload Adhar Card
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {AdharCardError.length > 0 && <Text>{AdharCardError}</Text>}
            </Text>
          </View>

          <View style={styles.cardOne}>
            <TextInput
              placeholderTextColor="#180A0A"
              value={userDetails.CheckNumber}
              onChangeText={CheckNumber =>
                setuserDetails({...userDetails, CheckNumber})
              }
              mode="outlined"
              label="Cheque Number"
              placeholder="Enter Cheque Number"
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType="next"
              theme={{
                colors: {primary: 'black', underlineColor: 'transparent'},
              }}
              left={
                <TextInput.Icon
                  name={() => <IconHeader name={'credit-card-alt'} size={20} />}
                />
              }
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setCheckImage(!CheckImage)}
              style={styles.cardButtonUpload}>
              <Text
                style={{
                  margin: 10,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Upload Check
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.carderror}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
              {CheckNumberError.length > 0 && <Text>{CheckNumberError}</Text>}
            </Text>
          </View>

          <TouchableOpacity style={styles.cardButton}>
            <Text
              style={{
                margin: 10,
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
          <View style={{paddingTop: 40}}></View>
        </ScrollView>
        <PickerImageSourceModal
          source="adharCardImg"
          imageType="adharCardImage"
          show={PanCardImage}
          hide={() => setPanCardImage(!PanCardImage)}
          loading={_loadingState => {
            setLoading(_loadingState);
          }}
          setImage={returnImageUri => SetPanCardimageURI(returnImageUri)}
        />

        <PickerImageSourceModal
          source="adharCardImg"
          imageType="adharCardImage"
          show={AdharCardImage}
          hide={() => setAdharCardImage(!AdharCardImage)}
          loading={_loadingState => {
            setLoading(_loadingState);
          }}
          setImage={returnImageUri => setAdharimageURI(returnImageUri)}
        />

        <PickerImageSourceModal
          source="adharCardImg"
          imageType="adharCardImage"
          show={CheckImage}
          hide={() => setCheckImage(!CheckImage)}
          loading={_loadingState => {
            setLoading(_loadingState);
          }}
          setImage={returnImageUri => setCheckimageURI(returnImageUri)}
        />
      </View>
    </>
  );
};

export default RegistrationThree;

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
    marginBottom: 7,
    paddingLeft: 10,
  },
  cardButton: {
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
  cardButtonUpload: {
    height: 'auto',
    elevation: 5,
    borderRadius: 25,
    margin: 20,
    backgroundColor: '#F7EE78',
    marginBottom: 10,
    fontFamily: 'Montserrat-Thin',
  },
});
