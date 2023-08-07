import { Routes, Route } from "react-router-dom";
import { Role } from "./features/auth/authApiSlice";

// Pages
import SignUpPage from "./pages/SignUpPage";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<h1>Haemimont internship</h1>} />
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
				<Route path="/sign-in" />
				<Route path="*" element={<h1>Not found</h1>} />
			</Routes>
		</>
	);
}

export default App;
