import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

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

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const feedbackRef = ref(database, "/feedbacks");

export const auth = getAuth(app);

export { feedbackRef };
