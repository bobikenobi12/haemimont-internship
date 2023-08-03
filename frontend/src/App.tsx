import { Routes, Route } from "react-router-dom";

// Pages
import SignUpPage from "./pages/SignUpPage";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<h1>Haemimont internship</h1>} />
				<Route path="/sign-up" element={<SignUpPage />} />
				<Route path="/sign-in" />
				<Route path="*" element={<h1>Not found</h1>} />
			</Routes>
		</>
	);
}

export default App;
