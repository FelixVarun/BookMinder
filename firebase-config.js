
import { initializeApp ,getApp,getApps} from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
<<<<<<< HEAD
// import { getMessaging } from "firebase/messaging";

=======
 
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
const firebaseConfig = {
  apiKey: "AIzaSyDkATuf1gkMYdFw2u19rC7GhE7HsRx9ftA",
  authDomain: "bookminder-8e096.firebaseapp.com",
  projectId: "bookminder-8e096",
  storageBucket: "bookminder-8e096.appspot.com",
  messagingSenderId: "575239879672",
  appId: "1:575239879672:web:8f6c4a0eb0352dc3c9b40d"
};

  const app = getApps.length > 0 ? getApp(): initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app)
<<<<<<< HEAD
// const messaging = getMessaging(app);
=======
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
export {app,storage,db,auth}