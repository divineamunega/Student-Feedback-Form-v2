import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Page from "./components/Page";
import { Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
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
					<Route path="/page" element={<Page />} />
					<Route
						path="*"
						element={<div style={{ fontSize: "3rem" }}>404 Page not found</div>}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
