import { Outlet, Navigate } from "react-router-dom";

import { selectToken } from "../features/auth/authSlice";
import { useAppSelector } from "../app/hooks";

export default function PublicOutlet() {
	const token = useAppSelector(selectToken);

	return <>{token ? <Navigate to="/" /> : <Outlet />}</>;
}
