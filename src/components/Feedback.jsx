import styles from "./Feedback.module.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFeedBack } from "../context/FeedbackContext";
import FeedbackForm from "./FeedbackForm";

function Feedback() {
	const [name, setName] = useState("");
	const [noOfCourses, setNoOfCourses] = useState("");
	const [email, setEmail] = useState("");
	const [currentForm, setCurrentForm] = useState(0);

	const { state: feedbackObj, dispatch } = useFeedBack();

	const navigate = useNavigate();

	console.log(feedbackObj, name);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setEmail(user.email);
				setName(user.displayName);
				dispatch({ type: "feedback/name", payload: user.displayName });
				dispatch({ type: "feedback/email", payload: user.email });

				console.log(user.name);
			} else {
				console.log("User Is signed out");
				navigate("/");
			}
		});

		if (!feedbackObj.level || !feedbackObj.department) navigate("/");
	}, [
		name,
		email,
		navigate,
		dispatch,
		feedbackObj.department,
		feedbackObj.level,
	]);

	return (
		<div className="page">
			<header className="header">Welcome {name}</header>
			<div className="app">
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

					{Array.from({ length: +noOfCourses }, (_, i) =>
						currentForm === i ? (
							<>
								<FeedbackForm
									noOfCourses={noOfCourses}
									i={i}
									key={i}
									currentForm={currentForm}
									setCurrentForm={setCurrentForm}
								/>
							</>
						) : null
					)}
				</div>
			</div>
		</div>
	);
}

export default Feedback;
