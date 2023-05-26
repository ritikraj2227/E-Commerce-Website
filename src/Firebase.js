import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCmoiOAOhZDnqFfQctuuASIcSkH7I52aQE",
	authDomain: "ecommerce-website-d93be.firebaseapp.com",
	projectId: "ecommerce-website-d93be",
	storageBucket: "ecommerce-website-d93be.appspot.com",
	messagingSenderId: "533583565692",
	appId: "1:533583565692:web:9665627f56adfc28804af9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
