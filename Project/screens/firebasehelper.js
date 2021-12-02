import firebase from "firebase";
import 'firebase/firestore';



const firebaseConfig = {
    apiKey: 'AIzaSyAGAPiJ4hblg4P4tbExbqdqZVDZKu7Dvw8',
    authDomain: 'served-up-63c2e.firebaseapp.com',
    databaseURL: 'https://served-up-63c2e.firebaseio.com',
    projectId: 'served-up-63c2e',
    storageBucket: 'served-up-63c2e.appspot.com',
    //messagingSenderId: 'sender-id',
    appId: '1:456652905966:ios:80d960e213cb40ea1182ff',
    //measurementId: 'G-measurement-id',
};

if (firebase.apps.length === 0) {
firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

//get data
const getDish = (db, name) => {
    //fav should be a document in the users collection
    var fav = db.collection('Users').doc(name);
    fav.get().then((doc) => {
        const favs = new doc.data().dishes;
        console.log(favs);
        return (favs);
    })   
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

//upload user image
const addImage = (store, userName, imageURL, imageName) => {
    var refer = store.ref();
    getFileBlob(imageURL, blob =>{
        refer.child(userName+'/'+imageName).put(blob).then(function(snapshot) {
           console.log('Uploaded a blob or file!');
        })
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


export {getDish, addDish, delDish, addImage};
