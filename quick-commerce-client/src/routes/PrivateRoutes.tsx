import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../store/types';

export default function PrivateRoute() {
    const user = useSelector((state: RootState) => state.auth.user);

    if (user === null || user === undefined) {
        return <Navigate to="/login" />;
    }
    if (user.role === 'ROLE_ADMIN') {
        return <Navigate to="/admin/dashboard" />;
    }

    return <Outlet />;
}
