import { useState, useEffect } from "react";
import { useFeedBack } from "../context/FeedbackContext";
import { feedbackRef } from "../firebase";
import { push, set } from "firebase/database";
import { toast } from "react-toastify";
import styles from "./Feedback.module.css";

const FeedbackForm = ({ i, noOfCourses }) => {
	const [lecturerName, setLecturerName] = useState("");
	const [courseCode, setCourseCode] = useState("");
	const [feedback, setFeedback] = useState("");
	const [shouldSubmit, setShouldSubmit] = useState(false);

	const { state: feedbackObj, dispatch } = useFeedBack();

	useEffect(() => {
		const handleSubmit = async () => {
			try {
				const newFeedback = push(feedbackRef);
				await set(newFeedback, {
					feedbackObj,
				});

				toast.success("Your feedback has been recorded");
			} catch (err) {
				console.log(err);
				toast.error("Error");
			} finally {
				setLecturerName("");
				setCourseCode("");
				setFeedback("");
				setShouldSubmit(false); // Reset submit flag
			}
		};

		if (shouldSubmit) {
			handleSubmit();
		}
	}, [shouldSubmit, feedbackObj]);

	const handleNext = () => {
		dispatch({
			type: "feedback/feedback",
			payload: { lecturerName, courseCode, feedback },
		});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		handleNext();
		if (i + 1 === +noOfCourses) {
			setShouldSubmit(true);
		}
	};

	return (
		<form onSubmit={handleFormSubmit} className={styles.formElement}>
			<input
				type="text"
				name="lecturer-name"
				id="lecturer-name"
				placeholder="Lecturer's Name"
				value={lecturerName}
				onChange={(e) => setLecturerName(e.target.value)}
			/>
			<input
				type="text"
				name="course-code"
				id="course-code"
				placeholder="Course Code"
				value={courseCode}
				onChange={(e) => setCourseCode(e.target.value)}
			/>
			<textarea
				name="feedback"
				id="feedback"
				placeholder="Enter your Feedback"
				value={feedback}
				onChange={(e) => setFeedback(e.target.value)}
			></textarea>
			<button type="submit">Send Feedback</button>
		</form>
	);
};

export default FeedbackForm;
