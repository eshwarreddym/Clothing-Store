import {initializeApp} from 'firebase/app';

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA7mbfGguQLNs_GeRHiAi3kWlIvXogghmY",
    authDomain: "clothing-database-a7fb9.firebaseapp.com",
    projectId: "clothing-database-a7fb9",
    storageBucket: "clothing-database-a7fb9.appspot.com",
    messagingSenderId: "642002268337",
    appId: "1:642002268337:web:f6f9e5f29485a1a992f290"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
})

export const auth = getAuth();
export const signInWithGooglePopup =() => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const{displayName,email} = userAuth;
        const createAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
            });
        } catch(error){
            console.log('Error creating the user',error.message);
        }
      return userDocRef;
    }



};