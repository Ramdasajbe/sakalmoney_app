import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  Button,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {ActivityIndicator, DataTable} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconHeader from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
export const List = ({navigation}) => {
  const LoginData = useSelector(state => state);
  // console.log(LoginData.login.entities[0]);
  const [tabledata, settabledata] = useState([]);
  const [isVisible, setModalVisiblility] = useState(false);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    AgentLoanView();
  }, []);
  const AgentLoanView = async () => {
    setLoading(true);
    const agent_id = LoginData.login.entities[0].user._id;
    console.log('LoginData.login.entities', LoginData.login.entities);
    console.log(agent_id);
    await axios
      .post('https://sakalmoneyapp.foxberry.link/v1/loan/getagentloan', {
        agent_id,
      })
      .then(responce => {
        setLoading(false);
        console.log(responce.data);
        if (responce.data !== 'No data found') {
          settabledata(responce.data);
        }
      });
  };

  // console.log('TabelData', tabledata);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconHeader}>
            <IconHeader
              onPress={() => navigation.navigate('Profile')}
              name="user"
              size={30}
              color="black"
            />
            <Text>Profile</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              width: '35%',
              marginTop: 10,
              marginLeft: '10%',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Form');
              }}>
              <MaterialCommunityIcons
                name="account-plus"
                color={'#00618a'}
                size={35}
              />
              <Text>Add new</Text>
            </TouchableOpacity>
            {/* <Button
              onPress={() => {
                navigation.navigate('Form');
              }}
              title="add new"
            /> */}

            {/* // color="#00618a" */}
          </View>
        </View>
        {Loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={60} />
          </View>
        ) : (
          <View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.tablestyle}>
                  <Text style={styles.DataTableTitle}>Mobile</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={styles.DataTableTitle}>Bank Name</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={styles.DataTableTitle}>File Type</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={styles.DataTableTitle}>View</Text>
                </DataTable.Title>
              </DataTable.Header>
              {tabledata?.length != 'undefined' ? (
                tabledata?.map((option, index) => {
                  console.log('----option----', option);
                  return (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{option?.agentContactNo}</DataTable.Cell>
                      <DataTable.Cell>{option?.bankName}</DataTable.Cell>
                      <DataTable.Cell>{option?.fileType}</DataTable.Cell>
                      <DataTable.Cell>
                        <FontAwesome
                          onPress={async () => {
                            const valuedata = option;
                            // console.log(option);
                            await navigation.navigate(
                              'AgentLoanView',
                              valuedata,
                            );
                          }}
                          name="eye"
                          color={'green'}
                          size={30}
                        />
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })
              ) : (
                <DataTable.Row>
                  {/* <Text>No data found</Text> */}
                  <ActivityIndicator />
                </DataTable.Row>
              )}
            </DataTable>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  DataTableTitle: {
    // alignItems: 'center',

    alignItems: 'center',
    justifyContent: 'center',
    color: '#0265d2',
    fontSize: 15,
    fontWeight: '900',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  tablestyle: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },

  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  iconHeader: {
    marginLeft: '75%',
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  header: {
    backgroundColor: '#d0e5ff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  myModal: {
    width: 300,
    height: 300,

    backgroundColor: 'white',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    marginBottom: 50,
  },
});
