import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyApS3iNR_h_q1TtOjFsdOLb_YhVhG2HF4k',
  authDomain: 'fir-auth-tut-dc7b1.firebaseapp.com',
  projectId: 'fir-auth-tut-dc7b1',
  storageBucket: 'fir-auth-tut-dc7b1.appspot.com',
  messagingSenderId: '783914606608',
  appId: '1:783914606608:web:a3a5cad2a5880393ffaa95',
};

export const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = firebase.auth();
