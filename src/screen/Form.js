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
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Picker} from '@react-native-picker/picker';
import {useRef} from 'react';
import {useSelector} from 'react-redux';
const Form = ({navigation}) => {
  const [filetype, setfiletype] = useState();
  const [bankvalue, setbankvalue] = useState('');
  const [branch, setbranch] = useState();
  const [LoanAcNumberError, setLoanAcNumberError] = useState('');
  const [CBSACNumberError, setCBSACNumberError] = useState('');
  const [SourceingdatePicker, setSourceingdatePicker] = useState(false);
  const [DisbercementatePicker, setDisbercementatePicker] = useState(false);
  // console.log('-----branch----', branch);
  const [Sourcing_DateError, setSourcing_DateError] = useState('');
  const [DateError, setDateError] = useState('');
  const [SanctionLoanAmountError, setSanctionLoanAmountError] = useState();
  const [Allbanklist, setAllbanklist] = useState();
  const [Allbranchlist, setAllbranchlist] = useState([]);
  const [loading, setloading] = useState();
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  //states for upload profile image
  const [Disbersment, setDisbersment] = useState(new Date());
  const [sourcing, setsourcing] = useState(new Date());
  const [bank_id, setbank_id] = useState();
  const [userDetails, setuserDetails] = useState({
    // Disbersment: '',
    // sourcing: '',
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
  const LoginData = useSelector(state => state);
  function showSorcingdatepicker() {
    setSourceingdatePicker(true);
  }

  function onDateSourcingSelected(event, value) {
    setSourceingdatePicker(false);
    setsourcing(value);
  }
  function showdatepicker() {
    setDisbercementatePicker(true);
  }

  function onDateSelected(event, value) {
    setDisbercementatePicker(false);
    setDisbersment(value);
  }

  useEffect(() => {
    getAllBank();
  }, []);
  useEffect(() => {
    if (bankvalue) {
      getAllBranch();
    }
  }, [bankvalue]);
  //post form data
  const getAllBank = async () => {
    await axios
      .get('http://43.204.38.56:4004/v1/bank/getbanklist')
      .then(responce => {
        // console.log('-----all bank----', responce.data);
        setAllbanklist(responce.data);
        setAllbranchlist('No data found');
      });
  };
  const getAllBranch = async () => {
    if (bank_id) {
      await axios
        .post('http://43.204.38.56:4004/v1/bankbranch/getbankbranchlist', {
          bank_id,
        })
        .then(response => {
          // Allbranchlist(response.data);
          setAllbranchlist(response.data);
          // console.log('--------response-branches-------', response.data);
        })
        .catch(error => {
          console.log('--------response-branches-error-------', error);
        });
    }
  };
  const agentInfo = LoginData.login.entities[0];
  console.log('agentInfo', agentInfo);
  const handleSubmitPress = async () => {
    const regForDate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const regForLoanAcNumber = /^[A-Za-z]+$/;
    if (userDetails.LoanAcNumber === '') {
      setLoanAcNumberError('Please enter Loan Account Numbr');
    } else if (!regForLoanAcNumber.test(userDetails.LoanAcNumber)) {
      setLoanAcNumberError('Invalid Loan Account Number');
    } else if (userDetails.CBSACNumber === '') {
      setLoanAcNumberError('');
      setCBSACNumberError('Please enter CBS Number');
    } else if (!regForLoanAcNumber.test(userDetails.CBSACNumber)) {
      setLoanAcNumberError('');
      setCBSACNumberError('Invalid CBS Number');
    } else {
      setLoanAcNumberError('');
      setCBSACNumberError('');

      const bankName = branch?.bankName;
      const barachName = branch?.barachName;
      const branch_id = branch?._id;
      const code = branch?.code;
      const fileType = filetype;
      const nameOfCustomer = 'test';
      const sourcingDate = sourcing.toDateString();
      const disbDate = Disbersment.toDateString();
      const sanctionedLoanAmt = userDetails?.SanctionLoanAmount;
      const CBSAcNo = userDetails?.CBSACNumber;
      const LOSId = userDetails.LoanAcNumber;
      const agent_id = agentInfo?._id;
      const agentName = agentInfo?.firstName;
      const agentContactNo = agentInfo?.contactNo;
      const agentId = agentInfo?.agentId;
      const user = {
        agent_id,
        agentName,
        agentContactNo,
        agentId,
        LOSId,
        bankName,
        barachName,
        branch_id,
        fileType,
        sourcingDate,
        disbDate,
        sanctionedLoanAmt,
        code,
        nameOfCustomer,
        CBSAcNo,
      };

      await axios
        .post('https://sakalmoneyapp.foxberry.link/v1/loan/addloan', user)
        .then(response => {
          if (response.status == 200) {
            setloading(false);
            console.log('----responce from add loan----', response.data);

            Snackbar.show({
              text: 'form submitted successfully',
              duration: Snackbar.LENGTH_SHORT,
              textColor: 'white',
              backgroundColor: 'green',
            });
            // navigation.navigate('List');
          }
        })
        .catch(error => {
          setloading(false);
          console.log('----responce from error in add loan---', error);
          Snackbar.show({
            text: 'Please enter correct credentials',
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          });
        });
    }
  };

  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
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

            <View style={styles.cardOne}>
              <View style={styles.title}>
                <Text style={styles.title1}>Form</Text>
              </View>
              <View style={styles.cardOne}>
                <Picker
                  onValueChange={itemValue => {
                    setbankvalue(itemValue), setbank_id(itemValue._id);
                  }}
                  selectedValue={bankvalue}>
                  <Picker.Item label="-Select Bank" value="0"></Picker.Item>
                  {Allbanklist &&
                    Allbanklist?.map(option => {
                      return (
                        <Picker.Item
                          label={option?.bankName}
                          key={option._id}
                          value={option}></Picker.Item>
                      );
                    })}
                </Picker>
              </View>

              <View style={styles.cardOne}>
                <Picker
                  selectedValue={branch}
                  onValueChange={itemValue => setbranch(itemValue)}>
                  <Picker.Item label="-Select Branch" value="0"></Picker.Item>
                  {Allbranchlist != 'No data found' &&
                    Allbranchlist?.map(option => {
                      return (
                        <Picker.Item
                          key={option?.bank_id}
                          label={option?.barachName}
                          value={option}></Picker.Item>
                      );
                    })}
                </Picker>
              </View>
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
                    name={() => (
                      <MaterialCommunityIcons name="account-lock" size={25} />
                    )}
                  />
                }
              />
            </View>
            <View style={styles.carderror}>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
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
                    name={() => (
                      <MaterialCommunityIcons name="account-lock" size={25} />
                    )}
                  />
                }
              />
            </View>
            <View style={styles.carderror}>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
                {CBSACNumberError.length > 0 && <Text>{CBSACNumberError}</Text>}
              </Text>
            </View>

            <View style={styles.cardOne}>
              <TextInput
                style={{borderColor: '#fff', color: '#fff'}}
                placeholderTextColor="#180A0A"
                value={userDetails.SanctionLoanAmount}
                onChangeText={SanctionLoanAmount =>
                  setuserDetails({...userDetails, SanctionLoanAmount})
                }
                mode="outlined"
                label="Enter Sanction Loan Amount "
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
                theme={{
                  colors: {primary: 'black', underlineColor: 'transparent'},
                }}
                left={
                  <TextInput.Icon
                    name={() => <IconHeader name="money" size={25} />}
                  />
                }
              />
            </View>
            <View style={styles.carderror}>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: '#ff0000'}}>
                <Text>{SanctionLoanAmountError}</Text>
              </Text>
            </View>
            <View style={styles.cardOne}>
              <Picker
                onValueChange={itemValue => setfiletype(itemValue)}
                selectedValue={filetype}>
                <Picker.Item label="-Select fileType-" value="0"></Picker.Item>
                <Picker.Item
                  label="RINNRAKSHA"
                  value="RINNRAKSHA"></Picker.Item>
                <Picker.Item label="TAKEOVER" value="TAKEOVER"></Picker.Item>
                <Picker.Item label="TOPUP" value="TOPUP"></Picker.Item>
                <Picker.Item label="NEW " value="NEW "></Picker.Item>
                <Picker.Item label="Resale " value="Resale"></Picker.Item>
              </Picker>
            </View>
            <View style={styles.cardOne}>
              <TextInput
                placeholderTextColor="#180A0A"
                value={sourcing.toDateString()}
                onChangeText={sourcing =>
                  setuserDetails({...userDetails, sourcing})
                }
                mode="outlined"
                label="sourcing Date"
                placeholder="Select sourcing Date"
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="next"
                theme={{
                  colors: {primary: 'black', underlineColor: 'transparent'},
                }}
                left={
                  <TextInput.Icon
                    name={() => <Fontisto name={'date'} size={20} />}
                  />
                }
              />
            </View>

            {SourceingdatePicker && (
              <DateTimePicker
                value={sourcing}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onDateSourcingSelected}
                style={StyleSheet.datepicker}
              />
            )}

            {!SourceingdatePicker && (
              <View style={{margin: 10}}>
                <Button
                  title="Select sourcing date"
                  // color="#F7EE78"
                  onPress={showSorcingdatepicker}
                />
              </View>
            )}

            <View style={styles.cardOne}>
              <TextInput
                placeholderTextColor="#180A0A"
                value={Disbersment.toDateString()}
                onChangeText={Disbersment =>
                  setuserDetails({...userDetails, Disbersment})
                }
                mode="outlined"
                label="Disbercement Date"
                placeholder="Select Disbercement Date"
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="next"
                theme={{
                  colors: {primary: 'black', underlineColor: 'transparent'},
                }}
                left={
                  <TextInput.Icon
                    name={() => <Fontisto name={'date'} size={20} />}
                  />
                }
              />
            </View>

            {DisbercementatePicker && (
              <DateTimePicker
                value={Disbersment}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onDateSelected}
                style={StyleSheet.datepicker}
              />
            )}

            {!DisbercementatePicker && (
              <View style={{margin: 10}}>
                <Button
                  title="Select disbercement date"
                  // color="#F7EE78"
                  onPress={showdatepicker}
                />
              </View>
            )}

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
            <View style={{paddingTop: 40}}></View>
          </ScrollView>
        </View>
      )}
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
    marginBottom: 1,
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
    color: 'black',
    fontWeight: '800',
    fontSize: 35,
    margin: 15,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  datepicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,

    display: 'flex',
  },
});
