import React, {FC, useRef} from "react";
import {ICacheItem, IKeepAliveProvider, KeepAliveContext} from "../config";
import {handlerPath} from "@/utils";


let sort = 0;
const Provider: FC<{children: React.ReactNode, renderContent: React.RefObject<HTMLDivElement>}> = ({children, renderContent}) => {

    const cache = useRef<Record<string, ICacheItem>>({});

    const {current: value} = useRef<IKeepAliveProvider>({
        pushCacheItem: (pathKey, children, dom, reactPortal) => {
            const afterUrl = handlerPath(pathKey, true);
            let flag = false;
            if (!cache.current[afterUrl]) {
                flag = true;
                cache.current[afterUrl] = {
                    children,
                    dom,
                    pathKey,
                    reactPortal,
                    dateNow: 0,
                    sort: 0,
                }
            }

            cache.current[afterUrl].sort = sort++;
            cache.current[afterUrl].dateNow = Date.now();
            return flag;
        },
        removeCacheItem: (pathKey) => {
            delete cache.current[handlerPath(pathKey, true)];
        },
        getCacheItem: (pathKey) => {
            return cache.current[handlerPath(pathKey, true)];
        },
        getLastCacheItem: () => {
            const list = Object.values(cache.current).sort((a, b) => b.sort - a.sort);
            // console.log(list);

            return list[0];
        },
        getRenderContext: () => renderContent,
        lookCache: () => console.log(cache),
    })


    return (
        <KeepAliveContext.Provider value={value} >
            {children}
        </KeepAliveContext.Provider>
    )
};

export default Provider;
