import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="w-full h-screen dark:bg-gray-900 grid place-items-center bg-white">
            <Outlet />
        </div>
    )
}