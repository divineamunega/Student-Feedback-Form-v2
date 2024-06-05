import styles from "./Admin.module.css";
import { feedbackRef } from "../firebase";
import { get } from "firebase/database";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Admin() {
	const navigate = useNavigate();
	const [data, setData] = useState({});

	useEffect(() => {
		get(feedbackRef)
			.then((snapshot) => setData(snapshot.val()))
			.catch(() => {
				toast.error("Could not get data");
				navigate("/");
			});
	}, [navigate]);

	return (
		<ul>
			{Object.values(data).map((el, i) => {
				console.log(el);
				return (
					<li key={i}>
						<p>Name: {el.feedback.name}</p>
						<p>Email: {el.feedback.email}</p>
						<p>Dept: {el.feedback.department}</p>
						<p>
							Feedbacks:{" "}
							{el.feedback.feedBacks.map((el, i) => (
								<>
									<p key={i}>Lecturer Name: {el.lecturerName}</p>
									<p>Course Code: {el.courseCode}</p>
									<p>Feedback: {el.feedback}</p>
								</>
							))}
						</p>
					</li>
				);
			})}
		</ul>
	);
	// }
	// <div style={styles.admin}>
	// 	<p>Name : Name</p>
	// 	<p>Email: Email</p>
	// 	<p>Department: Department</p>
	// 	<p>Feedbacks: Feedbacks</p>
	// 	<div></div>
	// </div>
}

export default Admin;
