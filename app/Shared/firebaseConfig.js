// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApufPLOKgCsAAcil3j71V6xShrMVe0JFg",
  authDomain: "odirile-app.firebaseapp.com",
  projectId: "odirile-app",
  storageBucket: "odirile-app.appspot.com",
  messagingSenderId: "368122872023",
  appId: "1:368122872023:web:dc4191e50706eea8317092",
  measurementId: "G-X5FYCPNKKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;