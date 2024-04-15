// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , onAuthStateChanged , updateProfile} from "firebase/auth";
import { getStorage, ref , uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBKdXOQeQCjWKo5EQZD8xHkmcoGkfjXI14",
  authDomain: "gowhere-e0d76.firebaseapp.com",
  projectId: "gowhere-e0d76",
  storageBucket: "gowhere-e0d76.appspot.com",
  messagingSenderId: "777994122660",
  appId: "1:777994122660:web:ea150eaae45acccf46fd31",
  measurementId: "G-L2F6C2G9J3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
export const storage = getStorage(app);

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsubscribe;
  }, [])

  return currentUser;
};

// Upload a file to Firebase Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  const snapsnot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef)

  updateProfile(currentUser, {photoURL})

  setLoading(false);
  alert("Uploaded Successfully, Please reload the page to see the changes!");
}