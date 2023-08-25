import { Outlet, Navigate } from "react-router-dom";

import { selectRole } from "../features/auth/authSlice";
import { useAppSelector } from "../app/hooks";

export default function TeacherOutlet() {
	const role = useAppSelector(selectRole);

	return <>{role !== "TEACHER" ? <Navigate to="/" /> : <Outlet />}</>;
}
