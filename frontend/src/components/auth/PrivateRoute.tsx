import React from "react";
import { FC } from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

interface PropType {
    component: FC;
}

const PrivateRoute: FC = () => {
    const { isAuthenticated } = useAppSelector(state => state.auth);

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;