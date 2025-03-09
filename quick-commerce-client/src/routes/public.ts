import { lazy } from "react";

export type PagesData = {
    path: string;
    name: string;
    component: React.LazyExoticComponent<React.ComponentType<unknown>>;
};

const publicPages: PagesData[] = [
    {
        path: "/signup",
        name: "Signup",
        component: lazy(() => import("../pages/user/Signup")),
    },
    {
        path: "/login",
        name: "Login",
        component: lazy(() => import("../pages/user/Login")),
    },
];

export default publicPages;
