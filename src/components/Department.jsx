import styles from "./Department.module.css";
import { useNavigate } from "react-router-dom";
import { useFeedBack } from "../context/FeedbackContext";

function Department() {
	const { state, dispatch } = useFeedBack();
	const { name, level, department } = state;

	const navigate = useNavigate();

	console.log(state);
	function goToFeedback(e) {
		e.preventDefault();
		navigate("/page/feedback");
	}

	return (
		<div className={styles.page}>
			<header className={styles.header}>Welcome {name}!</header>
			<div className={styles.app}>
				<form action="">
					<input
						type="text"
						name="department"
						id="department"
						placeholder="Department"
						value={department}
						onChange={(e) =>
							dispatch({
								type: "feedback/department",
								payload: e.target.value,
							})
						}
					/>
					<input
						type="text"
						name="level"
						id="level"
						placeholder="Level"
						value={level}
						onChange={(e) =>
							dispatch({ type: "feedback/level", payload: e.target.value })
						}
					/>
					<button onClick={goToFeedback}>Next</button>
				</form>
			</div>
		</div>
	);
}

export default Department;
