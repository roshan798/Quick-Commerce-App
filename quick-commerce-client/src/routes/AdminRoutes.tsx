import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../store/types';

export default function AdminRoute() {
    const user = useSelector((state: RootState) => state.auth.user);

    if (user === null || user === undefined || user.role !== 'ROLE_ADMIN') {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}
