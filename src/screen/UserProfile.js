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

import axios from 'axios';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const [ProfileDetails, setProfileDetails] = useState('');
  const statevalue = useSelector(state => state);
  // console.log('statevalue from profile', statevalue.login.entities[0].user);
  // useEffect(() => {
  //   setProfileDetailTabelData s(statevalue);
  // }, []);

  const LogoutHandler = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to Logout?',
      [
        {
          text: 'Yes',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Login',
                },
              ],
            });
          },
        },
        {
          text: 'No',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Profile',
                },
              ],
            });
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View style={styles.iconHeader}>
            <IconHeader
              onPress={() => navigation.navigate('List')}
              name="angle-left"
              size={30}
              color="white"
            />
          </View>
          <Text style={styles.title1}>User Profile</Text>
        </View>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
            <Avatar.Image
              source={{
                uri: 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-366-456318-512.png',
              }}
              size={80}
            />

            <View
              style={{
                marginLeft: 20,
                fontSize: 15,
                fontWeight: '400',
                flexDirection: 'row',
              }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 25,
                    marginBottom: 35,
                  },
                ]}></Title>
              <View>
                <Text> </Text>
              </View>
              <View>
                <Text> </Text>
              </View>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 25,
                    marginBottom: 35,
                  },
                ]}></Title>
              <Caption style={styles.caption}></Caption>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              {/* <Feather name="user" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>Name</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {statevalue.login.entities[0].user.firstName
                  ? statevalue.login.entities[0].user.firstName
                  : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Icon name="phone" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>Mobile Number</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {statevalue.login.entities[0].user.contactNo
                  ? statevalue.login.entities[0].user.contactNo
                  : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Icon name="email" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>Email Id</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {statevalue.login.entities[0].user.emailId
                  ? statevalue.login.entities[0].user.emailId
                  : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Icon name="card-account-details" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>Adhar Number</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {statevalue.login.entities[0].user.adharNo
                  ? statevalue.login.entities[0].user.adharNo
                  : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Icon
                name="card-account-details-outline"
                color="#777777"
                size={20}
              /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>Pan Number</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {statevalue.login.entities[0].user.panNo
                  ? statevalue.login.entities[0].user.panNo
                  : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Icon name="check" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>Is approved</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {statevalue.login.entities[0].user.isApproved
                  ? statevalue.login.entities[0].user.isApproved
                  : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Icon name="bank" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>Bank Name</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {statevalue.login.entities[0].user.bankName
                  ? statevalue.login.entities[0].user.bankName
                  : ''}
              </Text>
            </View>
            <View style={styles.row}>
              {/* <Icon name="bank" color="#777777" size={20} /> */}
              <View style={styles.TextViewStyle}>
                <Text style={styles.TextStyle}>Bank Account Number</Text>
              </View>
              <Text
                style={{
                  color: '#777777',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {statevalue.login.entities[0].user.bankAcNo
                  ? statevalue.login.entities[0].user.bankAcNo
                  : ''}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => navigation.navigate('EditProfile')}>
            <View style={styles.menuItem}>
              <Icon name="pen" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => LogoutHandler()}>
            <View style={styles.menuItem}>
              <Icon name="logout" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Logout</Text>
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
