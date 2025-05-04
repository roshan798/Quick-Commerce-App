import { lazy } from 'react';
import { PagesData } from '../types';

const pagesData: PagesData[] = [
    {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: lazy(() => import('../pages/admin/Dashboard')),
    },
    {
        path: '/admin/products',
        name: 'Products',
        component: lazy(() => import('../pages/admin/Products/Products')),
    },
    {
        path: '/admin/products/add',
        name: 'Add Product',
        component: lazy(() => import('../pages/admin/AddProduct')),
    },
    {
        path: '/admin/products/update/:productId',
        name: 'Update Product',
        component: lazy(() => import('../pages/admin/UpdateProduct')),
    },
    {
        path: '/admin/products/images/:productId',
        name: 'Manage Images',
        component: lazy(() => import('../pages/admin/ManageImages')),
    },
];

export default pagesData;
