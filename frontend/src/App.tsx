import { Routes, Route } from "react-router-dom";
import { Role } from "./features/auth/authApiSlice";

// Pages
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserProfilePage from "./pages/UserProfilePage";
import CourseSignUpPage from "./pages/CourseSignUpPage";

// Components
import NavBar from "./components/NavBar";

// Guards
import RequireAuth from "./utils/RequireAuth";
import PublicOutlet from "./utils/PublicOutlet";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<NavBar />}>
					{/* Public routes */}
					<Route path="/user/" element={<PublicOutlet />}>
						<Route path="sign-in" element={<SignInPage />} />
						<Route
							path="sign-up/student"
							element={<SignUpPage role={Role.STUDENT} />}
						/>
						<Route
							path="sign-up/teacher"
							element={<SignUpPage role={Role.TEACHER} />}
						/>
					</Route>

					{/* Private routes */}
					<Route path="/user/" element={<RequireAuth />}>
						<Route path="profile" element={<UserProfilePage />} />
					</Route>

					{/* Public routes */}
					<Route path="/" element={<HomePage />} />
					<Route
						path="/course-sign-up"
						element={<CourseSignUpPage />}
					/>
				</Route>
				<Route path="/terms-of-service" element={<TermsOfService />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/course-sign-up" element={<CourseSignUpPage />} />
				<Route path="*" element={<h1>Not found</h1>} />
			</Routes>
		</>
	);
}

export default App;
