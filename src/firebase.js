// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCI3TQOCvCXpbT3oC5IQszLueyJkwXR07k",
	authDomain: "student-feedback-form-84596.firebaseapp.com",
	projectId: "student-feedback-form-84596",
	storageBucket: "student-feedback-form-84596.appspot.com",
	messagingSenderId: "68569141656",
	appId: "1:68569141656:web:6d7a67df5d65a040cd5bed",
	databaseURL:
		"https://student-feedback-form-84596-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
console.log(database);

const feedbackRef = ref(database, "/feedback");

// Initialize Firebase Authentication and get a reference to the service

export const auth = getAuth(app);

export { feedbackRef };
