import { Button, Image, View, Platform, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  launchCameraAsync,
} from "expo-image-picker";

import { db, store } from "./firebasesetup";

import Store from "../src/store";
import { useSelector, useDispatch } from "react-redux";

import {getAvatarbool, addImage, getImage} from './firebasehelper'

export default UserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  var disName = useSelector((state) => state.loginReducer.name);
  var disEmail = useSelector((state) => state.loginReducer.email);
  var disID = useSelector((state) => state.loginReducer.id);
  var disState = useSelector((state) => state.loginReducer.isSignedIn);
  var disPhotoURL = useSelector((state) => state.loginReducer.photoURL);
  console.log(
    "disName = " +
      disName +
      ", disEmail = " +
      disEmail +
      ", disID = " +
      disID +
      ", disState = " +
      disState +
      ", disPhotoURL = " +
      disPhotoURL
  );

  function getUrl(stats) {
      if (stats) {
        return getImage(store, disName, 'profile.png');
      } else {
          return disPhotoURL;
      }
  }

  var stat = getAvatarbool(db, disName);
  var url = getUrl(stat);

  const [image, setImage] = useState(url);
  var name = "";
  if (disName == "") {
    name = "User";
  } else {
    name = disName;
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
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
      addImage(store, disName, result.uri);
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
      addImage(store, disName, result.uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "aliceblue",
      }}
    >
      {disState ? (
        <View>
          <View>
            <Text style={styles.textStyle2}>Welcome to Servedup!</Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              />
            )}
            <Text>         {name}</Text>
          </View>

          <View>
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
          </View>

          <View>
            <Button title="Take a new picture" onPress={takeImage} />
          </View>
        </View>
      ) : (
        <Text style={styles.textStyle}>
          Log in to google account to access your profile
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  sectionStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    padding: 6,
    color: "#000000",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    color: "#000000",
  },
  textStyle2: {
    textAlign: "center",
    fontSize: 24,
    color: "#000000",
    flex: 0,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
