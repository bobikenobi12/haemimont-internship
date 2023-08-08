import { Routes, Route } from "react-router-dom";
import { Role } from "./features/auth/authApiSlice";

// Pages
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/sign-up/student"
					element={<SignUpPage role={Role.STUDENT} />}
				/>
				<Route
					path="/sign-up/teacher"
					element={<SignUpPage role={Role.TEACHER} />}
				/>
				<Route path="/sign-in" element={<SignInPage />} />
				<Route path="/terms-of-service" element={<TermsOfService/>}/>
				<Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
				<Route path="*" element={<h1>Not found</h1>} />
			</Routes>
		</>
	);
}

export default App;
