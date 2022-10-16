import {StyleSheet, Text, View, Button, Alert} from 'react-native';

import React from 'react';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import IconHeader from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {SingalLoanViewAction} from '../Redux/Action/SingalLoanViewAction';
const Profile = ({route, navigation}) => {
  const LoginData = useSelector(state => state);
  const [loanViewData, setloanViewData] = useState();
  const valuedata = route.params;

  // console.log(' valuedata._id', valuedata._id);
  const SingalLoanView = async () => {
    await axios
      .post('https://sakalmoneyapp.foxberry.link/v1/loan/getsingleloan', {
        agentLoan_id: valuedata._id,
      })
      .then(res => {
        // console.log('API Response', res.data);
        setloanViewData(res.data);
      })
      .catch(err => {
        console.log('---error in SingalLoanView', err);
      });
  };
  const SingalLoandelete = async () => {
    const loan_id = valuedata._id;
    const updatedBy = LoginData.login.entities[0].user._id;

    await axios
      .put('https://sakalmoneyapp.foxberry.link/v1/loan/getagentloan', {
        loan_id,
        updatedBy,
      })
      .then(res => {
        console.log('----responce from delete agent loan view', res.data);
      })
      .catch(err => {
        console.log('----error from delete agent loan view', err);
      });
  };

  useEffect(() => {
    SingalLoanView();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View style={styles.iconHeader}>
            <IconHeader
              onPress={() => navigation.goBack()}
              name="angle-left"
              size={30}
              color="white"
            />
          </View>
          <Text style={styles.title1}>Loan View</Text>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              {/* <Icon name="bank" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>sanctionedLoanAmt</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {loanViewData?.sanctionedLoanAmt
                  ? loanViewData?.sanctionedLoanAmt
                  : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Icon name="bank" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>nameOfCustomer</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {loanViewData?.nameOfCustomer
                  ? loanViewData?.nameOfCustomer
                  : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Feather name="user" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>CBSAcNo</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {loanViewData?.CBSAcNo ? loanViewData?.CBSAcNo : ''}
              </Text>
            </View>

            <View style={styles.row}>
              {/* <Icon name="check" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>LOSId</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {loanViewData?.LOSId ? loanViewData?.LOSId : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Icon name="bank" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>bankName</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {loanViewData?.bankName ? loanViewData?.bankName : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Icon name="bank" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>barachName</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {loanViewData?.barachName ? loanViewData?.barachName : ''}
              </Text>
            </View>

            <View style={styles.row}>
              {/* <Icon name="bank" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>disbDate</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {loanViewData?.disbDate ? loanViewData?.disbDate : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Icon name="bank" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>sourcingDate</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {loanViewData?.sourcingDate ? loanViewData?.sourcingDate : ''}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => SingalLoandelete()}>
            <View style={styles.menuItem}>
              <Icon name="pen" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Delete Loan</Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  appVersion: {
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 5,
  },
  userInfoSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontSize: 15,
    fontWeight: '400',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  title1: {
    color: 'white',
    fontWeight: '400',
    fontSize: 20,
    margin: 15,
    width: '100%',
  },
  iconHeader: {
    marginLeft: 25,
    alignSelf: 'center',
    borderColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#2c2d3a',
    paddingVertical: 10,
  },
  TextStyle: {
    fontSize: 17,
    fontWeight: '600',
  },
  TextViewStyle: {
    width: '35%',
  },
});
