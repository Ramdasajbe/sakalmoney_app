import axios from 'axios';
import React, {Component} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modal} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncWriter from '../../utils/AsyncWriter';
import {useUser} from '../hooks/useUser';
import ImagePicker from 'react-native-image-crop-picker';
import {API} from '../../api/api';
import {userAccessApi} from '../../api/userAccessApi';
import {RNS3} from 'react-native-aws3';

export class PickerImageSourceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showPickerSourceModal: false,
    };
  }

  /**
   * Handles when image picker source selector is closed
   * @param {String} type - 'library', 'camera', 'none'
   */
  handlePickerHide = type => {
    this.props.hide();
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    switch (type) {
      case 'none':
        // Do nothing, the modal is closed
        break;
      case 'library':
        this.props.loading(true);
        launchImageLibrary(options, this.handleImagePickerResponse);
        break;
      case 'camera':
        this.props.loading(true);
        launchCamera(options, this.handleImagePickerResponse);
        break;
      default:
        break;
    }
  };

  handleImagePickerResponse = response => {
    console.log('Handle Image Picker Response', response);
    if (response.didCancel) {
      // alert('cancel');
      this.props.loading(false);
      return;
    } else if (response.error) {
    } else if (response.customButton) {
    } else {
      if (response.assets[0] != undefined) {
        if (this.props.setImage) {
          this.props.setImage(response.assets[0].uri);
        }
      }
    }
    if (response.assets[0] != undefined) {
      ImagePicker.openCropper({
        path: response.assets[0].uri,
        width: 300,
        height: 300,
        compressImageQuality: 0.9,
      }).then(image => {
        console.log(response.assets[0].uri);
        console.log(image.path);
        if (this.props.source === 'collegeIdImg') {
          this.handleRNS3ImageUpload(
            response.assets[0].uri,
            response.assets[0].fileName,
            response.assets[0].type,
          );
        } else if (this.props.source === 'adharCardImg') {
          this.handleRNS3ImageUpload2(
            response.assets[0].uri,
            response.assets[0].fileName,
            response.assets[0].type,
          );
        } else {
          this.handleUploadPhoto(image.path);
        }
      });
      // Show Image Crop Window
      // this.handleUploadPhoto(response.assets[0]);
    }
  };

  handleRNS3ImageUpload2 = (uri, fileName, type) => {
    console.log('MY Upload Photo ', uri, fileName, type);
    RNS3.put(
      {
        // `uri` can also be a file system path (i.e. file://)
        uri: uri,
        name: fileName,
        type: type,
      },
      {
        keyPrefix: 'dsp_',
        bucket: 'sps-project-bucket', // Ex. aboutreact
        region: 'ap-south-1', // Ex. ap-south-1
        accessKey: 'AKIA4ZK4J634CFVWSMOM',
        // Ex. AKIH73GS7S7C53M46OQ
        secretKey: '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',
        // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
        successActionStatus: 201,
        contentType: type,
      },
    )
      .then(async response => {
        console.log('---------after upload----------', response);
        if (response.status !== 201) alert('Failed to upload image to S3');
        if (response.status == 201) {
          await AsyncWriter.writeData('adharCardImg', {
            adharCardImg: true,
            imgLink: response.body.postResponse.location,
          });
          this.props.setImage(response.body.postResponse.location);
          this.props.loading(false);
          alert('Image uploaded Successfully');
        }
        console.log(response.body.postResponse.location);
      })
      .catch(err => {
        Alert.alert('Error', 'Error Please Try Again !');
      });
  };
  handleRNS3ImageUpload = (uri, fileName, type) => {
    console.log('MY Upload Photo ', uri, fileName, type);
    RNS3.put(
      {
        // `uri` can also be a file system path (i.e. file://)
        uri: uri,
        name: fileName,
        type: type,
      },
      {
        keyPrefix: 'dsp_',
        bucket: 'sps-project-bucket', // Ex. aboutreact
        region: 'ap-south-1', // Ex. ap-south-1
        accessKey: 'AKIA4ZK4J634CFVWSMOM',
        // Ex. AKIH73GS7S7C53M46OQ
        secretKey: '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',
        // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
        successActionStatus: 201,
        contentType: type,
      },
    ).then(async response => {
      console.log('---------after upload----------', response);
      if (response.status !== 201) alert('Failed to upload image to S3');
      if (response.status == 201) {
        await AsyncWriter.writeData('collegeIdCardImg', {
          collegeIdCardImg: true,
          imgLink: response.body.postResponse.location,
        });
        this.props.setImage(response.body.postResponse.location);
        this.props.loading(false);
        alert('Image uploaded Successfully');
      }
      console.log(response.body.postResponse.location);
    });
  };
  createFormData = (photo, body) => {
    const data = new FormData();
    let fileName =
      Platform.OS === 'android' ? photo : photo.replace('file://', '');
    data.append('photo', {
      name: fileName,
      type: 'image/png',
      uri: Platform.OS === 'android' ? photo : photo.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  generatePosters = async userData => {
    if (userData.user_type == 'user') {
      return;
    }
    // console.log('====================================');
    // console.log('Re generating Posters');
    // console.log('====================================');
    let yin_id = userData.yin_id;
    let promises = [];
    let url = `https://yin-api.foxberry.link/v2/posters/generateDatedPosters?yin_id=${yin_id}`;
    promises.push(axios.post(url));
    await Promise.all(promises);
  };

  handleProfilePhotoSync = (yin_id, profile_image_url) => {
    // update profile image url
    userAccessApi.updateProfilePhoto(yin_id, profile_image_url);
  };

  getBlob = async fileUri => {
    // console.log('converting to blob');
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    // console.log('finished convert to blob');
    return imageBody;
  };

  handleUploadPhoto = async photo => {
    let user = await AsyncWriter.getData('user-data');
    let yin_id = user.yin_id;
    let college_code = user.college_code;
    // get presigned url
    let presignedUrl = await userAccessApi.getPresignedUrl(
      yin_id,
      'profile_images',
      college_code,
    );
    //
    console.log('Get presigned url success');
    console.log(presignedUrl.data);
    console.log('Uploading', this.props.imageType);
    let body = null;
    try {
      body = await this.getBlob(photo);
    } catch (error) {
      console.error(error);
      this.props.loading(false);
      return;
    }

    if (!body) return;

    try {
      await fetch(presignedUrl.data, {
        method: 'PUT',
        body,
      });
      alert('Uploaded successfully');
      let imageurl = '';
      imageurl = presignedUrl.data;
      this.handleProfilePhotoSync(yin_id, imageurl.split('?')[0]);
    } catch (error) {
      console.error(error);
      alert('Image could not be uploaded');
    }
    useUser();
    this.props.loading(false);
    this.props.hookAfterUploadSuccess
      ? this.props.hookAfterUploadSuccess()
      : () => {};
  };

  render() {
    return (
      <Modal
        visible={this.props.show}
        transparent={true}
        style={{
          padding: 20,
          // flex: 1,
          // zIndex:10
        }}
        onDismiss={() => this.props.hide()}
        onPress={() => this.props.hide()}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            borderRadius: 15,
          }}>
          <TouchableOpacity
            onPress={() => this.handlePickerHide('library')}
            style={styles.pickerSourceSelectorItem}>
            <MaterialCommunityIcons name="upload" size={20} />
            <Text style={styles.pickerSourceSelectorText}>
              Upload new image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handlePickerHide('camera')}
            style={styles.pickerSourceSelectorItem}>
            <MaterialCommunityIcons name="camera" size={20} />
            <Text style={styles.pickerSourceSelectorText}>Take a photo</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
export const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    padding: 10,
  },
  button: {
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#408660',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerSourceSelector: {},
  pickerSourceSelectorItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
  },
  pickerSourceSelectorText: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  overlayBackground: {
    backgroundColor: 'rgba(47,163,218, .4)',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  backButton: {
    width: 20,
    height: 20,
    margin: 10,
    marginTop: 20,
  },
  nextButton: {
    width: 20,
    height: 20,
    marginTop: 3,
  },
  textStyle: {
    color: global.darkColor,
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 10,
  },
  textlogin: {
    color: 'black',
    fontSize: 20,
    fontWeight: '100',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textResend: {
    color: 'blue',
    fontSize: 20,
    fontWeight: '100',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyleSecond: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 8,
    marginTop: '5%',
  },
  textStyleLink: {
    color: 'blue',
    fontSize: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyleAddress: {
    color: global.darkColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cardUpload: {
    height: 'auto',
    elevation: 4,
    borderRadius: 50,
    backgroundColor: '#31E981',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 45,
    marginTop: 15,
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
  cardDropdown: {
    height: '4%',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginLeft: 16,
    marginRight: 16,
    borderColor: global.darkColor,
    borderWidth: 1,
    elevation: 0,
    marginBottom: 16,
  },
  cardDropdownLast: {
    height: '4%',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 5,
    borderColor: global.darkColor,
    borderWidth: 1,
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
  cardTwo: {
    height: 'auto',
    width: '35%',
    elevation: 0,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginLeft: 45,
    marginRight: 23,
    marginBottom: 10,
  },
  cardThree: {
    height: 'auto',
    width: '35%',
    elevation: 0,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  cardButtonNomination: {
    height: 'auto',
    marginTop: '2%',
    elevation: 0,
    borderRadius: 15,
    backgroundColor: 'pink',
    marginLeft: '50%',
    marginRight: '15%',
    marginBottom: '5%',
  },
  textStyleModal: {
    color: global.darkColor,
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '0%',
  },
  textStyleModalSecond: {
    color: global.darkColor,
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '0%',
    marginBottom: 10,
  },
  textStyleModalTop: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '0%',
    marginBottom: 5,
  },
});
