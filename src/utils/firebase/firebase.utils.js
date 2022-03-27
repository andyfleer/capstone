import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCZ0pfGZAA_nJwh3in1tyQyk_9jR6MU_t4",
  authDomain: "capstone-b7bd2.firebaseapp.com",
  projectId: "capstone-b7bd2",
  storageBucket: "capstone-b7bd2.appspot.com",
  messagingSenderId: "626520125689",
  appId: "1:626520125689:web:08b528476c5330ed13b228",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);


    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth; 
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (err) {
            console.log('error creating the user ' + err.message)
        }
    }

    return userDocRef;
} 