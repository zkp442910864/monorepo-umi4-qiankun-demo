import {FC, Suspense, createElement, useMemo} from "react"
import {Access, Outlet, history, useAccess, useAppData, useOutletContext} from "umi";
import StatusPage from "../StatusPage";
import {ICustomRouter} from "config/routes";
import Consumer from "./Consumer";
import TopMenuTag from "./TopMenuTag";


const Content: FC<IContentProps> = ({
    renderContent,
}) => {
    const context = useOutletContext();
    const accessObj = useAccess();
    const appData = useAppData();
    const {routeComponents, routes: inlineRouters} = appData;

    const {keepAliveRoutes, keepAliveMap} = useMemo(() => {
        type TRouter = ICustomRouter & {id: string, parentId?: string, element?: any};

        /** 相对路径的情况下，往父级拼接路径，以及包裹组件(包裹组件好像不会处理) */
        const getPathAndElement = (item: TRouter, path?: string, ele?: ReturnType<typeof createElement>) => {
            const parentItem = inlineRouters[item.parentId!];
            let inlinePath = path ? item.path + '/' + path : '/' + item.path;
            let inlineEle = createElement(routeComponents[item.id], null, ele);
            // debugger
            if (parentItem) {
                const obj = getPathAndElement(parentItem, inlinePath, inlineEle) as any;
                inlinePath = obj.path;
                inlineEle = obj.element;
            }

            return {path: inlinePath, element: inlineEle};
        };

        /** 遍历出所有 keepAlive 数据 */
        const getKeepAlive = () => {
            const newList: Array<TRouter> = [];
            const list = Object.values(inlineRouters) as Array<TRouter>;


            list.forEach(item => {
                if (item.keepAlive) {
                    const newItem = {...item};
                    const {path} = getPathAndElement(newItem);
                    if (!newItem.path?.startsWith('/')) {
                        newItem.path = path?.replace(/\/+/g, '/');
                    }
                    // TODO: 这里的匹配可能会出现未知问题
                    newItem.element = createElement(Suspense, null, createElement(routeComponents[item.id]));
                    // newItem.element = createElement(Suspense, null, createElement(routeComponents['ant-design-pro-layout'], null, createElement(routeComponents[item.id])));
                    // newItem.element = createElement(Suspense, null, element);
                    newList.push(newItem);
                }
            });

            // console.log(newList);
            return newList;
        };

        const keepAliveRoutes = getKeepAlive();

        return {
            keepAliveRoutes,
            keepAliveMap: keepAliveRoutes.reduce((map, item) => {
                map[item.path!] = item;
                map[item.path!.toLocaleLowerCase()] = item;
                return map;
            }, {} as Record<string, TRouter>),
        };
    }, []);

    /** 简单包裹 */
    const accessPackage = (child: React.ReactNode, path: string) => (
        <Access
            accessible={accessObj[path.toLocaleLowerCase()] ?? true}
            fallback={<StatusPage code={403} />}
        >
            {child}
        </Access>
    );

    return (
        <>
            <TopMenuTag />
            {
                keepAliveRoutes.map((item) => (
                    <Consumer key={item.path} currentPath={history.location.pathname} pathKey={item.path!}>
                        {accessPackage(item.element, item.path!)}
                    </Consumer>
                ))
            }
            <div className="keep-alive" ref={renderContent}></div>

            {(() => {
                if (keepAliveMap[history.location.pathname]) {
                    return <div className="not-keep-alive"></div>;
                }

                return (
                    <div className="not-keep-alive">
                        <div>
                            {accessPackage(<Outlet context={context} />, history.location.pathname)}
                        </div>
                    </div>
                )
            })()}
        </>
    )
}

export default Content;

interface IContentProps {
    // id: string;
    // children?: React.ReactNode;
    renderContent: React.RefObject<HTMLDivElement>;
}
