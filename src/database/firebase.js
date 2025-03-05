import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

let firebaseConfig;

// Si estás en Render (usa la variable de entorno)
if (process.env.FIREBASE_CONFIG) {
  firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  // Si estás en local, lee firebase.json
  firebaseConfig = JSON.parse(fs.readFileSync("firebase.json", "utf-8"));
}

initializeApp({ 
    credential: cert(firebaseConfig),
});

const db = getFirestore();

export { db };

