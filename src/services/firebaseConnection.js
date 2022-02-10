import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth"
import 'firebase/firestore'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"
import { getDatabase, ref, set } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDcEiilOf52XGDlPk_lQTRhaJGMXHYAhyQ",
  authDomain: "sistema-bbb14.firebaseapp.com",
  projectId: "sistema-bbb14",
  storageBucket: "sistema-bbb14.appspot.com",
  messagingSenderId: "765696959615",
  appId: "1:765696959615:web:c6914556042073e668cb4a",
  measurementId: "G-9NLYRBBCM7"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase)
const db = getFirestore(firebase)

export const registerUser = async (email, password) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password)
    return newUser.user
  }
  catch (error) {
    return new Promise((resolve, reject) => { reject(new Error()) })
  }
}

export const addDb = async (uid, data) => {
  try {
    //const docRef = await addDoc(collection(db, 'users'), data)
    const docRef = setDoc(doc(db, 'users', uid), data)
    return docRef
  } catch {
    return new Promise((resolve, reject) => { reject(new Error()) })
  }
}

export const login = async (email, password) => {
  try{
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result
  }catch {
    return new Promise((resolve, reject) => { reject(new Error()) })
  }
}

export const logout = async () => {
  await signOut(auth)
}

export const getUserbyUid = async(uid) => {
  try{
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      return docSnap.data()
    }else{
      return {}
    }
  }catch(error){
    return new Promise((resolve, reject) => { reject(new Error()) })
  }
}


