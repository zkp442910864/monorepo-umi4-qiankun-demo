import {FC, useContext, useLayoutEffect, useState} from "react";
import {IKeepAliveConsumer, KeepAliveContext} from "./config";
import {createPortal} from "react-dom";

const Consumer: FC<IKeepAliveConsumer> = ({
    pathKey,
    children,
    currentPath,
}) => {
    const context = useContext(KeepAliveContext);
    const renderContext = context.getRenderContext();
    // const dom = useRef<any>(null);
    // const [inlineChildren, setInlineChildren] = useState(null);
    const [cacheItem, setCacheItem] = useState<any>(null);
    const [uFlag, update] = useState({});

    useLayoutEffect(() => {
        // console.log(context);

        const obj = context.getCacheItem(currentPath);

        if (currentPath !== pathKey || !obj) return;

        const {dom} = obj;

        setCacheItem(obj);
        // console.log(renderContext.current);
        renderContext.current?.appendChild(dom);

        return () => {
            renderContext.current?.removeChild(dom);
        }
    }, [currentPath, uFlag, renderContext.current]);

    useLayoutEffect(() => {
        const dom = document.createElement('div');
        context.pushCacheItem(
            pathKey,
            children,
            dom,
            createPortal(children, dom)
        );

        update({});
    }, [pathKey, currentPath]);


    return <>{cacheItem?.reactPortal}</>
}

export default Consumer;
