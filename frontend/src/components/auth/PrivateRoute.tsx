import React from "react";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

const PrivateRoute: FC = () => {
    const { isAuthenticated } = useAppSelector(state => state.auth);

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;