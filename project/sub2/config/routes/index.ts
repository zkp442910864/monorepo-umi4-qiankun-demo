import {ICustomRouter, handleData} from "./config";


/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。只能是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */
const arr: ICustomRouter[] = [
    {
        path: '/',
        name: '根',
        layout: false,
        component: '@/layouts/BasicLayout',
        routes: [
            {path: '/', redirect: '/Test2', },
            {
                path: 'Home',
                component: './Home',
                name: '首页',
                customAccess: '/Home',
                keepAlive: true,
            },
            {
                path: 'Test1',
                name: 'Test1',
                component: './Test1',
                keepAlive: true,
            },
            {
                path: 'Test2',
                name: 'Test2',
                component: './Test2',
                customAccess: '/Test2',
                keepAlive: true,
            },
            {
                path: '/childrenPage',
                name: '子页面',
                routes: [
                    {path: '/childrenPage', redirect: '/childrenPage/cTest3', },
                    {
                        path: '/childrenPage/cTest3',
                        name: 'cTest3',
                        component: './Test3',
                        keepAlive: true,
                    }
                ],
            },
            {
                path: '*',
                component: '../layouts/StatusPage',
            },
        ],
    },
    {
        path: '*',
        component: '../layouts/StatusPage',
    },
    // {
    //     path: 'Test2',
    //     name: 'Test2',
    //     component: './Test2',
    //     // element: packageCom(() => import('@/pages/Test2')),
    // },
    // {
    //     path: 'Test3',
    //     name: 'Test3',
    //     component: './Test3',
    //     // element: packageCom(() => import('@/pages/Test3')),
    // },
    // {
    //     path: 'childrenPage',
    //     routes: [
    //         {
    //             path: 'cTest3',
    //             name: 'cTest3',
    //             keepAlive: true,
    //             component: './Test3'
    //         }
    //     ],
    // },
    // {
    //     path: '/Test4',
    //     name: 'Test4',
    //     element: packageCom(() => import('@/layouts/StatusPage')),
    // },
    // {
    //     path: '*',
    //     // element: packageCom(() => import('@/layouts/StatusPage')),
    //     component: '../layouts/StatusPage',
    // },
];

/**
 * 有效路由
 * 重定向路由
 * 404 403 处理
 */
export default handleData(arr);
export const menuList = handleData(JSON.parse(JSON.stringify(arr)), true);

export type {
    ICustomRouter,
}
