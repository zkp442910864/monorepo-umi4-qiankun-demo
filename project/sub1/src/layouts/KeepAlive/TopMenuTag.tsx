import {Tabs} from "antd";
import {useContext, useEffect, useRef, useState} from "react";
import {history, useModel, useNavigate} from "umi";
import {KeepAliveContext} from "./config";

const TopMenuTag = () => {
    const initialState = useModel('@@initialState').initialState;
    const navigate = useNavigate();
    const [, update] = useState({});
    const kaContext = useContext(KeepAliveContext);
    const {current: state} = useRef({
        tagList: [] as Array<{label: string, key: string}>,
        tagMap: {} as Record<string, {label: string, key: string}>,
        current: '',
    })

    // console.log(initialState);
    const linkPage = (url: string) => navigate(url);

    useEffect(() => {
        const item = {
            key: history.location.pathname,
            label: '自定义' + Math.random(),
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

                        kaContext.removeCacheItem(key as string);
                        const {pathKey} = kaContext.getLastCacheItem();
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

