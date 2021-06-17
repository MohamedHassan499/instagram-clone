import { seedDatabase } from "../seed";

const config = {
    apiKey: "AIzaSyDkkiT5oiiY4BGD4atNYOTTSet3_2DeEno",
    authDomain: "instagram-clone-e28a9.firebaseapp.com",
    projectId: "instagram-clone-e28a9",
    storageBucket: "instagram-clone-e28a9.appspot.com",
    messagingSenderId: "959935637598",
    appId: "1:959935637598:web:34b540e0c5fb73b9d0accf"
};


const firebase = window.firebase.initializeApp(config);
const { FieldValue } = window.firebase.firestore;

seedDatabase(firebase)


export { firebase, FieldValue };