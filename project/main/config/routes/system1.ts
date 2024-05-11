import {ICustomRouter, handleData} from "./config";

const arr: ICustomRouter[] = [
    // {path: '/', redirect: '/Test2', },
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
            // {path: '/childrenPage', redirect: '/childrenPage/cTest3', },
            {
                path: '/childrenPage/cTest3',
                name: 'cTest3',
                component: './Test3',
                keepAlive: true,
            }
        ],
    },
];

export const system1 = handleData(arr);
