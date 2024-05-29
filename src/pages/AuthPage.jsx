import styles from "./AuthPage.module.css";
import { Outlet } from "react-router-dom";
const AuthPage = () => {
	return (
		<div className={styles.authPage}>
			<Outlet />
		</div>
	);
};

export default AuthPage;
