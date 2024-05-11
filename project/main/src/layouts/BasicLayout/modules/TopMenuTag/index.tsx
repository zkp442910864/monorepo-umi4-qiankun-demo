import {Tabs} from "antd";
import {useContext, useEffect, useRef, useState} from "react";
import {history, useModel, useNavigate} from "umi";
import {KeepAliveContext} from "../config";
import {handlerPath} from "@/utils";

const TopMenuTag = () => {
    const {validMenuDataMap} = useModel('@@initialState').initialState!;
    const navigate = useNavigate();
    const [, update] = useState({});
    const kaContext = useContext(KeepAliveContext);
    const {current: state} = useRef({
        tagList: [] as Array<{label: string, key: string}>,
        tagMap: {} as Record<string, {label: string, key: string}>,
        current: '',
        firstKey: '',
    })

    const linkPage = (url: string) => navigate(url);

    useEffect(() => {
        const menuItem = validMenuDataMap[Object.keys(validMenuDataMap)[0]];
        const item = {
            key: menuItem.path!,
            label: menuItem.name!,
            closable: false,
        };
        state.firstKey = item.key;
        state.tagMap[item.key] = item;
        state.tagList.push(item);
    }, [])

    useEffect(() => {
        const menuItem = validMenuDataMap[handlerPath(history.location.pathname, true)];

        const item = {
            key: menuItem.path!,
            label: menuItem.name!,
        };

        if (!state.tagMap[item.key]) {
            state.tagMap[item.key] = item;
            state.tagList.push(item);
        }

        state.current = item.key;
        state.tagList = state.tagList.slice();
        update({})
    }, [history.location.pathname]);


    return (
        <div className="flex width-100">
            <Tabs
                className="f-1 width0"
                hideAdd={true}
                type="editable-card"
                activeKey={state.current}
                items={state.tagList}
                onEdit={(key, action) => {
                    if (action === 'remove') {
                        delete state.tagMap[key as string];

                        const index = state.tagList.findIndex(ii => ii.key === key);
                        state.tagList.splice(index, 1);
                        state.tagList = state.tagList.slice();

                        // debugger
                        kaContext.removeCacheItem(key as string);
                        const {pathKey} = kaContext.getLastCacheItem() || {pathKey: state.firstKey};
                        if (state.current !== pathKey) {
                            state.current = pathKey;
                            linkPage(pathKey);
                        }
                        update({})
                    }
                }}
                onChange={linkPage}
            />
        </div>
    )
}

export default TopMenuTag;

