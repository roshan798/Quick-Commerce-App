import { lazy } from 'react';
import { PagesData } from '../types';

const pagesData: PagesData[] = [
    {
        path: '/',
        name: 'Home',
        component: lazy(() => import('../pages/Home')),
    },
    {
        path: '/cart',
        name: 'Cart',
        component: lazy(() => import('../pages/user/Cart')),
    },
];

export default pagesData;
