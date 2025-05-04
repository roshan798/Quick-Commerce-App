import { lazy } from 'react';
import { PagesData } from '../types';

const publicPages: PagesData[] = [
    {
        path: '/signup',
        name: 'Signup',
        component: lazy(() => import('../pages/user/Signup')),
    },
    {
        path: '/login',
        name: 'Login',
        component: lazy(() => import('../pages/user/Login')),
    },
];

export default publicPages;
