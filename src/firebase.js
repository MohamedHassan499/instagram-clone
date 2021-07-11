import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDkkiT5oiiY4BGD4atNYOTTSet3_2DeEno",
    authDomain: "instagram-clone-e28a9.firebaseapp.com",
    projectId: "instagram-clone-e28a9",
    storageBucket: "instagram-clone-e28a9.appspot.com",
    messagingSenderId: "959935637598",
    appId: "1:959935637598:web:34b540e0c5fb73b9d0accf"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
