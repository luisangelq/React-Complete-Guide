import * as firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyApo_pvnNfBmcRo-IjIe7JeDVX5zIQzQr0",
    authDomain: "product-hunt-clone-66484.firebaseapp.com",
    projectId: "product-hunt-clone-66484",
    storageBucket: "product-hunt-clone-66484.appspot.com",
    messagingSenderId: "663461294455",
    appId: "1:663461294455:web:068eebcf32e09b7f0a7172",
    measurementId: "G-E089HQ981X"
  };

   // Initialize Firebase    
   const app = () => firebase.initializeApp(firebaseConfig);


 
   export default app;