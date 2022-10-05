import React, {useState} from 'react';
import {
  Button,
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
const StatusWindow = () => {
  const [isVisible, setModalVisiblility] = useState(false);
  return (
    <View style={styles.centeredView1}>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.centeredView}>
          <View style={styles.myModal}>
            <Button
              style={styles.modalButton}
              title="Close"
              onPress={() => {
                setModalVisiblility(false);
              }}
            />
            <Image
              source={require('../assets/images/sakal-money-logo.png')}
              style={{
                // width: '90%',

                height: 100,
                width: '80%',

                resizeMode: 'contain',
                alignSelf: 'center',
                borderWidth: 1,
                borderRadius: 20,
              }}
              // resizeMode="stretch"
            />
            <Text style={styles.modalText}>Modal Window Testing!</Text>
          </View>
        </View>
      </Modal>
      <Button
        title="Click Me"
        onPress={() => {
          setModalVisiblility(true);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,

    alignItems: 'center',
    marginTop: 22,
  },
  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
export default StatusWindow;
