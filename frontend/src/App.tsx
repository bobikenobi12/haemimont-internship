import { Routes, Route } from "react-router-dom";
import { Role } from "./features/auth/authApiSlice";

// Pages
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserProfilePage from "./pages/UserProfilePage";
// Guards
// import RequireAuth from "./utils/RequireAuth";
import PublicOutlet from "./utils/PublicOutlet";


function App() {
	return (
		<>
			<Routes>
				<Route path="/sign-up/*" element={<PublicOutlet />} />
				<Route path="/sign-in" element={<PublicOutlet />} />
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
				<Route path="/terms-of-service" element={<TermsOfService />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/user-profile" element={<UserProfilePage/>}/>
				<Route path="*" element={<h1>Not found</h1>} />
			</Routes>
		</>
	);
}

export default App;
