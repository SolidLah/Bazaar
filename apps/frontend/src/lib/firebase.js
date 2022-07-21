import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const deployedApp = initializeApp(
  {
    apiKey: "AIzaSyAKEv3N-20uVAHgk5sYb2tV9GNuUDsI7I4",
    authDomain: "bazaar-1d526.firebaseapp.com",
    projectId: "bazaar-1d526",
    storageBucket: "bazaar-1d526.appspot.com",
    messagingSenderId: "623316894820",
    appId: "1:623316894820:web:e9c2d35c3386f036a80b71",
    measurementId: "G-CJV4Z8Q6MX",
  },
  "deploy"
);

const devApp = initializeApp(
  {
    apiKey: "AIzaSyCW6f1Y9wkoA-TCeBZeNBSLfZs760f2EEk",
    authDomain: "bazaar-dev-d8ca7.firebaseapp.com",
    projectId: "bazaar-dev-d8ca7",
    storageBucket: "bazaar-dev-d8ca7.appspot.com",
    messagingSenderId: "710322643078",
    appId: "1:710322643078:web:3f4f26d8f5b1381089f107",
    measurementId: "G-5VWS6YLZZ5",
  },
  "dev"
);

const app = process.env.NEXT_PUBLIC_VERCEL_URL ? deployedApp : devApp;
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", res.user.uid), {
    uid: res.user.uid,
    avatar: "",
    background: "",
    name,
    email,
    walletAddress: "",
    watchlist: [],
    collections: [],
    following: [],
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
  storage,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
