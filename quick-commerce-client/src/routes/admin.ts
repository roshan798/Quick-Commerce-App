import { lazy } from "react";

export type PagesData = {
    path: string;
    name: string;
    component: React.LazyExoticComponent<React.ComponentType<unknown>>;
};

const pagesData: PagesData[] = [
    {
        path: "/admin/dashboard",
        name: "Dashboard",
        component: lazy(() => import("../pages/admin/Dashboard")),
    },
    {
        path: "/admin/add-product",
        name: "Add Product",
        component: lazy(() => import("../pages/admin/AddProduct")),
    },
    {
        path: "/admin/products",
        name: "Products",
        component: lazy(() => import("../pages/admin/Products")),
    },
    {
        path: "/admin/add-or-update-product/:productId",
        name: "Add Product",
        component: lazy(() => import("../pages/admin/AddOrUpdateProduct"))
    }
];

export default pagesData;
