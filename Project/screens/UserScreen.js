import { Button, Image, View, Platform, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
// import * as ImagePicker from 'expo-image-picker';
import {MediaTypeOptions, requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, launchCameraAsync} from 'expo-image-picker';
// import ImagePicker from 'react-native-image-picker';

import Store from '../src/store';
import { useSelector, useDispatch} from 'react-redux'

import getName from '../src/Actions/signInStates';

export default UserScreen = ({ navigation }) => {
  // Use react-redux to get login
  const dispatch = useDispatch();
  const disName = useSelector(state => state.loginReducer.name);
  console.log(disName + " hello!!!");
  const [image, setImage] = useState();
  
  // Ask for premission
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // pick image from gallary
  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // take an image using camera
  const takeImage = async () => {
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          <Text>Welcome {disName}</Text>
          {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
        </View>
        <View >
            <Button title="Pick an image from camera roll" onPress={pickImage} />
        </View>
        <View>
            <Button title="Take a new picture" onPress={takeImage} />
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  }
});