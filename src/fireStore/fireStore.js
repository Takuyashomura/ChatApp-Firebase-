import * as firebase from 'firebase';


export const setFirebase = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyBefC_n4YBUUp-nkxzoHlp7lT-EmfWfXQs",
        authDomain: "chatapp-a839a.firebaseapp.com",
        databaseURL: "https://chatapp-a839a.firebaseio.com",
        projectId: "chatapp-a839a",
        storageBucket: "chatapp-a839a.appspot.com",
        messagingSenderId: "59331426634",
        appId: "1:59331426634:web:102fd6842a4afbd7ad29b3",
        measurementId: "G-BG37ZD14M8"
      };
    firebase.initializeApp( firebaseConfig );
}