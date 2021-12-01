import { Button, Image, View, Platform, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
// import * as ImagePicker from 'expo-image-picker';
import {MediaTypeOptions, requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, launchCameraAsync} from 'expo-image-picker';
// import ImagePicker from 'react-native-image-picker';

import Store from '../src/store';
import { useSelector, useDispatch} from 'react-redux'

//import getName from '../src/Actions/signInStates';

export default UserScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    var disName = useSelector(state => state.loginReducer.name);
    var disEmail = useSelector(state => state.loginReducer.email);
    var disID = useSelector(state => state.loginReducer.id);
    var disState = useSelector(state => state.loginReducer.isSignedIn);
    var disPhotoURL = useSelector(state => state.loginReducer.photoURL);
    console.log("disName = " + disName + ", disEmail = " + disEmail + ", disID = " + disID + ", disState = " + disState + ", disPhotoURL = " + disPhotoURL);


    const [image = disPhotoURL, setImage] = useState();
    var name = "";
    image=disPhotoURL;
  if (disName == "") {
    name = "User";
  } else {
    name = disName;
  }
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
      aspect: [16, 9],
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
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View> 
          <Text>Welcome to Servedup</Text>
        </View>
        <View  style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
        <Text>       {name}       </Text>
        </View>
        <View>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
        </View>
        <View>
            <Button title="Take a new picture" onPress={takeImage} />
        </View>
    </View>
  );
  }