import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../store/types'

export default function PublicRoute() {
    const user = useSelector((state: RootState) => state.auth.user)
    if (user != null && user !== undefined) {
        return <Navigate to="/" />
    }
    return (
        <>
            <Outlet />
        </>
    )
}