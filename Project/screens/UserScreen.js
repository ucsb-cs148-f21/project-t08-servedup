import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import {MediaTypeOptions, requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, launchCameraAsync} from 'expo-image-picker';
// import ImagePicker from 'react-native-image-picker';

export default function userProfilePicture() {
  const [image, setImage] = useState();


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

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takeImage = async () => {
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View >
            <Button title="Pick an image from camera roll" onPress={pickImage} />
        </View>
        <View>
            <Button title="Take a new picture" onPress={takeImage} />
        </View>
        <View>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
        
    </View>
  );
}