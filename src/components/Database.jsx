import firebase from 'firebase';
import React from 'react';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCVaHbBfXT7-KA06BPYenrlm4l9g5xs0F4",
    authDomain: "fitness-plan-cfd8e.firebaseapp.com",
    databaseURL: "https://fitness-plan-cfd8e.firebaseio.com",
    projectId: "fitness-plan-cfd8e",
    storageBucket: "fitness-plan-cfd8e.appspot.com",
    messagingSenderId: "897687781140"
};
firebase.initializeApp(config);

// Get a reference to the database service
export const database = firebase.database();

export const FirebaseContext = React.createContext();