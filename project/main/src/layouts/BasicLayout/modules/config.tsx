import React, {createContext} from "react";
import {createPortal} from "react-dom";

export const KeepAliveContext = createContext<IKeepAliveProvider>({
    pushCacheItem: (() => {}) as any,
    removeCacheItem: (() => {}) as any,
    getCacheItem: (() => {}) as any,
    getLastCacheItem: (() => {}) as any,
    getRenderContext: (() => {}) as any,
    lookCache: (() => {}) as any,
});
// Context.Provider

interface IKeepAliveProvider {
    /** push dom 缓存 */
    pushCacheItem: (key: string, children: React.ReactNode, dom: HTMLDivElement, ele: React.ReactPortal) => boolean;
    /** remove dom 缓存 */
    removeCacheItem: (key: string) => void;
    /** 获取 dom 缓存 */
    getCacheItem: (key: string) => ICacheItem;
    /** 获取最近一次 缓存 */
    getLastCacheItem: () => any;
    /** 获取渲染容器 */
    getRenderContext: () => React.RefObject<HTMLDivElement>;
    lookCache: () => void;
}

interface IKeepAliveConsumer {
    pathKey: string;
    children: React.ReactNode;
    currentPath: string;
};

interface ICacheItem {
    /** 内容 */
    children: React.ReactNode;
    /** 渲染dom容器 */
    dom: HTMLDivElement;
    /** 路径key */
    pathKey: string;
    reactPortal: ReturnType<typeof createPortal>;
    /** 最新激活的时间戳 */
    dateNow: number;
    sort: number;
}

export type {
    IKeepAliveConsumer,
    IKeepAliveProvider,
    ICacheItem,
}
