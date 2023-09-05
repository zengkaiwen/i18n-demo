import { lazy } from "react";
import { RouteProps } from "./Router";
import BasicLayout from "./layouts/BasicLayout";

const routes: RouteProps[] = [
    {
        path: '/',
        component: BasicLayout,
        children: [
            {
                path: '/page1',
                exact: true,
                component: lazy(() => import('./pages/Page1'))
            },
            {
                path: '/page2',
                exact: true,
                component: lazy(() => import('./pages/Page2'))
            },
            {
                path: '/',
                redirect: '/page1'
            }
        ]
    }
]

export default routes;
