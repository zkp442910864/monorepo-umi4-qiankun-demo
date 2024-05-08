import React, {FC, useRef} from "react";
import {ICacheItem, IKeepAliveProvider, KeepAliveContext} from "./config";


const Provider: FC<{children: React.ReactNode, renderContent: React.RefObject<HTMLDivElement>}> = ({children, renderContent}) => {

    const cache = useRef<Record<string, ICacheItem>>({});

    const {current: value} = useRef<IKeepAliveProvider>({
        pushCacheItem: (pathKey, children, dom, reactPortal) => {
            let flag = false;
            if (!cache.current[pathKey.toLocaleLowerCase()]) {
                flag = true;
                cache.current[pathKey.toLocaleLowerCase()] = {
                    children,
                    dom,
                    pathKey,
                    reactPortal,
                    dateNow: 0,
                }
            }

            cache.current[pathKey.toLocaleLowerCase()].dateNow = Date.now();
            return flag;
        },
        removeCacheItem: (pathKey) => {
            delete cache.current[pathKey.toLocaleLowerCase()];
        },
        getCacheItem: (pathKey) => {
            return cache.current[pathKey.toLocaleLowerCase()];
        },
        getLastCacheItem: () => {
            const list = Object.values(cache.current).sort((a, b) => b.dateNow - a.dateNow);
            console.log(list);

            return list[0];
        },
        getRenderContext: () => renderContent,
    })


    return (
        <>
            <KeepAliveContext.Provider
                value={value}
            >
                {children}
            </KeepAliveContext.Provider>
        </>

    )
};

export default Provider;
