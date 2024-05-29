import styles from "./Page.module.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { feedbackRef } from "../firebase";
import { push, set } from "firebase/database";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Page() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [lecturerName, setLecturerName] = useState("");
	const [courseCode, setCourseCode] = useState("");
	const [department, setDepartment] = useState("");
	const [level, setLevel] = useState("");
	const [feedback, setFeedback] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setName(user.displayName);
				setEmail(user.email);
			} else {
				console.log("Use Is signed out");
				navigate("/");
			}
		});
	}, [name, email, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newFeedback = push(feedbackRef);
			await set(newFeedback, {
				name,
				lecturerName,
				courseCode,
				department,
				level,
				feedback,
				email,
			});

			toast.success("Your feedback has beeen recorded");
		} catch (err) {
			console.log(err);
			toast.error("Error");
		} finally {
			setLecturerName("");
			setDepartment("");
			setCourseCode("");
			setFeedback("");
			setLevel("");
		}
	};

	return (
		<div className={styles.page}>
			<header className={styles.header}>Welcome {name}!</header>
			<div className={styles.app}>
				<form onSubmit={handleSubmit}>
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
					<input
						type="text"
						name="department"
						id="department"
						placeholder="Department"
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
					/>
					<input
						type="text"
						name="level"
						id="level"
						placeholder="Level"
						value={level}
						onChange={(e) => setLevel(e.target.value)}
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
			</div>
		</div>
	);
}

export default Page;
