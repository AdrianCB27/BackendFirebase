import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";

dotenv.config();

initializeApp({ 
    credential: cert('../firebase.json'),
});

const db = getFirestore();

export { db };
