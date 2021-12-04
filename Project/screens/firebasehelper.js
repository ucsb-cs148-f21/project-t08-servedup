import { Component, useEffect, useState} from "react"
import firebase from "firebase";
import 'firebase/firestore';
import {db, store} from "./firebasesetup"

import { useSelector, useDispatch } from "react-redux";



const iniDB = (db, name) => {
    const col = db.collection('Users').doc(name);
    col.get().then((doc) => {
        const dispatch = useDispatch();
        var disName = useSelector((state) => state.loginReducer.name);
        var disEmail = useSelector((state) => state.loginReducer.email);
        var disID = useSelector((state) => state.loginReducer.id);
        var disState = useSelector((state) => state.loginReducer.isSignedIn);
        var disPhotoURL = useSelector((state) => state.loginReducer.photoURL);
        if (!doc.exists) {
            col.set({dishes:[], merge: true, uploadedAvatar: false, avatar: disPhotoURL})
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
    
    const storeRef = store.ref()
    storeRef.child(userName+'/profile.png').put(imageURL)
    getFileBlob(imageURL, blob =>{
        storeRef.child(userName+'/profile.png').put(blob).then(function(snapshot) {
           console.log('Uploaded a blob or file!');
        })
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
const getImage = (db, userName) => {
    const col = db.collection('Users').doc(userName);
    const [url, seturl] = useState('')

    const ifGotImage = new Promise((resolve,reject) => {
        if (url != '') {
            resolve("Got image")
        } 
    })
    useEffect(() => {
        col.get().then((doc) => {
            seturl(doc.data().avatar)
        })
    }, [])
    Promise.all([ifGotImage]).then((messages) => {
        console.log(messages)
    })
    return url
}


export {getAvatarbool, iniDB, getDish, addDish, delDish, addImage, getImage};
