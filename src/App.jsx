import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Page from "./components/Page";
import { Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Feedback from "./components/Feedback";
import Department from "./components/Department";
import Admin from "./components/Admin";
import FeedbackProvider from "./context/FeedbackContext";
import Success from "./pages/Success";
function App() {
	return (
		<>
			<ToastContainer />

			<BrowserRouter>
				<Routes>
					<Route index element={<Navigate to="auth" />} />
					<Route path="auth" element={<AuthPage />}>
						<Route index element={<Navigate to="signup" />} />
						<Route path="signup" element={<SignUp />} />
						<Route path="login" element={<Login />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route
						path="/page"
						element={
							<FeedbackProvider>
								<Page />
							</FeedbackProvider>
						}
					>
						<Route index replace element={<Navigate to="department" />} />
						<Route path="department" element={<Department />} />
						<Route path="feedback" element={<Feedback />} />
					</Route>
					<Route path="admin" element={<Admin />} />
					<Route
						path="*"
						element={<div style={{ fontSize: "3rem" }}>404 Page not found</div>}
					/>
					<Route path="/success" element={<Success />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
