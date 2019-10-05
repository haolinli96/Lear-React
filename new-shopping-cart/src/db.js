import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDDlv9FMjJwA3rr_G__nsxrseQd2QLY--Q",
    authDomain: "shopping-cart-8354e.firebaseapp.com",
    databaseURL: "https://shopping-cart-8354e.firebaseio.com",
    projectId: "shopping-cart-8354e",
    storageBucket: "shopping-cart-8354e.appspot.com",
    messagingSenderId: "179193015622",
    appId: "1:179193015622:web:b1a9e8713d8ed4f7738947",
    measurementId: "G-K6D484WDTT"
  };
  
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.database().ref();