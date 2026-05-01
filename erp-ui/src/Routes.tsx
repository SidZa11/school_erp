import { RouteObject } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import APPLayout from "./components/layouts/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserPage from "./pages/user/UserPage";


const Routes : RouteObject[] = [
    {
        path : '/login',
        element : <LoginPage />
    },
    {
        path : '/',
        element : (
            <ProtectedRoute>
                <APPLayout>
                    <UserPage />
                </APPLayout>
            </ProtectedRoute>
        )
    }
];

export default Routes