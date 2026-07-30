import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCq4fAOe3X0NVgIvg2KJ3wU2NritSxdR9k",
  authDomain: "studyflow-88808.firebaseapp.com",
  projectId: "studyflow-88808",
  storageBucket: "studyflow-88808.firebasestorage.app",
  messagingSenderId: "942494842792",
  appId: "1:942494842792:web:b26b4527c2f1735fafe79d",
  measurementId: "G-RB2RFP4MDF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
