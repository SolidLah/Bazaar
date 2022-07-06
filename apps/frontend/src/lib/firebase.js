import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKEv3N-20uVAHgk5sYb2tV9GNuUDsI7I4",
  authDomain: "bazaar-1d526.firebaseapp.com",
  projectId: "bazaar-1d526",
  storageBucket: "bazaar-1d526.appspot.com",
  messagingSenderId: "623316894820",
  appId: "1:623316894820:web:e9c2d35c3386f036a80b71",
  measurementId: "G-CJV4Z8Q6MX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailAndPassword = async (name, email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(res.user, { displayName: name });

  await setDoc(doc(db, "users", res.user.uid), {
    walletAddress: "",
    watchlist: [],
    collections: [],
  });
};

const sendPasswordReset = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

const logout = async () => {
  await signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
