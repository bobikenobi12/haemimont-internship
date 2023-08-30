import { Outlet, Navigate } from "react-router-dom";

import { selectToken } from "../features/auth/authSlice";
import { useAppSelector } from "../app/hooks";

export default function RequireAuth() {
	const token = useAppSelector(selectToken);

	return <>{token ? <Outlet /> : <Navigate to="/user/sign-in" />}</>;
}
