import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCb47bL2USpFvRDabqGNs8uwSYGKtHbjbM",
    authDomain: "todo-1815c.firebaseapp.com",
    projectId: "todo-1815c",
    storageBucket: "todo-1815c.appspot.com",
    messagingSenderId: "844147205315",
    appId: "1:844147205315:web:02b93a30d3e084793e6e76",
    measurementId: "G-RKEBCY6C2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;