import styles from "./Feedback.module.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFeedBack } from "../context/FeedbackContext";
import FeedbackForm from "./FeedbackForm";

function Feedback() {
	const [name] = useState("");
	const [noOfCourses, setNoOfCourses] = useState("");
	const [email] = useState("");

	const { state: feedbackObj, dispatch } = useFeedBack();

	const navigate = useNavigate();

	console.log(feedbackObj);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch({ type: "feedback/name", payload: name });
				dispatch({ type: "feedback/email", payload: email });
			} else {
				console.log("User Is signed out");
				navigate("/");
			}
		});
	}, [name, email, navigate, dispatch]);

	return (
		<div className={styles.formContainer}>
			<select
				name="noOfCourses"
				id="noOfCourses"
				value={noOfCourses}
				onChange={(e) => setNoOfCourses(e.target.value)}
			>
				<option value="No of Courses">Select No of Courses</option>
				{Array.from({ length: 10 }, (_, i) => (
					<option key={i} value={i + 1}>
						{i + 1}
					</option>
				))}
			</select>

			{Array.from({ length: +noOfCourses }, (_, i) => (
				<FeedbackForm noOfCourses={noOfCourses} i={i} key={i} />
			))}
		</div>
	);
}

export default Feedback;
