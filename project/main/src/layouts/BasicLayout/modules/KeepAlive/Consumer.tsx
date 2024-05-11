import {FC, useContext, useEffect, useLayoutEffect, useState} from "react";
import {IKeepAliveConsumer, KeepAliveContext} from "../config";
import {createPortal} from "react-dom";


const Consumer: FC<IKeepAliveConsumer> = ({
    pathKey,
    children,
    currentPath,
}) => {
    const context = useContext(KeepAliveContext);
    const renderContext = context.getRenderContext();
    const [cacheItem, setCacheItem] = useState<ReturnType<typeof context.getCacheItem> | null>(null);

    const createOrUpdate = () => {
        const dom = document.createElement('div');
        context.pushCacheItem(
            pathKey,
            children,
            dom,
            createPortal(children, dom)
        );
    }

    // 展示
    useEffect(() => {
        if (currentPath !== pathKey) return;

        createOrUpdate();
        const obj = context.getCacheItem(currentPath);
        const renderDom = renderContext.current;

        if (!renderDom || !obj) return;

        setCacheItem(obj);
        renderDom.appendChild(obj.dom);

        return () => {
            renderDom.removeChild(obj.dom);
        }
    }, [currentPath, renderContext.current]);


    return <>{cacheItem?.reactPortal}</>
}


// const Consumer: FC<IKeepAliveConsumer> = ({
//     pathKey,
//     children,
//     currentPath,
// }) => {
//     const context = useContext(KeepAliveContext);
//     const renderContext = context.getRenderContext();
//     const [cacheItem, setCacheItem] = useState<any>(null);
//     const [uFlag, update] = useState({});

//     useLayoutEffect(() => {
//         // console.log(context);

//         const obj = context.getCacheItem(currentPath);

//         if (currentPath !== pathKey || !obj) return;

//         const {dom} = obj;

//         setCacheItem(obj);
//         // console.log(renderContext.current);
//         renderContext.current?.appendChild(dom);

//         return () => {
//             renderContext.current?.removeChild(dom);
//         }
//     }, [currentPath, uFlag, renderContext.current]);

//     useLayoutEffect(() => {
//         const dom = document.createElement('div');
//         context.pushCacheItem(
//             pathKey,
//             children,
//             dom,
//             createPortal(children, dom)
//         );

//         update({});
//     }, [pathKey, currentPath]);


//     return <>{cacheItem?.reactPortal}</>
// }

export default Consumer;
