import styles from "./Department.module.css";
import { useNavigate } from "react-router-dom";
import { useFeedBack } from "../context/FeedbackContext";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase";

function Department() {
	const { state, dispatch } = useFeedBack();
	const { name, level, department, email } = state;

	const isEmpty = Boolean(!level || !department);
	const navigate = useNavigate();

	console.log(state);
	function goToFeedback(e) {
		e.preventDefault();
		navigate("/page/feedback");
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch({ type: "feedback/name", payload: user.displayName });
				dispatch({ type: "feedback/email", payload: user.email });

				console.log(user.name);
			} else {
				console.log("User Is signed out");
				navigate("/");
			}
		});
	}, [name, email, navigate, dispatch]);

	return (
		<div className="page">
			<header className="header">Welcome {name}!</header>
			<div className="app">
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
					<button onClick={goToFeedback} disabled={isEmpty}>
						Next
					</button>
				</form>
			</div>
		</div>
	);
}

export default Department;
