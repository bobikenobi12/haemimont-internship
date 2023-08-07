import { Routes, Route } from "react-router-dom";
import { Role } from "./features/auth/authApiSlice";

// Pages
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import FirstPage from "./pages/FirstPage";


function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<FirstPage/>} />
				<Route path="/sign-up/">
					<Route
						path="student"
						element={<SignUpPage role={Role.STUDENT} />}
					/>
					<Route
						path="instructor"
						element={<SignUpPage role={Role.INSTRUCTOR} />}
					/>
				</Route>
				<Route path="/sign-in" element={<SignInPage />} />
				<Route path="*" element={<h1>Not found</h1>} />
			</Routes>
		</>
	);
}

export default App;
