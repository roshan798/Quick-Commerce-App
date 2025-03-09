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
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/user/Login'));
const Signup = lazy(() => import('./pages/user/Signup'));
const Cart = lazy(() => import('./pages/user/Cart'));
const Error404 = lazy(() => import('./pages/Error404'));

function App() {
  const { loading } = useLoadingWithRefresh();
  console.log('loading', loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [])

  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
