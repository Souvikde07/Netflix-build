import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCClNK7uR6_2FOB_jmlFqbzUpVItiBtagE",
  authDomain: "netflix-build-d0a29.firebaseapp.com",
  projectId: "netflix-build-d0a29",
  storageBucket: "netflix-build-d0a29.appspot.com",
  messagingSenderId: "988961698115",
  appId: "1:988961698115:web:e77871265eed690bca7ff6"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
export { firebaseApp };

