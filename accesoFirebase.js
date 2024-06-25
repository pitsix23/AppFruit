// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGKLZgh8m-QjEnMnYokxWRTclRyqttydI",
  authDomain: "dbappfruit.firebaseapp.com",
  projectId: "dbappfruit",
  storageBucket: "dbappfruit.appspot.com",
  messagingSenderId: "376011811805",
  appId: "1:376011811805:web:52c43e3ea545911f496434",
  measurementId: "G-5M93WVC4DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

isSupported().then(supported => {
  if (supported) {
    const analytics = getAnalytics(app);
  } else {
    console.log("Analytics not supported in this environment.");
  }
});

export { app, firebaseConfig };