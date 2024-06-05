import { useState, useEffect } from "react";
import { useFeedBack } from "../context/FeedbackContext";
import { feedbackRef } from "../firebase";
import { push, set } from "firebase/database";
import { toast } from "react-toastify";
import styles from "./Feedback.module.css";
import { useNavigate } from "react-router-dom";

const FeedbackForm = ({ i, noOfCourses, currentForm, setCurrentForm }) => {
	const [lecturerName, setLecturerName] = useState("");
	const [courseCode, setCourseCode] = useState("");
	const [feedback, setFeedback] = useState("");
	const [shouldSubmit, setShouldSubmit] = useState(false);
	const navigate = useNavigate();
	const { state: feedbackObj, dispatch } = useFeedBack();
	const isEmpty = Boolean(!lecturerName || !courseCode || !feedback);

	useEffect(() => {
		const handleSubmit = async () => {
			try {
				const feedback = { ...feedbackObj, date: new Date().toISOString() };

				const newFeedback = push(feedbackRef);
				await set(newFeedback, {
					feedback,
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
		currentForm !== noOfCourses - 1 && setCurrentForm((i) => i + 1);
		dispatch({
			type: "feedback/feedback",
			payload: { lecturerName, courseCode, feedback },
		});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (isEmpty) {
			toast.error("Input something in each field");
			return;
		}
		handleNext();
		if (i + 1 === +noOfCourses) {
			setShouldSubmit(true);
			navigate("/success");
		}
	};

	return (
		<form onSubmit={handleFormSubmit} className={styles.formElement}>
			<h1 style={{ fontSize: "3rem" }}>{`Feedback ${i + 1}/${noOfCourses}`}</h1>
			<input
				type="text"
				name="lecturer-name"
				id="lecturer-name"
				placeholder={`Lecturer's Name`}
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
			<button type="submit" className="feedbackBtn">
				{i === noOfCourses - 1 ? "Send Feedback" : "Next"}
			</button>
		</form>
	);
};

export default FeedbackForm;
