import React from 'react';
import { View, Text, Button } from 'react-native';
import Toast from 'react-native-toast-message';

const  Toastify=()=> {
  const showToast = () => {
    Toast.show({
      type: 'success', // Types: success | error | info
      text1: 'Hello!',
      text2: 'This is a toast message 👋',
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native Toast Example</Text>
      <Button title="Show Toast" onPress={showToast} />
      {/* Toast component must be included once in the app */}
      <Toast />
    </View>
  );
}

export default Toastify
