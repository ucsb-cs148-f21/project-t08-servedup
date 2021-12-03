import { Component, useEffect, useState} from "react"
import firebase from "firebase";
import 'firebase/firestore';
import {db, store} from "./firebasesetup"



const iniDB = (db, name) => {
    var col = db.collection('Users').doc(name);
    col.get().then((doc) => {
        if (!doc.exists) {
            col.set({dishes:[], merge: true, uploadedAvatar: false, avatar:''})
        }
    })
}

const getAvatarbool = (db, name) => {
    var col = db.collection('Users').doc(name);
    const [judge, setJudge] = useState()
    useEffect(() => {
        col.get().then((doc) => {
            setJudge(doc.data().uploadedAvatar)
        })
    }, [])
    return judge
}


// 

//get data
const getDish = (db, name) => {
    //fav should be a document in the users collection
    var fav = db.collection('Users').doc(name);
    const [value, setValue] = useState([])
    useEffect(() => {
        fav.get().then((doc) => {
            setValue(doc.data().dishes)
        }) 
    }, [])
    return value
}

//add data
const addDish = (db, name, dish) => {
    //fav should be a document in the users collection
    var fav = db.collection('Users').doc(name);
    fav.get().then((favdata) => {
        if (favdata.exists) {
            fav.update({
                dishes: firebase.firestore.FieldValue.arrayUnion(dish)
            })
        } else {
            fav.set({merge:true})
        }
    })
}

//remove data
const delDish = (db, name, dish) => {
    //fav should be a document in the users collection
    var fav = db.collection('Users').doc(name);
    fav.update({
        dishes: firebase.firestore.FieldValue.arrayRemove(dish)
    })
}

//upload image
const addImage = (store, userName, imageURL) => {
    
    var storeRef = store.ref()
    storeRef.child(userName+'/profile.png').put(imageURL)
    // getFileBlob(imageURL, blob =>{
    //     storeRef.child(userName+'/profile.png').put(blob).then(function(snapshot) {
    //        console.log('Uploaded a blob or file!');
    //     })
    // })

    var col = db.collection('Users').doc(userName)
    col.update({
        uploadedAvatar: true,
        avatar: imageURL
    })
}

var getFileBlob = function (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function() {
      cb(xhr.response);
    });
    xhr.send();
};


//download image
const getImage = (store, userName, imageName) => {
    var storeRef = store.ref();
    storeRef.child(userName+'/'+imageName).getDownloadURL().then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    var img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object-not-found':
      // File doesn't exist
      break;
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;
    case 'storage/canceled':
      // User canceled the upload
      break;

    // ...

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
  });
}


export {getAvatarbool, iniDB, getDish, addDish, delDish, addImage, getImage};