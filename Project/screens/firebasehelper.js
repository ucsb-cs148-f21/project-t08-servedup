import { Component, useEffect, useState} from "react"
import firebase from "firebase";
import 'firebase/firestore';
import {db, store} from "./firebasesetup"

import Store from "../src/store";
import { useSelector, useDispatch } from "react-redux";

const iniDB = (db, name) => {
    const col = db.collection('Users').doc(name);
    col.get().then((doc) => {
        if (!doc.exists) {
            col.set({dishes:[], merge: true, uploadedAvatar: false, avatar:''})
        }
    })
}

const getAvatarbool = (db, name) => {
    const col = db.collection('Users').doc(name);
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

    storeRef.child(userName+'/profile.png').getDownloadURL()
        .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        var col = db.collection('Users').doc(userName)
    
        col.update({
            uploadedAvatar: true,
            avatar: url
        })
    })
    console.log('Successfully sync storage with firestore!')
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
const getImage = (db, userName, imageName) => {
    const col = db.collection('Users').doc(userName);
    const [url, seturl] = useState();
    useEffect(() => {
        col.get().then((doc) => {
            seturl(doc.data().avatar)
        })
    }, [])
    return url
}


export {getAvatarbool, iniDB, getDish, addDish, delDish, addImage, getImage};