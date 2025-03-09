import { lazy } from "react";

export type PagesData = {
    path: string;
    name: string;
    component: React.LazyExoticComponent<React.ComponentType<unknown>>;
};

const pagesData: PagesData[] = [
    {
        path: "/",
        name: "Home",
        component: lazy(() => import("../pages/Home")),
    },
    {
        path: "/cart",
        name: "Add Product",
        component: lazy(() => import("../pages/user/Cart")),
    },
];

export default pagesData;
