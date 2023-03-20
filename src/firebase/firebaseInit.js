import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAHYawUkoic_WbkoIWcRDKThL23FfO0Om4",
    authDomain: "sd-danbooru-prompt-guide.firebaseapp.com",
    projectId: "sd-danbooru-prompt-guide",
    storageBucket: "sd-danbooru-prompt-guide.appspot.com",
    messagingSenderId: "1023439513165",
    appId: "1:1023439513165:web:44597def6e54e281821e04",
    measurementId: "G-XPVWSXWC3F"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export {firebaseApp, auth}
  export default db;