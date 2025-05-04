import { lazy } from 'react';
import { PagesData } from '../types';

const sharedPagesData: PagesData[] = [
    {
        path: '/my-account',
        name: 'My Account',
        component: lazy(() => import('../pages/MyAccount')),
    },
];

export default sharedPagesData;
