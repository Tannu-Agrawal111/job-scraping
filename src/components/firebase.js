import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiUsjz8NVxMXF3SyD6R27jwmdUZxEt_pQ",
  authDomain: "job-listing-web-application.firebaseapp.com",
  projectId: "job-listing-web-application",
  storageBucket: "job-listing-web-application.appspot.com",
  messagingSenderId: "657881382517",
  appId: "1:657881382517:web:a2677bca4a37b1b527423c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


