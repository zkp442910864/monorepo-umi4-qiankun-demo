
import {Suspense, createElement, lazy} from "react";

/** 包裹异步组件 */
export const packageCom = (lazyComFn: Parameters<typeof lazy>[0]) => {
    const Com = lazy(lazyComFn);
    return createElement(Suspense, null, createElement(Com, null));
}

/** 处理数据 */
export const handleData = (data: Array<ICustomRouter>, toMenuList?: boolean) => {
    const inlineData = data as Array<ICustomRouter>;

    inlineData.forEach((item) => {

        // 把 customAccess 转全小写，避免大小写问题
        {

            // customAccess 转为字符串使用
            if (Array.isArray(item.customAccess)) {
                item.customAccess = item.customAccess.join();
            }

            if (item.customAccess) {
                item.customAccess = item.customAccess.toLocaleLowerCase();
            }

            if (item.routes) {
                handleData(item.routes, toMenuList);
            }
        }


        if (toMenuList) {
            item.children = item.routes;
            delete item.routes;
            delete item.layout;
            delete item.component;
        }
    });

    return inlineData;
};

/** umi 解析路由需要的属性 */
// type TUmiRouter  = Exclude<Required<Parameters<typeof defineConfig>[0]>['routes'], false>[number] & {element?: any};
interface ICustomRouter {
    /**
     * @desc path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
     * @desc 访问路由，如果不是以 / 开头会拼接父路由
     */
    path?: string;
    /** @desc 重定向 */
    redirect?: string;
    /**
     * @desc 配置 location 和 path 匹配后用于渲染的 React 组件路径。是相对路径(会从 src/pages 开始找起)。
     * @desc 如果指向 src 目录的文件，可以用 @，也可以用 ../。比如 component: '@/layouts/basic'，或者 component: '../layouts/basic'，推荐用前者。
     */
    component?: string;
    // element?: any;
    /**
     * @desc 标识当前路由需要缓存，只能作用于最末级
     */
    keepAlive?: boolean;
    /**
     * @desc 配置子路由
     * @desc  可以为子路由配置不同 layout 组件
     */
    routes?: Array<ICustomRouter>;
    /** 冗余出来的字段，用来展示 */
    children?: Array<ICustomRouter>;
    /**
     * @desc 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。
     * @desc 好像可以做路由拦截
     */
    wrappers?: string[];
    /** 配置路由的标题 */
    name?: string;
    /** 图标 */
    icon?: string;
    /** 多语言 key */
    locale?: string;
    /** layout 布局 */
    layout?: boolean;
    /**
     * @desc 权限，主要对这个路径做一个标识，然后会解析接口返回的数据，标识匹配上就能访问，匹配不到就403展示
     * @desc 根据原来的 access 进行扩展，不走原逻辑
     */
    customAccess?: string | string[];
}

export type {
    ICustomRouter
}

