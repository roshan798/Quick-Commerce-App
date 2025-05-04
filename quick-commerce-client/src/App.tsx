import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './routes/PrivateRoutes';
import PublicRoute from './routes/PublicRoutes';
import { useLoadingWithRefresh } from './hooks/useLoadingwithRefresh';
import { fetchCart } from './store/cart.slice';
import { useAppDispatch } from './store';
import AdminRoute from './routes/AdminRoutes';

const Error404 = lazy(() => import('./pages/Error404'));

import adminPagesData from './routes/admin';
import privatePagesData from './routes/private';
import publicPagesData from './routes/public';
import AdminSidebar from './components/AdminSidebar';
import ProtectedRoute from './routes/ProtectedRoute';
import sharedPagesData from './routes/protected';

function App() {
    const { loading } = useLoadingWithRefresh();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCart());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <div className="loading-screen">Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<AdminRoute />}>
                        {adminPagesData.map((page, index) => (
                            <Route
                                key={index}
                                path={page.path}
                                element={
                                    <AdminSidebar>
                                        <page.component />
                                    </AdminSidebar>
                                }
                            />
                        ))}
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        {sharedPagesData.map((page, index) => (
                            <Route
                                key={index}
                                path={page.path}
                                element={<page.component />}
                            />
                        ))}
                    </Route>
                    <Route element={<PrivateRoute />}>
                        {privatePagesData.map((page, index) => (
                            <Route
                                key={index}
                                path={page.path}
                                element={<page.component />}
                            />
                        ))}
                    </Route>
                    <Route element={<PublicRoute />}>
                        {publicPagesData.map((page, index) => (
                            <Route
                                key={index}
                                path={page.path}
                                element={<page.component />}
                            />
                        ))}
                    </Route>
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Suspense>
            <Footer />
        </>
    );
}

export default App;
