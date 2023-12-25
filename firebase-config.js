
import { initializeApp ,getApp,getApps} from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
// import { getMessaging } from "firebase/messaging";

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
// const messaging = getMessaging(app);
export {app,storage,db,auth}