import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAndWrite = async function (itemName, data, callback, catchCallback) {
  return await clearData(itemName).then(async function () {
    return await writeData(itemName, data).then(callback).catch(catchCallback);
  });
};

function clear() {
  AsyncStorage.clear();
}

const clearData = async function (itemName) {
  return await AsyncStorage.removeItem(itemName);
};

const writeData = async function (itemName, data) {
  return await AsyncStorage.setItem(itemName, JSON.stringify(data));
};

const getData = async function (itemName) {
  let data = await AsyncStorage.getItem(itemName);
  let dataToSend = null;
  try {
    dataToSend = JSON.parse(data);
  } catch (error) {
    dataToSend = data;
  }
  return dataToSend;
};

export default {clearAndWrite, clearData, writeData, getData, clear};
